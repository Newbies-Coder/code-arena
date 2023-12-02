import * as ReactDOM from 'react-dom/client'
import '@/index.scss'
import 'normalize.css'
import 'antd/dist/reset.css'
import { unstable_HistoryRouter as HistoryBrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { store } from '@redux/config'
import MainHome from './container/Home/pages/MainHome'
import { ConfigProvider } from 'antd'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
export const history: any = createBrowserHistory()

root.render(
  <Provider store={store}>
    <HistoryBrowserRouter history={history}>
      <ConfigProvider
        theme={{
          components: {
            Dropdown: {
              colorBgElevated: 'rgba(255, 255, 255, 0.20)',
              algorithm: true,
              colorText: '#fff',
              controlItemBgActiveHover: '#fff',
            },
          },
        }}
      >
        <MainHome />
      </ConfigProvider>
    </HistoryBrowserRouter>
  </Provider>,
)
