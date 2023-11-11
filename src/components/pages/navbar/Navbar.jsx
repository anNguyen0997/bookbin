import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TiThMenu, TiTimes } from 'react-icons/ti'

const Navbar = () => {
  const links = [
    {name: 'Login', link: '/login'},
    {name: 'Sign Up', link: '/register'}
  ]

  const [menuToggle, setMenuToggle] = useState(false)
  const handleMenuToggle = () => {
    setMenuToggle(!menuToggle)
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
            ${menuToggle ? 'top-[61px]':'top-[-100px]'}`}>
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
            </ul>

        </div>
    </div>
  )
}

export default Navbar