import { Component } from '@angular/core'
import { EventsCardsComponent } from '../../../index/components/events-cards/events-cards.component'
import { EventsImagesComponent } from '../../../index/components/events-images/events-images.component'

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [EventsCardsComponent, EventsImagesComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {}
