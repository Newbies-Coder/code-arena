import { useState } from 'react'

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const showModal = () => {
    setIsOpen(true)
  }

  const handleOk = () => {
    setIsOpen(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    showModal,
    handleOk,
    handleCancel,
  }
}

export default useModal
