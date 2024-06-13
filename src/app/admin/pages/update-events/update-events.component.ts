import { Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { DatePipe } from '@angular/common'
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter'
import { ActivatedRoute, Router } from '@angular/router'
import { EventsService } from '../../../services/events.service'

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
    MatCardModule
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
  eventId!: string

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
          date_end: [''],
          time_start: ['', Validators.required],
          time_end: [''],
          ubication: ['', Validators.required],
          price: [''],
          aditional_info: [''],
          image: ['']
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
          date_end: event.date_end || '',
          time_start: event.time_start || '',
          time_end: event.time_end || '',
          ubication: event.ubication || '',
          price: event.price || '',
          aditional_info: event.aditional_info || '',
          image: event.image_url || ''
        })
      },
      error: error => {
        this.router.navigate(['/admin/eventos'])
      }
    })
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const formData = this.eventForm.value
      formData.date_start = this.datePipe.transform(formData.date_start, 'yyyy-MM-dd') || ''
      formData.date_end = this.datePipe.transform(formData.date_end, 'yyyy-MM-dd') || ''

      this.eventsService.updateEvent(formData, this.eventId).subscribe(() => {
        this.router.navigate(['/admin/eventos'])
      })
    } else {
      this.eventForm.markAllAsTouched()
    }
  }
}
