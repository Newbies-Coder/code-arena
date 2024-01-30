import { ButtonType } from '@/@types/button.type'
import { Button } from 'antd'

const SecondaryButton: React.FC<ButtonType> = ({ label, Icon, classNameButton, classNameIcon, onClick }) => {
  return (
    <Button
      className={`xl:h-10 xl:w-24 xs:h-8 xs:w-16 md:h-10 md:w-20  bg-purple-900 rounded-full text-white xs:text-[12px] md:text-sm xl:text-base text-center font-popins mx-2${classNameButton}`}
      icon={Icon && <Icon className={`xl:text-2xl md:text-base ${classNameIcon}`} />}
      onClick={onClick}
      style={{ padding: 0, margin: '0 2px' }}
    >
      {label}
    </Button>
  )
}

export default SecondaryButton
