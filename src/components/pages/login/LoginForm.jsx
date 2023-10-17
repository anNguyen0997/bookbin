import React, { useEffect, useState } from 'react'
import { auth } from '../../../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const LoginForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    try {
       signInWithEmailAndPassword(auth, email, password)
        .then(userCreds => {
          auth.onAuthStateChanged(user => {
            console.log(`user logged in: `, user)
          })
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    auth.signOut()
    auth.onAuthStateChanged(user => {
        console.log(`user logged out:`, user)
    })
     
  }
  
  return (
    <div className='w-full h-3/6 rounded-xl
          lg:w-6/12 lg:h-full flex justify-center items-center p-16'>

          <div className='flex flex-col w-9/12 gap-2 md:gap-5'>

            <h1 className='font-bold text-center mb-2 text-lg md:text-5xl'>
              Welcome Back!
            </h1>

              <input
                type='email'
                className='rounded-lg h-6 text-sm text-center md:h-10 md:text-xl md:py-5'
                placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
                />

              <input
                type='password'
                className='rounded-lg h-6 text-sm text-center md:h-10 md:text-xl md:py-5'
                placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)}
                />

              <button 
                className='border rounded-lg h-6 text-sm md:h-10 md:text-xl'
                onClick={handleLogin}
                >Login</button>

              {/* <button 
                className='border rounded-lg h-6 text-sm'
                onClick={handleLogout}>Logout</button> */}

              <a href='/register' className='text-[11px] md:text-lg'>Don't have an account?</a>

          </div>

    </div>
  )
}

export default LoginForm