import { ButtonType } from '@/@types/button'
import { Button } from 'antd'

const CustomedButton: React.FC<ButtonType> = ({ label, Icon, classNameButton, classNameIcon }) => {
  return (
    <Button
      className={`h-16 w-48 bg-purple-600 rounded-full text-white text-xl ${classNameButton}`}
      icon={Icon && <Icon className={`text-2xl ${classNameIcon}`} />}
    >
      {label}
    </Button>
  )
}

export default CustomedButton
