import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { publicRoute } from './routes'
import Loading from '@components/Loading'
import { privateRoute } from './routes/routes'

const App = () => {
  const accessToken = localStorage.getItem('accessToken')
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {publicRoute.map((route, idx) => {
          const Page = route.component
          return <Route key={idx} path={route.path} element={<Page />}></Route>
        })}
        {accessToken &&
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
