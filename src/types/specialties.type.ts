import { IAppointment, IAppointmentHistory } from './appointment'
import { IDoctor } from './doctor.type'

export interface CreateSpecialty {
  specialtyName: string
}
export interface PostSpecialtyResponse {
  specialtyId: string
  specialtyName: string
}
export interface ResponeDoctorInSpec {
  idSpe: string
  nameSpe: string
  idDoctor: string
  nameDoctor: string
  emailDoctor: string
}

export interface ISpecialty {
  specialtyID: string
  schedule:string
  specialtyName: string
  appointments: IAppointment[]
  appointmentHistories: IAppointmentHistory[]
  doctors: IDoctor[]
}
