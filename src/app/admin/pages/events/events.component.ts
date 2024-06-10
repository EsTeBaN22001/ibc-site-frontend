import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { EventsService } from '../../../services/events.service'
import { Event } from '../../../interfaces/event'
import { CommonModule } from '@angular/common'
import { TimePipe } from '../../../pipes/time.pipe'
import { RouterLink } from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule, TimePipe, RouterLink],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Título', 'Fecha inicio', 'Hora inicio', 'Editar', 'Eliminar']
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
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => ''
  }

  deleteEvent(id: string) {
    Swal.fire({
      title: 'Eliminar evento?',
      text: 'Esta acción no se podrá revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        this.eventService.deleteEvent(id).subscribe({
          next: res => {
            if (res.success) {
              Swal.fire({
                title: 'Eliminado',
                text: 'El evento ha sido borrado',
                icon: 'success'
              }).then(result => {
                if (result.isConfirmed) {
                  this.events = this.dataSource.data.filter(event => event.id !== parseInt(id))
                  this.dataSource.data = this.events
                }
              })
            }
          },
          error(err) {
            Swal.fire({
              title: 'Hubo un problema',
              text: 'El evento no ha sido borrado',
              icon: 'error'
            })
          }
        })
      }
    })
  }
}
