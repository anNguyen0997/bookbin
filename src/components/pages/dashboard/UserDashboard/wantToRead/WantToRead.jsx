import React, { useState, useEffect } from 'react'
import { db, auth } from '../../../../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'

const WantToRead = () => {
    const [userBooks, setUserBooks] = useState([])
    const [numberOfBooks, setNumberOfBooks] = useState(0)
    
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
    <div className='w-full'>
        <div className='flex flex-row items-center justify-start'>

            {userBooks.map((book) => (
                <div key={book.id} className='flex flex-row items-center justify-start p-4 gap-1'>
                    
                    <img className='w-[50px]' alt='book cover' src={book.volumeInfo.imageLinks.smallThumbnail}></img>

                </div>            
            ))}

            <div>
                <h4>Want to Read</h4>
                <p>{numberOfBooks} books</p>
            </div>

        </div>
    </div>
  )
}

export default WantToRead