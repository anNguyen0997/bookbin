import React from 'react'
import RegisterForm from './RegisterForm'
import Poster from '../../../assets/images/registerImg.jpg'

const Register = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>

      <div className='bg-gray-300 w-9/12 h-4/6 border rounded-xl
      lg:flex'>

        <div className='w-full h-3/6 border rounded-xl
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
              <h1 className='text-2xl font-bold md:text-5xl'>Start Your Reading Journey Here</h1>
              <p className='mt-2 text-lg md:text-4xl'>Read More!</p>
            </div>
          </div>

        </div>

        <RegisterForm />

      </div>

    </div>
  )
}

export default Register