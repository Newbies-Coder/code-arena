import { Alert, Button, Form } from 'antd'
import FormItem, { InputProps } from '@components/FormItem/FormItem'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import requestApi from '@/utils/interceptors'
import { handleApiError } from '@/utils/handleApiError'
import { BannerDataType } from '@/@types/admin.type'

const AddBanner = () => {
  const navigate = useNavigate()

  // Define an array of input properties for the form
  const formInputProperties: InputProps[] = [
    {
      name: 'slug',
      label: 'Slug',
      rules: [
        {
          max: 255,
          message: (
            <Alert
              className="bg-transparent text-base text-red-700"
              message={`Length max is 255 characters!`}
              banner
              type="error"
            />
          ),
        },
      ],
    },
    {
      name: 'description',
      label: 'Description',
      rules: [
        {
          max: 255,
          message: (
            <Alert
              className="bg-transparent text-base text-red-700"
              message={`Length max is 255 characters!`}
              banner
              type="error"
            />
          ),
        },
      ],
    },
    {
      name: 'url',
      label: 'Url',
    },
  ]

  // Defining an asynchronous function to handle form submission
  const handleFormSubmit = async (values: BannerDataType) => {
    const { slug, description, url } = values
    const loadingToast = toast.loading('Adding...')
    try {
      const res = await requestApi(`banners`, 'post', {
        slug,
        description,
        url,
      })
      const { message } = res.data
      toast.update(loadingToast, {
        render: message,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
      navigate('/admin/banner')
    } catch (error) {
      toast.dismiss(loadingToast)
      handleApiError(error)
    } finally {
      toast.clearWaitingQueue()
    }
  }

  return (
    <div className="px-10 py-5">
      <h2 className="text-orange-400 text-3xl font-medium font-['Poppins'] leading-9 mb-12">Banner information</h2>
      <Form name="basic" className="w-full mt-4 text-white grid gap-4 grid-cols-1" onFinish={handleFormSubmit}>
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

export default AddBanner
