import { Avatar, Button, Card, Carousel, CarouselProps } from 'antd'
import './style.scss'
import Fancybox from '@/components/Fancybox'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '@/redux/config'
import requestApi from '@/utils/interceptors'
import { toast } from 'react-toastify'
import { setIsFollow } from '@/redux/userReducer/userReducer'
import { useEffect } from 'react'
import { userType } from '@/@types/user.type'

const MemberList = () => {
  const notFollowList = useSelector((state: RootState) => state.user.notFollowList)
  const isFollow = useSelector((state: RootState) => state.user.isFollow)
  const unfollow = useSelector((state: RootState) => state.user.unfollow)
  const dispatch: DispatchType = useDispatch()
  const slidesToShow = Math.min(4, notFollowList.length)
  const settings: CarouselProps = {
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
  }
  const handleFollowUser = async (_id: string) => {
    try {
      const res = await requestApi(`users/follow/${_id}`, 'POST', {})
      toast.success(res.data.message, { autoClose: 3000 })
      dispatch(setIsFollow(true))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {}, [isFollow, unfollow, notFollowList])

  return (
    <Carousel {...settings} style={{ width: '100%' }} arrows={false} draggable>
      {notFollowList.map((user: userType) => (
        <div className="slide-item p-3 rounded-lg shadow-md" key={user._id}>
          <Card
            className=" border-2 bg-blue-900 border-gray-opacity w-56 hover:border-gray-500 rounded-lg"
            style={{ height: '100%' }}
            bodyStyle={{ height: '100%', padding: 0 }}
          >
            <Fancybox>
              <a
                href={
                  user.avatar === ''
                    ? 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    : user.avatar
                }
                data-fancybox="gallery"
              >
                <Avatar
                  shape="square"
                  src={
                    user.avatar === ''
                      ? 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                      : user.avatar
                  }
                  className="cursor-pointer w-full h-40"
                />
              </a>
            </Fancybox>
            <div className="p-3">
              <h3 className="text-white font-popins text-base">{user.username}</h3>
              <Button
                className="text-white font-popins w-full bg-gray-opacity border-0"
                onClick={() => {
                  handleFollowUser(user._id)
                  dispatch(setIsFollow(false))
                }}
              >
                Follow
              </Button>
            </div>
          </Card>
        </div>
      ))}
    </Carousel>
  )
}

export default MemberList
