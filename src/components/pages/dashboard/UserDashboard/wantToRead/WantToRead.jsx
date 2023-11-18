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
            const displayBooks = docSnap.data().wantToRead.slice(0, 1)
            setUserBooks(displayBooks)
            setNumberOfBooks(docSnap.data().wantToRead.length)
        } else {
            console.log('this user does not exist')
        }
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
    p-4 gap-2 border-b-2 border-[#BFB29E]'>

        <div className='flex flex-row items-center justify-start
        gap-4'>
            
            {userBooks.map((book, index) => (
                <div 
                key={index} 
                className='flex items-center h-[200px] md:h-[220px]'>
                    <img
                        className='w-full md:h-[210px]'
                        alt='book cover' 
                        src={book.volumeInfo.imageLinks.smallThumbnail} />
                </div>
            ))}

            <div className='flex flex-col justify-center items-start'>
                <div>
                <h4 className='font-bold text-lg md:text-2xl'>Want To Read</h4>
                    <p className='text-sm md:text-lg text-gray-500'>{numberOfBooks} books</p>
                </div>

                <button
                    className='text-white rounded-lg 
                    p-2 mt-4 bg-[#ccc2b3] hover:bg-[#bfb29e] duration-500
                    hover:scale-105
                    text-sm md:text-xl'
                    onClick={() => navigate('/-wanttoread')}> 
                    Show More
                </button>
            </div>
            
        </div>
    </div>
  )
}

export default WantToRead