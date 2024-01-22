import { Suspense, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { publicRoute } from './routes'
import Loading from '@components/Loading'
import { privateRoute } from './routes/routes'
import { useTestTokenMutation } from './apis/api'
import { useSelector } from 'react-redux'
import { RootState } from './redux/config'

const App = () => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin)
  const [testToken] = useTestTokenMutation()
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const res = await testToken({})

      if ('data' in res) {
        const { role } = res.data.data
        if (role === 'Admin') setIsAdmin(true)
        else navigate('/login')
      }
    })()
  }, [isLogin])

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
