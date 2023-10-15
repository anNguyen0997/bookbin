import React, { useState, useEffect } from 'react'
import { db, auth } from '../../../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'

const UserBooks = () => {

    const [userDIsplayName, setUserDisplayName] = useState('')
    const [userBooks, setUserBooks] = useState([])

    const getUser = async() => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(userReference)

        if (docSnap.exists()) {
            console.log(docSnap.data().wantToRead)
            setUserBooks(docSnap.data().wantToRead)
        } else {
            console.log('this user does not exist')
        }
    }
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log(user)
                setUserDisplayName(user.email)
                getUser()
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
                {userBooks.map((book) => (
                    <div key={book.id} className='flex flex-col items-center justify-start p-4 gap-1'>
                    <h1 className='text-center'>{book.volumeInfo.title}</h1>
                    <img className='w-[95px]' alt='book cover' src={book.volumeInfo.imageLinks.smallThumbnail}></img>

                    <div className='flex flex-col gap-1'>
                        <button 
                        className='border rounded-lg px-1'
                        // onClick={() => }
                        >Want to Read
                        </button>

                        <button 
                        className='border rounded-lg px-1'
                        >Read
                        </button>
                    </div>

                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default UserBooks