import React from 'react'

const LoginForm = () => {
  return (
    <div className='w-full h-3/6 rounded-xl
          lg:w-6/12 lg:h-full flex justify-center items-center p-16'>
          <div className='flex flex-col w-9/12 gap-6'>
            <h1 className='text-5xl font-bold text-center mb-10'>Welcome Back to Your Bookshelf</h1>

              <input className='rounded-lg h-12 text-xl px-4' placeholder='Enter Username'></input>
              <input type='password' className='rounded-lg h-12 text-xl px-4' placeholder='Enter Password'></input>
              <button className='border rounded-lg h-12 text-xl'>Login</button>
              <a href='/register' className='text-lg'>Don't have an account?</a>

          </div>
    </div>
  )
}

export default LoginForm