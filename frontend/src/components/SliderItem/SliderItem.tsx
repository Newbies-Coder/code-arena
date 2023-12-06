import { Button, Card, Carousel, Progress, Space } from 'antd'
import { FrontendIcon, HeartIcon, LeftArrowIcon, PlayIcon, RedHeartIcon, RightArrowIcon } from '../Icons'
import { BG } from '@/constants/images'
import { useState } from 'react'
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  prevArrow: (
    <Button className="flex justify-center items-center border-0 h-10 w-10 p-0 rounded-full">
      <LeftArrowIcon />
    </Button>
  ),
  nextArrow: (
    <Button className="flex justify-center items-center border-0 h-10 w-10 p-0 rounded-full">
      <RightArrowIcon />
    </Button>
  ),
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
      <div>
        <Card
          hoverable
          className="border-2 bg-blue-900 border-gray-opacity w-56 hover:border-gray-500"
          style={{ width: '100%', marginLeft: '4px', marginRight: '4px' }}
        >
          <img src={BG.APP_BG} alt="" className="relative rounded-2xl object-cover h-40 w-full" />
          <Button
            className="absolute z-10 p-0 border-0 flex justify-center items-center bg-gray-opacity w-8 h-8 rounded-full top-8 right-8 "
            onClick={handleLike}
          >
            {liked ? <RedHeartIcon /> : <HeartIcon />}
          </Button>
          <Button className="absolute z-10 bg-white w-12 h-12 rounded-full lg:bottom-28 lg:right-10 xs:right-8 xs:bottom-36">
            <PlayIcon className="ml-1" />
          </Button>
          <div>
            <div className="flex items-center pt-2">
              <FrontendIcon />
              <span className="text-teal-400 pl-2 text-xs">FRONT END</span>
            </div>
            <Progress
              percent={90}
              status="active"
              strokeColor={{ from: '#108ee9', to: '#87d068' }}
              trailColor="white"
            />
            <p className="text-white font-popins text-sm ">
              Beginner's Guide to Becoming a Professional Front-End Developer
            </p>
          </div>
        </Card>
      </div>
      <div>
        <Card
          hoverable
          className="border-2 bg-blue-900 border-gray-opacity w-56 hover:border-gray-500"
          style={{ width: '100%', marginLeft: '4px', marginRight: '4px' }}
        >
          <img src={BG.APP_BG} alt="" className="relative rounded-2xl object-cover h-40 w-full" />
          <Button
            className="absolute z-10 p-0 border-0 flex justify-center items-center bg-gray-opacity w-8 h-8 rounded-full top-8 right-8 "
            onClick={handleLike}
          >
            {liked ? <RedHeartIcon /> : <HeartIcon />}
          </Button>
          <Button className="absolute z-10 bg-white w-12 h-12 rounded-full lg:bottom-28 lg:right-10 xs:right-8 xs:bottom-36">
            <PlayIcon className="ml-1" />
          </Button>
          <div>
            <div className="flex items-center pt-2">
              <FrontendIcon />
              <span className="text-teal-400 pl-2 text-xs">FRONT END</span>
            </div>
            <Progress
              percent={50}
              status="active"
              strokeColor={{ from: '#108ee9', to: '#87d068' }}
              trailColor="white"
            />
            <p className="text-white font-popins text-sm ">
              Beginner's Guide to Becoming a Professional Front-End Developer
            </p>
          </div>
        </Card>
      </div>
      <div>
        <Card
          hoverable
          className="border-2 bg-blue-900 border-gray-opacity w-56 hover:border-gray-500"
          style={{ width: '100%', marginLeft: '4px', marginRight: '4px' }}
        >
          <img src={BG.APP_BG} alt="" className="relative rounded-2xl object-cover h-40 w-full" />
          <Button
            className="absolute z-10 p-0 border-0 flex justify-center items-center bg-gray-opacity w-8 h-8 rounded-full top-8 right-8 "
            onClick={handleLike}
          >
            {liked ? <RedHeartIcon /> : <HeartIcon />}
          </Button>
          <Button className="absolute z-10 bg-white w-12 h-12 rounded-full lg:bottom-28 lg:right-10 xs:right-8 xs:bottom-36">
            <PlayIcon className="ml-1" />
          </Button>
          <div>
            <div className="flex items-center pt-2">
              <FrontendIcon />
              <span className="text-teal-400 pl-2 text-xs">FRONT END</span>
            </div>
            <Progress
              percent={90}
              status="active"
              strokeColor={{ from: '#108ee9', to: '#87d068' }}
              trailColor="white"
            />
            <p className="text-white font-popins text-sm ">
              Beginner's Guide to Becoming a Professional Front-End Developer
            </p>
          </div>
        </Card>
      </div>
      <div>
        <Card
          hoverable
          className="border-2 bg-blue-900 border-gray-opacity w-56 hover:border-gray-500"
          style={{ width: '100%', marginLeft: '4px', marginRight: '4px' }}
        >
          <img src={BG.APP_BG} alt="" className="relative rounded-2xl object-cover h-40 w-full" />
          <Button
            className="absolute z-10 p-0 border-0 flex justify-center items-center bg-gray-opacity w-8 h-8 rounded-full top-8 right-8 "
            onClick={handleLike}
          >
            {liked ? <RedHeartIcon /> : <HeartIcon />}
          </Button>
          <Button className="absolute z-10 bg-white w-12 h-12 rounded-full lg:bottom-28 lg:right-10 xs:right-8 xs:bottom-36">
            <PlayIcon className="ml-1" />
          </Button>
          <div>
            <div className="flex items-center pt-2">
              <FrontendIcon />
              <span className="text-teal-400 pl-2 text-xs">FRONT END</span>
            </div>
            <Progress
              percent={100}
              status="active"
              strokeColor={{ from: '#108ee9', to: '#87d068' }}
              trailColor="white"
            />
            <p className="text-white font-popins text-sm ">
              Beginner's Guide to Becoming a Professional Front-End Developer
            </p>
          </div>
        </Card>
      </div>
      <div>
        <Card
          hoverable
          className="border-2 bg-blue-900 border-gray-opacity w-56 hover:border-gray-500"
          style={{ width: '100%', marginLeft: '4px', marginRight: '4px' }}
        >
          <img src={BG.APP_BG} alt="" className="relative rounded-2xl object-cover h-40 w-full" />
          <Button
            className="absolute z-10 p-0 border-0 flex justify-center items-center bg-gray-opacity w-8 h-8 rounded-full top-8 right-8 "
            onClick={handleLike}
          >
            {liked ? <RedHeartIcon /> : <HeartIcon />}
          </Button>
          <Button className="absolute z-10 bg-white w-12 h-12 rounded-full lg:bottom-28 lg:right-10 xs:right-8 xs:bottom-36">
            <PlayIcon className="ml-1" />
          </Button>
          <div>
            <div className="flex items-center pt-2">
              <FrontendIcon />
              <span className="text-teal-400 pl-2 text-xs">FRONT END</span>
            </div>
            <Progress
              percent={90}
              status="active"
              strokeColor={{ from: '#108ee9', to: '#87d068' }}
              trailColor="white"
            />
            <p className="text-white font-popins text-sm ">
              Beginner's Guide to Becoming a Professional Front-End Developer
            </p>
          </div>
        </Card>
      </div>
    </Carousel>
  )
}

export default SliderItem
