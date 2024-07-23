import { Component, OnInit } from '@angular/core'
import { MeetingScheduleService } from '../../../services/meeting-schedule.service'
import { MeetingSchedule } from '../../../interfaces/meeting-schedule'
import { TimePipe } from '../../../pipes/time.pipe'

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TimePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  meetingSchedule: MeetingSchedule = {
    id: 1,
    morning: '',
    afternoon: ''
  }

  constructor(private meetingScheduleService: MeetingScheduleService) {}

  ngOnInit(): void {
    this.meetingScheduleService.getMeetingSchedule().subscribe({
      next: res => {
        this.meetingSchedule = res
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
