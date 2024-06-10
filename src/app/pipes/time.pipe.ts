import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {
  transform(value: string, format: string = 'shortTime') {
    if (!value) return ''

    const [hours, minutes, seconds] = value.split(':').map(Number)
    const date = new Date()
    date.setHours(hours, minutes, seconds)

    const locale = 'es'
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit'
    }
    return date.toLocaleTimeString(locale, options) + ' hs'
  }
}
