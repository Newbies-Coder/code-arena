import { Alert, Button, Form, Input } from 'antd'

const AddAccount = () => {
  return (
    <div className="px-10 py-5">
      <h2 className="text-orange-400 text-3xl font-medium font-['Poppins'] leading-9 mb-12">Account information</h2>
      <Form name="basic" initialValues={{ remember: true }} className="w-full flex flex-col items-center relative mt-4">
        <div className="flex flex-col w-full lg:flex-row lg:gap-2">
          <div className="w-full relative">
            <h3 className="absolute -top-2 left-3 px-2 mb-0 text-white bg-[#001529] z-10 rounded-md">Name</h3>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: (
                    <Alert
                      className="bg-transparent text-base text-red-700"
                      message="Please input your name"
                      banner
                      type="error"
                    />
                  ),
                },
              ]}
              className="border-2 rounded-lg border-white w-full mb-10 flex flex-col"
            >
              <Input
                className="h-12 bg-transparent border-none text-white text-xl focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                placeholder="Alex Jordan"
              />
            </Form.Item>
          </div>
          <div className="w-full relative">
            <h3 className="absolute -top-2 left-3 lg:-top-2 lg:left-3 px-2 mb-0 text-white bg-[#001529] z-10 rounded-md">
              Username
            </h3>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: (
                    <Alert
                      className="bg-transparent text-base text-red-700"
                      message="Please input your username"
                      banner
                      type="error"
                    />
                  ),
                },
              ]}
              className="border-2 rounded-lg border-white w-full mb-10 flex flex-col"
            >
              <Input
                className="h-12 bg-transparent border-none text-white text-xl focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                placeholder="AlexJordan01"
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-col w-full lg:flex-row lg:gap-2">
          <div className="w-full relative">
            <h3 className="absolute -top-2 left-3 lg:-top-2 lg:left-3 px-2 mb-0 text-white bg-[#001529] z-10 rounded-md">
              Phone number
            </h3>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: (
                    <Alert
                      className="bg-transparent text-base text-red-700"
                      message="Please input your phone"
                      banner
                      type="error"
                    />
                  ),
                },
              ]}
              className="border-2 rounded-lg border-white w-full mb-10 flex flex-col"
            >
              <Input
                type="number"
                className="h-12 bg-transparent border-none text-white text-xl focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                placeholder="0123456789"
              />
            </Form.Item>
          </div>
          <div className="w-full relative">
            <h3 className="absolute -top-2 left-3 lg:-top-2 lg:left-3 px-2 mb-0 text-white bg-[#001529] z-10 rounded-md">
              Email
            </h3>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: (
                    <Alert
                      className="bg-transparent text-base text-red-700"
                      message="Please input your email"
                      banner
                      type="error"
                    />
                  ),
                },
              ]}
              className="border-2 rounded-lg border-white w-full mb-10 flex flex-col"
            >
              <Input
                className="h-12 bg-transparent border-none text-white text-xl focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                placeholder="johnpham@gamil.com"
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-col w-full lg:flex-row lg:gap-2">
          <div className="w-full relative">
            <h3 className="absolute -top-2 left-3 lg:-top-2 lg:left-3 px-2 mb-0 text-white bg-[#001529] z-10 rounded-md">
              Password
            </h3>
            <Form.Item
              name="password"
              rules={[
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
                  message: (
                    <Alert
                      className="bg-transparent text-base text-red-700"
                      message="Invalid password"
                      banner
                      type="error"
                    />
                  ),
                },
                {
                  required: true,
                  message: (
                    <Alert
                      className="bg-transparent text-base text-red-700"
                      message="Please input your password"
                      banner
                      type="error"
                    />
                  ),
                },
              ]}
              className="border-2 rounded-lg border-white w-full mb-10 flex flex-col"
            >
              <Input
                type="password"
                className="h-12 bg-transparent border-none text-white text-xl focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                placeholder="Alex@123"
              />
            </Form.Item>
          </div>
          <div className="w-full relative">
            <h3 className="absolute -top-2 left-3 lg:-top-2 lg:left-3 px-2 mb-0 text-white bg-[#001529] z-10 rounded-md">
              Confirm password
            </h3>
            <Form.Item
              name="confirm-password"
              rules={[
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
                  message: (
                    <Alert
                      className="bg-transparent text-base text-red-700"
                      message="Invalid confirm-password"
                      banner
                      type="error"
                    />
                  ),
                },
                {
                  required: true,
                  message: (
                    <Alert
                      className="bg-transparent text-base text-red-700"
                      message="Please input your password"
                      banner
                      type="error"
                    />
                  ),
                },
              ]}
              className="border-2 rounded-lg border-white w-full mb-10 flex flex-col"
            >
              <Input
                type="password"
                className="h-12 bg-transparent border-none text-white text-xl focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                placeholder="Alex@123"
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-col w-full lg:flex-row lg:gap-2">
          <div className="w-full relative">
            <h3 className="absolute -top-2 left-3 lg:-top-2 lg:left-3 px-2 mb-0 text-white bg-[#001529] z-10 rounded-md">
              Role
            </h3>
            <Form.Item
              name="role"
              rules={[
                {
                  required: true,
                  message: (
                    <Alert
                      className="bg-transparent text-base text-red-700"
                      message="Please input your role"
                      banner
                      type="error"
                    />
                  ),
                },
              ]}
              className="border-2 rounded-lg border-white w-full mb-10 flex flex-col"
            >
              <Input
                className="h-12 bg-transparent border-none text-white text-xl focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                placeholder="admin"
              />
            </Form.Item>
          </div>
          <div className="w-full relative">
            <h3 className="absolute -top-2 left-3 lg:-top-2 lg:left-3 px-2 mb-0 text-white bg-[#001529] z-10 rounded-md">
              Active status
            </h3>
            <Form.Item
              name="status"
              rules={[
                {
                  required: true,
                  message: (
                    <Alert
                      className="bg-transparent text-base text-red-700"
                      message="Please input your status"
                      banner
                      type="error"
                    />
                  ),
                },
              ]}
              className="border-2 rounded-lg border-white w-full mb-10 flex flex-col"
            >
              <Input
                className="h-12 bg-transparent border-none text-white text-xl focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                placeholder="Active"
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full lg:flex-row lg:gap-2 lg:justify-center">
          <Button
            type="primary"
            className="w-full lg:w-[147px] h-12 px-6 py-2.5 bg-[#FFF2E7] rounded-lg shadow border border-[#7302E8] justify-center items-center gap-2 flex text-[#7302E8] text-base font-popins"
          >
            Cancel
          </Button>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full lg:w-[147px] h-12 px-6 py-2.5 bg-[#7302E8] rounded-lg shadow border border-[#7302E8] justify-center items-center gap-2 flex text-[#FFF2E7] text-base font-popins"
            >
              Add
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default AddAccount
