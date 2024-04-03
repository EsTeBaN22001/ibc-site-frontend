import { Routes } from '@angular/router'
import { IndexComponent } from './pages/index/index.component'
import { LayoutComponent } from './layout/layout.component'
import { EventsComponent } from './pages/events/events.component'
import { MinistriesComponent } from './pages/ministries/ministries.component'
import { PreachingsComponent } from './pages/preachings/preachings.component'
import { ContactComponent } from './pages/contact/contact.component'

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'eventos',
        component: EventsComponent
      },
      {
        path: 'ministerios',
        component: MinistriesComponent
      },
      {
        path: 'predicas',
        component: PreachingsComponent
      },
      {
        path: 'contacto',
        component: ContactComponent
      },
      {
        path: '',
        component: IndexComponent
      }
    ]
  }
]
