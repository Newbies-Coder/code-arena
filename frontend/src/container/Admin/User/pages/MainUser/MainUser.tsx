import { Button } from 'antd'
import RoleDropdown from '../../components/RoleDropdown'
import SearchKeyword from '../../components/SearchKeyword'
import TableAccount from '../../components/TableAccount'
import { useNavigate } from 'react-router-dom'

export default function MainUser() {
  const navigate = useNavigate()
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
      <TableAccount />
    </div>
  )
}
