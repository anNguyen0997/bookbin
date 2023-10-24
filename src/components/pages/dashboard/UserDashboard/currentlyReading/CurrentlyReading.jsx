import React, { useState, useEffect } from 'react'
import { db, auth } from '../../../../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'

const CurrentlyReading = () => {
    const [userBooks, setUserBooks] = useState([])
    
    const getUser = async() => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(userReference)

        if (docSnap.exists()) {
            // console.log(docSnap.data())
            setUserBooks(docSnap.data().currentlyReading)
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
    <div className='w-full flex flex-col justify-center
    text-md md:text-lg p-3 gap-2'>

      <h2>Currently Reading:</h2>
      {userBooks.map((book) => (
        <div key={book.id} className='bg-gray-500 rounded-lg flex flex-row gap-6 p-3'>

          <div className='flex justify-center items-center'>
            <img alt='book cover'
            src={book.volumeInfo.imageLinks.smallThumbnail}></img>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col'>
              <h2>{book.volumeInfo.title}</h2>
              <p>by {book.volumeInfo.authors}</p>
            </div>

            <button
            className='border rounded-lg p-2 mt-5'>
              Book Completed</button>

            {/* <div className='flex flex-row gap-1'>
              <p>Progress:</p>
              <button className='border'>0 / {book.volumeInfo.pageCount} pages</button>
            </div> */}

          </div>
        </div>
      ))}

    </div>
  )
}

export default CurrentlyReading