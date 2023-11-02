import React from 'react'
import { useNavigate } from 'react-router-dom'
import UserHome from '../userHome/UserHome'
import UserNavbar from './UserNavbar'
import UserProfile from '../userProfile/UserProfile'
import CurrentlyReading from '../currentlyReading/CurrentlyReading'
import WantToRead from '../wantToRead/WantToRead'
import HaveRead from '../haveRead/HaveRead'

const UserContainer = () => {
    const [toggleLogoutModal, setToggleLogoutModal] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log('user logged out')
      navigate('/')
    })
  }
  return (
    <>
        <UserNavbar 
        toggleLogoutModal={toggleLogoutModal}
        setToggleLogoutModal={setToggleLogoutModal}
        handleLogout={handleLogout}
        />

        <UserHome toggleLogoutModal={toggleLogoutModal}/>

        <UserProfile toggleLogoutModal={toggleLogoutModal}/>

        {/* CURRENTLY READING */}
        <CurrentlyReading toggleLogoutModal={toggleLogoutModal}/>

        {/* WANT TO READ */}
        <WantToRead toggleLogoutModal={toggleLogoutModal}/>

        {/* HAVE READ */}
        <HaveRead toggleLogoutModal={toggleLogoutModal}/>

    </>
  )
}

export default UserContainer