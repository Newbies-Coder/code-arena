import { Suspense, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Loading from '@components/Loading'
import { globalRoute, privateRoute, publicRoute } from './routes/routes'
import MainHomeUser from './container/Home/pages/MainHomeUser/MainHomeUser'
import AdminRoute from './routes/AdminRoute'
import { ACCESS_TOKEN, REFRESH_TOKEN, clearCookie, clearStore, getCookie, getStore, setStore } from './utils/setting'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { authAction } from './redux/userReducer/userReducer'
import PrivateRoute from './routes/PrivateRoute'

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
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const checkAuthen = async () => {
    const refreshToken = getCookie(REFRESH_TOKEN)
    const accessToken = getStore(ACCESS_TOKEN)

    if (refreshToken && accessToken) {
      const decodedAccessToken = jwtDecode<UserType>(accessToken)
      const decodedRefreshToken = jwtDecode<UserType>(refreshToken)
      const current = Math.floor(Date.now() / 1000)

      if (+current > +decodedRefreshToken.exp && +current > +decodedAccessToken.exp) {
        clearCookie(REFRESH_TOKEN)
        clearStore(ACCESS_TOKEN)
        dispatch(authAction(false))
        alert('login session expired')
        navigate('/login')
      }
    }
  }

  useEffect(() => {
    checkAuthen()
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
