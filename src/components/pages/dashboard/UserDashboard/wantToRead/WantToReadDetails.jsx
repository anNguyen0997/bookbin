import React, { useState, useEffect } from 'react'
import { db, auth } from '../../../../../config/firebase'
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore'

const WantToReadDetails = () => {
    const [userBooks, setUserBooks] = useState([])
    
    const getUser = async() => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(userReference)

        if (docSnap.exists()) {
            console.log(docSnap.data())
            setUserBooks(docSnap.data().wantToRead)
        } else {
            console.log('this user does not exist')
        }
    }

    const handleRemoveBook = async(book) => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        try {
            await updateDoc(userReference, {
                wantToRead: arrayRemove(book)
            })
            // console.log('book removed successfully')
        } catch (err) {
            console.log(err)
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
    <div className='bg-gray-500 w-full h-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {userBooks.map((book) => (
                <div key={book.id} className='flex flex-col items-center justify-start p-4 gap-1'>
                    <h1 className='text-center'>{book.volumeInfo.title}</h1>
                    <img className='w-[95px]' alt='book cover' src={book.volumeInfo.imageLinks.smallThumbnail}></img>

                    <div className='flex flex-col gap-1'>
                        <button 
                        className='border rounded-lg px-1'
                        // onClick={() => )}
                        >Show more
                        </button>

                        <button 
                        className='border rounded-lg px-1'
                        onClick={() => handleRemoveBook(book)}
                        >Remove
                        </button>
                    </div>

                </div>
            ))}
        </div>
    </div>
  )
}

export default WantToReadDetails