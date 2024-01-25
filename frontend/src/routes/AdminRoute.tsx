import { RootState } from '@/redux/config'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AdminRoute = () => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin)
  !isAdmin ? toast('You do not have permission to access this resource', { autoClose: 1000 }) : null
  return isAdmin ? <Outlet /> : <Navigate to="/" />
}
export default AdminRoute
