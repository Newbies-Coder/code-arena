import React from 'react'
import config from '@config/index'

const HomePage = React.lazy(() => import('@/container/Home/pages/MainHomeUser'))
const LoginPage = React.lazy(() => import('@container/Auth/pages/Login'))
const RegisterPage = React.lazy(() => import('@container/Auth/pages/Register'))
const ForgotPasswordPage = React.lazy(() => import('@container/Auth/pages/ForgotPassword'))
const NewPasswordPage = React.lazy(() => import('@container/Auth/pages/NewPassword'))
const VerificationPage = React.lazy(() => import('@container/Auth/pages/Verification'))
const CongratulationPage = React.lazy(() => import('@components/Congratulation'))
const PasswordResetSuccessPage = React.lazy(() => import('@components/PasswordCongratulation'))
const NotFoundPage = React.lazy(() => import('@components/NotFound'))
const DetailCodingPage = React.lazy(() => import('@container/Detail/pages/MainDetail'))
const ProfilePage = React.lazy(() => import('@container/Profile/pages/MainProfile'))

const HomePageAdmin = React.lazy(() => import('@/container/Admin/Home/pages/MainHome'))
const LoginAdmin = React.lazy(() => import('@container/Admin/Auth/pages/Login'))
const ResetPasswordAdmin = React.lazy(() => import('@container/Admin/Auth/pages/ResetPassword'))
const CreateNewPasswordAdmin = React.lazy(() => import('@/container/Admin/Auth/pages/CreateNewPassword'))
const ProfileAdmin = React.lazy(() => import('@/container/Admin/Profile/pages/MainProfile'))
const UserAdmin = React.lazy(() => import('@/container/Admin/User/pages/MainUser'))
const AddUserAdmin = React.lazy(() => import('@/container/Admin/User/pages/AddAccount'))
const UpdateUserAdmin = React.lazy(() => import('@/container/Admin/User/pages/UpdateAccount'))
const LoginInfoAdmin = React.lazy(() => import('@/container/Admin/User/pages/LoginInfo'))
const CourseAdmin = React.lazy(() => import('@/container/Admin/Course/pages/MainCourse'))
const MessageAdmin = React.lazy(() => import('@/container/Admin/Message/pages/MainMessage'))
const LayoutAdmin = React.lazy(() => import('@/layout/Admin'))

const globalRoute = [
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
    path: config.routes.notFound,
    component: NotFoundPage,
    layout: null,
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
    path: config.routes.admin.login,
    component: LoginAdmin,
  },
]

const publicRoute = [
  {
    path: config.routes.newPassword,
    component: NewPasswordPage,
  },
  {
    path: config.routes.forgotPassword,
    component: ForgotPasswordPage,
  },

  {
    path: config.routes.passwordResetSuccess,
    component: PasswordResetSuccessPage,
  },
  {
    path: config.routes.detailCoding,
    component: DetailCodingPage,
  },
  {
    path: config.routes.profile,
    component: ProfilePage,
  },
]

const privateRoute = [
  {
    path: config.routes.admin.home,
    component: HomePageAdmin,
    layout: LayoutAdmin,
  },
  {
    path: config.routes.admin.resetPassword,
    component: ResetPasswordAdmin,
  },
  {
    path: config.routes.admin.createNewPassword,
    component: CreateNewPasswordAdmin,
  },
  {
    path: config.routes.admin.profile,
    component: ProfileAdmin,
    layout: LayoutAdmin,
  },
  {
    path: config.routes.admin.user,
    component: UserAdmin,
    layout: LayoutAdmin,
  },
  {
    path: config.routes.admin.addUser,
    component: AddUserAdmin,
    layout: LayoutAdmin,
  },
  {
    path: config.routes.admin.updateUser,
    component: UpdateUserAdmin,
    layout: LayoutAdmin,
  },
  {
    path: config.routes.admin.course,
    component: CourseAdmin,
    layout: LayoutAdmin,
  },
  {
    path: config.routes.admin.message,
    component: MessageAdmin,
    layout: LayoutAdmin,
  },
  {
    path: config.routes.admin.loginInfo,
    component: LoginInfoAdmin,
    layout: LayoutAdmin,
  },
]

export { publicRoute, privateRoute, globalRoute }
