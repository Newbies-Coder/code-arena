import { routeTypes } from '@/@types/global'

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
    home: '/admin',
    login: '/admin/login',
    resetPassword: '/admin/reset-password',
    createNewPassword: '/admin/create-new-password',
  },
} as const

export default routes
