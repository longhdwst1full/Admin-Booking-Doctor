import { IAppointment } from "./appointment"
import { IServices } from "./services.type"

export interface IAddClinic {
  clinicName: string
  phone: string
  address: string
}

export interface IClinic {
  clinicID: number
  clinicName: string
  phone: string
  address: string
  appointments: IAppointment[]
  services: IServices[]
}
