import { Avatar, Button, Carousel, CarouselProps, Modal } from 'antd'
import './style.scss'
import { LeftArrowIcon, RightArrowIcon } from '@/components/Icons'
import { friendList } from '@/mocks/home.data'
import { useState } from 'react'

const settings: CarouselProps = {
  autoplay: true,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

const MemberList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <Carousel {...settings} style={{ width: '100%' }} arrows={true} draggable>
      {friendList.map((course) => (
        <div className="p-3 flex justify-center items-center" key={course.key}>
          <Avatar
            size={150}
            shape="square"
            src="https://images.unsplash.com/photo-1710002211454-7fc2f66931f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            onClick={showModal}
            className="cursor-pointer"
          ></Avatar>
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
      ))}
    </Carousel>
  )
}

export default MemberList
