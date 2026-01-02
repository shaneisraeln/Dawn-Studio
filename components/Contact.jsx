'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useModalStore } from '@/store/modalStore'

export default function Contact() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const { openReview } = useModalStore()

  useEffect(() => {
    // Keep empty for static design
  }, [])

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="py-20 lg:py-32 px-6 lg:px-12 bg-dark-lighter relative overflow-hidden"
    >
      {/* Static background pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        <div ref={leftRef}>
          <h3 className="font-montserrat text-3xl font-semibold mb-8 tracking-wider relative">
            Contact Details
            <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gold" />
          </h3>
          
          <div className="space-y-6">
            {[
              { label: 'India', value: '+91 9344922000', icon: '🇮🇳', href: 'tel:+919344922000' },
              { label: 'Email', value: 'dawnhdstudio@gmail.com', icon: '✉️', href: 'mailto:dawnhdstudio@gmail.com' },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="contact-item block border-l-2 border-gold pl-6 py-4 bg-dark/50 backdrop-blur-sm rounded-r-lg transition-all duration-300 hover:bg-dark hover:pl-8 cursor-pointer"
              >
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <span>{item.icon}</span>
                  {item.label}
                </p>
                <p className="text-lg font-lato text-gold hover:text-gold-dark transition-colors">
                  {item.value}
                </p>
              </a>
            ))}
          </div>
        </div>

        <div ref={rightRef} className="relative">
          <div className="bg-dark/80 backdrop-blur-sm p-8 rounded-lg border border-gold/20">
            <h3 className="font-montserrat text-3xl font-semibold mb-6 tracking-wider relative">
              Get In Touch
              <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gold" />
            </h3>
            <p className="font-lato text-gray-300 mb-6 leading-relaxed">
              Ready to capture your special moments? Click the button below to send us an enquiry and let's create something beautiful together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  const btn = document.querySelector('[data-enquiry-btn]')
                  if (btn) btn.click()
                }}
                className="group relative bg-gold hover:bg-gold-dark text-white px-8 py-4 rounded font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/30 overflow-hidden"
              >
                <span className="relative z-10">Send Enquiry</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-dark to-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
              
              <button 
                onClick={openReview}
                className="group relative bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-dark px-8 py-4 rounded font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/30"
              >
                Write a Review
              </button>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold" />
          </div>
        </div>
      </div>
    </section>
  )
}
