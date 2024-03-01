import { Button, Input, Menu, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ColumnsType } from 'antd/es/table'
import VerifyStatus from '@/components/VerifyStatus'
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import DataTable from '../../components/DataTable'
import { UserDataType } from '@/@types/admin.type'
import { useEffect, useMemo, useRef, useState } from 'react'
import requestApi from '@/utils/interceptors'
import { handleApiError } from '@/utils/handleApiError'
import './style.scss'
import { toast } from 'react-toastify'
const { confirm } = Modal

// Define the list of user roles
const userRoles = ['All', 'Admin', 'User', 'Moderator']

export default function MainUser() {
  const navigate = useNavigate()

  // Set up state variables for user data, selected user role, whether the role menu is open, the role filter value, and the search query
  const [userData, setUserData] = useState<UserDataType[]>([])
  const [selectedUserRole, setSelectedUserRole] = useState(0)
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false)
  const [roleFilterValue, setRoleFilterValue] = useState(userRoles[0])
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)

  // Fetch user data when the component mounts
  useEffect(() => {
    ;(async () => {
      try {
        const res = await requestApi('auth', 'get', null)
        setUserData(res.data.data)
      } catch (error) {
        handleApiError(error)
      }
    })()
  }, [])

  // Define the columns for the data table
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
          <Button
            className="flex justify-center items-center text-white text-lg"
            type="text"
            onClick={() => deleteUser(id)}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
      width: 136,
    },
  ]

  // Define the deleteUser function to delete a user by ID
  const deleteUser = (id: string) => {
    confirm({
      title: 'Confirm Delete',
      icon: <ExclamationCircleFilled />,
      content: 'Do you want to delete this user?',
      onOk() {
        ;(async () => {
          const loadingDelete = toast.loading('Deleting user...')
          try {
            await requestApi(`auth/delete-user?id=${id}`, 'delete', {})
            setUserData(userData.filter((item) => item._id !== id))
            toast.update(loadingDelete, {
              render: 'Delete user is successful!',
              type: 'success',
              isLoading: false,
              autoClose: 3000,
            })
          } catch (error) {
            handleApiError(error)
          }
        })()
      },
      onCancel() {
        return
      },
      okButtonProps: { style: { backgroundColor: '#8001ff' } },
    })
  }

  // Use the useMemo hook to filter the user data based on the role filter value and search query
  const filteredItems = useMemo(() => {
    const users = userData.filter((user) => user._destroy === false)
    if (roleFilterValue === userRoles[0]) {
      return users.filter((item) => {
        return (
          (item._destroy === false && item.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
          item._id.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })
    }
    return users.filter((item) => {
      return (
        item.role === roleFilterValue &&
        (item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item._id.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })
  }, [userData, roleFilterValue, searchQuery])

  // Define the handleRoleMenuClick function to handle clicks on the role menu items
  const handleRoleMenuClick = (e: { key: React.Key }) => {
    const index = Number(e.key)
    setSelectedUserRole(Number(e.key))
    setIsRoleMenuOpen(false)
    setRoleFilterValue(userRoles[index])
  }

  return (
    <div className="main-user">
      <div className="px-10 py-5">
        <div className="flex flex-col gap-2 lg:flex-row justify-between mb-4 h-full">
          <div className="min-w-[300px]">
            <p className="text-white">Role name</p>
            <div className="relative">
              <Button
                className="w-full h-11 flex flex-row-reverse items-center justify-between text-white"
                icon={<DownOutlined />}
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              >
                {userRoles[selectedUserRole]}
              </Button>
              {isRoleMenuOpen && (
                <Menu
                  onClick={handleRoleMenuClick}
                  className="absolute mt-2 left-0 right-0 rounded-lg z-10 shadow-gray-400"
                >
                  {userRoles.map((item, key) => (
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
                ref={searchInputRef}
                onChange={(e) => setSearchQuery(e.target.value)}
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
    </div>
  )
}
