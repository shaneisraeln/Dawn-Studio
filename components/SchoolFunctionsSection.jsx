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
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80'
    },
    {
      title: 'Sports Day',
      description: 'Action-packed moments and victory celebrations',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=80'
    },
    {
      title: 'Graduation Ceremony',
      description: 'Milestone moments and proud achievements',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80'
    },
    {
      title: 'Cultural Events',
      description: 'Traditional performances and artistic expressions',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80'
    },
    {
      title: 'Science Fair',
      description: 'Innovation and creativity on display',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80'
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || !scrollRef.current) return

    const section = sectionRef.current
    const scroll = scrollRef.current

    // Small delay to ensure layout is ready
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 100)

    const ctx = gsap.context(() => {
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

      // Calculate scroll width
      const getScrollWidth = () => scroll.scrollWidth - window.innerWidth

      // Horizontal scroll animation
      gsap.to(scroll, {
        x: () => -getScrollWidth(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollWidth()}`,
          scrub: 0.3,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      })

      // Animate cards
      const cards = scroll.querySelectorAll('.function-card')
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            containerAnimation: gsap.to(scroll, { x: -getScrollWidth() }),
            start: 'left 80%',
            toggleActions: 'play none none reverse',
          }
        })
      })

    }, section)

    return () => {
      clearTimeout(timer)
      ctx.revert()
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
        style={{ willChange: isReady ? 'auto' : 'transform' }}
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
                    <p className="font-lato text-lg text-gray-300 mb-6">
                      {func.description}
                    </p>
                    <button className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded font-semibold transition-all duration-300 hover:scale-105">
                      View Gallery
                    </button>
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
