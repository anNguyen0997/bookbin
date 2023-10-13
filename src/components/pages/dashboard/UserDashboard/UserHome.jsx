import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { auth } from '../../../../config/firebase'

const UserHome = () => {

    const baseURL = 'https://www.googleapis.com/books/v1/volumes?'
    const API_KEY = 'AIzaSyAxCTsiPg28jac0Tufu0V1PNzTmc7cNc0A' 

    const genres = ['mystery', 'fantasy', 'romance', 'thriller', 'horror', 'fiction', 'nonfiction', 'travel', 'science', 'history', 'self-help', '']
    const randomGenres = genres[Math.floor(Math.random() * genres.length)]
    
    const [books, setBooks] = useState([])
    const [userDIsplayName, setUserDisplayName] = useState('')

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

        auth.onAuthStateChanged(user => {
            if (user) {
                console.log(user)
                setUserDisplayName(user.email)
            } else {
              console.log('there are no users signed in')
            }
          })
    }, [])

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center p-10'>

        <div>
            <h1>Welcome back, {userDIsplayName}!</h1>
        </div>

        <div className='bg-gray-500 w-full h-full'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {books.map((book) => (
                <div key={book.id} className='flex flex-col items-center justify-start p-4 gap-1'>
                <h1 className='text-center'>{book.volumeInfo.title}</h1>
                <img className='w-[95px]' src={book.volumeInfo.imageLinks.smallThumbnail}></img>

                <div className='flex flex-col gap-1'>
                    <button className='border rounded-lg px-1'>Want to Read</button>
                    <button className='border rounded-lg px-1'>Read</button>
                </div>

                </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default UserHome