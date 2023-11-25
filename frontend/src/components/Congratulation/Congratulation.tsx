import { LOGO, SYS } from '@/constants/images'
import { Button, Col, Row } from 'antd'
import { Link } from 'react-router-dom'

const Congratulation = () => {
  return (
    <Row className="min-h-screen register">
      <Col sm={{ span: 24 }} lg={{ span: 12 }} className="px-8 sm:px-20 py-20 flex justify-center relative">
        <div className="flex flex-col items-center">
          <Link
            to={'/'}
            className="absolute top-2 left-2 w-14 h-14 rounded-full bg-gray-300 flex justify-center items-center border-none"
          >
            <img src={LOGO.APP_LOGO} alt="logo" className="object-cover" />
          </Link>
          <div className="h-[400px] flex justify-center">
            <img src={SYS.ICON.SUCCESS} alt="logo" />
          </div>
          <h2 className="text-black clear-both font-smooch text-4xl sm:text-6xl font-bold not-italic text-center -mt-12">
            Congratulations!
          </h2>
          <p className="text-black text-base text-center font-normal font-popins leading-6 mx-2">
            Congratulations! You have successfully completed all the steps for this verification process.
          </p>
          <Link to={'/'}>
            <Button className="mt-11 w-60 sm:w-80 h-14 bg-black text-white text-base font-bold rounded-xl border-0">
              Back to home
            </Button>
          </Link>
        </div>
      </Col>
      <Col xs={{ span: 0 }} lg={{ span: 12 }} className="min-h-screen">
        <img src="https://i.imgur.com/en3BKmy.png" alt="boys" className="w-full h-screen" />
      </Col>
    </Row>
  )
}

export default Congratulation
