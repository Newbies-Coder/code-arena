import { LOGO } from '@constants/images'

const Login = () => {
  return (
    <>
      <div className="h-screen w-full bg-[#0e1820] flex flex-col justify-between">
        <div className="h-full">
          <div className="w-56 h-1/6 bg-[#6e7479] flex items-center p-3">
            <img src={LOGO.APP_LOGO} alt="" className="bg-[#D9D9D9] rounded-full" />
          </div>
          <div className="w-80 h-2/4 bg-white rounded-r-3xl"></div>
        </div>
        <div className="flex flex-col items-end h-full justify-end">
          <div className="w-80 h-2/4 bg-white rounded-l-3xl"></div>
          <div className="w-56 h-1/6 bg-[#6e7479] p-3"></div>
        </div>
      </div>
      <div className="fixed bg-black border-[10px] border-[#00D1FF] rounded-2xl outline-none top-28 left-14 right-14 bottom-28">
        <h2 className="text-8xl text-white font-smooch text-center mt-4">Sign-in</h2>
      </div>
    </>
  )
}

export default Login
