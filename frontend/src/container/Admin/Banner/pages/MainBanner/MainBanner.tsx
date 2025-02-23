import { BannerDataType } from '@/@types/admin.type'
import DataTable from '@/container/Admin/User/components/DataTable'
import { handleApiError } from '@/utils/handleApiError'
import requestApi from '@/utils/interceptors'
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Image, Input, Modal } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const { confirm } = Modal

const MainBanner: React.FC = () => {
  const navigate = useNavigate()

  const [bannersData, setBannersData] = useState<BannerDataType[]>([])

  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)

  // Fetch banner data when the component mounts
  useEffect(() => {
    ;(async () => {
      try {
        const res = await requestApi('banners', 'get', null)
        setBannersData(res.data.data.items)
      } catch (error) {
        handleApiError(error)
      }
    })()
  }, [])

  // Use the useMemo hook to filter the banners data based on the search query (slug, id)
  const filteredItems = useMemo(() => {
    return bannersData.filter(
      (item) =>
        item.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item._id.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [bannersData, searchQuery])

  // Define the deleteBanner function to delete a banner by ID
  const deleteBanner = (id: string) => {
    confirm({
      title: 'Confirm Delete',
      icon: <ExclamationCircleFilled />,
      content: 'Do you want to delete this banner?',
      onOk() {
        ;(async () => {
          const loadingDelete = toast.loading('Deleting banner...')
          try {
            await requestApi(`banners/${id}`, 'delete', {})
            setBannersData(bannersData.filter((item) => item._id !== id))
            toast.update(loadingDelete, {
              render: 'Delete banner is successful!',
              type: 'success',
              isLoading: false,
              autoClose: 3000,
            })
          } catch (error) {
            handleApiError(error)
          } finally {
            toast.clearWaitingQueue()
          }
        })()
      },
      onCancel() {
        return
      },
      okButtonProps: { style: { backgroundColor: '#8001ff' } },
    })
  }

  // Define the columns for the data table
  const columns: ColumnsType<BannerDataType> = [
    {
      title: 'ID',
      dataIndex: '_id',
      className: 'text-sm',
      width: 200,
    },
    {
      title: 'Image',
      dataIndex: 'url',
      render: (url: string) => <Image src={url} width={400} height={200} />,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      className: 'text-sm',
      width: 200,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      className: 'text-sm',
      width: 200,
    },
    {
      dataIndex: '_id',
      render: (id: string) => (
        <div className="flex">
          <Button
            type="text"
            className="flex justify-center items-center text-white text-lg"
            onClick={() =>
              navigate(`/admin/banner/update/${id}`, { state: filteredItems.find((item) => item._id === id) })
            }
          >
            <EditOutlined />
          </Button>
          <Button
            className="flex justify-center items-center text-white text-lg"
            type="text"
            onClick={() => deleteBanner(id)}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
      width: 136,
    },
  ]

  return (
    <div className="px-10 py-5">
      <div className="flex flex-col gap-2 lg:flex-row justify-between mb-4 h-full">
        <div className="flex items-end gap-8">
          <div>
            <p className="text-white">Keyword</p>
            <Input
              className="bg-transparent text-white h-11 max-w-[400px] lg:w-[400px]"
              suffix={
                <Button type="text" className="text-white flex justify-center items-end" icon={<SearchOutlined />} />
              }
              classNames={{ input: 'bg-transparent text-white placeholder:text-gray-400' }}
              placeholder="Enter id or slug to search"
              ref={searchInputRef}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            type="primary"
            className="bg-[#8001FF] h-12 w-36 flex justify-center items-center"
            onClick={() => navigate('/admin/banner/add')}
          >
            <PlusOutlined className="text-lg" />
            <span>Add banner</span>
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={filteredItems} />
    </div>
  )
}

export default MainBanner
