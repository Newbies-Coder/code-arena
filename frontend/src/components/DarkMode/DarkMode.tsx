import { Button } from 'antd'
import { MoonIcon, SunIcon } from '../Icons'
import { useState } from 'react'

export default function DarkMode() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <Button type="default" className="bg-[#2C2F48] border-none w-20" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? (
        <div className="float-right">
          <MoonIcon />
        </div>
      ) : (
        <div className="float-left">
          <SunIcon />
        </div>
      )}
    </Button>
  )
}
