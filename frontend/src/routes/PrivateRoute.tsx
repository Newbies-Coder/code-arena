import { RootState } from '@/redux/config'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
