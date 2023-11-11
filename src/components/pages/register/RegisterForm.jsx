import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../config/firebase'
import { setDoc, doc } from 'firebase/firestore'
import { auth } from '../../../config/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const RegisterForm = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newUser, setNewUser] = useState({
    username: '',
    currentlyReading: [],
    haveRead: [],
    wantToRead: []
  })

  const [errorMsg, setErrorMsg] = useState('')

  const handleCreateUser = async () => {
    setNewUser({ ...newUser, haveRead: [] })
    setNewUser({ ...newUser, wantToRead: [] })
    setNewUser({ ...newUser, currentlyReading: [] })

    if (!newUser.username) {
      setErrorMsg('Please enter a username')
    } else {
      try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password)
        const user = credentials.user
        await updateProfile(user, {
          displayName: newUser.username
        })
        
        await setDoc(doc(db, 'users', credentials.user.uid), newUser)
        navigate('/login')
        // console.log(credentials)
      } catch (error) {
        switch (error.code) {
          case 'auth/invalid-email':
            setErrorMsg('Please enter a valid email')
            break;
          case 'auth/weak-password':
            setErrorMsg('Password should be at least 6 characters')
            break;
          case 'auth/missing-password':
            setErrorMsg('Please enter a password')
            break;
          default:
            console.log(error)
            setErrorMsg('An error occured during registration')
        }
      }
    }

  }

  return (
    <div className='w-full h-3/6 rounded-r-xl
      lg:w-6/12 lg:h-full flex justify-center items-center p-14'>
        
        <form className='flex flex-col w-10/12 gap-2 md:gap-5'
        onSubmit={handleCreateUser}>

          <h1 className='font-bold text-center mb-2 text-2xl md:text-5xl'>
            Welcome!
          </h1>

          <input type='username'
            className='rounded-lg h-8 text-lg text-center md:h-10 md:text-2xl md:py-5'
            placeholder='Enter Username'
            onChange={(e) =>
            setNewUser({ ...newUser, username: e.target.value })} />

          <input type='email'
            className='rounded-lg h-8 text-lg text-center md:h-10 md:text-2xl md:py-5'
            placeholder='Enter Email'
            onChange={(e) => setEmail(e.target.value)} />

          <input type='password'
            className='rounded-lg h-8 text-lg text-center md:h-10 md:text-2xl md:py-5'
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)} />

          <button className='text-black border rounded-lg h-10 text-lg md:h-12 md:text-xl bg-[#d0c3ae]
          hover:scale-105 duration-500'
          onClick={handleCreateUser}>
            Register
          </button>

          <a href='/login' className='mt-4 text-[15px] md:text-lg text-blue-400
          hover:underline'>
            Have an account?
          </a>

          <p className='text-[15px] md:text-md text-red-400'>{errorMsg}</p>

        </form>
    </div>
  )
}

export default RegisterForm