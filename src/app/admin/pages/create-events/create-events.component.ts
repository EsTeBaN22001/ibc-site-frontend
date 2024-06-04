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
import { EventsService } from '../../../services/events.service'
import { Router } from '@angular/router'

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
  selector: 'app-create-events',
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
  templateUrl: './create-events.component.html',
  styleUrl: './create-events.component.scss'
})
export class CreateEventsComponent {
  eventForm: FormGroup

  constructor(private fb: FormBuilder, private datePipe: DatePipe, private eventsService: EventsService, private router: Router) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date_start: ['', Validators.required],
      date_end: [''],
      time_start: ['', Validators.required],
      time_end: [''],
      ubication: ['', Validators.required],
      price: [''],
      aditional_info: ['']
    })
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const formData = this.eventForm.value
      formData.date_start = this.datePipe.transform(formData.date_start, 'yyyy-MM-dd')
      formData.date_end = this.datePipe.transform(formData.date_end, 'yyyy-MM-dd')

      this.eventsService.createEvent(formData).subscribe(newEvent => {
        // this.router.navigate(['/admin/eventos'])
        console.log(newEvent)
      })
    } else {
      this.eventForm.markAllAsTouched()
    }
  }
}
