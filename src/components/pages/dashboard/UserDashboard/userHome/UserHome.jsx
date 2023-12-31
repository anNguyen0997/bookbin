import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../../../config/firebase'
import UserNavbar from '../userNavbar/UserNavbar'
import UserSearch from './UserSearch'
import genreList from '../../../genreList'

const UserHome = () => {
    const [books, setBooks] = useState([])
    const [userData, setUserData] = useState({})

    const API_URL = process.env.REACT_APP_API_URL
    const API_KEY = process.env.REACT_APP_API_KEY
    const randomGenre = genreList()
    const [genreResult, setGenreResult] = useState('')

    const callAPI = () => {
        setGenreResult(randomGenre)
        axios.get(`${API_URL}q=subject:${randomGenre}&printType=books&orderBy=newest&maxResults=24&key=${API_KEY}`)
        .then(res => {
            const data = res.data.items
            setBooks(data)
            // console.log(data)
        })
        .catch(err => console.log(err))
    }

    const getUser = async() => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(userReference)

        if (docSnap.exists()) {
            // console.log(docSnap.data())
            setUserData(docSnap.data())
        } else {
            console.log('there are no users')
        }
    }
      
    const handleSearch = (userSearch) => {
        axios.get(`${API_URL}q=${userSearch}&printType=books&orderBy=relevance&maxResults=20&key=${API_KEY}`)
        .then(res => {
            const data = res.data.items
            setBooks(data)
            // console.log(data)
        })
        .catch(err => console.log('error'))
    }

    const handleBookToWantToRead = async(book) => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        const bookExists = userData.wantToRead.some((currentBook) => currentBook.id === book.id)

        if (!bookExists) {
            try {
                await updateDoc(userReference, {
                    wantToRead: arrayUnion(book)
                })
            } catch (err) {
                console.log(err)
            }
        } else {
            console.log('Book is already in wantToRead list')
        }
    }

    const handleBookHaveRead = async(book) => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        const bookExists = userData.haveRead.some((currentBook) => currentBook.id === book.id)
        
        if (!bookExists) {
            try {
                await updateDoc(userReference, {
                    haveRead: arrayUnion(book)
                })
            } catch (err) {
                console.log(err)
            }
        } else {
            console.log('Book is already in haveRead list')
        }

    }

    useEffect(() => {
        callAPI()
        getUser()
    }, [])

  return (
    <div className='flex flex-col'>

        <UserNavbar />

        <div className='w-full flex flex-col justify-center
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
 
                        <div className='text-sm md:text-lg'>
                            <h1 className='font-bold'>{book.volumeInfo.title}</h1>
                            {book.volumeInfo.authors && book.volumeInfo.authors.length > 0 && (
                                <p>by {book.volumeInfo.authors[0]}</p>
                            )}
                            
                            <div className='flex text-sm md:text-[16px] 2xl:text-[20px] gap-2 my-2'>
                                <button 
                                    className='bg-[#75a392] hover:bg-[#6A9C89] rounded-md text-white
                                    py-1 px-2 md:py-2 md:px-3 duration-500
                                    hover:scale-105'
                                    onClick={() => handleBookToWantToRead(book)}>
                                    Want to Read
                                </button>
                                <button 
                                    className='bg-[#75a392] hover:bg-[#6A9C89] rounded-md text-white
                                    py-1 px-2 md:py-2 md:px-3 duration-500
                                    hover:scale-105'
                                    onClick={() => handleBookHaveRead(book)}>
                                    Have Read
                                </button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>

            </div>

      </div>

    </div>
  )
}

export default UserHome