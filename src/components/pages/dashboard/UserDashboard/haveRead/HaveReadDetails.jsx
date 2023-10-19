import React, { useState, useEffect } from 'react'
import { db, auth } from '../../../../../config/firebase'
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore'
import UserNavbar from '../userNavbar/UserNavbar'

const HaveReadDetails = () => {
    const [userBooks, setUserBooks] = useState([])
    
    const getUser = async() => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(userReference)

        if (docSnap.exists()) {
            console.log(docSnap.data())
            setUserBooks(docSnap.data().haveRead)
        } else {
            console.log('this user does not exist')
        }
    }
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log(user)
                getUser()
            } else {
                console.log('there are no users signed in')
            }
        })
    }, [])
    
  return (
    <div className='flex flex-col'>

        <UserNavbar />

        <div className='w-full flex flex-col justify-center mt-[60px] md:mt-[85px]
        p-3 gap-2 border-b border-black'>

        {userBooks.map((book) => (
            <div key={book.id} className='h-[150px] rounded-lg flex flex-row gap-6 p-3'>
                <div className='flex justify-center items-center'>
                    <img alt='book cover'
                    className='w-9/12'
                    src={book.volumeInfo.imageLinks.smallThumbnail}></img>
                </div>

                <div className='flex flex-col justify-center items-start'>
                    <div className='flex flex-col'>
                    <h2 className='font-bold text-md md:text-lg'>{book.volumeInfo.title}</h2>
                    <p className='text-sm md:text-md'>by {book.volumeInfo.authors[0]}</p>
                </div>

                <div className='flex flex-col text-sm md:text-md mt-2 gap-1'>
                    <button
                    className='bg-gray-400 text-white border rounded-lg p-1'>
                    + Currently Reading
                    </button>

                    <button
                    className='w-10/12 bg-gray-400 text-white border rounded-lg p-1'>
                    Remove Book
                    </button>
                </div>

          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default HaveReadDetails