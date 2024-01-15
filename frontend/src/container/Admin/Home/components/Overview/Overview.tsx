import clsx from 'clsx'
import { CourserIcon, MessageIcon, UsersIcon } from '@/components/Icons'

type ProgressBarProps = {
  percent: number
  color: string
  children?: React.ReactNode
  size: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ children, color, percent, size = 50 }) => (
  <div
    className={clsx(`rounded-full flex justify-center items-center`)}
    style={{
      background: `radial-gradient(closest-side, #0e1820 90%, transparent 95% 100%), conic-gradient(${color} ${percent}%, white 0)`,
      width: size + 'px',
      height: size + 'px',
    }}
  >
    {children}
  </div>
)

export default function Overview() {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <h2 className="ml-2 text-3xl font-bold font-popins leading-9 text-orange-500">Overviews</h2>
      <div className="flex flex-col xl:flex-row p-2 border border-white rounded-lg gap-4 justify-evenly">
        <div className="flex justify-evenly xl:justify-between gap-2">
          <div className="w-24 xl:w-fit flex justify-center">
            <ProgressBar size={70} percent={90} color="#ffe500">
              <ProgressBar size={60} percent={10} color="#FF8900">
                <span className="text-white">90%</span>
              </ProgressBar>
            </ProgressBar>
          </div>
          <div className="text-[#ffe500] w-24 xl:w-fit">
            <span className="text-white text-2xl font-semibold">4.221</span>
            <div className="flex items-center gap-2">
              <UsersIcon color="#ffe500" />
              <span>User</span>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly xl:justify-between gap-2">
          <div className="w-24 xl:w-fit text-white flex flex-col py-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-200 rounded-full"></div>
              <span>Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FF8900] rounded-full"></div>
              <span>Not active</span>
            </div>
          </div>
          <div className="w-24 xl:w-10 flex flex-col py-2 font-bold">
            <span className="text-[#ffe500]">3.799</span>
            <span className="text-[#FF8900]">422</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row p-2 border border-white rounded-lg gap-4 justify-evenly">
        <div className="flex justify-evenly xl:justify-between gap-2">
          <div className="w-24 xl:w-fit flex justify-center">
            <ProgressBar size={70} percent={76} color="#4277ff">
              <ProgressBar size={60} percent={24} color="#7E7D88">
                <span className="text-white">76%</span>
              </ProgressBar>
            </ProgressBar>
          </div>
          <div className="text-orange-500 w-24 xl:w-fit">
            <span className="text-white text-2xl font-semibold">276</span>
            <div className="flex items-center gap-2 text-[#4277ff]">
              <MessageIcon color="#4277ff" />
              <span>Message</span>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly xl:justify-between gap-2">
          <div className="w-24 xl:w-fit text-white flex flex-col py-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#4277ff] rounded-full"></div>
              <span>Sended</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#7e7d88] rounded-full"></div>
              <span>Sending</span>
            </div>
          </div>
          <div className="w-24 xl:w-10 flex flex-col py-2 font-bold">
            <span className="text-[#4277ff]">210</span>
            <span className="text-[#7e7d88]">66</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row p-2 border border-white rounded-lg gap-4 justify-evenly">
        <div className="flex justify-evenly xl:justify-between gap-2">
          <div className="w-24 xl:w-fit flex justify-center">
            <ProgressBar size={70} percent={86} color="#35C75A">
              <ProgressBar size={60} percent={10} color="#7E7D88">
                <ProgressBar size={50} percent={4} color="#FF00FF">
                  <span className="text-white">86%</span>
                </ProgressBar>
              </ProgressBar>
            </ProgressBar>
          </div>
          <div className="text-orange-500 w-24 xl:w-fit">
            <span className="text-white text-2xl font-semibold">4.221</span>
            <div className="flex items-center gap-2 text-[#35C75A]">
              <CourserIcon color="#35C75A" />
              <span>Course</span>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly xl:justify-between gap-2">
          <div className="w-24 xl:w-fit text-white flex flex-col py-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#35C75A] rounded-full"></div>
              <span>Waiting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#7e7d88] rounded-full"></div>
              <span>Used</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <span>Skip</span>
            </div>
          </div>
          <div className="w-24 xl:w-10 flex flex-col py-2 font-bold">
            <span className="text-[#35C75A]">3.799</span>
            <span className="text-[#7e7d88]">422</span>
            <span className="text-pink-400">0</span>
          </div>
        </div>
      </div>
    </div>
  )
}
