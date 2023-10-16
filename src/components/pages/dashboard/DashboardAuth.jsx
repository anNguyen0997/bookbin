import React, { useState, useEffect } from 'react'
import { auth } from '../../../config/firebase'
import UserHome from './UserDashboard/UserHome'
import Login from '../login/Login'

const Dashboard = () => {

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setLoggedIn(true)
        } else {
          setLoggedIn(false)
        }
      })
    })

  return (
    <div className='w-full h-screen flex items-center justify-center'>

      {
        loggedIn
        ?
        <UserHome />
        :
        <Login />
      }

    </div>
  )
}

export default Dashboard