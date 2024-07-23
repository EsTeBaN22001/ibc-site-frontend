import { Component, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, OnInit } from '@angular/core'
import { indexCarrouselItem, indexCarrouselItems } from '../../../interfaces/index-carrousel-items'
import { register } from 'swiper/element/bundle'
import { VideosYTService } from '../../../services/videos-yt.service'
import { DatePipe, registerLocaleData } from '@angular/common'
import localePy from '@angular/common/locales/es-PY'
import { MeetingScheduleService } from '../../../services/meeting-schedule.service'
import { MeetingSchedule } from '../../../interfaces/meeting-schedule'
import { TimePipe } from '../../../pipes/time.pipe'
registerLocaleData(localePy, 'es')
register()

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [DatePipe, TimePipe],
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
  meetingSchedule!: MeetingSchedule
  indexCarrouselItems: indexCarrouselItem[] = indexCarrouselItems
  ytVideoItems!: any

  constructor(private meetingScheduleService: MeetingScheduleService, private ytService: VideosYTService) {
    this.changeMeetingSchedule()
  }

  changeMeetingSchedule() {
    this.meetingScheduleService.getMeetingSchedule().subscribe({
      next: res => {
        let timePipe: any = new TimePipe()
        this.meetingSchedule = res
        this.indexCarrouselItems[0].date = `Domingo ${timePipe.transform(res.morning)} | ${timePipe.transform(res.afternoon)}`
        this.indexCarrouselItems[2].date = `Domingo ${timePipe.transform(res.morning)} | ${timePipe.transform(res.afternoon)}`
      }
    })
  }

  ngOnInit(): void {
    this.ytService.getLast3Videos().subscribe(res => {
      this.ytVideoItems = res
    })
  }
}
