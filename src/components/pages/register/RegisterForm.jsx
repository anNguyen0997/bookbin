import React, { useState } from 'react'
import { db } from '../../../config/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { auth } from '../../../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const RegisterForm = () => {
  const users = collection(db, 'users')

  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    haveRead: [],
    wantToRead: []
  })

  const handleCreateUser = async () => {
    setNewUser({ ...newUser, haveRead: [] })
    setNewUser({ ...newUser, wantToRead: []})
    try {
      await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
        .then(credentials => {
          users.addDoc(credentials.user.uid)
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full h-3/6 border rounded-xl
      lg:w-6/12 lg:h-full flex justify-center items-center p-16'>
        <div className='flex flex-col w-9/12 gap-6'>

          <h1 className='text-5xl font-bold text-center mb-10'>Welcome!</h1>

          <input type='email'
            className='rounded-lg h-12 text-xl px-4'
            placeholder='Enter Email'
            onChange={(e) =>
            setNewUser({ ...newUser, email: e.target.value })} />

          <input type='password'
            className='rounded-lg h-12 text-xl px-4'
            placeholder='Enter Password'
            onChange={(e) =>
            setNewUser({ ...newUser, password: e.target.value })} />

          <button className='border rounded-lg h-12 text-xl' onClick={handleCreateUser}>Register</button>
          <a href='/login' className='text-lg'>Have an account?</a>

        </div>
    </div>
  )
}

export default RegisterForm