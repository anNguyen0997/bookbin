import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../../../../config/firebase'
import { TiThMenu, TiTimes } from 'react-icons/ti'

const UserNavbar = () => {
  const navigate = useNavigate()
  const [menuToggle, setMenuToggle] = useState(false)
  const [toggleLogoutModal, setToggleLogoutModal] = useState(false)
  const links = [
    {name: 'Profile', link: '/-profile'},
    {name: 'Discover', link: '/'}
  ]

  const handleMenuToggle = () => {
    setMenuToggle(!menuToggle)
  }

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/')
    })
  }

  return (
    <div className='w-full fixed'>
        <div className='bg-[#BFB29E] text-white flex flex-row items-center justify-between 
        py-4 px-8 border-b-2 border-b-gray
        md:flex md:px-14'>

            <div className='text-xl cursor-pointer md:text-3xl'>
               Bookbin
            </div>

            <div onClick={handleMenuToggle} className='text-md cursor-pointer md:hidden'>
              {menuToggle ? (
                <TiTimes /> // Render TiTimes when menuToggle is true
                ) : (
                <TiThMenu /> // Render TiThMenu when menuToggle is false
              )}
            </div>

            <ul className={`bg-[#BFB29E] w-full fixed z-[-1] left-0
            md:flex md:items-center md:pb-0 md:static md:z-auto md:w-auto md:pl-0
            transition-all duration-500 ease-in 
            ${menuToggle ? 'top-[61px]':'top-[-300px]'}`}>
                {
                    links.map((link) => (
                      <li key={link.name} 
                      className=' text-sm py-3 px-4 md:text-xl group transition-all ease-in-out duration-200'>
                          <Link to={link.link}>

                            <span className="bg-left-bottom bg-gradient-to-r from-white to-white 
                            bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] 
                            transition-all duration-500 ease-out">
                            {link.name}
                            </span>
                            
                          </Link>
                      </li>
                    ))
                }
                <button 
                className='text-sm py-3 px-5 md:text-xl'
                onClick={() => setToggleLogoutModal(true)}
                >Logout
                </button>
            </ul>

        </div>

        <div className={!toggleLogoutModal ? `hidden`:  `z-10 fixed inset-0 w-full h-full
        flex justify-center items-center
        backdrop-blur-sm`}>
          <div className='bg-[#E4DCCF] flex flex-col justify-center items-center 
          text-md w-8/12 py-8 rounded-lg gap-6 border-4 border-[#BFB29E]
          md:text-xl md:w-6/12 md:h-1/6'>
                <div className='text-center px-16 font-bold'>
                  <h1>Are you sure you want to Logout?</h1>
                </div>
                <div className='flex flex-row gap-4'>
                  <button 
                  className='text-white py-2 px-3 rounded-md
                  bg-gray-400 hover:bg-gray-500 hover:scale-105
                  duration-500'
                  onClick={() => setToggleLogoutModal(false)}>
                    Cancel
                  </button>

                  <button 
                  className='text-white py-2 px-3 rounded-md
                  bg-red-400 hover:bg-red-600 hover:scale-105
                  duration-500'
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