import { Routes } from '@angular/router'
import { LayoutComponent } from './layout/layout.component'
import { IndexComponent } from './pages/index/index.component'
import { EventsComponent } from './pages/events/events.component'
import { CreateEventsComponent } from './pages/create-events/create-events.component'

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'eventos',
        component: EventsComponent
      },
      {
        path: 'eventos/crear',
        component: CreateEventsComponent
      }
    ]
  }
]
