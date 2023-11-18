import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'

const UserFavoriteGenres = () => {
    const userReference = doc(db, 'users', auth.currentUser.uid)
    const [favoriteGenres, setFavoriteGenres] = useState([])

    const getUserFavoriteGenres = async () => {
        const docSnap = await getDoc(userReference)
        let genres = []
        let allGenres = []
        
        if (docSnap.exists()) {
            genres = genres.concat(docSnap.data().currentlyReading, docSnap.data().haveRead, docSnap.data().wantToRead)
            
            for (let i = 0; i < genres.length; i++) {
                allGenres.push(genres[i].volumeInfo.categories)
            }
            // console.log(allGenres.sort())

            allGenres = allGenres.flat();

            const genreCounts = allGenres.reduce((acc, genre) => {
                acc[genre] = (acc[genre] || 0) + 1;
                return acc;
            }, {});

            const sortedGenres = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]);

            const top3Genres = sortedGenres.slice(0, 3);
            setFavoriteGenres(top3Genres);
            console.log(top3Genres);
        } else {
            console.log('no reference')
        }
    }

    useEffect(() => {
        getUserFavoriteGenres()
    })

  return (
    <div className='w-full flex flex-col justify-center
    text-md md:text-lg p-3 gap-2'>

        <div className='flex flex-col'>
            <h2>Favorite Genres:</h2>
        </div>

        <div className='bg-[#E4DCCF]'>
            {favoriteGenres.map((genre) => (
                <h3>{genre}</h3>
            ))}
        </div>
    </div>
  )
}

export default UserFavoriteGenres