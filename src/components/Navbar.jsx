import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import './Navbar.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <Link to="home" smooth={true} duration={500} className="logo">
          TAJ STUDIO
        </Link>
        <ul className="nav-menu">
          <li><Link to="home" smooth={true} duration={500}>Home</Link></li>
          <li><Link to="about" smooth={true} duration={500}>About Us</Link></li>
          <li><Link to="contact" smooth={true} duration={500}>Contact Us</Link></li>
        </ul>
        <Link to="contact" smooth={true} duration={500} className="enquire-btn">
          Enquire Now
        </Link>
      </div>
    </motion.nav>
  )
}

export default Navbar
