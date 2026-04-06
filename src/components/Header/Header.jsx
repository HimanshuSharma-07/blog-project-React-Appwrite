import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Menu, X } from "lucide-react"

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const navItems = [
    { name: 'Home', slug: "/", active: true }, 
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "My Posts", slug: "/my-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
  <Container>
    <nav className="flex items-center justify-between h-16 md:h-20">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 group">
          <Logo width="30px" />
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Desktop Nav */}
        <ul className="hidden sm:flex items-center gap-1">
        {navItems.map(item =>
          item.active && (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.slug)}
                className="
                  px-4 py-2 
                  text-sm font-medium text-gray-600
                  hover:bg-gray-100 hover:text-gray-900
                  rounded-lg transition-all duration-200
                "
              >
                {item.name}
              </button>
            </li>
          )
        )}
        {authStatus && (
          <li>
            <LogoutBtn />
          </li>
        )}
      </ul>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="ml-auto sm:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
        aria-label="Toggle Navigation"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div
          className="
            absolute top-18 right-4
            w-48
            bg-white
            border border-gray-100
            rounded-2xl
            shadow-xl
            sm:hidden
            z-50
            overflow-hidden
            flex flex-col
            p-1
          "
        >
          {navItems.map(
            (item) =>
              item.active && (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.slug);
                    setOpen(false);
                  }}
                  className="
                    w-full px-4 py-2.5
                    text-sm font-medium text-gray-600
                    text-left
                    hover:bg-gray-50 hover:text-gray-900
                    rounded-lg transition-colors
                  "
                >
                  {item.name}
                </button>
              )
          )}

          {authStatus && (
            <div className="mt-1 pt-1 border-t border-gray-100 w-full flex">
              <div className="w-full">
                <LogoutBtn />
              </div>
            </div>
          )}
        </div>
      )}

    </nav>
  </Container>

</header>
  )
}

export default Header