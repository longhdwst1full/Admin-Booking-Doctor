export interface IAddDoctor {
  SpecialtyID: string
  DoctorName: string
  Password: string
  Email: string
}
export interface IGellAllDoctor {
  Id: string
  DoctorName: string
  Specialty: string
}

export interface IPostDoctorResponse {
  DoctorId: string
  DoctorName: string
  Email: string
  Specialty: any
  // Specialty: Specialties
}
