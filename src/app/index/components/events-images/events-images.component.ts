import { Component, OnInit } from '@angular/core'
import { LightboxModule, Lightbox, IAlbum } from 'ngx-lightbox'
import { EventsService } from '../../../services/events.service'
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-events-images',
  standalone: true,
  imports: [LightboxModule],
  templateUrl: './events-images.component.html',
  styleUrls: ['./events-images.component.scss']
})
export class EventsImagesComponent implements OnInit {
  albums: IAlbum[] = []
  eventsImages: any[] = []
  imageUploadsUrl: string = environment.backendBasicUrl

  constructor(private lightbox: Lightbox, private eventsService: EventsService) {}

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe({
      next: events => {
        events.forEach(event => {
          if (event.image_url) {
            const imageSrc = `${this.imageUploadsUrl + event.image_url}`
            this.albums.push({
              src: imageSrc,
              caption: event.title || 'Evento sin título',
              thumb: imageSrc
            })
          }
        })
      },
      error: err => {}
    })
  }

  open(index: number): void {
    this.lightbox.open(this.albums, index)
  }

  close(): void {
    this.lightbox.close()
  }
}
