import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../config/firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

const LoginForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
       const credentials = await signInWithEmailAndPassword(auth, email, password)
        // console.log(credentials)
        setTimeout(async () => {
        await signOut(auth)
        // console.log('user auto-logged out')
       }, 1 * 60 * 60 * 1000)
       navigate('/-profile')
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMsg('Please enter a valid email')
          break;
        case 'auth/invalid-login-credentials':
          setErrorMsg('Wrong password or email')
          break;
        case 'auth/missing-password':
          setErrorMsg('Please enter a password')
          break;
        default:
          console.log(error)
          setErrorMsg('An error occured during login')
      }
    }
  }
  
  return (
    <div className='w-full h-3/6 rounded-xl
          lg:w-6/12 lg:h-full flex justify-center items-center p-14'>

          <form className='flex flex-col w-10/12 gap-2 md:gap-5'
          onSubmit={handleLogin}>

            <h1 className='font-bold text-center mb-2 text-2xl md:text-5xl'>
              Welcome Back!
            </h1>

              <input
                type='email'
                className='rounded-lg h-8 text-lg text-center md:h-10 md:text-2xl md:py-5'
                placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
                />

              <input
                type='password'
                className='rounded-lg h-8 text-lg text-center md:h-10 md:text-2xl md:py-5'
                placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)}
                />

              <button 
                className='text-black border rounded-lg h-10 text-lg md:h-12 md:text-xl bg-[#d0c3ae]
                hover:scale-105 duration-500'
                onClick={handleLogin}
                >
                  Login
              </button>

              <a href='/register' 
                className='mt-4 text-[15px] md:text-lg text-blue-400
                hover:underline'>
                  Don't have an account?
              </a>

              <p className='text-[15px] md:text-md text-red-400'>{errorMsg}</p>

          </form>

    </div>
  )
}

export default LoginForm