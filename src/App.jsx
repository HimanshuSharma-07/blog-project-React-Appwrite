import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header, Loader } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [dispatch])
  
  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
       <Footer />
    </div>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Loader />
    </div>
  )
}

export default App