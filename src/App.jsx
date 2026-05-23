import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header, SkeletonCard } from './components'
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="grow py-8">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App