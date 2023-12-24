import { ToastifyType } from '@/@types/home'
import CustomedButton from '@/container/Detail/components/CustomedButton'
import { PlayCircleOutlined } from '@ant-design/icons'
import { Button, notification } from 'antd'

const ToastifyMessage: React.FC<ToastifyType> = ({ title, description, type, onButtonClick }) => {
  const [api, contextHolder] = notification.useNotification()

  const openNotificationWithIcon = () => {
    api[type]({
      message: title,
      description: description,
    })
    if (onButtonClick) {
      onButtonClick(type)
    }
  }

  return (
    <>
      {contextHolder}
      <CustomedButton
        label="RUN CODE"
        Icon={PlayCircleOutlined}
        classNameButton="border-0"
        classNameIcon="text-2xl font-popins"
        onClick={openNotificationWithIcon}
      />
    </>
  )
}

export default ToastifyMessage
