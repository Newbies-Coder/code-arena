import { CourseType, FriendType, MenuType, ProfileMenuType } from '@/@types/home'
import {
  BackendIcon,
  CircleHexIcon,
  ContactIcon,
  CyanLineIcon,
  DesignIcon,
  FrontendIcon,
  HomeIcon,
  LibraryIcon,
  MessageFilledIcon,
  NewsIcon,
  PinkLineIcon,
  PurpleLineIcon,
  SelectedHomeIcon,
  SelectedLibraryIcon,
  SelectedNewsIcon,
  SelectedStoreIcon,
  StarIcon,
  StoreIcon,
  YellowLineIcon,
} from '@/components/Icons'
import { BG } from '@/constants/images'

export const courseList: CourseType[] = [
  {
    id: 0,
    bgImage: BG.APP_BG,
    Icon: FrontendIcon,
    progressPercent: 90,
    title: 'FRONTEND',
    description: "Beginner's Guide to Becoming a Professional Front-End Developer",
  },
  {
    id: 1,
    bgImage: BG.APP_BG,
    Icon: DesignIcon,
    progressPercent: 50,
    title: 'UI/UX DESIGN',
    description: 'Optimizing User Experience with The Best UI/UX Desgin',
  },
  {
    id: 2,
    bgImage: BG.APP_BG,
    Icon: BackendIcon,
    progressPercent: 50,
    title: 'BACKEND',
    description: "Beginner's Guide to Becoming a Professional Front-End Developer",
  },
  {
    id: 3,
    bgImage: BG.APP_BG,
    Icon: FrontendIcon,
    progressPercent: 90,
    title: 'FRONTEND',
    description: "Beginner's Guide to Becoming a Professional Front-End Developer",
  },
  {
    id: 4,
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
  { key: 3, name: 'Anne Couture', status: 'offline' },
  { key: 4, name: 'Anne Couture', status: 'online' },
  { key: 5, name: 'Anne Couture', status: 'online' },
  { key: 6, name: 'Anne Couture', status: 'online' },
  { key: 7, name: 'Anne Couture', status: 'online' },
  { key: 8, name: 'Anne Couture', status: 'online' },
]

export const menuItems: MenuType[] = [
  {
    key: 0,
    label: 'Home',
    Icon: HomeIcon,
    IconActive: SelectedHomeIcon,
    LineIcon: CyanLineIcon,
    color: 'bg-teal-400',
    active: true,
  },
  {
    key: 1,
    label: 'News',
    Icon: NewsIcon,
    IconActive: SelectedNewsIcon,
    LineIcon: PinkLineIcon,
    color: 'bg-pink-600',
    active: true,
  },
  {
    key: 2,
    label: 'Library',
    Icon: LibraryIcon,
    IconActive: SelectedLibraryIcon,
    LineIcon: YellowLineIcon,
    color: 'bg-yellow-500',
    active: true,
  },
  {
    key: 3,
    label: 'Store',
    Icon: StoreIcon,
    IconActive: SelectedStoreIcon,
    LineIcon: PurpleLineIcon,
    color: 'bg-purple-700',
    active: true,
  },
]

export const ProfileMenuItems: ProfileMenuType[] = [
  { key: 0, label: 'Dashboard', Icon: CircleHexIcon },
  { key: 1, label: 'Contacts', Icon: MessageFilledIcon },
  { key: 2, label: 'Watchlist', Icon: ContactIcon },
  { key: 3, label: 'Message', Icon: StarIcon },
]
