import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import Container from '../container/Container'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-8 mt-auto">
      <Container>
        <div className="flex justify-between w-full flex-wrap gap-y-12">
          
          {/* Brand & Social */}
          <div className="w-full lg:w-4/12 flex flex-col items-start px-2">
            <Link to="/" className="inline-block mb-4">
              <Logo width="32px" />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs">
              Thoughts, stories, and ideas. A minimal space to read and write without the noise.
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              <a href="#" className="hover:text-gray-900 transition-colors" aria-label="Twitter">
                <Twitter size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors" aria-label="Github">
                <Github size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="w-full sm:w-1/2 lg:w-2/12 px-2">
            <h3 className="mb-5 text-[11px] font-bold tracking-wider uppercase text-gray-900">
              Platform
            </h3>
            <ul className="space-y-3.5">
              <li><Link className="text-sm text-gray-500 hover:text-gray-900 transition-colors" to="/">Features</Link></li>
              <li><Link className="text-sm text-gray-500 hover:text-gray-900 transition-colors" to="/">Pricing</Link></li>
              <li><Link className="text-sm text-gray-500 hover:text-gray-900 transition-colors" to="/">About Us</Link></li>
              <li><Link className="text-sm text-gray-500 hover:text-gray-900 transition-colors" to="/">Careers</Link></li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 lg:w-2/12 px-2">
            <h3 className="mb-5 text-[11px] font-bold tracking-wider uppercase text-gray-900">
              Resources
            </h3>
            <ul className="space-y-3.5">
              <li><Link className="text-sm text-gray-500 hover:text-gray-900 transition-colors" to="/">Blog</Link></li>
              <li><Link className="text-sm text-gray-500 hover:text-gray-900 transition-colors" to="/">Help Center</Link></li>
              <li><Link className="text-sm text-gray-500 hover:text-gray-900 transition-colors" to="/">Guidelines</Link></li>
              <li><Link className="text-sm text-gray-500 hover:text-gray-900 transition-colors" to="/">Contact</Link></li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 lg:w-2/12 px-2">
            <h3 className="mb-5 text-[11px] font-bold tracking-wider uppercase text-gray-900">
              Legal
            </h3>
            <ul className="space-y-3.5">
              <li><Link className="text-sm text-gray-500 hover:text-gray-900 transition-colors" to="/">Terms of Service</Link></li>
              <li><Link className="text-sm text-gray-500 hover:text-gray-900 transition-colors" to="/">Privacy Policy</Link></li>
              <li><Link className="text-sm text-gray-500 hover:text-gray-900 transition-colors" to="/">Cookie Settings</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 px-2">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Life in Words. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Made with</span>
            <span className="text-gray-900 font-medium">React & Appwrite</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer