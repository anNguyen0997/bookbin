import React from 'react'
import UserHome from './UserHome'
import WantToRead from '../wantToRead/WantToRead'
import HaveRead from '../haveRead/HaveRead'
import CurrentlyReading from '../currentlyReading/CurrentlyReading'

const UserDashBoard = () => {
  return (
    <div className='bg-gray-500 w-full flex flex-col items-center justify-center'>
        
        <div className='bg-gray-200 flex flex-col'>
        
            {/* CURRENTLY READING */}
            <CurrentlyReading />

            {/* WANT TO READ */}
            <WantToRead />

            {/* HAVE READ */}
            <HaveRead />

        </div>

    </div>
  )
}

export default UserDashBoard