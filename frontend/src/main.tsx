import * as ReactDOM from 'react-dom/client'
import '@/index.scss'
import 'antd/dist/reset.css'
import { unstable_HistoryRouter as HistoryBrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { persistor, store } from '@redux/config'
import { ConfigProvider } from 'antd'
import App from './App'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
export const history: any = createBrowserHistory()

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <HistoryBrowserRouter history={history}>
        <ConfigProvider
          theme={{
            components: {
              Dropdown: {
                colorBgElevated: '#f2f2f2',
                algorithm: true,
                colorText: 'black',
                controlItemBgActiveHover: '#fff',
              },
              Progress: {
                colorText: '#F2F2F2',
              },
              Menu: {
                itemHoverColor: 'black',
                itemHoverBg: '#e6f4ff',
              },
              Select: {
                selectorBg: '#464D56',
              },
              Radio: {
                dotSize: 10,
              },
            },
          }}
        >
          <App />
        </ConfigProvider>
        <ToastContainer />
      </HistoryBrowserRouter>
    </PersistGate>
  </Provider>,
)
