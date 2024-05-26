import { Component } from '@angular/core'
import { EventsCardsComponent } from '../../components/events-cards/events-cards.component'
import { EventsImagesComponent } from '../../components/events-images/events-images.component'

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [EventsCardsComponent, EventsImagesComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {}
