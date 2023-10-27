import React, { useState, useEffect } from 'react'
import { db, auth } from '../../../../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'

const CurrentlyReading = () => {
    const [userBooks, setUserBooks] = useState([])
    const [toggleModal, setToggleModal] = useState(false)
    
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

    const handleCompleteBook = (book) => {
      
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
              <h2 className='font-bold'>{book.volumeInfo.title}</h2>
              <p>by {book.volumeInfo.authors}</p>
            </div>

            <button
            className='border rounded-lg p-2 mt-5'
            onClick={() => setToggleModal(true)}>
              Book Completed
            </button>

          </div>

          {/* Book Completed Modal */}
          <div className={!toggleModal ? `hidden`:  `z-10 fixed inset-0 w-full h-full
          flex justify-center items-center
          backdrop-blur-sm`}>
            <div className='bg-[#E4DCCF] flex flex-col justify-center items-center 
            text-md w-8/12 py-8 rounded-lg gap-6 border-4 border-[#BFB29E]
            md:text-2xl md:w-6/12 md:h-1/6'>
              <div className='text-center px-16 font-bold'>
                <h1>Add '{book.volumeInfo.title}'' to Have Read?</h1>
              </div>
              <div className='flex flex-row gap-4'>
                <button 
                className='text-white py-2 px-2 rounded-md
                bg-gray-400'
                onClick={() => setToggleModal(false)}>
                  Cancel
                </button>

                <button 
                className='text-white py-2 px-2 rounded-md
                bg-red-400'
                onClick={handleCompleteBook(book)}
                >Add
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CurrentlyReading