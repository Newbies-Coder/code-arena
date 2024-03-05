import { ChatType } from '@/@types/chat.type'

export const ChatMessage: ChatType[] = [
  {
    type: 'msg',
    message: 'Hey Alex which one do you think better image ',
    incoming: true,
    outgoing: false,
  },
  {
    type: 'msg',
    message: 'Can you show me all the photos you have?',
    incoming: false,
    outgoing: true,
  },
  {
    type: 'msg',
    message: 'OK nice!',
    incoming: false,
    outgoing: true,
  },
  {
    type: 'msg',
    message: 'Hey Alex which one do you think better image  ',
    incoming: false,
    outgoing: true,
  },
  {
    type: 'msg',
    message: 'OK!',
    incoming: true,
    outgoing: false,
  },
  {
    type: 'msg',
    message: 'OK nice!',
    incoming: false,
    outgoing: true,
  },
  {
    type: 'msg',
    message: 'I will use it as my profile picture',
    incoming: false,
    outgoing: true,
  },
]
