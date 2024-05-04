import { IServices } from './services.type'

export interface IAppointment {
  appointmentId: number
  userName: string
  doctorName: string
  clinicName: string
  appointmentDate: string
  status: string
  cost: number
  service: IServices[]
}

export interface IAppointmentHistory {
  historyID: number
  appointmentID: number
  action: string
  actionDate: string
  appointment: string
}
