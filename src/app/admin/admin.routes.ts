import { Routes } from '@angular/router'
import { LayoutComponent } from './layout/layout.component'
import { IndexComponent } from './pages/index/index.component'

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: IndexComponent
      }
    ]
  }
]
