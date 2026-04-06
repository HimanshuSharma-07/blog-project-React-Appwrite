import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import Container from '../container/Container'

function Footer() {
  return (
    <section className="w-full bg-white border-t border-gray-100 py-10 mt-auto">
      <Container>
        <div className="flex justify-between w-full flex-wrap">

          
          <div className="w-full mb-8 lg:w-5/12">
            <div className="flex flex-col items-start px-2">
              <Logo width="40px" />
              <p className="mt-4 text-sm text-gray-500">
                &copy; Copyright 2026. All Rights Reserved .
              </p>
            </div>
          </div>

          <div className="w-full mb-8 sm:w-1/2 lg:w-2/12 px-2">
            <h3 className="mb-4 text-[10px] font-bold tracking-wider uppercase text-gray-400">
              Company
            </h3>
            <ul className="space-y-3">
              <li><Link className="text-sm text-gray-600 hover:text-gray-900 transition-colors" to="/">Features</Link></li>
              <li><Link className="text-sm text-gray-600 hover:text-gray-900 transition-colors" to="/">Pricing</Link></li>
              <li><Link className="text-sm text-gray-600 hover:text-gray-900 transition-colors" to="/">Affiliate Program</Link></li>
              <li><Link className="text-sm text-gray-600 hover:text-gray-900 transition-colors" to="/">Press Kit</Link></li>
            </ul>
          </div>

          <div className="w-full mb-8 sm:w-1/2 lg:w-2/12 px-2">
            <h3 className="mb-4 text-[10px] font-bold tracking-wider uppercase text-gray-400">
              Support
            </h3>
            <ul className="space-y-3">
              <li><Link className="text-sm text-gray-600 hover:text-gray-900 transition-colors" to="/">Account</Link></li>
              <li><Link className="text-sm text-gray-600 hover:text-gray-900 transition-colors" to="/">Help</Link></li>
              <li><Link className="text-sm text-gray-600 hover:text-gray-900 transition-colors" to="/">Contact Us</Link></li>
              <li><Link className="text-sm text-gray-600 hover:text-gray-900 transition-colors" to="/">Customer Support</Link></li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 lg:w-3/12 px-2">
            <h3 className="mb-4 text-[10px] font-bold tracking-wider uppercase text-gray-400">
              Legals
            </h3>
            <ul className="space-y-3">
              <li><Link className="text-sm text-gray-600 hover:text-gray-900 transition-colors" to="/">Terms & Conditions</Link></li>
              <li><Link className="text-sm text-gray-600 hover:text-gray-900 transition-colors" to="/">Privacy Policy</Link></li>
              <li><Link className="text-sm text-gray-600 hover:text-gray-900 transition-colors" to="/">Licensing</Link></li>
            </ul>
          </div>

        </div>
      </Container>
    </section>
  )
}

export default Footer