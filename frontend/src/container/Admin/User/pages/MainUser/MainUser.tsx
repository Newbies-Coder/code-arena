import { Button } from 'antd'
import RoleDropdown from '../../components/RoleDropdown'
import SearchKeyword from '../../components/SearchKeyword'
import { useNavigate } from 'react-router-dom'
import { ColumnsType } from 'antd/es/table'
import { DataType } from '@/@types/admin'
import VerifyStatus from '@/components/VerifyStatus'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import DataTable from '../../components/DataTable'
import { data } from '@/mocks/user.data'

export default function MainUser() {
  const navigate = useNavigate()

  const columns: ColumnsType<DataType> = [
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
      title: 'Phone',
      dataIndex: 'phone',
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
      title: 'Status',
      dataIndex: 'status',
      render: (text: string) => <VerifyStatus name={text} />,
      width: 120,
      className: 'text-sm',
    },
    {
      dataIndex: 'id',
      render: (id: string) => (
        <div className="flex">
          <Button
            type="text"
            className="flex justify-center items-center text-white text-lg"
            onClick={() => navigate(`/admin/user/update/${id}`)}
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
      <DataTable columns={columns} data={data} />
    </div>
  )
}
