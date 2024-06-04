import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Event } from '../interfaces/event'
import { TokenService } from './token.service'
import { checkToken } from '../interceptors/token.interceptor'

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private baseUrl = `${environment.apiUrl}/events`

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getEvents() {
    return this.http.get<Event[]>(`${this.baseUrl}`, { context: checkToken() })
  }

  createEvent(event: Event) {
    return this.http.post<Event>(`${this.baseUrl}/create`, event, { context: checkToken() })
  }
}
