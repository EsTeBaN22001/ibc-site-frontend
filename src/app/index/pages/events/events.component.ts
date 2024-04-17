import { Component } from '@angular/core'
import { LightboxModule, Lightbox } from 'ngx-lightbox'

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [LightboxModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  albums: any = []

  constructor(private lightbox: Lightbox) {
    for (let i = 1; i <= 4; i++) {
      const src = 'assets/carrousel-index/grupo-hombres.webp'
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
