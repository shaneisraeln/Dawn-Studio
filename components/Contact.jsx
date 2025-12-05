'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Contact() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section background animation
      gsap.from(sectionRef.current, {
        backgroundColor: '#0a0a0a',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        }
      })

      // Enhanced left side animation
      gsap.from(leftRef.current, {
        opacity: 0,
        x: -100,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })

      // Enhanced contact items animation
      const contactItems = leftRef.current.querySelectorAll('.contact-item')
      gsap.from(contactItems, {
        opacity: 0,
        x: -30,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: leftRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      })

      // Enhanced right side animation
      gsap.from(rightRef.current, {
        opacity: 0,
        x: 100,
        y: 50,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })

      // Floating animation for the entire section
      gsap.to([leftRef.current, rightRef.current], {
        y: -10,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.5
      })

      // Add glowing effect to contact items on scroll
      contactItems.forEach((item) => {
        gsap.to(item, {
          boxShadow: '0 0 20px rgba(201, 169, 97, 0.3)',
          duration: 0.5,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="py-20 lg:py-32 px-6 lg:px-12 bg-dark-lighter relative overflow-hidden"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s infinite`,
              animationDelay: `${Math.random() * 2}s`
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
              { label: 'India', value: '+91 98765 43210', icon: '🇮🇳', href: 'tel:+919876543210' },
              { label: 'Dubai', value: '+971 50 123 4567', icon: '🇦🇪', href: 'tel:+97150123456' },
              { label: 'USA', value: '+1 (555) 123-4567', icon: '🇺🇸', href: 'tel:+15551234567' },
              { label: 'Canada', value: '+1 (416) 555-0123', icon: '🇨🇦', href: 'tel:+14165550123' },
              { label: 'Australia', value: '+61 2 1234 5678', icon: '🇦🇺', href: 'tel:+61212345678' },
              { label: 'Email', value: 'info@taj.studio', icon: '✉️', href: 'mailto:info@taj.studio' },
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
