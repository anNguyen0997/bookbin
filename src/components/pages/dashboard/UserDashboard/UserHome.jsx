import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../../config/firebase'

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
    <div className='w-full h-full'>
        <div className='flex flex-col'>
        {books.map((book) => (
            <div key={book.id} className='flex flex-row justify-start p-4 gap-1'>
                
                <img className='w-[50px]' alt='book cover' src={book.volumeInfo.imageLinks.smallThumbnail}></img>

                <div className='flex flex-col gap-1'>

                    <h1 className='text-sm'>{book.volumeInfo.title}</h1>
                    <h1 className='text-sm'>{book.volumeInfo.authors}</h1>

                    <button
                        className=' text-sm border rounded-lg px-1'
                        onClick={() => handleBookToWantToRead(book)}
                    >Want to Read
                    </button>

                    <button 
                        className='text-sm border rounded-lg px-1'
                        onClick={() => handleBookHaveRead(book)}
                    >Read
                    </button>
                </div>

            </div>
        ))}
        </div>
    </div>
  )
}

export default UserHome