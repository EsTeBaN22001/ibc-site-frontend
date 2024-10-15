import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Event, ResponseDeleteEvent } from '../interfaces/event'
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
    return this.http.put<Event>(`${this.baseUrl}/update/${id}`, event, { context: checkToken() })
  }

  deleteEvent(id: string) {
    return this.http.delete<ResponseDeleteEvent>(`${this.baseUrl}/delete/${id}`, { context: checkToken() })
  }

  uploadImage(image: File) {
    const fd = new FormData()
    fd.append('image', image, image.name)
    return this.http.post<{ imageUrl: string }>(`${this.baseUrl}/upload`, fd, { context: checkToken() })
  }

  deleteImage(img: string) {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.baseUrl}/delete-image`,
      { img },
      { context: checkToken() }
    )
  }
}
