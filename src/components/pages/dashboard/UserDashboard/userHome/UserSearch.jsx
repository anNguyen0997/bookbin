import React, { useState } from 'react'

const UserSearch = ({ userSearch }) => {
    const [searchInput, setSearchInput] = useState('')

    const handleSearch = () => {
        userSearch(searchInput)
    }

    const handleInput = (e) => {
        setSearchInput(e.target.value.replace(/\s/g, ''));
      };

  return (
    <div className='w-full flex gap-3 text-sm border-b border-[#BFB29E] pb-2 md:text-lg'>
        <input placeholder='Title, genre, or author'
        className='w-full md:w-4/12 px-4 py-2 rounded-lg'
        onChange={handleInput} > 
        </input>

        <button
        className='bg-[#6A9C89] border border-[#6A9C89] rounded-md py-1 px-2 text-white'
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  )
}

export default UserSearch