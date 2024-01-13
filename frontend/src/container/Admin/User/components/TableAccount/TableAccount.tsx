import React from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import { DataType } from '@/@types/admin'
import { data } from '@/mocks/user.data'
import VerifyStatus from '@/components/VerifyStatus'

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (text: string) => <VerifyStatus name={text} />,
  },
  {
    dataIndex: 'id',
    render: (id: string) => <Link to={`admin/user/update/${id}`}>Update</Link>,
  },
]

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
}

export default function TableAccount() {
  return (
    <Table
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
      columns={columns}
      dataSource={data}
    />
  )
}
