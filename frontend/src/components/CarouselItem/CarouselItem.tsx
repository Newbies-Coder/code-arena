import { Carousel } from 'antd'
import './style.scss'
import { useEffect, useState } from 'react'
import requestApi from '@/utils/interceptors'
const contentStyle: React.CSSProperties = {
  color: '#fff',
  borderRadius: '20px',
  objectFit: 'cover',
  height: '300px',
  width: '100%',
}

type bannerType = {
  created_at: string
  description: string
  slug: string
  update_at: string
  url: string
  user_id: string
  _destroy: boolean
  _id: string
}

const CarouselItem = () => {
  const [imgArray, setImgArray] = useState<bannerType[]>([])
  useEffect(() => {
    ;(async () => {
      try {
        const res = await requestApi('banners', 'GET', {})
        const { items } = res.data.data
        setImgArray(items)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  return (
    <Carousel autoplay>
      {imgArray.map((item) => {
        return (
          <div key={item._id}>
            <img style={contentStyle} src={item.url} />
          </div>
        )
      })}
    </Carousel>
  )
}

export default CarouselItem
