import { Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { CommonModule, DatePipe } from '@angular/common'
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter'
import { ActivatedRoute, Router } from '@angular/router'
import { EventsService } from '../../../services/events.service'
import Swal from 'sweetalert2'
import { environment } from '../../../../environments/environment'
import { MatCheckboxModule } from '@angular/material/checkbox'

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-update-events',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe
  ],
  templateUrl: './update-events.component.html',
  styleUrl: './update-events.component.scss'
})
export class UpdateEventsComponent {
  eventForm!: FormGroup
  event!: Event
  eventId!: string
  eventImageFile!: File | null

  imageUploadsUrl: string = environment.backendBasicUrl
  imageSrcToHtml: string = ''

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private eventsService: EventsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id) {
        this.eventForm = this.fb.group({
          title: ['', Validators.required],
          date_start: ['', Validators.required],
          recurrent: [''],
          date_end: [''],
          time_start: ['', Validators.required],
          time_end: [''],
          ubication: ['', Validators.required],
          price: [''],
          aditional_info: [''],
          image_url: ['']
        })
        this.eventId = id
        this.getEvent(id)
      } else {
        this.router.navigate(['/admin/eventos'])
        return
      }
    })
  }

  getEvent(id: string) {
    this.eventsService.getEvent(id).subscribe({
      next: event => {
        this.eventForm.patchValue({
          title: event.title || '',
          date_start: event.date_start || '',
          recurrent: event.recurrent || '',
          date_end: event.date_end || '',
          time_start: event.time_start || '',
          time_end: event.time_end || '',
          ubication: event.ubication || '',
          price: event.price || '',
          aditional_info: event.aditional_info || '',
          image_url: event.image_url || ''
        })

        if (event.image_url) {
          this.imageSrcToHtml = `${this.imageUploadsUrl + event.image_url}`
        }
      },
      error: () => {
        this.router.navigate(['/admin/eventos'])
      }
    })
  }

  onFileSelected(event: any) {
    const imageFile = <File>event.target.files[0]

    if (imageFile) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/jpg']

      if (!allowedTypes.includes(imageFile.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Formato inválido',
          text: 'Formatos aceptados: png, jpeg, webp, jpg'
        })
        return
      }
    }
    this.eventImageFile = imageFile
    this.eventForm.patchValue({ image: `/uploads/${imageFile.name}` })
    const imgPreview = URL.createObjectURL(imageFile)
    this.imageSrcToHtml = `${imgPreview}`
  }

  deleteImage() {
    Swal.fire({
      title: 'Eliminar imagen?',
      text: 'Esta acción no se podrá revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        const imgArray = this.imageSrcToHtml.split('/')
        const imgName = imgArray[imgArray.length - 1]

        this.eventsService.deleteImage(imgName).subscribe(() => {
          this.imageSrcToHtml = ''
          this.eventImageFile = null
          this.eventForm.setValue({ image_url: '' })
        })
      }
    })
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const formData = this.eventForm.value
      formData.date_start = this.datePipe.transform(formData.date_start, 'yyyy-MM-dd') || ''
      formData.date_end = this.datePipe.transform(formData.date_end, 'yyyy-MM-dd') || ''

      if (this.eventImageFile) {
        this.eventsService.uploadImage(this.eventImageFile).subscribe({
          next: res => {
            if (res.imageUrl) {
              formData.image_url = res.imageUrl
              if (formData.recurrent === true) {
                formData.recurrent = 1
              } else {
                formData.recurrent = 0
              }
              this.eventsService.updateEvent(formData, this.eventId).subscribe({
                next: () => {
                  this.router.navigate(['/admin/eventos'])
                },
                error: err => {
                  console.log(err)
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al guardar el evento'
                  })
                }
              })
            }
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hubo un error al subir la imagen'
            })
          }
        })
      } else {
        formData.image_url = ''
        if (formData.recurrent === true) {
          formData.recurrent = 1
        } else {
          formData.recurrent = 0
        }
        console.log(formData)
        this.eventsService.updateEvent(formData, this.eventId).subscribe({
          next: () => {
            this.router.navigate(['/admin/eventos'])
          },
          error: err => {
            console.log(err)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hubo un error al guardar el evento'
            })
          }
        })
      }
    } else {
      this.eventForm.markAllAsTouched()
    }
  }
}
