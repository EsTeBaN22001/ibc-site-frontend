import { Component } from '@angular/core'
import { EventsCardsComponent } from '../../../index/components/events-cards/events-cards.component'
import { EventsImagesComponent } from '../../../index/components/events-images/events-images.component'
import { ReactiveFormsModule } from '@angular/forms'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { CommonModule } from '@angular/common'
import Swal from 'sweetalert2'
import { MeetingScheduleService } from '../../../services/meeting-schedule.service'
import { MeetingSchedule } from '../../../interfaces/meeting-schedule'

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [EventsCardsComponent, EventsImagesComponent, ReactiveFormsModule, MatInputModule, CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  meetingScheduleForm: FormGroup
  meetingSchedule!: MeetingSchedule

  constructor(private fb: FormBuilder, private meetingScheduleService: MeetingScheduleService) {
    this.meetingScheduleForm = fb.group({
      morning: ['', Validators.required],
      afternoon: ['', Validators.required]
    })
    this.getMeetingSchedule()
  }

  getMeetingSchedule() {
    this.meetingScheduleService.getMeetingSchedule().subscribe({
      next: res => {
        this.meetingScheduleForm.patchValue({
          morning: res.morning || '',
          afternoon: res.afternoon || ''
        })
        this.meetingSchedule = res
      }
    })
  }

  updateMeetingSchedule() {
    if (this.meetingScheduleForm.valid) {
      Swal.fire({
        title: 'Cambiar horario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Guardar'
      }).then(result => {
        if (result.isConfirmed) {
          const formData = this.meetingScheduleForm.value

          console.log(formData)
          this.meetingScheduleService.updateMeetingSchedule(formData).subscribe({
            next: res => {
              console.log(res)

              Swal.fire({
                title: 'Cambios guardados',
                text: 'Los cambios se guardaron exitosamente',
                icon: 'success'
              })
            },
            error: err => {
              Swal.fire({
                icon: 'error',
                title: 'Error al guardar cambios',
                text: 'Hubo un error al guardar los cambios de horario'
              })
            }
          })
        }
      })
    }
  }
}
