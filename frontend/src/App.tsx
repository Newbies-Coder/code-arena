import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loading from '@components/Loading'
import { globalRoute, privateRoute, publicRoute } from './routes/routes'
import PrivateRoute from './components/PrivateRoute'

import MainHomeUser from './container/Home/pages/MainHomeUser/MainHomeUser'
import AdminRoute from './routes/AdminRoute'

const App = () => {
  // const checkRefreshToken = () => {
  //   const refreshToken = getCookie(REFRESH_TOKEN)
  //   if (!refreshToken || isExpired(refreshToken)) {
  //     clearStore(ACCESS_TOKEN)
  //     navigate('/login')
  //   }
  //   return
  // }
  // useEffect(() => {
  //   checkRefreshToken()
  // }, [])

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
