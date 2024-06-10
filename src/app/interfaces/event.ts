export interface Event {
  id?: number
  title: string
  date_start: string
  date_end?: string
  time_start: string
  time_end?: string
  ubication: string
  price?: string
  aditional_info: string
  visible?: number
}

export interface ResponseDeleteEvent {
  success: boolean
  message: string
}
