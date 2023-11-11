import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../navbar/Navbar'
import UserHome from '../dashboard/UserDashboard/userHome/UserHome'
import UserSearch from '../dashboard/UserDashboard/userHome/UserSearch'
import { auth } from '../../../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import genreList from '../genreList'

const Home = () => {
    const [user, setUser] = useState(null)
    const [books, setBooks] = useState([])

    const API_URL = process.env.REACT_APP_API_URL
    const API_KEY = process.env.REACT_APP_API_KEY
    const randomGenre = genreList()
    const [genreResult, setGenreResult] = useState('')

    const callapi = () => {
        setGenreResult(randomGenre)
        axios.get(`${API_URL}q=subject:${randomGenre}&printType=books&orderBy=newest&maxResults=24&key=${API_KEY}`)
        .then(res => {
            const data = res.data.items
            setBooks(data)
        })
        .catch(err => console.log(err))
    }

    const handleSearch = (userSearch) => {
      axios.get(`${API_URL}q=${userSearch}&printType=books&orderBy=relevance&maxResults=20&key=${API_KEY}`)
      .then(res => {
          const data = res.data.items
          setBooks(data)
      })
      .catch(err => console.log('error'))
    }

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

          <div className='bg-[#E4DCCF] flex flex-col gap-2 p-2
            md:px-[100px] 2xl:px-[200px]
            duration-500'>

            <UserSearch userSearch={handleSearch}/>

            <div className='text-sm md:text-lg md:mt-2'>
              <h4>Explore newest books in <span className='text-[#26577C] capitalize font-semibold'>{genreResult}</span></h4>
            </div>

            <div className='flex flex-col gap-1
                md:grid lg:grid-cols-2 2xl:grid-cols-3 md:gap-4 md:py-2 md:px-8'>

              {books.map((book) => (
                <div key={book.etag}
                  className='flex flex-row items-center justify-start h-[120px]
                  p-2 gap-4 border border-[#BFB29E] rounded-md
                  md:p-4 md:h-[190px]'>
                    {book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail && (
                    <img
                      src={book.volumeInfo.imageLinks.smallThumbnail} 
                      className='w-[55px] md:w-[110px]'
                      alt={`Thumbnail for ${book.volumeInfo.title}`}
                    />
                    )}
                  {/* <div>
                    <img
                    src={book.volumeInfo.imageLinks.smallThumbnail} 
                    className='w-[55px] md:w-[110px]'></img>
                  </div> */}
                
                  <div className='text-sm md:text-lg'>
                    <h1 className='font-bold'>{book.volumeInfo.title}</h1>
                    {book.volumeInfo.authors && book.volumeInfo.authors.length > 0 && (
                      <p>by {book.volumeInfo.authors[0]}</p>
                    )}
                    {/* <p>by {book.volumeInfo.authors[0]}</p> */}
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