import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { publicRoute } from './routes'
import Loading from '@components/Loading'
import { privateRoute } from './routes/routes'
import { useSelector } from 'react-redux'
import { userState } from './@types/user.type'

const App = () => {
  const isAdmin = useSelector((state: userState) => state.isAdmin)

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {publicRoute.map((route, idx) => {
          const Page = route.component
          return <Route key={idx} path={route.path} element={<Page />}></Route>
        })}
        {isAdmin &&
          privateRoute.map((route, idx) => {
            const Page = route.component
            const Layout = route.layout
            return (
              <Route key={idx} path={route.path} element={Layout ? <Layout children={<Page />} /> : <Page />}></Route>
            )
          })}
      </Routes>
    </Suspense>
  )
}

export default App
