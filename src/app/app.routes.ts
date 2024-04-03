import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./index/index.routes').then(m => m.routes)
    // loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule)
  }
]
