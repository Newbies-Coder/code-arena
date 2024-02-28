import { Attachment } from '~/models/schemas/Message.schema'
import { RoomType } from '~/models/schemas/Room.schema'

export interface CreateRoomBody {
  name: string
  type: RoomType
  members: string[]
}

export interface UpdateRoomBody {
  name: string
}

export interface MakeRoomPrivateBody {
  password: string
  confirm_password: string
}

export interface CreateInviteBody {
  recipient: string
}

export interface BanMemberBody {
  memberId: string
  due_to: string
}

export interface KickMemberBody {
  memberId: string
}
export interface PinMessageBody {
    messageId: string
}

export interface CreateMessageBody {
    content: string
    attachments: Attachment[]
}

export interface DismissMessageBody {
    due_to: string
}
