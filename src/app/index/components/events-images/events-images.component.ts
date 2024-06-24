import { Component, OnInit } from '@angular/core'
import { LightboxModule, Lightbox } from 'ngx-lightbox'
import { EventsService } from '../../../services/events.service'
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-events-images',
  standalone: true,
  imports: [LightboxModule],
  templateUrl: './events-images.component.html',
  styleUrl: './events-images.component.scss'
})
export class EventsImagesComponent implements OnInit {
  albums: any = []
  eventsImages: string[] = []
  imageUploadsUrl: string = environment.backendBasicUrl

  constructor(private lightbox: Lightbox, private eventsService: EventsService) {
    for (let i = 0; i <= 5; i++) {
      const src = 'assets/ministries/grupo-hombres.webp'
      const caption = 'Image Caption'
      const album = {
        src: src,
        caption: caption
      }

      this.albums.push(album)
    }
  }

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe({
      next: events => {
        events.map(event => (event.image_url ? this.eventsImages.push(`${environment.backendBasicUrl + event.image_url}`) : null))
      },
      error: err => {
        console.log(err)
      }
    })
  }

  open(index: number): void {
    this.lightbox.open(this.albums, index)
  }

  close(): void {
    this.lightbox.close()
  }
}
