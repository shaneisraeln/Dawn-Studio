'use client'

import { useEffect, useState } from 'react'
import { useModalStore } from '@/store/modalStore'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const openEnquiry = useModalStore((state) => state.openEnquiry)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-dark/95 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        <button 
          onClick={() => scrollToSection('home')}
          className="font-montserrat text-xl lg:text-2xl font-bold tracking-[0.3em] hover:text-gold transition-smooth"
        >
          TAJ STUDIO
        </button>
        
        <ul className="hidden md:flex items-center gap-10 font-lato">
          <li>
            <button onClick={() => scrollToSection('home')} className="hover:text-gold transition-smooth">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('about')} className="hover:text-gold transition-smooth">
              About Us
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('contact')} className="hover:text-gold transition-smooth">
              Contact Us
            </button>
          </li>
        </ul>

        <button 
          onClick={openEnquiry}
          data-enquiry-btn
          className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded font-semibold transition-smooth hover:scale-105 hover:shadow-lg hover:shadow-gold/30"
        >
          Enquire Now
        </button>
      </div>
    </nav>
  )
}
