import React from 'react'
import WantToRead from '../wantToRead/WantToRead'
import HaveRead from '../haveRead/HaveRead'
import CurrentlyReading from '../currentlyReading/CurrentlyReading'
import UserNavbar from '../userNavbar/UserNavbar'

const UserProfile = () => {
  return (
    <div className='flex flex-col'>

      <UserNavbar />

      <div className='bg-[#E4DCCF] w-full flex flex-col items-center justify-center
      mt-[60px] md:mt-[85px]'>
          
          <div className='w-full flex flex-col'>
          
              {/* CURRENTLY READING */}
              <CurrentlyReading />

              {/* WANT TO READ */}
              <WantToRead />

              {/* HAVE READ */}
              <HaveRead />

              <div className='flex justify-center items-center'>
                Favorite genres
              </div>

          </div>

      </div>
    </div>
    
  )
}

export default UserProfile