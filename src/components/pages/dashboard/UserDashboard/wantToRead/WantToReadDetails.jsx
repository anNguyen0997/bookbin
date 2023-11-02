import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { db, auth } from '../../../../../config/firebase'
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore'
import UserNavbar from '../userNavbar/UserNavbar'
import { GoChevronLeft } from 'react-icons/go'

const WantToReadDetails = () => {
    const [userBooks, setUserBooks] = useState([])
    const navigate = useNavigate()
    
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

    const handleAddCurrentlyReading = async(book) => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        try {
            await updateDoc(userReference, {
                currentlyReading: arrayUnion(book),
                wantToRead: arrayRemove(book)
            })
            updateUserBooks()
        } catch (err) {
            console.log(err)
        }
    }

    const handleRemoveBook = async(book) => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        try {
            await updateDoc(userReference, {
                wantToRead: arrayRemove(book)
            })
            updateUserBooks()
            console.log('book removed successfully')
        } catch (err) {
            console.log(err)
        }
    }

    const updateUserBooks = async () => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        const userUpdatedBooks = await getDoc(userReference)

        if (userUpdatedBooks.exists()) {
            setUserBooks(userUpdatedBooks.data().wantToRead)
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

        <div className='bg-[#E4DCCF] w-full flex flex-col justify-center mt-[60px] md:mt-[85px]
        gap-2'>

        <div className=' flex flex-row text-lg md:text-2xl py-4 px-4 gap-4'>
              <GoChevronLeft
                size='35px'
                className="cursor-pointer rounded-full bg-gray-300 hover:bg-gray-400 duration-500 p-1"
                onClick={() => navigate('/-profile')}
              />
            <h1 className='font-semibold'>Want to Read:</h1>
        </div>

        {userBooks.map((book) => (
            <div key={book.id} className='h-[160px] rounded-md flex flex-row gap-5 border-b-2 border-[#BFB29E]'>
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
                    className='bg-[#6A9C89] text-white border rounded-lg py-1 px-2'
                    onClick={() => handleAddCurrentlyReading(book)}
                    >
                    +Currently Reading
                    </button>

                    <button
                    className='w-10/12 bg-gray-400 text-white border rounded-lg p-1'
                    onClick={() => handleRemoveBook(book)}>
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

export default WantToReadDetails