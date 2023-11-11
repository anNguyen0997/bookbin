import React, { useEffect, useState } from 'react'
import WantToRead from '../wantToRead/WantToRead'
import HaveRead from '../haveRead/HaveRead'
import CurrentlyReading from '../currentlyReading/CurrentlyReading'
import UserNavbar from '../userNavbar/UserNavbar'
import Home from '../../../home/Home'
import { auth } from '../../../../../config/firebase'

const UserProfile = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setAuthenticated(true)
  //       // console.log(`${user.email} is authenticated`)
  //     } else {
  //       setAuthenticated(false)
  //       // console.log('no authenticated users')
  //     }
  //   })
  // }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false); // Set loading to false once the authentication status is determined
    });

    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, []);

  if (loading) {
    // Handle the loading state while authentication status is being determined
    return <div>Loading...</div>;
  }

  return authenticated ? (
      <div className='flex flex-col'>

      <UserNavbar />

      <div className='bg-[#E4DCCF] w-full flex flex-col items-center justify-center
      mt-[60px] md:mt-[85px]
      px-1 md:px-[100px] 2xl:px-[300px] duration-500'>
          
          <div className='w-full flex flex-col'>
              {/* CURRENTLY READING */}
              <CurrentlyReading />

              {/* WANT TO READ */}
              <WantToRead />

              {/* HAVE READ */} 
              <HaveRead />

              {/* <div className='flex justify-center items-center'>
                Favorite genres
              </div> */}
          </div>

      </div>
    </div>
    ) : (
      <Home />
    )
}

export default UserProfile