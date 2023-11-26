import Logo from '@assets/images/logo/logo.png'
import Background from '@assets/images/background/background_image.svg'
import ResetSuccesfully from '@assets/images/svg/resetpassword.svg'
import Congratulation from '@assets/images/congratulation.png'
import GithubIcon from '@assets/images/svg/github.svg'
import FacebookIcon from '@assets/images/svg/facebook.svg'
import LinkedinIcon from '@assets/images/svg/linkedin.svg'
import UserIcon from '@assets/images/svg/user.svg'
import HiddenEyeIcon from '@assets/images/svg/hiddenEyePassword.svg'
import ShowEyeIcon from '@assets/images/svg/showEyePassword.svg'
import dateOfBirthIcon from '@assets/images/svg/dateOfBirth.svg'
import lockIcon from '@assets/images/svg/lock.svg'
import userIcon from '@assets/images/svg/user.svg'
import noAvatarImage from '@assets/images/svg/no-image.svg'
import Google from '@assets/images/svg/google.svg'

export const LOGO = {
  APP_LOGO: Logo,
}
export const BG = {
  APP_BG: Background,
}

export const SYS = {
  ICON: {
    SUCCESS: Congratulation,
  },
  IMAGE: {
    NO_AVATAR: noAvatarImage,
  },
}

export const GLOBAL_ICON = {
  LOCK: lockIcon,
}

export const SOCIAL_ICON = {
  GMAIL: Google,
  GITHUB: GithubIcon,
  FACEBOOK: FacebookIcon,
  LINKEDIN: LinkedinIcon,
}

export const LOGIN_ICON = {
  USER: UserIcon,
  HIDDEN_EYE: HiddenEyeIcon,
  SHOW_EYE: ShowEyeIcon,
}

export const REGISTER_ICON = {
  DATE_OF_BIRTH: dateOfBirthIcon,
  USER: userIcon,
}

export const RESULT_ICON = {
  SUCCESSFULY: ResetSuccesfully,
}
