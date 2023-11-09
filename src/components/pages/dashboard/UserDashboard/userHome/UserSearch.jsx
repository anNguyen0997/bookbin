import React, { useState } from 'react'

const UserSearch = ({ userSearch }) => {
    const [searchInput, setSearchInput] = useState('')

    const handleSearch = (e) => {
      e.preventDefault()
        userSearch(searchInput)
    }

    const handleInput = (e) => {
        setSearchInput(e.target.value.replace(/\s/g, ''));
      };

  return (
    <form 
    className='w-full flex gap-2 text-sm border-b border-[#BFB29E] pb-2 md:text-lg'
    onSubmit={handleSearch}>
        <input placeholder='Search'
        className='w-full md:w-4/12 px-4 py-2 rounded-lg border-2
        focus:outline-none focus:outline-[#BFB29E]'
        onChange={handleInput} > 
        </input>

        <button
        className='border border-[#6A9C89] rounded-md py-1 px-2 text-white
        bg-[#6A9C89] hover:bg-[#527a6b] hover:scale-105
        duration-500'
        onClick={handleSearch}
        >
          Search
        </button>
    </form>
  )
}

export default UserSearch