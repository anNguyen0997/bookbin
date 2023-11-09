import React, { useState, useEffect } from 'react'
import { db, auth } from '../../../../../config/firebase'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'

const CurrentlyReading = () => {
    const [userDisplayName, setUserDisplayName] = useState('')
    const [userBooks, setUserBooks] = useState([])
    const [userData, setUserData] = useState({})
    const [toggleModal, setToggleModal] = useState(false)
    const [currentBookIndex, setCurrentBookIndex] = useState(0);
    const navigate = useNavigate()
    
    const getUserData = async() => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(userReference)

        if (docSnap.exists()) {
            // console.log(docSnap.data())
            setUserData(docSnap.data())
            setUserBooks(docSnap.data().currentlyReading)
        } else {
            console.log('this user does not exist')
          }
        }
        
    const updateUserBooks = (bookID) => {
      setUserBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookID))
    }

    const handleCompleteBook = async(book) => {
      const userReference = doc(db, 'users', auth.currentUser.uid)
      const bookExists = userData.haveRead.some((currentBook) => currentBook.id === book.id)

      if (!bookExists) {
        try {
          await updateDoc(userReference, {
            currentlyReading: arrayRemove(book),
            haveRead: arrayUnion(book)
          })
          updateUserBooks(book.id)
          setToggleModal(false)
          navigate('/-profile')
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await updateDoc(userReference, {
            currentlyReading: arrayRemove(book),
            haveRead:arrayRemove(book)
          })
          setToggleModal(false)
        } catch (err) {
          console.log(err)
        }
        console.log('Book is already in haveRead list')
      }
    }

    const goToNextBook = () => {
      setCurrentBookIndex((prevIndex) => (prevIndex + 1) % userBooks.length)
    };

    const goToPreviousBook = () => {
      setCurrentBookIndex((prevIndex) => prevIndex === 0 ? userBooks.length - 1 : prevIndex - 1)
    }
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
              setUserDisplayName(user.displayName)
              console.log(user)
              getUserData()
            } else {
              console.log('there are no users signed in')
            }
        })
    }, [])
    
  return (
    <div className='w-full flex flex-col justify-center
    text-md md:text-lg p-3 gap-2'>

      <div className='flex flex-col'>
        <h1 className='text-lg md:text-2xl'>Welcome back,&nbsp;
        <span className='italic text-emerald-500 font-semibold'>
          {userDisplayName}
        </span>!</h1>
        <h2>Currently Reading:</h2>
      </div>

      {userBooks.map((book, index) => (
        <div key={book.etag} className={`bg-white rounded-lg flex flex-row gap-6 p-3 h-[230px] md:h-[260px] ${
          index === currentBookIndex ? '' : 'hidden'}`}>

          <div className='flex justify-center items-center'>
            <img alt='book cover'
            className='h-[200px] md:h-[230px]'
            src={book.volumeInfo.imageLinks.smallThumbnail}></img>
          </div>

          <div className='flex flex-col justify-center items-start'>
            <div className='flex flex-col'>
              <h2 className='font-bold text-lg md:text-2xl'>{book.volumeInfo.title}</h2>
              <p className='text-sm md:text-lg'>by {book.volumeInfo.authors[0]}</p>
            </div>

            <div className='mt-5'>
              <button
              className='bg-[#E4DCCF] rounded-lg px-3 py-2 
              hover:bg-[#BFB29E]
              text-sm md:text-xl
              hover:scale-105
              duration-500'
              onClick={() => setToggleModal(true)}>
                Book Completed
              </button>
            </div>

            <div className="flex flex-row gap-4 mt-2">
              <GoChevronLeft
                size='35px'
                className="cursor-pointer rounded-full bg-gray-300 hover:bg-gray-400 duration-500 p-1"
                onClick={goToPreviousBook}
              />

              <GoChevronRight
                size='35px'
                className="cursor-pointer rounded-full bg-gray-300 hover:bg-gray-400 duration-500 p-1"
                onClick={goToNextBook}
              />
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
                className='text-white py-2 px-3 rounded-md
                bg-gray-400 hover:bg-gray-500 hover:scale-105
                duration-500'
                onClick={() => setToggleModal(false)}>
                  Close
                </button>

                <button 
                className='text-white py-2 px-4 rounded-md
                bg-red-400 hover:bg-red-600 hover:scale-105
                duration-500'
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