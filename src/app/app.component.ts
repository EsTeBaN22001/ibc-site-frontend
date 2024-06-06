import { Component, LOCALE_ID } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import localeEsAr from '@angular/common/locales/es-AR'
import { IMAGE_CONFIG, registerLocaleData } from '@angular/common'
import { MAT_DATE_LOCALE } from '@angular/material/core'

registerLocaleData(localeEsAr, 'es-AR')

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-AR' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: false,
        disableImageLazyLoadWarning: false
      }
    }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
