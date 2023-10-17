import React, { useState, useEffect } from 'react'
import { auth } from '../../../config/firebase'
import UserHome from './UserDashboard/userHome/UserHome'

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
    <>

      {
        loggedIn
        ?
        <UserHome />
        :
        <h1>sign in</h1>
      }

    </>
  )
}

export default Dashboard