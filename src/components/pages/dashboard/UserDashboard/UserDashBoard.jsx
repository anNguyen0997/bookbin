import React from 'react'
import UserHome from './UserHome'
import WantToRead from './wantToRead/WantToRead'
import HaveRead from './haveRead/HaveRead'
import CurrentlyReading from './currentlyReading/CurrentlyReading'

const UserDashBoard = () => {
  return (
    <div className='bg-gray-500 w-full flex flex-col items-center justify-center gap-4'>
        
        <div className='bg-gray-200 w-11/12 h-4/6 rounded-lg flex flex-col gap-4'>
        
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