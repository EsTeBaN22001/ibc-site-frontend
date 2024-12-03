import { Component, OnInit } from '@angular/core'
import { EventsService } from '../../../services/events.service'
import { Event } from '../../../interfaces/event'
import { CommonModule } from '@angular/common'
import { TimePipe } from '../../../pipes/time.pipe'

@Component({
  selector: 'app-events-cards',
  standalone: true,
  imports: [CommonModule, TimePipe],
  templateUrl: './events-cards.component.html',
  styleUrl: './events-cards.component.scss'
})
export class EventsCardsComponent implements OnInit {
  events: Event[] = []
  isLoading: boolean = true

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe({
      next: events => {
        this.events = events
        this.isLoading = false
      },
      error: err => {
        this.isLoading = false
      }
    })
  }
}
