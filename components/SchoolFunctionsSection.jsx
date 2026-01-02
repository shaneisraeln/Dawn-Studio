'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

gsap.registerPlugin(ScrollTrigger)

export default function SchoolFunctionsSection() {
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)
  const titleRef = useRef(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isReady, setIsReady] = useState(false)

  const functions = [
    {
      title: 'Annual Day',
      description: 'Capturing memorable performances and celebrations',
      image: '/images/school/annual-day.jpeg'
    },
    {
      title: 'Sports Day',
      description: 'Action-packed moments and victory celebrations',
      image: '/images/school/sports-day.JPG'
    },
    {
      title: 'Graduation Ceremony',
      description: 'Milestone moments and proud achievements',
      image: '/images/school/graduation.JPG'
    },
    {
      title: 'Cultural Events',
      description: 'Traditional performances and artistic expressions',
      image: '/images/school/cultural-events.JPG'
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || !scrollRef.current) return

    const section = sectionRef.current
    const scroll = scrollRef.current

    // Wait for layout to be fully ready
    const initializeAnimations = () => {
      // Refresh ScrollTrigger to ensure proper calculations
      ScrollTrigger.refresh()
      
      const ctx = gsap.context(() => {
        // Set initial state to prevent flash
        gsap.set(scroll, { x: 0 })
        gsap.set(titleRef.current, { opacity: 1, y: 0 })
        
        // Title animation
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        })

        // Calculate scroll width with proper timing
        const getScrollWidth = () => {
          const scrollWidth = scroll.scrollWidth
          const windowWidth = window.innerWidth
          return Math.max(0, scrollWidth - windowWidth)
        }

        // Horizontal scroll animation with better timing
        const scrollTween = gsap.to(scroll, {
          x: () => -getScrollWidth(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollWidth()}`,
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              // Ensure proper positioning on refresh
              if (ScrollTrigger.isTouch) {
                ScrollTrigger.refresh()
              }
            }
          }
        })

        // Animate cards with container animation
        const cards = scroll.querySelectorAll('.function-card')
        cards.forEach((card, i) => {
          gsap.from(card, {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: 'left 80%',
              toggleActions: 'play none none reverse',
            }
          })
        })

      }, section)

      setIsReady(true)
      return ctx
    }

    // Use requestAnimationFrame to ensure DOM is ready
    let animationFrame
    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(() => {
        const ctx = initializeAnimations()
        
        // Store context for cleanup
        sectionRef.current._gsapContext = ctx
      })
    }, 150)

    return () => {
      clearTimeout(timer)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      if (sectionRef.current?._gsapContext) {
        sectionRef.current._gsapContext.revert()
      }
    }
  }, [])

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const slides = functions.map(func => ({ src: func.image }))

  return (
    <>
      <section 
        ref={sectionRef}
        className="relative h-screen overflow-hidden bg-gradient-to-b from-dark via-dark-lighter to-dark"
        style={{ 
          willChange: isReady ? 'auto' : 'transform',
          opacity: isReady ? 1 : 0.99,
          transition: 'opacity 0.1s ease-out'
        }}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #c9a961 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex gap-8 px-12 will-change-transform"
          >
            {/* Title card */}
            <div className="flex-shrink-0 w-screen flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-px bg-gold mx-auto mb-8" />
                <h2 
                  ref={titleRef}
                  className="font-montserrat text-6xl lg:text-8xl font-bold tracking-wider mb-6"
                >
                  School Functions
                </h2>
                <p className="font-lato text-xl text-gray-400 tracking-wider max-w-2xl mx-auto">
                  Preserving precious moments from every school event and celebration
                </p>
                <div className="w-32 h-1 bg-gold mx-auto mt-8" />
              </div>
            </div>
            
            {/* Function cards */}
            {functions.map((func, index) => (
              <div 
                key={index}
                className="function-card flex-shrink-0 w-[75vw] lg:w-[55vw] h-[75vh] rounded-xl overflow-hidden shadow-2xl relative group bg-black cursor-pointer will-change-transform"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={func.image}
                  alt={func.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 75vw, 55vw"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-16 h-1 bg-gold mb-4" />
                    <h3 className="font-montserrat text-3xl lg:text-4xl font-bold text-white mb-3 tracking-wide">
                      {func.title}
                    </h3>
                    <p className="font-lato text-lg text-gray-300">
                      {func.description}
                    </p>
                  </div>
                </div>

                {/* Border on hover */}
                <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/60 transition-all duration-300 rounded-xl" />
                
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold/0 group-hover:border-gold/80 transition-all duration-300" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold/0 group-hover:border-gold/80 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom]}
      />
    </>
  )
}
