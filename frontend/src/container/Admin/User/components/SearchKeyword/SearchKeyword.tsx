import { SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'

export default function SearchKeyword() {
  return (
    <div>
      <p className="text-white">Keyword</p>
      <Input
        className="bg-transparent text-white h-11 w-[300px] "
        suffix={<Button type="text" className="text-white flex justify-center items-end" icon={<SearchOutlined />} />}
        classNames={{ input: 'bg-transparent text-white placeholder:text-gray-400' }}
        placeholder="Enter keyword"
      />
    </div>
  )
}
