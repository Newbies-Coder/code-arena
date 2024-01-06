import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, MenuProps, Space, message } from 'antd'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const handleMenuClick: MenuProps['onClick'] = (e) => {
  message.info('Click on menu item.')
  console.log('click', e)
}

const items: MenuProps['items'] = [
  {
    label: 'Day 1',
    key: '1',
  },
  {
    label: 'Day 2',
    key: '2',
  },
  {
    label: 'Day 3',
    key: '3',
  },
  {
    label: 'Day 4',
    key: '4',
  },
]

const menuProps = {
  items,
  onClick: handleMenuClick,
}

export const options = {
  responsive: true,
}

const labels = ['01', '13', '19', '31']

export const data = {
  labels,
  datasets: [
    {
      label: 'Quantity User',
      data: [2800, 3700, 4221, 3000, 6000],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(255, 206, 86, 0.2)',
    },
  ],
}

export default function Statistic() {
  return (
    <div className="px-4 border border-white rounded-lg mt-6">
      <div className="text-white flex justify-between ">
        <div>
          <h3 className="text-xl font-bold font-popins leading-8 mb-0">Statistics table by day</h3>
          <p className="text-[#A9A9B0] text-sm font-popins">11 / 2023</p>
        </div>
        <div className="flex items-center gap-2">
          <span>See below</span>
          <Dropdown menu={menuProps}>
            <Button>
              <Space className="text-white">
                Day
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>
      <Line options={options} data={data} className="bg-transparent" />
    </div>
  )
}
