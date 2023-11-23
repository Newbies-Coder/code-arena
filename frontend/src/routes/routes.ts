import React from 'react'
import config from '@config/index'

const HomePage = React.lazy(() => import('@container/Home/pages/MainHome'))
const LoginPage = React.lazy(() => import('@container/Auth/pages/Login'))
const RegisterPage = React.lazy(() => import('@container/Auth/pages/Register'))
const ForgotPasswordPage = React.lazy(() => import('@container/Auth/pages/ForgotPassword'))
const NewPasswordPage = React.lazy(() => import('@container/Auth/pages/NewPassword'))
const VerificationPage = React.lazy(() => import('@container/Auth/pages/Verification'))
const CongratulationPage = React.lazy(() => import('@components/Congratulation'))
const PasswordResetSuccessPage = React.lazy(() => import('@container/Auth/pages/ForgotPassword'))
const NotFoundPage = React.lazy(() => import('@components/NotFound'))

const publicRoute = [
  {
    path: config.routes.home,
    component: HomePage,
  },
  {
    path: config.routes.login,
    component: LoginPage,
  },
  {
    path: config.routes.register,
    component: RegisterPage,
  },
  {
    path: config.routes.newPassword,
    component: NewPasswordPage,
  },
  {
    path: config.routes.forgotPassword,
    component: ForgotPasswordPage,
  },
  {
    path: config.routes.verification,
    component: VerificationPage,
  },
  {
    path: config.routes.congratulation,
    component: CongratulationPage,
  },
  {
    path: config.routes.passwordResetSuccess,
    component: PasswordResetSuccessPage,
  },
  {
    path: config.routes.notFound,
    component: NotFoundPage,
    layout: null,
  },
]

export { publicRoute }
