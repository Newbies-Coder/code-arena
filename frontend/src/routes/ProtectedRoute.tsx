import { useIsAdminMutation } from '@/apis/api'
import { RootState } from '@/redux/config'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const PrivateRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
