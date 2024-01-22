import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import './style.scss'

type DataTableProps = {
  columns: ColumnsType<any>
  data: any[]
}

const DataTable = ({ columns, data }: DataTableProps) => {
  return <Table columns={columns} dataSource={data} pagination={{ pageSize: 8 }} />
}

export default DataTable
