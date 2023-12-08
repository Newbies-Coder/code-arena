import { CourseType, FriendType } from '@/@types/course'
import { BackendIcon, DesignIcon, FrontendIcon } from '@/components/Icons'
import { BG } from '@/constants/images'

export const courseList: CourseType[] = [
  {
    bgImage: BG.APP_BG,
    Icon: FrontendIcon,
    progressPercent: 90,
    title: 'FRONTEND',
    description: "Beginner's Guide to Becoming a Professional Front-End Developer",
  },
  {
    bgImage: BG.APP_BG,
    Icon: DesignIcon,
    progressPercent: 50,
    title: 'UI/UX DESIGN',
    description: 'Optimizing User Experience with The Best UI/UX Desgin',
  },
  {
    bgImage: BG.APP_BG,
    Icon: BackendIcon,
    progressPercent: 50,
    title: 'BACKEND',
    description: "Beginner's Guide to Becoming a Professional Front-End Developer",
  },
  {
    bgImage: BG.APP_BG,
    Icon: FrontendIcon,
    progressPercent: 90,
    title: 'FRONTEND',
    description: "Beginner's Guide to Becoming a Professional Front-End Developer",
  },
  {
    bgImage: BG.APP_BG,
    Icon: FrontendIcon,
    progressPercent: 90,
    title: 'FRONTEND',
    description: "Beginner's Guide to Becoming a Professional Front-End Developer",
  },
]

export const friendList: FriendType[] = [
  { key: 1, name: 'Anne Couture', status: 'online' },
  { key: 2, name: 'Anne Couture', status: 'online' },
  { key: 3, name: 'Anne Couture', status: 'online' },
  { key: 4, name: 'Anne Couture', status: 'online' },
]
