export interface IAddClinic {
  ClinicName: string
  Phone: string
  Address: string
}

export interface IClinic {
  clinicID: number
  clinicName: string
  phone: string
  address: string
  appointments: string[]
}
