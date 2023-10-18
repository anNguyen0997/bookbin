import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../../../config/firebase'
import UserNavbar from '../userNavbar/UserNavbar'

const UserHome = () => {
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

    const handleBookToWantToRead = async(book) => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        try {
            await updateDoc(userReference, {
                wantToRead: arrayUnion(book)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleBookHaveRead = async(book) => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        try {
            await updateDoc(userReference, {
                haveRead: arrayUnion(book)
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        callapi()
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log(user)
            } else {
              console.log('there are no users signed in')
            }
          })
    }, [])

  return (
    <div className='flex flex-col'>

        <UserNavbar />

        <div className='w-full flex flex-col justify-center
        mt-[60px] md:mt-[85px]'>

            <div className='bg-gray-500 flex flex-col gap-2 p-2'>

                <div className='w-full flex gap-3 text-sm border-b pb-2'>
                    <input placeholder='Title, genre, or author'
                    className='p-2'> 
                    </input>
                </div>

                <div className='flex flex-col gap-1 p-1
                md:grid md:grid-cols-2 md:gap-4 md:p-4'>
                    {books.map((book) => (
                    <div key={book.id}
                    className='flex flex-row items-center justify-start h-[120px]
                    p-4 gap-2 border
                    md:h-[190px]'>
                        <div>
                            <img
                            src={book.volumeInfo.imageLinks.smallThumbnail} 
                            className='w-[55px] md:w-[90px]' />
                        </div>
                    
                        <div className='text-sm md:text-lg'>
                            <h1 className='font-bold'>{book.volumeInfo.title}</h1>
                            <p>by {book.volumeInfo.authors[0]}</p>
                            <div className='flex text-sm md:text-lg gap-2 my-2'>
                                <button 
                                className='border rounded-md py-1 px-2'
                                onClick={() => handleBookToWantToRead(book)}>
                                    Want to Read
                                </button>
                                <button 
                                className='border rounded-md py-1 px-2'
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