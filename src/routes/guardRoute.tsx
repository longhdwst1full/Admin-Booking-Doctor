import { getAuthLocalData } from '~/configs/token'
interface Props {
  JSX: () => JSX.Element
}

export const GuardAccount = ({ JSX }: Props) => {
  const getAuth = getAuthLocalData()

  return ['staff', 'admin'].includes(getAuth?.user?.role?.toLowerCase()) ? <JSX /> : <JSX />
  // <Navigate to={'/'} />
}
