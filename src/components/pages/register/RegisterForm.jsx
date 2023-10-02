import React, { useState } from 'react'
import { db } from '../../../config/firebase'
import { 
  getDocs,
  collection,
  addDoc
} from 'firebase/firestore'

const RegisterForm = () => {
  const users = collection(db, 'users')

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [haveRead, setHaveRead] = useState([])
  const [wantToRead, setWantToRead] = useState([])

  const [newUser, setNewUser] = useState({
    email: '',
    username: '',
    password: '',
    haveRead: [],
    wantToRead: []
  })

  const resetUserState = () => {
    
  }

  const registerUser = async () => {
    setHaveRead([])
    setWantToRead([])
    try {
      await addDoc(users, {
        email: email,
        username: username,
        password: password,
        haveRead: haveRead,
        wantToRead: wantToRead
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
            setEmail(e.target.value)} />

          <input type='text'
            className='rounded-lg h-12 text-xl px-4'
            placeholder='Enter Username'
            onChange={(e) =>
            setUsername(e.target.value)}/>

          <input type='password' 
            className='rounded-lg h-12 text-xl px-4' 
            placeholder='Enter Password'
            onChange={(e) =>
            setPassword(e.target.value)} />

          <button className='border rounded-lg h-12 text-xl' onClick={registerUser}>Register</button>
          <a href='/login' className='text-lg'>Have an account?</a>

        </div>
    </div>
  )
}

export default RegisterForm