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
    <div className='bg-gray-300 w-full h-1/6 flex flex-col justify-center p-3 gap-2'>
      <h2>Currently Reading:</h2>
      {userBooks.map((book) => (
        <div key={book.id} className='bg-gray-400 w-full h-full rounded-lg flex flex-row gap-2'>
          <div className='flex w-3/12 justify-center items-center'>
            <img src={book.volumeInfo.imageLinks.smallThumbnail}></img>
          </div>

          <div className='flex flex-col gap-1 justify-center'>

            <h2>{book.volumeInfo.title}</h2>
            <p>{book.volumeInfo.authors}</p>
            <button className='border rounded-lg px-2 py-1'>Update Progress</button>

            <div className='flex flex-row'>
              <p>Progress:</p>
              <button className='border'>0 / {book.volumeInfo.pageCount} pages</button>
            </div>

          </div>
        </div>
      ))}


        <div className='bg-gray-400 w-full h-full rounded-lg flex flex-row gap-2'>


        </div>
    </div>
  )
}

export default CurrentlyReading