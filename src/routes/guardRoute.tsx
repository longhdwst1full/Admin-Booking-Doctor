import { Navigate } from 'react-router-dom'
import { getAuthLocalData } from '~/configs/token'
interface Props {
  JSX: () => JSX.Element
}

export const GuardAccount = ({ JSX }: Props) => {
  const getAuth = getAuthLocalData()

  return getAuth?.user ? <JSX /> : <Navigate to='/dashboard' />
}
