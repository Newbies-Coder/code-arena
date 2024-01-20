import { FormItemPropsType, SocialMediaType } from '@/@types/form.type'
import { DateOfBirthIcon, FacebookIcon, GmailIcon, LinkedinIcon, LockIcon, UserIcon } from '@/components/Icons'
import { SOCIAL_ICON } from '@/constants/images'

export const inputsRegister: FormItemPropsType[] = [
  {
    name: 'username',
    placeholder: 'Username',
    Icon: UserIcon,
  },
  {
    name: 'email',
    placeholder: 'Email',
    Icon: GmailIcon,
    inputType: 'email',
  },
  {
    name: 'password',
    placeholder: 'Password',
    Icon: LockIcon,
    inputType: 'password',
  },
  {
    name: 'confirm password',
    placeholder: 'Confirm Password',
    Icon: LockIcon,
    inputType: 'password',
  },
  {
    name: 'date',
    placeholder: 'yyyy/mm/dd',
    Icon: DateOfBirthIcon,
  },
]

export const inputsLogin: FormItemPropsType[] = [
  {
    name: 'email',
    placeholder: 'Email',
    Icon: GmailIcon,
    inputType: 'email',
  },
  {
    name: 'password',
    placeholder: 'Password',
    Icon: LockIcon,
    inputType: 'password',
  },
]

export const socialMediaLogin: SocialMediaType[] = [
  { key: 'gmail', url: SOCIAL_ICON.GMAIL, alt: 'gmail' },
  { key: 'facebook', icon: FacebookIcon },
  { key: 'github', url: SOCIAL_ICON.GITHUB, alt: 'github' },
  { key: 'linkedin', icon: LinkedinIcon },
]
