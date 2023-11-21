const Login = () => {
  return <div className="flex h-screen">
    <div className="w-1/2 flex flex-col items-center justify-center">
      <h1 className="text-black text-6xl">Welcome</h1>

      <p className="text-black">We are glad to see you back with us</p>

      <div className="flex flex-col">
        <input type="text" className="h-5 w-20" />
        <span>Wrong email</span>
      </div>

      <div className="">
        <input type="text" />
        <span>Wrong password</span>
      </div>

      <div className="flex">
        <p className="">Forgot password?</p>
        <span className="">Signup now</span>
      </div>

      <button className="">Sign In</button>

      <div className="">
        <p className="">Signin with Others</p>
      </div>

      <div className="">
        <ul className="flex justify-between">
          <li className=""></li>
          <li className=""></li>
          <li className=""></li>
          <li className=""></li>
        </ul>
      </div>
    </div>
    <div className="w-1/2">

    </div>
  </div>
}

export default Login
