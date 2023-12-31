import React, { useState, useEffect } from 'react'
import { db, auth } from '../../../../../config/firebase'
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore'
import UserNavbar from '../userNavbar/UserNavbar'
import { GoChevronLeft } from 'react-icons/go'
import { useNavigate} from 'react-router-dom'

const HaveReadDetails = () => {
    const [userBooks, setUserBooks] = useState([])
    const navigate = useNavigate()
    
    const getUser = async() => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(userReference)

        if (docSnap.exists()) {
            // console.log(docSnap.data())
            setUserBooks(docSnap.data().haveRead)
        } else {
            console.log('no user')
        }
    }

    const handleRemoveBook = async (book) => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        try {
            await updateDoc(userReference, {
                haveRead: arrayRemove(book)
            })
            updateUserBooks()
            // console.log('book removed successfully')
        } catch (err) {
            console.log(err)
        }
    }

    const updateUserBooks = async () => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        const userUpdatedBooks = await getDoc(userReference)

        if (userUpdatedBooks.exists()) {
            setUserBooks(userUpdatedBooks.data().haveRead)
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
        gap-3'>

        <div className=' flex flex-row text-lg md:text-2xl py-4 px-4 gap-4'>
            <GoChevronLeft
            size='35px'
            className="cursor-pointer rounded-full bg-gray-300 hover:bg-gray-400 duration-500 p-1"
            onClick={() => navigate('/-profile')}
            />
            <h1 className='font-semibold'>Books you have read:</h1>
        </div>

        {userBooks.map((book) => (
            <div key={book.id}
            className='h-[160px] rounded-md flex flex-row gap-6 p-2 border-b-2 border-[#BFB29E]
            h-[160px] md:h-[220px]
            p-2 py-2 md:px-6 2xl:px-[70px]
            duration-500'>
                <div className='flex justify-center items-center'>
                    <img alt='book cover'
                    className='w-[80px] md:w-[120px]'
                    src={book.volumeInfo.imageLinks.smallThumbnail}></img>
                </div>

                <div className='flex flex-col justify-center items-start'>
                    <div className='flex flex-col'>
                    <h2 className='font-bold text-md md:text-xl'>{book.volumeInfo.title}</h2>
                    <p className='text-sm md:text-lg'>by {book.volumeInfo.authors[0]}</p>
                </div>

                <div className='flex flex-col text-sm md:text-lg mt-2 gap-1'>
                    <button
                    className='text-white border rounded-lg p-2
                    bg-gray-400 hover:bg-gray-500 hover:scale-105
                    duration-500'
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

export default HaveReadDetails