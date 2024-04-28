import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import PlusIcon from '../Icons/PlusIcon'

interface BreadcrumbProps {
  pageName: string
  openDrawer?: () => void
}
const Breadcrumb = ({ pageName, openDrawer }: BreadcrumbProps) => {
  return (
    <div className='mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
      <nav>
        <ol className='flex items-center gap-2'>
          <li>
            <Link to='/dashboard'>Dashboard /</Link>
          </li>
          <li className='text-primary'>{pageName}</li>
        </ol>
      </nav>
      <>
        <Button icon={<PlusIcon />} onClick={openDrawer}>
          Thêm
        </Button>
      </>
    </div>
  )
}

export default Breadcrumb
