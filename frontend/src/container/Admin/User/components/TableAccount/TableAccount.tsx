import { Button, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { DataType } from '@/@types/admin'
import { data } from '@/mocks/user.data'
import VerifyStatus from '@/components/VerifyStatus'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import './style.scss'

export default function TableAccount() {
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

  return <Table columns={columns} dataSource={data} scroll={{ x: 800, y: 420 }} pagination={{ pageSize: 8 }} />
}
