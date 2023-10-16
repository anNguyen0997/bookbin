import React, { useState, useEffect } from 'react'
import axios from 'axios'

const HomeBooks = () => {
    const baseURL = 'https://www.googleapis.com/books/v1/volumes?'
    const API_KEY = 'AIzaSyAxCTsiPg28jac0Tufu0V1PNzTmc7cNc0A' 

    const genres = ['mystery', 'fantasy', 'romance', 'thriller', 'horror', 'fiction', 'nonfiction', 'travel', 'science', 'history', 'self-help', '']
    const randomGenres = genres[Math.floor(Math.random() * genres.length)]
    const [books, setBooks] = useState([])

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

  return (
    <div className='bg-gray-500 w-9/12 rounded-xl p-6'>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {books.map((book) => (
            <div key={book.id} className='flex flex-col items-center justify-start p-4 gap-1'>
              <h1 className='text-center'>{book.volumeInfo.title}</h1>
              <img className='w-[45px]' src={book.volumeInfo.imageLinks.smallThumbnail}></img>


            </div>
          ))}
        </div>
        
      </div>
  )
}

export default HomeBooks