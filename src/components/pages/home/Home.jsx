import React, { useEffect } from 'react'
import axios from 'axios'

const Home = () => {

    const baseURL = 'https://www.googleapis.com/books/v1/volumes?'
    const API_KEY = 'AIzaSyAxCTsiPg28jac0Tufu0V1PNzTmc7cNc0A' 

    const subjects = ['mystery', 'fantasy', 'romance', 'thriller', 'horror', 'fiction', 'nonfiction', 'travel', 'science', 'history', 'self-help', '']
    const randomSubjects = subjects[Math.floor(Math.random() * subjects.length)]

    const callapi = () => {
        axios.get(`${baseURL}q=subject:${randomSubjects}&printType=books&orderBy=newest&key=${API_KEY}`)
        .then(res => {
            const data = res.data.items
            console.log(data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        callapi()
    }, [])

  return (
    <div>
        
    </div>
  )
}

export default Home