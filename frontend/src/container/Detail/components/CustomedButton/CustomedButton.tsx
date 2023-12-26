import { ButtonType } from '@/@types/button'
import { Button } from 'antd'

const CustomedButton: React.FC<ButtonType> = ({ label, Icon, classNameButton, classNameIcon, onClick }) => {
  return (
    <Button
      className={`xl:h-16 xl:w-48 lg:w-40 md:h-14 md:w-32 bg-purple-600 rounded-full text-white md:text-sm lg:text-xl ${classNameButton}`}
      icon={Icon && <Icon className={`xl:text-2xl md:text-base ${classNameIcon}`} />}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}

export default CustomedButton
