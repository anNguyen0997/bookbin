import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../config/firebase'
import { setDoc, doc } from 'firebase/firestore'
import { auth } from '../../../config/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const RegisterForm = () => {
  const navigate = useNavigate()

  const [newUser, setNewUser] = useState({
    email: '',
    username: '',
    password: '',
    currentlyReading: [],
    haveRead: [],
    wantToRead: []
  })

  const handleCreateUser = async () => {
    setNewUser({ ...newUser, haveRead: [] })
    setNewUser({ ...newUser, wantToRead: []})
    setNewUser({ ...newUser, currentlyReading: []})
    try {
      const credentials = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      const user = credentials.user
      const displayName = newUser.username
      await updateProfile(user, {
        displayName
      })
      
      await setDoc(doc(db, 'users', credentials.user.uid), newUser)
      navigate('/-profile')
      console.log(credentials)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full h-3/6 border rounded-xl
      lg:w-6/12 lg:h-full flex justify-center items-center p-16'>
        <div className='flex flex-col w-9/12 gap-2 md:gap-5'>

          <h1 className='font-bold text-center mb-2 text-lg md:text-5xl'>Welcome!</h1>

          <input type='username'
            className='rounded-lg h-6 text-sm text-center md:h-10 md:text-xl md:py-5'
            placeholder='Enter Username'
            onChange={(e) =>
            setNewUser({ ...newUser, username: e.target.value })} />

          <input type='email'
            className='rounded-lg h-6 text-sm text-center md:h-10 md:text-xl md:py-5'
            placeholder='Enter Email'
            onChange={(e) =>
            setNewUser({ ...newUser, email: e.target.value })} />

          <input type='password'
            className='rounded-lg h-6 text-sm text-center md:h-10 md:text-xl md:py-5'
            placeholder='Enter Password'
            onChange={(e) =>
            setNewUser({ ...newUser, password: e.target.value })} />

          <button className='border rounded-lg h-6 text-sm md:h-10 md:text-xl' onClick={handleCreateUser}>Register</button>
          <a href='/login' className='text-[11px] md:text-lg'>Have an account?</a>

        </div>
    </div>
  )
}

export default RegisterForm