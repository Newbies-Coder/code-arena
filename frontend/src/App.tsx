import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { publicRoute } from './routes'
import Loading from '@components/Loading'
import { privateRoute } from './routes/routes'

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {publicRoute.map((route, idx) => {
          const Page = route.component
          return <Route key={idx} path={route.path} element={<Page />}></Route>
        })}
        {privateRoute.map((route, idx) => {
          const Page = route.component
          return <Route key={idx} path={route.path} element={<Page />}></Route>
        })}
      </Routes>
    </Suspense>
  )
}

export default App
