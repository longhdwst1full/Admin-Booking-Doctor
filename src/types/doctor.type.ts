import { IAppointmentHistory } from './appointment'

export interface IAddDoctor {
  specialtyID: string
  doctorName: string
  password: string
  email: string
}
export interface IGellAllDoctor {
  id: string
  doctorName: string
  specialty: string
}

export interface IPostDoctorResponse {
  doctorId: string
  doctorName: string
  email: string
  specialty: any
  // Specialty: Specialties
}

export interface IDoctor {
  doctorId: number
  doctorName: string
  specialtyID: number
  specialtyName: string
  specialty: string
  appointments: string[]
  appointmentHistories: IAppointmentHistory[]
}
