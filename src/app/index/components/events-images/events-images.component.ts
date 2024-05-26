import { Component } from '@angular/core'
import { LightboxModule, Lightbox } from 'ngx-lightbox'

@Component({
  selector: 'app-events-images',
  standalone: true,
  imports: [LightboxModule],
  templateUrl: './events-images.component.html',
  styleUrl: './events-images.component.scss'
})
export class EventsImagesComponent {
  albums: any = []

  constructor(private lightbox: Lightbox) {
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

  open(index: number): void {
    this.lightbox.open(this.albums, index)
  }

  close(): void {
    this.lightbox.close()
  }
}
