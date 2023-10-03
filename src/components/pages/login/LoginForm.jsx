import React, { useEffect, useState } from 'react'
import { auth } from '../../../config/firebase'
import { 
  signInWithEmailAndPassword,
  onAuthStateChanged } from 'firebase/auth'

const LoginForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    try {
       signInWithEmailAndPassword(auth, email, password)
        .then(userCreds => {
          console.log(userCreds)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    auth.signOut()
      .then(() => {
        console.log('user has signed logged out')
      })
  }
  
  return (
    <div className='w-full h-3/6 rounded-xl
          lg:w-6/12 lg:h-full flex justify-center items-center p-16'>

          <div className='flex flex-col w-9/12 gap-6'>

            <h1 className='text-5xl font-bold text-center mb-10'>
              Welcome Back to Your Bookshelf
            </h1>

              <input
                type='email'
                className='rounded-lg h-12 text-xl px-4'
                placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
                />

              <input
                type='password'
                className='rounded-lg h-12 text-xl px-4'
                placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)}
                />

              <button 
                className='border rounded-lg h-12 text-xl'
                onClick={handleLogin}
                >Login</button>

              <button 
                className='border rounded-lg h-12 text-xl'
                onClick={handleLogout}>Logout</button>

              <a href='/register' className='text-lg'>Don't have an account?</a>

          </div>

    </div>
  )
}

export default LoginForm