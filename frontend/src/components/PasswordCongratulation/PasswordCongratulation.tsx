import { BG, LOGO, RESULT_ICON } from '@/constants/images'
import { Button, Col, Form, Row } from 'antd'
import { Link } from 'react-router-dom'

const PasswordCongratulation = () => {
  return (
    <Row className="min-h-screen">
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        lg={{ span: 12 }}
        className="py-8 flex justify-center relative items-stretch"
      >
        <div className="mx-4 mt-16 lg:w-[500px]">
          <Link
            to={'/'}
            className="absolute top-2 left-2 w-14 h-14 rounded-full bg-gray-300 flex justify-center items-center border-none"
          >
            <img src={LOGO.APP_LOGO} alt="logo" />
          </Link>
          <div className="flex justify-center items-center h">
            <img
              src={RESULT_ICON.SUCCESSFULY}
              alt="reset-successful"
              className="w-full h-full sm:h-80 object-contain"
            />
          </div>
          <h2 className="text-black clear-both font-smooch text-5xl font-bold not-italic text-center mb-3">
            Password reset successful!
          </h2>
          <p className="text-black font-popins text-base mt-2 mb-10 text-center font-medium">
            Congratulations! You have successfully completed all of the steps for this verification process.
          </p>
          <Form name="basic" className="mt-3 w-full">
            <Form.Item>
              <Button
                htmlType="submit"
                className="mt-2 w-full h-14 bg-black text-white text-lg font-bold rounded-xl border-0"
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
      <Col xs={{ span: 0 }} sm={{ span: 0 }} lg={{ span: 12 }}>
        <img src={BG.APP_BG} alt="boys" className="w-full h-screen object-cover" />
      </Col>
    </Row>
  )
}

export default PasswordCongratulation
