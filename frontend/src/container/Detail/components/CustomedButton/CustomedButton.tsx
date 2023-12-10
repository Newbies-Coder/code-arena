import { ButtonType } from '@/@types/button'
import { Button } from 'antd'

const CustomedButton: React.FC<ButtonType> = ({ label, Icon, className }) => {
  return (
    <Button
      className="h-16 w-48 bg-purple-600 rounded-full text-white text-xl"
      icon={<Icon className={`text-2xl ${className}`} />}
    >
      {label}
    </Button>
  )
}

export default CustomedButton
