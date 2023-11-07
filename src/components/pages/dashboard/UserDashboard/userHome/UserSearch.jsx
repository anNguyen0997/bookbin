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
    </form>
  )
}

export default UserSearch