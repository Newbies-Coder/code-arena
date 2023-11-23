import { Suspense } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { publicRoute } from './routes'
import Loading from './components/Loading'

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {publicRoute.map((route, idx) => {
            const Page = route.component
            return <Route key={idx} path={route.path} element={<Page />}></Route>
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
