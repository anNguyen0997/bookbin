import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../navbar/Navbar'
import UserHome from '../dashboard/UserDashboard/userHome/UserHome'
import { auth } from '../../../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const Home = () => {
    const [user, setUser] = useState(null)
    const [books, setBooks] = useState([])

    const baseURL = 'https://www.googleapis.com/books/v1/volumes?'
    const API_KEY = 'AIzaSyAxCTsiPg28jac0Tufu0V1PNzTmc7cNc0A'
    const genres = [
      'mystery', 'fantasy', 'romance', 'thriller', 'horror',
      'fiction', 'nonfiction', 'travel', 'science', 'history', 'self-help'
    ]
    const randomGenres = genres[Math.floor(Math.random() * genres.length)]
    const [genreResult, setGenreResult] = useState('')

    const callapi = () => {
        setGenreResult(randomGenres)
        axios.get(`${baseURL}q=subject:${randomGenres}&printType=books&orderBy=newest&maxResults=20&key=${API_KEY}`)
        .then(res => {
            const data = res.data.items
            setBooks(data)
        })
        .catch(err => console.log(err))
    }

    // const searchAPI = () => {
    //   axios.get(`${baseURL}q=&printType=books&orderBy=newest&key=${API_KEY}`)
    //     .then(res => {
    //         const data = res.data.items
    //         setBooks(data)
    //     })
    //     .catch(err => console.log(err))
    // }

    useEffect(() => {
        callapi()
        onAuthStateChanged(auth, (user) => {
          setUser(user)
        })
    }, [])
  
  return (
    <>
      {
        user ?
        <UserHome />
        :
        <div className='flex flex-col'>

        <Navbar />

        <div className=' w-full flex flex-col justify-center
        mt-[60px] md:mt-[85px]'>

          <div className='bg-[#E4DCCF] flex flex-col gap-2 p-2'>

            <div className='w-full flex gap-3 text-sm border-b border-[#BFB29E] pb-2 md:text-lg'>
              <input placeholder='Title, genre, or author'
              className='w-full md:w-3/12 px-4 py-2 rounded-lg'> 
              </input>
            </div>

            <div className='text-sm md:text-lg md:mt-2'>
              <h4>Explore newest books in <span className='text-[#26577C] capitalize font-semibold'>{genreResult}</span></h4>
            </div>

            <div className='flex flex-col gap-1
            md:grid md:grid-cols-2 md:gap-4 md:p-2'>

              {books.map((book) => (
                <div key={book.id}
                  className='flex flex-row items-center justify-start h-[110px]
                  p-2 gap-2 border border-[#BFB29E] rounded-md
                  md:h-[190px]'>
                  <div>
                    <img
                    src={book.volumeInfo.imageLinks.smallThumbnail} 
                    className='w-[55px] md:w-[90px]'></img>
                  </div>
                
                  <div className='text-sm md:text-lg'>
                    <h1 className='font-bold'>{book.volumeInfo.title}</h1>
                    <p>by {book.volumeInfo.authors[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      }
    </>
  )
}

export default Home