import React from 'react'

const UserDashBoard = () => {
  return (
    <div className='bg-gray-500 w-full h-screen flex flex-col items-center justify-center gap-4'>
        
        <div className='bg-gray-200 w-11/12 h-4/6 rounded-lg flex flex-col gap-4'>
        
            {/* CURRENTLY READING */}
            <div className='bg-gray-300 w-full h-1/6 flex flex-col justify-center p-3 gap-2'>
                <h2>Currently Reading:</h2>
                <div className='bg-gray-400 w-full h-full rounded-lg flex flex-row gap-2'>
                    <div className='flex w-3/12 justify-center items-center'>
                        Image of Book
                    </div>

                    <div className='flex flex-col gap-1 justify-center'>
                        <h2>Title of Book</h2>
                        <p>Author</p>
                        <button className='border rounded-lg px-2 py-1'>Update Progress</button>
                        <div className='flex flex-row'>
                            <p>Progress:</p>
                            <button className='border'>Progress</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* WANT TO READ */}
            <div className='bg-gray-300 w-full h-1/6 flex flex-row gap-2 p-3'>
                <div className='bg-gray-400 w-3/12 h-full rounded-lg flex flex-col justify-center items-center'>
                    <h2>Image of Book</h2>
                </div>

                <div className='bg-gray-400 w-full h-full rounded-lg flex flex-col justify-center'>
                    <h2>Want to Read</h2>
                    <p>number of books</p>
                </div>
            </div>


            {/* HAVE READ */}
            <div className='bg-gray-300 w-full h-1/6 flex flex-row gap-2 p-3'>
                <div className='bg-gray-400 w-3/12 h-full rounded-lg flex flex-col justify-center items-center'>
                    <h2>Image of Book</h2>
                </div>

                <div className='bg-gray-400 w-full h-full rounded-lg flex flex-col justify-center'>
                    <h2>Have Read</h2>
                    <p>number of books</p>
                </div>
            </div>

        </div>

    </div>
  )
}

export default UserDashBoard