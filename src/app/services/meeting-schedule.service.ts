import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { MeetingSchedule } from '../interfaces/meeting-schedule'

@Injectable({
  providedIn: 'root'
})
export class MeetingScheduleService {
  private baseUrl = `${environment.apiUrl}/meeting-schedule`

  constructor(private http: HttpClient) {}

  getMeetingSchedule() {
    return this.http.get<MeetingSchedule>(this.baseUrl)
  }

  updateMeetingSchedule(newMeetingSchedule: MeetingSchedule) {
    return this.http.post<MeetingSchedule>(this.baseUrl, newMeetingSchedule)
  }
}
