import { Component, OnInit } from '@angular/core'
import { LightboxModule, Lightbox, IAlbum } from 'ngx-lightbox'
import { EventsService } from '../../../services/events.service'
import { environment } from '../../../../environments/environment'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-events-images',
  standalone: true,
  imports: [LightboxModule, CommonModule],
  templateUrl: './events-images.component.html',
  styleUrls: ['./events-images.component.scss']
})
export class EventsImagesComponent implements OnInit {
  isLoading: boolean = true
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
            this.isLoading = false
          }
        })
      },
      error: err => {
        this.isLoading = false
      }
    })
  }

  handleImageError(index: number): void {
    // Elimina la imagen del álbum si no se puede cargar
    this.albums.splice(index, 1)
  }

  open(index: number): void {
    this.lightbox.open(this.albums, index)
  }

  close(): void {
    this.lightbox.close()
  }
}
