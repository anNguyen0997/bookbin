import React, { useState, useEffect } from 'react'
import { db, auth } from '../../../../../config/firebase'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'

const CurrentlyReading = () => {
    const [userBooks, setUserBooks] = useState([])
    const [toggleModal, setToggleModal] = useState(false)
    const [currentBookIndex, setCurrentBookIndex] = useState(0);
    
    const getUserBooks = async() => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(userReference)

        if (docSnap.exists()) {
            // console.log(docSnap.data())
            setUserBooks(docSnap.data().currentlyReading)
        } else {
            console.log('this user does not exist')
        }
    }

    const handleCompleteBook = async(book) => {
      const userReference = doc(db, 'users', auth.currentUser.uid)
      try {
        await updateDoc(userReference, {
          currentlyReading: arrayRemove(book),
          haveRead: arrayUnion(book)
        })
      } catch (err) {
        console.log(err)
      }
    }

    
    const goToNextBook = () => {
      setCurrentBookIndex((prevIndex) => (prevIndex + 1) % userBooks.length);
    };


    const goToPreviousBook = () => {
      setCurrentBookIndex((prevIndex) =>
        prevIndex === 0 ? userBooks.length - 1 : prevIndex - 1
      );
    }
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log(user)
                getUserBooks()
            } else {
                console.log('there are no users signed in')
            }
        })
    }, [])
    
  return (
    <div className='w-full flex flex-col justify-center
    text-md md:text-lg p-3 gap-2'>

      <h2>Currently Reading:</h2>

      {userBooks.map((book, index) => (
        <div key={book.id} className={`bg-gray-500 rounded-lg flex flex-row gap-6 p-3 ${
          index === currentBookIndex ? '' : 'hidden'}`}>

          <div className='flex justify-center items-center'>
            <img alt='book cover'
            src={book.volumeInfo.imageLinks.smallThumbnail}></img>
          </div>

          <div className='flex flex-col justify-center items-start'>
            <div className='flex flex-col'>
              <h2 className='font-bold'>{book.volumeInfo.title}</h2>
              <p>by {book.volumeInfo.authors}</p>
            </div>

            <div className='mt-5'>
              <button
              className='border rounded-lg p-2'
              onClick={() => setToggleModal(true)}>
                Book Completed
              </button>
            </div>

            <div className="flex flex-row gap-2 mt-2">
              <button
                className="text-white py-2 px-2 rounded-md bg-gray-400"
                onClick={goToPreviousBook}
              >
                Prev
              </button>

              <button
                className="text-white py-2 px-2 rounded-md bg-gray-400"
                onClick={goToNextBook}
              >
                Next
              </button>
            </div>


          </div>

          {/* Book Completed Modal */}
          <div className={!toggleModal ? `hidden`:  `z-10 fixed inset-0 w-full h-full
          flex justify-center items-center
          backdrop-blur-sm`}>
            <div className='bg-[#E4DCCF] flex flex-col justify-center items-center 
            text-md w-8/12 py-8 rounded-lg gap-6 border-4 border-[#BFB29E]
            md:text-2xl md:w-6/12 md:h-1/6'>
              <div className='text-center px-16 font-bold'>
                <h1>Add to Have Read?</h1>
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
                onClick={() => handleCompleteBook(book)}
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