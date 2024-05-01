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
  appointments: string[]
}
