import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class VideosYTService {
  private API_KEY_YT: string = 'AIzaSyDyGlsaMY-oTbBKF9tNt-Hvf4hwMhZb9_8'
  private maxResults: number = 7
  private API_YT_URL_LAST_3: string = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${this.maxResults}&playlistId=UUm-EMV6cioi0Za2D2HXbuxA&key=${this.API_KEY_YT}`

  constructor(private http: HttpClient) {}

  getLast3Videos() {
    return this.http.get<any>(this.API_YT_URL_LAST_3).pipe(
      map(response => response.items),
      map(items => items.filter((item: any) => !item.snippet.title.includes('Celebremos'))),
      map(items => items.slice(0, 3))
    )
  }
}
