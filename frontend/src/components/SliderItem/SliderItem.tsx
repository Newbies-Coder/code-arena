import { Button, Card, Carousel, CarouselProps, Image, Progress } from 'antd'
import { LeftArrowIcon, PlayIcon, RightArrowIcon } from '../Icons'
import { useState } from 'react'
import { courseList } from '@/mocks/home.data'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import './style.scss'

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
  <Button
    {...props}
    className={'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')}
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    type="button"
  >
    <LeftArrowIcon />
  </Button>
)
const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
  <Button
    {...props}
    className={'slick-next slick-arrow' + (currentSlide === slideCount - 1 ? ' slick-disabled' : '')}
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
  >
    <RightArrowIcon />
  </Button>
)

const settings: CarouselProps = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  prevArrow: <SlickArrowLeft />,
  // (
  //   <Button className="flex justify-center items-center border-0 h-10 w-10 p-0 rounded-full">
  //     <LeftArrowIcon />
  //   </Button>
  // )
  nextArrow: <SlickArrowRight />,
  // (
  //   <Button className="flex justify-center items-center border-0 h-10 w-10 p-0 rounded-full">
  //     <RightArrowIcon />
  //   </Button>
  // )
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
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

const SliderItem = () => {
  const [liked, setLiked] = useState(false)
  const handleLike = () => {
    setLiked((like) => !like)
  }
  return (
    <Carousel {...settings} style={{ width: '100%' }} arrows={true} draggable>
      {courseList.map((course) => (
        <div className="p-3" key={course.id}>
          <Card
            hoverable
            className="border-2 bg-blue-900 border-gray-opacity w-56 hover:border-gray-500 rounded-xl"
            style={{ width: '100%', height: '100%' }}
            bodyStyle={{ height: '100%', padding: 0 }}
          >
            <Image
              src={course.bgImage}
              className="relative rounded-t-xl"
              style={{ objectFit: 'cover', height: '200px', width: '100%' }}
            />
            <Button
              className="absolute z-10 p-0 border-0 flex justify-center items-center bg-gray-300 w-10 h-10 rounded-full top-4 right-4 "
              onClick={handleLike}
            >
              {liked ? <HeartFilled className="text-lg text-red-600" /> : <HeartOutlined className="text-lg" />}
            </Button>
            <Button className="absolute z-10 bg-white w-12 h-12 rounded-full lg:bottom-32 lg:right-10 xs:right-8 xs:bottom-44 xss:bottom-32 ss:bottom-36 md:bottom-32 mds:bottom-40 xl:bottom-32 smm:bottom-36">
              <PlayIcon className="ml-1" />
            </Button>
            <div className="p-4">
              <div className="flex items-center pt-2">
                <course.Icon />
                <span className="text-teal-400 pl-2 text-xs">{course.title}</span>
              </div>
              <Progress
                percent={course.progressPercent}
                status="active"
                strokeColor={{ from: '#108ee9', to: '#87d068' }}
                trailColor="white"
              />
              <p className="text-white font-popins text-sm ">{course.description}</p>
            </div>
          </Card>
        </div>
      ))}
    </Carousel>
  )
}

export default SliderItem
