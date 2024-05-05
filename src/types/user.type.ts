export interface IUsers {
  id: string
  userName: string
  avatar: string
  email: string
  address: string
  phone: string
  roleName: string
  password?: string
}
// export interface IUsers {
//   id: number
//   userName: string
//   password: string
//   email: string
//   phone: number
//   roleId: number
//   role: Role
//   appointments: Appointment[]
//   appointmentHistories: AppointmentHistory4[]
// }
export interface IRole {
  id: number
  name: string
  user: string[]
}

export interface IUserDataType {
  key: string
  index: number
  avatar: string
  username: string
  account: string
  gender: string
}

export enum IRoleUser {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  STAFF = 'staff'
}

// c# res type
export interface IUserDTO {
  id: string
  userName: string
  avatar: string
  email: string
  address: string
  phone: string // Change from int to string
  roleName: string
}
export interface IUserUpdateDTO {
  userName: string
  email: string
  phone: string
  id: string
}
export interface IUpdatePassWorduserDTO {
  passWord: string
  id: string
}

export interface ICreateUser {
  Id: string
  UserName: string
  Password: string
  Email: string
  Phone: string
}
