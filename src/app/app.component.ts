import { Component, LOCALE_ID } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import localeEsAr from '@angular/common/locales/es-AR'
import { registerLocaleData } from '@angular/common'

registerLocaleData(localeEsAr, 'es-AR')

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
