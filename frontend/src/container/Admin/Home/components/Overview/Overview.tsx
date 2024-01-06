import clsx from 'clsx'
import { UsersIcon } from '@/components/Icons'

type ProgressBarProps = {
  size: number
  percent: number
  color: string
  children?: React.ReactNode
}

const ProgressBar: React.FC<ProgressBarProps> = ({ size, children, color, percent }) => (
  <div
    className={clsx('rounded-full flex justify-center items-center', `w-[${size}px]`, `h-[${size}px]`)}
    style={{
      background: `radial-gradient(closest-side, #0e1820 75%, transparent 80% 100%), conic-gradient(${color} ${percent}%, white 0)`,
    }}
  >
    {children}
  </div>
)

export default function Overview() {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex flex-col lg:flex-row p-2 border border-white rounded-lg gap-4 justify-around">
        <div className="flex justify-around lg:justify-between gap-2">
          <ProgressBar size={60} percent={90} color="#FF7506">
            <span className="text-white">90%</span>
          </ProgressBar>
          <div className="text-orange-500">
            <span className="text-white text-2xl font-semibold">4.221</span>
            <div className="flex justify-center items-center gap-2">
              <UsersIcon color="#FF7506" />
              <span>User</span>
            </div>
          </div>
        </div>
        <div className="flex justify-around lg:justify-between gap-2">
          <div className="text-white flex flex-col py-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-200 rounded-full"></div>
              <span>Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Not active</span>
            </div>
          </div>
          <div className="text-orange-500 flex flex-col py-2 font-bold">
            <span>3.799</span>
            <span>422</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row p-2 border border-white rounded-lg gap-4 justify-around">
        <div className="flex justify-around lg:justify-between gap-2">
          <ProgressBar size={60} percent={76} color="#4277ff">
            <span className="text-white">76%</span>
          </ProgressBar>
          <div className="text-orange-500">
            <span className="text-white text-2xl font-semibold">276</span>
            <div className="flex justify-center items-center gap-2 text-[#4277ff]">
              <UsersIcon color="#4277ff" />
              <span>Message</span>
            </div>
          </div>
        </div>
        <div className="flex justify-around lg:justify-between gap-2">
          <div className="text-white flex flex-col py-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#4277ff] rounded-full"></div>
              <span>Sended</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Sending</span>
            </div>
          </div>
          <div className="text-[#4277ff] flex flex-col py-2 font-bold">
            <span>210</span>
            <span>66</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row p-2 border border-white rounded-lg gap-4 justify-around">
        <div className="flex justify-around lg:justify-between gap-2">
          <ProgressBar size={60} percent={86} color="#35C75A">
            <span className="text-white">86%</span>
          </ProgressBar>
          <div className="text-orange-500">
            <span className="text-white text-2xl font-semibold">4.221</span>
            <div className="flex justify-center items-center gap-2 text-[#35C75A]">
              <UsersIcon color="#35C75A" />
              <span>Course</span>
            </div>
          </div>
        </div>
        <div className="flex justify-around lg:justify-between gap-2">
          <div className="text-white flex flex-col py-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#35C75A] rounded-full"></div>
              <span>Waiting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Used</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <span>Skip</span>
            </div>
          </div>
          <div className="text-[#35C75A] flex flex-col py-2 font-bold">
            <span>3.799</span>
            <span>422</span>
          </div>
        </div>
      </div>
    </div>
  )
}
