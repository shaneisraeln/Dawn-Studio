'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const testimonials = [
  {
    quote: "Taj Studio captured our wedding day perfectly. Every moment, every emotion - it was all beautifully preserved. We couldn't be happier with the results!",
    author: "PRANAV & MANSI",
    rating: 5
  },
  {
    quote: "The pre-wedding shoot was an absolute dream. The team made us feel so comfortable and the photos turned out stunning. Highly recommend!",
    author: "AASHNA & AMIT",
    rating: 5
  },
  {
    quote: "Professional, creative, and incredibly talented. Taj Studio exceeded all our expectations. Our wedding film is a masterpiece!",
    author: "RIYA & VIKRAM",
    rating: 5
  }
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef(null)
  const carouselRef = useRef(null)
  const navRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced section entrance animation
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })

      // Enhanced carousel animation
      gsap.from(carouselRef.current, {
        scale: 0.7,
        opacity: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.6)',
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })

      // Navigation animation
      gsap.from(navRef.current.children, {
        opacity: 0,
        y: 30,
        scale: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: navRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Floating animation
      gsap.to(carouselRef.current, {
        y: -15,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })

      // Background particles
      const particles = []
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute w-1 h-1 bg-gold rounded-full'
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
        sectionRef.current.appendChild(particle)
        particles.push(particle)

        gsap.to(particle, {
          y: -50,
          opacity: 0,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          ease: 'power1.out',
          delay: Math.random() * 2
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (isPaused) return
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isPaused])

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section 
      ref={sectionRef}
      className="py-20 lg:py-32 px-6 bg-dark-lighter relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 border-2 border-gold rounded-full" />
        <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-gold rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-gold/30 rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div 
          ref={carouselRef}
          className="min-h-[350px] flex flex-col items-center justify-center bg-dark/50 backdrop-blur-sm rounded-2xl p-12 border border-gold/20 relative"
        >
          {/* Quote icon */}
          <div className="absolute top-8 left-8 text-6xl text-gold/20">"</div>
          <div className="absolute bottom-8 right-8 text-6xl text-gold/20 rotate-180">"</div>

          {/* Stars rating */}
          <div className="flex gap-2 mb-6">
            {[...Array(testimonials[current].rating)].map((_, i) => (
              <span key={i} className="text-gold text-2xl">★</span>
            ))}
          </div>

          <p className="font-lato text-2xl lg:text-3xl font-light italic mb-8 leading-relaxed relative z-10">
            {testimonials[current].quote}
          </p>
          
          <div className="relative">
            <p className="font-montserrat text-sm tracking-[0.3em] font-semibold text-gold mb-2">
              {testimonials[current].author}
            </p>
            <div className="w-20 h-0.5 bg-gold mx-auto" />
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
            <div 
              className="h-full bg-gold transition-all duration-300"
              style={{ 
                width: isPaused ? '100%' : `${((current + 1) / testimonials.length) * 100}%` 
              }}
            />
          </div>
        </div>

        <div ref={navRef} className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={handlePrev}
            className="group w-14 h-14 rounded-full bg-gold hover:bg-gold-dark transition-all duration-300 flex items-center justify-center text-2xl hover:scale-110 hover:shadow-lg hover:shadow-gold/30"
            aria-label="Previous testimonial"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">‹</span>
          </button>
          
          <div className="flex gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === current 
                    ? 'bg-gold w-12 h-3' 
                    : 'bg-gray-600 hover:bg-gray-500 w-3 h-3'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="group w-14 h-14 rounded-full bg-gold hover:bg-gold-dark transition-all duration-300 flex items-center justify-center text-2xl hover:scale-110 hover:shadow-lg hover:shadow-gold/30"
            aria-label="Next testimonial"
          >
            <span className="transform group-hover:translate-x-1 transition-transform">›</span>
          </button>
        </div>
      </div>
    </section>
  )
}
