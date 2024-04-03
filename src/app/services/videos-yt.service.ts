import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class VideosYTService {
  private API_KEY_YT: string = 'AIzaSyDyGlsaMY-oTbBKF9tNt-Hvf4hwMhZb9_8'
  private CHANNEL_ID: string = 'UCm-EMV6cioi0Za2D2HXbuxA'
  private UPLOADS_ID: string = 'UUm-EMV6cioi0Za2D2HXbuxA'
  private API_YT_URL_LAST_3: string = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=3&playlistId=UUm-EMV6cioi0Za2D2HXbuxA&key=${this.API_KEY_YT}`

  constructor(private http: HttpClient) {}

  getLast3Videos() {
    return this.http.get<any>(this.API_YT_URL_LAST_3)
  }
}
