import React from 'react'
import LoginForm from './LoginForm'
import Poster from '../../../assets/images/registerImg.jpg'

const Login = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>

      <div className='bg-[#ece7df] w-11/12 h-5/6 rounded-xl border
      lg:flex 
      2xl:w-7/12 2xl:h-4/6 duration-500'>

        <div className='w-full h-3/6 rounded-xl
          lg:w-6/12 lg:h-full'>

          <div className='bg-center w-full h-full rounded-xl
            flex justify-center items-center p-16'
            style={
            { 
              backgroundImage: `url(${Poster})`,
              backgroundSize: 'cover' 
            }
            }>
            
            <div className='text-white text-center'>
              <h1 className='text-4xl font-bold md:text-5xl'>Continue Your Reading Adventure</h1>
              <p className='mt-2 text-2xl md:text-4xl'>Read More!</p>
            </div>
          </div>

        </div>

        <LoginForm />

      </div>

    </div>
  )
}

export default Login