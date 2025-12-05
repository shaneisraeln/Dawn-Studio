'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalScroll() {
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)
  const titleRef = useRef(null)

  const videos = [
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
  ]

  useEffect(() => {
    if (!sectionRef.current || !scrollRef.current) return

    const section = sectionRef.current
    const scroll = scrollRef.current

    const ctx = gsap.context(() => {
      // Simple title fade in
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

      // Calculate scroll amount
      const scrollWidth = scroll.scrollWidth - window.innerWidth

      // Simple horizontal scroll - no complex animations
      gsap.to(scroll, {
        x: () => -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 0.3,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      })

      // Simple fade in for cards
      const cards = scroll.querySelectorAll('.video-card')
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            containerAnimation: gsap.to(scroll, { x: -scrollWidth }),
            start: 'left 80%',
            toggleActions: 'play none none reverse',
          }
        })
      })

    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-dark-lighter"
    >
      {/* Simple vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/40 pointer-events-none" />

      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex gap-8 px-12"
        >
          {/* Title card */}
          <div className="flex-shrink-0 w-screen flex items-center justify-center">
            <div className="text-center">
              <h2 
                ref={titleRef}
                className="font-montserrat text-7xl lg:text-8xl font-bold tracking-wider mb-4"
              >
                Films
              </h2>
              <p className="font-lato text-xl text-gray-400 tracking-wider">
                Cinematic Stories That Last Forever
              </p>
              <div className="w-32 h-1 bg-gold mx-auto mt-6" />
            </div>
          </div>
          
          {/* Video cards - simplified */}
          {videos.map((video, index) => (
            <div 
              key={index}
              className="video-card flex-shrink-0 w-[80vw] lg:w-[60vw] h-[70vh] rounded-xl overflow-hidden shadow-2xl relative group bg-black"
            >
              {/* Film frame decoration */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <div className="absolute inset-0 border-4 border-black/30" />
                <div className="absolute top-0 left-0 right-0 h-6 bg-black/60 flex items-center justify-between px-3">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="w-0.5 h-3 bg-gold/40" />
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-black/60 flex items-center justify-between px-3">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="w-0.5 h-3 bg-gold/40" />
                  ))}
                </div>
              </div>

              <iframe
                src={video}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
              
              {/* Simple hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30 flex items-end p-8">
                <div>
                  <p className="text-2xl font-montserrat font-bold text-gold mb-2">
                    Wedding Film {index + 1}
                  </p>
                  <div className="w-24 h-1 bg-gold" />
                </div>
              </div>

              {/* Simple border */}
              <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/60 transition-all duration-300 rounded-xl z-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
