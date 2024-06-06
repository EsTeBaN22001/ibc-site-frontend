import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Event } from '../interfaces/event'
import { checkToken } from '../interceptors/token.interceptor'

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private baseUrl = `${environment.apiUrl}/events`

  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get<Event[]>(`${this.baseUrl}`, { context: checkToken() })
  }

  getEvent(id: string) {
    return this.http.get<Event>(`${this.baseUrl}/${id}`, { context: checkToken() })
  }

  createEvent(event: Event) {
    return this.http.post<Event>(`${this.baseUrl}/create`, event, { context: checkToken() })
  }

  updateEvent(event: Event, id: string) {
    return this.http.post<Event>(`${this.baseUrl}/update/${id}`, event, { context: checkToken() })
  }
}
