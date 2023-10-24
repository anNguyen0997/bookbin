import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, auth } from '../../../../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'

const WantToRead = () => {
    const [userBooks, setUserBooks] = useState([])
    const [numberOfBooks, setNumberOfBooks] = useState(0)
    const navigate = useNavigate()
    
    const getUser = async() => {
        const userReference = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(userReference)

        if (docSnap.exists()) {
            // console.log(docSnap.data())
            setUserBooks(docSnap.data().wantToRead)
            setNumberOfBooks(docSnap.data().wantToRead.length)
        } else {
            console.log('this user does not exist')
        }
    }

    const handleShowMore = () => {
        navigate('/-wanttoread')
    }
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                // console.log(user)
                getUser()
            } else {
                console.log('there are no users signed in')
            }
        })
    }, [])
    
  return (
    <div className='w-full flex flex-col justify-center
    p-3 gap-2 border-b-2 border-[#BFB29E]'>

        <div className='flex flex-row items-center justify-start
        p-3 gap-2'>
            
            {userBooks.map((book) => (
                <div key={book.id}>
                <img
                    className='w-8/12'
                    alt='book cover' 
                    src={book.volumeInfo.imageLinks.smallThumbnail} />
                </div>
            ))}

            <div className='flex flex-col justify-center items-start'>
                <div>
                    <h4 className='font-bold text-lg md:text-xl'>Want to Read</h4>
                    <p className='text-md text-gray-500'>{numberOfBooks} books</p>
                </div>

                <button
                    className='bg-[#BFB29E] text-white rounded-lg p-2 mt-4'
                    onClick={handleShowMore}> 
                    Show More
                </button>
            </div>
            
        </div>
    </div>
  )
}

export default WantToRead