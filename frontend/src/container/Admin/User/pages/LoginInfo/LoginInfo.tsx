import { ColumnsType } from 'antd/es/table'
import { loginInfoData } from '@/mocks/user.data'
import { LoginInfoDataType } from '@/@types/admin'
import { useNavigate } from 'react-router-dom'
import RoleDropdown from '../../components/RoleDropdown'
import SearchKeyword from '../../components/SearchKeyword'
import { Button } from 'antd'
import DataTable from '../../components/DataTable'

const LoginInfo = () => {
  const navigate = useNavigate()

  const columns: ColumnsType<LoginInfoDataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'text-sm',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      className: 'text-sm',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      className: 'text-sm',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: 130,
      className: 'text-sm',
    },
    {
      title: 'Login Time',
      dataIndex: 'loginTime',
      width: 200,
      className: 'text-sm',
    },
    {
      title: 'Logout Time',
      dataIndex: 'logoutTime',
      width: 200,
      className: 'text-sm',
    },
  ]

  return (
    <div className="px-10 py-5">
      <div className="flex flex-col gap-2 lg:flex-row justify-between mb-4 h-full">
        <RoleDropdown />
        <div className="flex items-end gap-8">
          <SearchKeyword />
          <Button type="primary" className="bg-[#8001FF] h-12 w-36" onClick={() => navigate('/admin/user/add')}>
            Add account
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={loginInfoData} />
    </div>
  )
}

export default LoginInfo
