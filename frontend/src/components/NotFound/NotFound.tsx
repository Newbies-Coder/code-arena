import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { NotFoundSVG } from '../Icons'
const NotFound = () => {
  const navigate = useNavigate()
  const handelBackHome = () => {
    navigate('/')
  }
  return (
    <Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);',
        }}
      />
      <div className="relative flex items-center min-h-screen p-5 overflow-hidden bg-blue-100 min-w-screen lg:p-20">
        <div className="relative items-center flex-1 min-w-full min-h-full p-10 text-center text-gray-800 bg-white shadow-xl rounded-3xl lg:p-20 md:flex md:text-left">
          <div className="w-full md:w-1/2">
            <div className="mb-10 font-light text-gray-600 md:mb-20">
              <h1 className="mb-10 text-3xl font-black text-purple-500 uppercase lg:text-5xl">Oop! Page not found</h1>
              <p>The page you're looking for isn't available.</p>
              <p>Try searching again or use the Go Back button below.</p>
            </div>
            <div className="mb-20 md:mb-0">
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-purple-500 rounded-full outline-none hover:bg-purple-500 focus:outline-none hover:text-white"
                onClick={handelBackHome}
              >
                <i className="mr-2 mdi mdi-arrow-left" />
                Go Back
              </button>
            </div>
          </div>
          <div className="w-full text-center md:w-1/2">
            <NotFoundSVG className={'w-full max-w-lg mx-auto lg:max-w-full'} />
          </div>
        </div>
        <div className="absolute w-64 transform -rotate-45 bg-blue-200 rounded-full pointer-events-none md:w-96 h-96 md:h-full bg-opacity-30 -top-64 md:-top-96 right-20 md:right-32" />
        <div className="absolute h-full transform -rotate-45 bg-yellow-200 rounded-full pointer-events-none w-96 bg-opacity-20 -bottom-96 right-64" />
      </div>
    </Fragment>
  )
}

export default NotFound
