import * as ReactDOM from 'react-dom/client'
import '@/index.scss'
import 'normalize.css'
import 'antd/dist/reset.css'
import App from '@/App'
import { unstable_HistoryRouter as HistoryBrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { store } from '@redux/config'
import Verification from './container/Auth/pages/Verification'
import PasswordCongratulation from './components/PasswordCongratulation'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
export const history: any = createBrowserHistory()

root.render(
  <Provider store={store}>
    <HistoryBrowserRouter history={history}>
      <Verification />
    </HistoryBrowserRouter>
  </Provider>,
)
