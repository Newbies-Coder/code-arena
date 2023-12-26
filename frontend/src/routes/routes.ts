import React from 'react'
import config from '@config/index'

const HomePage = React.lazy(() => import('@container/Home/pages/MainHome'))
const LoginPage = React.lazy(() => import('@container/Auth/pages/Login'))
const RegisterPage = React.lazy(() => import('@container/Auth/pages/Register'))
const ForgotPasswordPage = React.lazy(() => import('@container/Auth/pages/ForgotPassword'))
const NewPasswordPage = React.lazy(() => import('@container/Auth/pages/NewPassword'))
const VerificationPage = React.lazy(() => import('@container/Auth/pages/Verification'))
const CongratulationPage = React.lazy(() => import('@components/Congratulation'))
const PasswordResetSuccessPage = React.lazy(() => import('@components/PasswordCongratulation'))
const NotFoundPage = React.lazy(() => import('@components/NotFound'))

const HomePageAdmin = React.lazy(() => import('@/container/Admin/Home/pages/MainHome'))
const LoginAdmin = React.lazy(() => import('@container/Admin/Auth/pages/Login'))

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

const privateRoute = [
  {
    path: config.routes.admin.home,
    component: HomePageAdmin,
  },
  {
    path: config.routes.admin.login,
    component: LoginAdmin,
  },
]

export { publicRoute, privateRoute }
