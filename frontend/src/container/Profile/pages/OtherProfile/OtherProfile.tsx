import Fancybox from '@/components/Fancybox'
import requestApi from '@/utils/interceptors'
import { objectLength } from '@/utils/setting'
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useEffect } from 'react'

const OtherProfile = (_id: string) => {
  useEffect(() => {
    ;(async () => {
      try {
        const res = await requestApi(`users/profile/${_id}`, 'GET', {})
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <Layout className="min-h-screen overflow-hidden">
      <Layout>
        {/* <Content className="bg-blue-900">
          <div className="relative">
            <Fancybox>
              <a href={userData.cover_photo} data-fancybox="gallery">
                <img src={userData.cover_photo} alt="cover" className="xs:h-36 lg:h-44 3xl:h-80 w-full object-cover" />
              </a>
            </Fancybox>
          </div>
          <div className="relative">
            <Fancybox>
              <a href={userData.avatar} data-fancybox="gallery">
                <Avatar
                  size={{ xs: 80, sm: 90, md: 90, lg: 100, xl: 120, xxl: 140 }}
                  className="absolute xs:-top-32 lg:-top-[140px] xl:-top-[150px] xs:left-3 lg:left-32 3xl:-top-60 z-10 border-2 border-white"
                  src={userData.avatar}
                />
              </a>
            </Fancybox>
            <div className="absolute xs:-top-[85px] lg:-top-[95px] 3xl:-top-[180px] xl:-top-[95px] xs:left-28 lg:left-64 xl:left-64 3xl:left-72 z-10 font-popins text-white">
              <h2 className="text-xl">Ngoc Uyen</h2>
              <p>
                <span>{objectLength(followList)} following</span>
                <span className="ml-6">0 follower</span>
              </p>
            </div>
            <input name="image" style={{ display: 'none' }} ref={inputRef} type="file" onChange={handleFileChange} />
          </div>
        </Content> */}
      </Layout>
    </Layout>
  )
}

export default OtherProfile
