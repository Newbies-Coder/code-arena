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
  admin: {
    home: '/admin',
    login: '/admin/login',
    detailCoding: '/detail-coding',
  },
} as const

export default routes
