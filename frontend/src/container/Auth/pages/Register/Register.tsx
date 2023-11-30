import { Form, Button, Row, Col } from 'antd'
import './style.scss'
import { LOGO } from '@/constants/images'
import { Link } from 'react-router-dom'
import FormItem from '../../components/FormItem'
import { inputsRegister } from '@/mocks/auth.data'

const Register = () => {
  return (
    <Row className="min-h-screen register">
      <Col xs={{ span: 24 }} lg={{ span: 12 }} className="flex items-center justify-center relative">
        <div className="mx-4 lg:w-[450px]">
          <Link
            to={'/'}
            className="absolute top-2 left-2 w-14 h-14 rounded-full bg-gray-300 flex justify-center items-center border-none"
          >
            <img src={LOGO.APP_LOGO} alt="logo" />
          </Link>
          <h2 className="text-black clear-both font-smooch text-8xl font-bold not-italic text-center">Sign up</h2>
          <p className="text-black font-popins text-sm -mt-9 mb-10 text-center font-medium">
            Welcome to the Code Arena free coding learning page!
          </p>
          <Form name="basic" className="mt-3 w-full">
            {inputsRegister.map((input, id) => (
              <FormItem
                key={id}
                name={input.name}
                placeholder={input.placeholder}
                Icon={input.Icon}
                inputType={input.inputType}
              />
            ))}
            <Form.Item>
              <Button
                htmlType="submit"
                className="mt-8 w-full h-14 bg-black text-white text-lg font-bold rounded-xl border-0"
              >
                SIGN UP
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
      <Col xs={{ span: 0 }} lg={{ span: 12 }} className="min-h-screen">
        <img src="https://i.imgur.com/en3BKmy.png" alt="boys" className="w-full h-screen" />
      </Col>
    </Row>
  )
}

export default Register
