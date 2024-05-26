import { Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./index/index.routes').then(m => m.routes)
    // loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.routes)
  }
]
