import { routeTypes } from '@/@types/global.type'

const routes: routeTypes = {
  home: '/',
  profile: '/profile',
  login: '/login',
  register: '/register',
  newPassword: 'new-password',
  forgotPassword: '/forgot-password',
  verification: '/verification',
  congratulation: '/congratulation',
  passwordResetSuccess: '/password-reset-success',
  notFound: '*',
  detailCoding: '/detail-coding',
  admin: {
    home: '/admin/dashboard',
    login: '/admin/login',
    resetPassword: '/admin/reset-password',
    createNewPassword: '/admin/create-new-password',
    profile: '/admin/profile',
    user: '/admin/user',
    course: '/admin/course',
    message: '/admin/message',
    addUser: '/admin/user/add',
    updateUser: '/admin/user/update/:userID',
    loginInfo: '/admin/user/login-info',
    banner: '/admin/banner',
    addBanner: '/admin/add-banner',
    updateBanner: '/admin/update-banner',
  },
} as const

export default routes
