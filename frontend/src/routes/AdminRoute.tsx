import { RootState } from '@/redux/config'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin)
  return isAdmin ? <Outlet /> : <Navigate to="/" />
}
export default AdminRoute
