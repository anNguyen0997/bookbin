import React, { useState, useEffect } from 'react'
import { auth } from '../../../config/firebase'
import Home from '../home/Home'
import UserDashBoard from './UserDashboard/UserDashBoard'
import UserHome from './UserDashboard/UserHome'

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
        <Home />
      }

    </div>
  )
}

export default Dashboard