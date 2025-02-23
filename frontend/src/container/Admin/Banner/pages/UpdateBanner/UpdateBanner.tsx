import { BannerDataType } from '@/@types/admin.type'
import FormItem, { InputProps } from '@/components/FormItem/FormItem'
import { handleApiError } from '@/utils/handleApiError'
import requestApi from '@/utils/interceptors'
import { EditFilled } from '@ant-design/icons'
import { Button, Form } from 'antd'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UpdateBanner: React.FC = () => {
  const location = useLocation()
  const bannerData = location.state as BannerDataType
  const [isFormDisabled, setFormDisabled] = useState<boolean>(true)
  const navigate = useNavigate()

  // Define an array of input properties for the form
  const formInputProperties: InputProps[] = [
    { name: 'slug', label: 'Slug' },
    { name: 'description', label: 'Description' },
    { name: 'url', label: 'Url' },
  ]

  // Defining an asynchronous function to handle form submission
  const handleFormSubmit = async (values: BannerDataType) => {
    const loadingToast = toast.loading('Updating...')
    const { slug, description, url } = values
    try {
      const res = await requestApi(`banners/${bannerData._id}`, 'PUT', {
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
      navigate('/admin/user')
    } catch (error) {
      toast.dismiss(loadingToast)
      handleApiError(error)
    } finally {
      toast.clearWaitingQueue()
    }
  }

  return (
    <div className="px-2 lg:px-10 py-5">
      <h2 className="text-orange-400 text-3xl font-medium font-['Poppins'] leading-9 mb-6 lg:mb-12 inline-flex flex-col gap-2 justify-between w-full lg:flex-row">
        Banner information{' '}
        <span>
          <Button
            className="text-white  flex items-center justify-center border border-white"
            onClick={() => setFormDisabled((pre) => !pre)}
          >
            <EditFilled />
            <span className="text-lg">{isFormDisabled ? 'Edit' : 'Not Edit'}</span>
          </Button>
        </span>
      </h2>
      <Form
        name="basic"
        className="w-full mt-4 text-white grid gap-4 grid-cols-1 lg:grid-cols-2"
        disabled={isFormDisabled}
        onFinish={handleFormSubmit}
        fields={[
          {
            name: ['slug'],
            value: bannerData.slug,
          },
          {
            name: ['description'],
            value: bannerData.description,
          },
          {
            name: ['url'],
            value: bannerData.url,
          },
        ]}
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
              Update
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default UpdateBanner
