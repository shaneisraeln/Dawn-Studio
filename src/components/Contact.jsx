import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Contact.css'

const Contact = () => {
  const [activeTab, setActiveTab] = useState('enquiry')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your submission! We will get back to you soon.')
    e.target.reset()
  }

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="contact-container">
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h3>Contact Details</h3>
          <div className="contact-list">
            <div className="contact-item">
              <p className="contact-label">India</p>
              <p className="contact-value">+91 98765 43210</p>
            </div>
            <div className="contact-item">
              <p className="contact-label">Dubai</p>
              <p className="contact-value">+971 50 123 4567</p>
            </div>
            <div className="contact-item">
              <p className="contact-label">USA</p>
              <p className="contact-value">+1 (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <p className="contact-label">Canada</p>
              <p className="contact-value">+1 (416) 555-0123</p>
            </div>
            <div className="contact-item">
              <p className="contact-label">Australia</p>
              <p className="contact-value">+61 2 1234 5678</p>
            </div>
            <div className="contact-item">
              <p className="contact-label">Email</p>
              <p className="contact-value">info@taj.studio</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="contact-forms"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="form-tabs">
            <button 
              className={`form-tab ${activeTab === 'enquiry' ? 'active' : ''}`}
              onClick={() => setActiveTab('enquiry')}
            >
              Enquiry
            </button>
            <button 
              className={`form-tab ${activeTab === 'careers' ? 'active' : ''}`}
              onClick={() => setActiveTab('careers')}
            >
              Careers
            </button>
          </div>

          {activeTab === 'enquiry' ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="E-Mail" required />
              <input type="tel" placeholder="Contact Number" required />
              <input type="text" placeholder="City" required />
              <textarea placeholder="Message" rows="5" required />
              <button type="submit" className="submit-btn">Send</button>
            </form>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="E-Mail" required />
              <input type="tel" placeholder="Contact Number" required />
              <input type="text" placeholder="City" required />
              <input type="text" placeholder="Position Applied For" required />
              <input type="file" accept=".pdf,.doc,.docx" required />
              <textarea placeholder="Cover Letter" rows="5" required />
              <button type="submit" className="submit-btn">Submit Application</button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
