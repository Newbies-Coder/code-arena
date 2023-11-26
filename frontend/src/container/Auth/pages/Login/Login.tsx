import { Form, Button, Row, Col, Divider } from 'antd'
import './style.scss'
import { LOGO, BG } from '@/constants/images'
import { Link } from 'react-router-dom'
import { inputsLogin, socialMediaLogin } from '@/mocks/auth.data'
import FormItem from '../../components/FormItem'
import { SocialMediaType } from '@/@types/form'

const Login = () => {
  const renderButtonContent = (button: SocialMediaType) => {
    if (button.url) {
      return <img src={button.url} alt={button.alt} className={button.key === 'github' ? 'h-11 w-11' : ''} />
    }
    if (typeof button.icon === 'function') {
      const Icon = button.icon
      return <Icon />
    }
    return null
  }
  return (
    <Row className="min-h-screen login ">
      <Col xs={{ span: 24 }} lg={{ span: 12 }} className="py-8 flex justify-center relative">
        <div className="mx-4 mt-16 lg:w-[450px]">
          <Link
            to={'/'}
            className="absolute top-2 left-2 w-14 h-14 rounded-full bg-gray-300 flex justify-center items-center border-none"
          >
            <img src={LOGO.APP_LOGO} alt="logo" />
          </Link>
          <h2 className="text-black clear-both font-smooch text-8xl font-bold not-italic text-center">Welcome</h2>
          <p className="text-black font-popins text-sm -mt-9 mb-10 text-center font-medium">
            Welcome to the Code Arena free coding learning page!
          </p>
          <Form name="basic" className="mt-3 w-full">
            {inputsLogin.map((input, id) => (
              <FormItem
                key={id}
                name={input.name}
                placeholder={input.placeholder}
                Icon={input.Icon}
                inputType={input.inputType}
              />
            ))}
            <p className="text-right cursor-pointer">
              <Button type="link" className="text-gray-700 p-0">
                Forgot password?
              </Button>
              <Button type="link" className="text-gray-700 font-bold p-0">
                Sign up now
              </Button>
            </p>
            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full h-14 bg-black text-white text-lg font-bold rounded-xl border-0"
              >
                SIGN IN
              </Button>
            </Form.Item>
          </Form>
          <Divider orientation="center" plain className="text-lg">
            <strong>Sign in&nbsp;</strong>
            with Others
          </Divider>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {socialMediaLogin.map((button) => (
              <Col key={button.key} className="gutter-row" span={6}>
                <Button className="flex justify-center items-center p-0 border-0 h-full w-full social-button">
                  {renderButtonContent(button)}
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      </Col>
      <Col xs={{ span: 0 }} lg={{ span: 12 }}>
        <img src={BG.APP_BG} alt="boys" className="w-full h-screen object-cover" />
      </Col>
    </Row>
  )
}

export default Login
