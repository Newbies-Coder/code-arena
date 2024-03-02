import { AccountType, UserRole } from '@/@types/admin.type'
import { Alert, Button, Form, Radio, Select } from 'antd'
import FormItem, { InputProps } from '../../components/FormItem/FormItem'
import { regexDateOfBirth, regexPasswordPattern } from '@/utils/regex'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import requestApi from '@/utils/interceptors'
import { handleApiError } from '@/utils/handleApiError'

const AddAccount = () => {
  const navigate = useNavigate()

  // Define an array of input properties for the form
  const formInputProperties: InputProps[] = [
    {
      name: 'fullName',
      label: 'Full Name',
      rules: [
        {
          max: 50,
          message: (
            <Alert
              className="bg-transparent text-base text-red-700"
              message={`Length max is 50 characters!`}
              banner
              type="error"
            />
          ),
        },
      ],
    },
    {
      name: 'username',
      label: 'Username',
      rules: [
        {
          max: 20,
          message: (
            <Alert
              className="bg-transparent text-base text-red-700"
              message={`Length max is 20 characters!`}
              banner
              type="error"
            />
          ),
        },
      ],
    },
    {
      name: 'email',
      label: 'Email Address',
      rules: [
        {
          type: 'email',
          message: (
            <Alert className="bg-transparent text-base text-red-700" message={`Email not valid!`} banner type="error" />
          ),
        },
      ],
    },
    {
      name: 'phone',
      label: 'Phone Number',
      rules: [
        {
          pattern: /^0\d{9}$/g,
          message: (
            <Alert
              className="bg-transparent text-base text-red-700"
              message="Phone number not valid!"
              banner
              type="error"
            />
          ),
        },
      ],
    },
    {
      name: 'password',
      label: 'Password',
      rules: [
        {
          // eslint-disable-next-line no-useless-escape
          pattern: /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
          message: (
            <Alert
              className="bg-transparent text-base text-red-700"
              message={`Password not valid!`}
              banner
              type="error"
            />
          ),
        },
      ],
    },
    {
      name: 'confirm_password',
      label: 'Confirm Password',
      rules: [
        {
          pattern: regexPasswordPattern,
          message: (
            <Alert
              className="bg-transparent text-base text-red-700"
              message={`Confirm password not valid!`}
              banner
              type="error"
            />
          ),
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve()
            }
            return Promise.reject(new Error('The new password that you entered do not match!'))
          },
          message: (
            <Alert
              className="bg-transparent text-base text-red-700"
              message={`The new password that you entered do not match!`}
              banner
              type="error"
            />
          ),
        }),
      ],
    },
    {
      name: 'role',
      label: 'Role',
      children: (
        <Select className="h-12 text-white text-md border-[2px] rounded-lg">
          <Select.Option value={UserRole.User}>{UserRole.User}</Select.Option>
          <Select.Option value={UserRole.Moderator}>{UserRole.Moderator}</Select.Option>
          <Select.Option value={UserRole.Admin}>{UserRole.Admin}</Select.Option>
        </Select>
      ),
    },
    {
      name: 'date_of_birth',
      label: 'Date of Birth',
      placeholder: 'yyyy-mm-dd',
      rules: [
        {
          pattern: regexDateOfBirth,
          message: (
            <Alert
              className="bg-transparent text-base text-red-700"
              message="Date of Birth not valid!"
              banner
              type="error"
            />
          ),
        },
      ],
    },
    {
      name: 'address',
      label: 'Address',
      rules: [
        {
          pattern: /^.{10,255}$/g,
          message: (
            <Alert
              className="bg-transparent text-base text-red-700"
              message="Address is not valid"
              banner
              type="error"
            />
          ),
        },
      ],
    },
    {
      name: 'gender',
      label: 'Gender',
      children: (
        <Radio.Group className="mt-5 text-white ml-5">
          <Radio value="Male" className="text-white text-xl" checked={true}>
            Male
          </Radio>
          <Radio value="Female" className="text-white text-xl">
            Female
          </Radio>
        </Radio.Group>
      ),
    },
  ]

  // Defining an asynchronous function to handle form submission
  const handleFormSubmit = async (values: AccountType) => {
    const { fullName, username, email, phone, password, confirm_password, role, date_of_birth, address, gender } =
      values
    const loadingToast = toast.loading('Creating Account')
    try {
      const res = await requestApi(`auth/create-user`, 'post', {
        fullName,
        username,
        email,
        phone,
        password,
        confirm_password,
        role,
        date_of_birth,
        address,
        gender,
      })
      const { message } = res.data
      toast.update(loadingToast, {
        render: message,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
      navigate('/admin/user')
    } catch (error) {
      toast.dismiss(loadingToast)
      handleApiError(error)
    } finally {
      toast.clearWaitingQueue()
    }
  }

  return (
    <div className="px-10 py-5">
      <h2 className="text-orange-400 text-3xl font-medium font-['Poppins'] leading-9 mb-12">Account information</h2>
      <Form
        name="basic"
        className="w-full mt-4 text-white grid gap-4 grid-cols-1 lg:grid-cols-2"
        onFinish={handleFormSubmit}
      >
        {formInputProperties.map((item, index) => (
          <FormItem
            key={index}
            name={item.name}
            label={item.label}
            children={item.children}
            rules={item.rules}
            required={item.required}
          />
        ))}
        <div className="flex flex-col gap-2 w-full lg:flex-row lg:gap-2 lg:justify-center col-span-full">
          <Button
            type="primary"
            className="w-full lg:w-[147px] h-12 px-6 py-2.5 bg-[#FFF2E7] rounded-lg shadow border border-[#7302E8] justify-center items-center gap-2 flex text-[#7302E8] text-base font-popins disabled:text-white"
            disabled={false}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full lg:w-[147px] h-12 px-6 py-2.5 bg-[#7302E8] rounded-lg shadow border border-[#7302E8] justify-center items-center gap-2 flex text-[#FFF2E7] text-base font-popins disabled:text-white"
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
