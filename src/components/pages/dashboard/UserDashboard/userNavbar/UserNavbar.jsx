import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../../../../config/firebase'

const UserNavbar = () => {
  const navigate = useNavigate()
  const links = [
    {name: 'Profile', link: '/profile'},
    {name: 'Discover', link: '/discover'},
    {name: 'My books', link: '/mybooks'},
  ]

  const [menuToggle, setMenuToggle] = useState(false)
  const handleMenuToggle = () => {
    setMenuToggle(!menuToggle)
  }

  const [toggleLogoutModal, setToggleLogoutModal] = useState(false)
  const toggleModal = () => {
    setToggleLogoutModal(true)
  }

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log('user logged out')
      navigate('/')
    })
  }

  return (
    <div className='w-full fixed'>
        <div className='bg-white flex flex-row items-center justify-between 
        py-4 px-8 border-b-2 border-b-gray
        md:flex md:px-14 lg:px-16'>

            <div className='text-xl cursor-pointer md:text-3xl'>
               Bookbin
            </div>

            <div onClick={handleMenuToggle} className='text-sm cursor-pointer md:hidden'>
                <h1>{!menuToggle ? 'O' : 'X'}</h1>
            </div>

            <ul className={`w-full fixed bg-white z-[-1] left-0
            md:flex md:items-center md:pb-0 md:static md:z-auto md:w-auto md:pl-0
            transition-all duration-500 ease-in 
            ${menuToggle ? 'top-[61px]':'top-[-300px]'}`}>
                {
                    links.map((link) => (
                        <li key={link.name} 
                        className='text-sm py-3 px-5 md:text-lg'>
                            <Link to={link.link} className=''>{link.name}</Link>
                        </li>
                    ))
                }
                <button 
                className='text-sm py-3 px-5 md:text-lg'
                onClick={() => setToggleLogoutModal(true)}
                >Logout
                </button>
            </ul>

        </div>

        <div className={!toggleLogoutModal ? `hidden`:  `fixed inset-0 w-full h-full
        flex justify-center items-center
        backdrop-blur-sm`}>
          <div className='flex flex-col justify-center items-center 
          w-9/12 h-2/6 bg-white rounded-lg gap-6
          '>
                <div className='text-center px-16'>
                  <h1>Are you sure you want to Logout?</h1>
                </div>
                <div className='flex flex-row gap-4'>
                  <button 
                  className='border py-1 px-2 rounded-md'
                  onClick={() => setToggleLogoutModal(false)}>
                    Cancel
                  </button>

                  <button 
                  className='border py-1 px-2 rounded-md'
                  onClick={handleLogout}
                  >Logout
                  </button>
                </div>
          </div>
        </div>

    </div>
  )
}

export default UserNavbar