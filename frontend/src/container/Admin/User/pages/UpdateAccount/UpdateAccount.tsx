import { AccountType, UserGenderType, UserRole } from '@/@types/admin.type'
import { EditFilled } from '@ant-design/icons'
import { Alert, Button, Form, Radio, Select } from 'antd'
import { format } from 'date-fns'
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormItem from '../../components/FormItem'
import { InputProps } from '../../components/FormItem/FormItem'
import { regexDateOfBirth, regexPasswordPattern } from '@/utils/regex'
import './style.scss'
import requestApi from '@/utils/interceptors'
import { handleApiError } from '@/utils/handleApiError'

const UpdateAccount = () => {
  const location = useLocation()
  const [data, setData] = useState(location.state as AccountType)

  const [formDisable, setFormDisable] = useState<boolean>(true)
  const navigate = useNavigate()

  const onFinish = async (values: AccountType) => {
    const loadingToast = toast.loading('Updating Account')
    const { username, fullName, phone, email, password, confirm_password, role, date_of_birth, address, gender } =
      values
    try {
      const res = await requestApi(`auth/update-user/${data._id}`, 'PUT', {
        username,
        fullName,
        phone,
        email,
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
    } catch (error) {
      toast.dismiss(loadingToast)
      handleApiError(error)
      toast.clearWaitingQueue()
    }
    toast.clearWaitingQueue()
  }

  const inputs: InputProps[] = [
    {
      name: 'fullName',
      label: 'Full Name',
      placeholder: data.fullName,
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
      placeholder: data.username,
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
      name: 'email',
      label: 'Email',
      rules: [
        {
          type: 'email',
          message: (
            <Alert className="bg-transparent text-base text-red-700" message="Email not valid!" banner type="error" />
          ),
        },
      ],
    },
    {
      name: 'password',
      label: 'Password',
      required: false,
      rules: [
        {
          pattern: regexPasswordPattern,
          message: (
            <Alert
              className="bg-transparent text-base text-red-700"
              message="Password not valid!"
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
      required: false,
      rules: [
        {
          pattern: regexPasswordPattern,
          message: (
            <Alert
              className="bg-transparent text-base text-red-700"
              message="Confirm password not valid!"
              banner
              type="error"
            />
          ),
        },
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
      placeholder: data.date_of_birth,
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
      placeholder: data.address,
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
      placeholder: data.gender,
      children: (
        <Radio.Group className="mt-5 text-white ml-5">
          <Radio value="Male" className="text-white text-xl" checked={data.gender === UserGenderType.Male}>
            Male
          </Radio>
          <Radio value="Female" className="text-white text-xl" checked={data.gender === UserGenderType.Female}>
            Female
          </Radio>
        </Radio.Group>
      ),
    },
  ]

  return (
    <div className="px-2 lg:px-10 py-5">
      <h2 className="text-orange-400 text-3xl font-medium font-['Poppins'] leading-9 mb-6 lg:mb-12 inline-flex flex-col gap-2 justify-between w-full lg:flex-row">
        Account information{' '}
        <span>
          <Button
            className="text-white  flex items-center justify-center border border-white"
            onClick={() => setFormDisable((pre) => !pre)}
          >
            <EditFilled />
            <span className="text-lg">{formDisable ? 'Edit' : 'Not Edit'}</span>
          </Button>
        </span>
      </h2>
      <Form
        name="basic"
        className="w-full mt-4 text-white grid gap-4 grid-cols-1 lg:grid-cols-2"
        disabled={formDisable}
        onFinish={onFinish}
        fields={[
          {
            name: ['fullName'],
            value: data.fullName,
          },
          {
            name: ['username'],
            value: data.username,
          },
          {
            name: ['phone'],
            value: data.phone,
          },
          {
            name: ['email'],
            value: data.email,
          },
          {
            name: ['password'],
            value: data.password,
          },
          {
            name: ['confirm_password'],
            value: data.confirm_password,
          },
          {
            name: ['role'],
            value: data.role,
          },
          {
            name: ['date_of_birth'],
            value: data.date_of_birth ? format(data.date_of_birth, 'dd-MM-yyyy') : '',
          },
          {
            name: ['address'],
            value: data.address,
          },
          {
            name: ['gender'],
            value: data.gender,
          },
        ]}
      >
        {inputs.map((item, index) => (
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
              Update
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default UpdateAccount
