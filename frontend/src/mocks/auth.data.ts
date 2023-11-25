import { FormItemPropsType } from '@/@types/form'
import { DateOfBirthIcon, GmailIcon, LockIcon, UserIcon } from '@/components/Icons'

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
