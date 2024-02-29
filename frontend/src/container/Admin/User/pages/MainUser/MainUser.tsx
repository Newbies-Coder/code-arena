import { Button, Input, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ColumnsType } from 'antd/es/table'
import VerifyStatus from '@/components/VerifyStatus'
import { DeleteOutlined, DownOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import DataTable from '../../components/DataTable'
import { UserDataType } from '@/@types/admin.type'
import './style.scss'
import { useEffect, useMemo, useRef, useState } from 'react'
import requestApi from '@/utils/interceptors'
import { handleApiError } from '@/utils/handleApiError'

const roles = ['All', 'Admin', 'User', 'Moderator']
export default function MainUser() {
  const navigate = useNavigate()
  const [data, setData] = useState<UserDataType[]>([])
  const [roleSelected, setRoleSelected] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [queryRole, setQueryRole] = useState(roles[0])
  const [queryIdOrUsername, setQueryIdOrUsername] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await requestApi('auth', 'get', null)
        setData(res.data.data)
      } catch (error) {
        handleApiError(error)
      }
    })()
  }, [])

  const columns: ColumnsType<UserDataType> = [
    {
      title: 'ID',
      dataIndex: '_id',
      className: 'text-sm',
      width: 200,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      className: 'text-sm',
      width: 120,
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      className: 'text-sm',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      className: 'text-sm',
    },
    {
      title: 'Date of birth',
      dataIndex: 'date_of_birth',
      className: 'text-sm',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: 130,
      className: 'text-sm',
    },
    {
      title: 'Status',
      dataIndex: 'verify',
      render: (text: string) => <VerifyStatus name={text} />,
      width: 120,
      className: 'text-sm',
    },
    {
      dataIndex: '_id',
      render: (id: string) => (
        <div className="flex">
          <Button
            type="text"
            className="flex justify-center items-center text-white text-lg"
            onClick={() =>
              navigate(`/admin/user/update/${id}`, { state: filteredItems.find((item) => item._id === id) })
            }
          >
            <EditOutlined />
          </Button>
          <Button className="flex justify-center items-center text-white text-lg" type="text">
            <DeleteOutlined />
          </Button>
        </div>
      ),
      width: 136,
    },
  ]

  const filteredItems = useMemo(() => {
    if (queryRole === roles[0]) {
      return data.filter((item) => {
        return (
          item.username.toLowerCase().includes(queryIdOrUsername.toLowerCase()) ||
          item._id.toLowerCase().includes(queryIdOrUsername.toLowerCase())
        )
      })
    }
    return data.filter((item) => {
      return (
        item.role === queryRole &&
        (item.username.toLowerCase().includes(queryIdOrUsername.toLowerCase()) ||
          item._id.toLowerCase().includes(queryIdOrUsername.toLowerCase()))
      )
    })
  }, [data, queryRole, queryIdOrUsername])

  const handleMenuClick = (e: { key: React.Key }) => {
    const index = Number(e.key)
    setRoleSelected(Number(e.key))
    setIsOpen(false)
    setQueryRole(roles[index])
  }

  return (
    <div className="px-10 py-5">
      <div className="flex flex-col gap-2 lg:flex-row justify-between mb-4 h-full">
        <div className="min-w-[300px]">
          <p className="text-white">Role name</p>
          <div className="relative">
            <Button
              className="w-full h-11 flex flex-row-reverse items-center justify-between text-white"
              icon={<DownOutlined />}
              onClick={() => setIsOpen(!isOpen)}
            >
              {roles[roleSelected]}
            </Button>
            {isOpen && (
              <Menu onClick={handleMenuClick} className="absolute mt-2 left-0 right-0 rounded-lg z-10 shadow-gray-400">
                {roles.map((item, key) => (
                  <Menu.Item key={key}>{item}</Menu.Item>
                ))}
              </Menu>
            )}
          </div>
        </div>
        <div className="flex items-end gap-8">
          <div>
            <p className="text-white">Keyword</p>
            <Input
              className="bg-transparent text-white h-11 max-w-[400px] lg:w-[400px]"
              suffix={
                <Button type="text" className="text-white flex justify-center items-end" icon={<SearchOutlined />} />
              }
              classNames={{ input: 'bg-transparent text-white placeholder:text-gray-400' }}
              placeholder="Enter keyword"
              ref={inputRef}
              onChange={(e) => setQueryIdOrUsername(e.target.value)}
            />
          </div>
          <Button
            type="primary"
            className="bg-[#8001FF] h-12 w-36 flex justify-center items-center"
            onClick={() => navigate('/admin/user/add')}
          >
            <PlusOutlined className="text-lg" />
            <span>Add account</span>
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={filteredItems} />
    </div>
  )
}
