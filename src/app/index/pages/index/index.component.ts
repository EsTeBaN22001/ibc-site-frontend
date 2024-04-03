import { Component, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, OnInit } from '@angular/core'
import { indexCarrouselItem, indexCarrouselItems } from '../../../interfaces/index-carrousel-items'
import { register } from 'swiper/element/bundle'
import { VideosYTService } from '../../../services/videos-yt.service'
import { DatePipe, registerLocaleData } from '@angular/common'
import localePy from '@angular/common/locales/es-PY'
registerLocaleData(localePy, 'es')
register()

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  indexCarrouselItems: indexCarrouselItem[] = indexCarrouselItems
  ytVideoItems!: any

  constructor(private ytService: VideosYTService) {}

  ngOnInit(): void {
    this.ytService.getLast3Videos().subscribe(res => {
      this.ytVideoItems = res.items
      console.log(res)
    })
  }
}
