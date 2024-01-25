import { Suspense, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Loading from '@components/Loading'
import { globalRoute, privateRoute, publicRoute } from './routes/routes'

import MainHomeUser from './container/Home/pages/MainHomeUser/MainHomeUser'
import AdminRoute from './routes/AdminRoute'
import PrivateRoute from './routes/PrivateRoute'
import { REFRESH_TOKEN, getCookie } from './utils/setting'
import { jwtDecode } from 'jwt-decode'

type UserType = {
  email: string
  exp: string
  iat: string
  role: string
  token_type: string
  username: string
  _id: string
}

const App = () => {
  const navigate = useNavigate()
  const checkRefreshToken = () => {
    const refreshToken = getCookie(REFRESH_TOKEN)
    if (refreshToken) {
      const decoded = jwtDecode<UserType>(refreshToken)
      const { exp } = decoded
      const current = Math.floor(Date.now() / 1000)
      if (+current > +exp) {
        alert('login session expired')
        navigate('/login')
      }
    }
  }
  useEffect(() => {
    checkRefreshToken()
  }, [])

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route index path="/" element={<MainHomeUser />} />
        <Route>
          {globalRoute.map((route, idx) => {
            const Page = route.component
            return <Route key={idx} path={route.path} element={<Page />}></Route>
          })}
        </Route>
        <Route element={<PrivateRoute />}>
          {publicRoute.map((route, idx) => {
            const Page = route.component
            return <Route key={idx} path={route.path} element={<Page />}></Route>
          })}
          <Route element={<AdminRoute />}>
            {privateRoute.map((route, idx) => {
              const Page = route.component
              const Layout = route.layout
              return (
                <Route key={idx} path={route.path} element={Layout ? <Layout children={<Page />} /> : <Page />}></Route>
              )
            })}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
