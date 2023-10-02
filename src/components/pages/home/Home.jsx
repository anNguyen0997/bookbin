import React, { useEffect, useState } from 'react'
import axios from 'axios'
import HomeBooks from './HomeBooks'

const Home = () => {

    const baseURL = 'https://www.googleapis.com/books/v1/volumes?'
    const API_KEY = 'AIzaSyAxCTsiPg28jac0Tufu0V1PNzTmc7cNc0A' 

    const genres = ['mystery', 'fantasy', 'romance', 'thriller', 'horror', 'fiction', 'nonfiction', 'travel', 'science', 'history', 'self-help', '']
    const randomGenres = genres[Math.floor(Math.random() * genres.length)]

    const callapi = () => {
        axios.get(`${baseURL}q=subject:${randomGenres}&printType=books&orderBy=newest&key=${API_KEY}`)
        .then(res => {
            const data = res.data.items
            setBooks(data)
            console.log(data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        callapi()
    }, [])

    const [books, setBooks] = useState([])

  return (
    <div className='w-full h-screen flex items-center justify-center px-3 sm:px-6 gap-2 sm:gap-4'>
      <div className='bg-gray-500 w-3/12 h-4/6 rounded-xl'>
        <div className='w-full flex flex-col p-4 gap-4'>

          <input placeholder='Search'
            className='p-2 rounded-md'> 
          </input>

          <div className='flex flex-col gap-2'>
            <h3 className='text-md sm:text-2xl font-semibold'>Genres</h3>
            <ul className='flex flex-col gap-1'>
              {genres.map((genre) => (
                <li key={genre}
                className='text-sm sm:text-lg'>
                  {genre}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      <HomeBooks />

    </div>
  )
}

export default Home