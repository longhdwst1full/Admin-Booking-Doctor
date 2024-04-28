import { IClinic } from './clinic.type'
import { IDoctor } from './doctor.type'
import { IUsers } from './user.type'

export interface IAppointment {
  appointmentsId: number
  userID: number
  doctorID: number
  clinicID: number
  appointmentDate: string
  status: string
  user: IUsers
  doctor: IDoctor
  clinic: IClinic
  appointmentHistories: IAppointmentHistory[]
}

export interface IAppointmentHistory {
  historyID: number
  appointmentID: number
  action: string
  actionDate: string
  appointment: string
}
