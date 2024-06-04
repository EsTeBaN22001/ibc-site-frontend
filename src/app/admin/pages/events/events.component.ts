import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { EventsService } from '../../../services/events.service'
import { Event } from '../../../interfaces/event'
import { CommonModule } from '@angular/common'
import { TimePipe } from '../../../pipes/time.pipe'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule, TimePipe, RouterLink],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Título', 'Fecha inicio', 'Fecha fin', 'Hora inicio', 'Hora fin', 'Ubicación', 'Precio']
  events: Event[] = []
  dataSource = new MatTableDataSource<Event>(this.events)

  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private eventService: EventsService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(res => {
      this.events = res
      this.dataSource = new MatTableDataSource<Event>(this.events)
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Eventos por página'
  }
}
