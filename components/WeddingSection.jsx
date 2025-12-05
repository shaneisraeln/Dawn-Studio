'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

gsap.registerPlugin(ScrollTrigger)

export default function WeddingSection({ images }) {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Elegant title reveal
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      })

      // Subtitle fade in
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      })

      // Main featured image
      const featured = sectionRef.current.querySelector('.featured-wedding')
      if (featured) {
        gsap.from(featured, {
          opacity: 0,
          scale: 0.95,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featured,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        })

        // Subtle parallax
        gsap.to(featured, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: featured,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        })
      }

      // Gallery items - elegant fade in
      const galleryItems = sectionRef.current.querySelectorAll('.gallery-thumb')
      galleryItems.forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          y: 40,
          duration: 1,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        })
      })

      // Decorative elements
      const decorLine = sectionRef.current.querySelector('.decor-line')
      if (decorLine) {
        gsap.from(decorLine, {
          scaleX: 0,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: decorLine,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const slides = images.map(img => ({ src: img.url }))

  return (
    <>
      <section 
        id="wedding"
        ref={sectionRef}
        className="relative py-32 lg:py-48 px-6 lg:px-12 bg-gradient-to-b from-dark via-black to-dark overflow-hidden"
      >
        {/* Subtle spotlight effect */}
        <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent opacity-30 pointer-events-none" />
        
        {/* Elegant grid background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(#c9a961 1px, transparent 1px), linear-gradient(90deg, #c9a961 1px, transparent 1px)',
              backgroundSize: '100px 100px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto">
          {/* Minimalist Header */}
          <div className="text-center mb-20 lg:mb-32">
            <div className="decor-line w-16 h-px bg-gold mx-auto mb-8 origin-center" />
            <h2 
              ref={titleRef}
              className="font-montserrat text-6xl lg:text-8xl xl:text-9xl font-light tracking-[0.2em] mb-6 text-white"
            >
              WEDDING
            </h2>
            <p 
              ref={subtitleRef}
              className="font-lato text-lg lg:text-xl text-gray-400 tracking-[0.3em] uppercase"
            >
              Timeless Elegance
            </p>
          </div>

          {/* Featured Large Image */}
          <div 
            className="featured-wedding relative mb-12 lg:mb-20 cursor-pointer group"
            onClick={() => openLightbox(0)}
          >
            <div className="relative aspect-[21/9] rounded-none overflow-hidden">
              <Image
                src={images[0].url}
                alt={images[0].name}
                fill
                className="object-cover transition-all duration-[1.5s] ease-out group-hover:scale-105"
                priority
                sizes="100vw"
              />
              
              {/* Minimal overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-700" />
              
              {/* Elegant caption */}
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700">
                <div className="max-w-4xl">
                  <div className="w-12 h-px bg-gold mb-4" />
                  <p className="font-montserrat text-2xl lg:text-4xl font-light tracking-wider text-white mb-2">
                    {images[0].name}
                  </p>
                  <p className="font-lato text-sm text-gray-300 tracking-widest uppercase">
                    Featured Wedding
                  </p>
                </div>
              </div>

              {/* Minimal border */}
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-700" />
            </div>
          </div>

          {/* Gallery Grid - Minimalist */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
            {images.slice(1).map((image, index) => (
              <div
                key={index + 1}
                className="gallery-thumb relative aspect-[4/5] cursor-pointer group overflow-hidden"
                onClick={() => openLightbox(index + 1)}
                onMouseEnter={() => setActiveIndex(index + 1)}
              >
                <Image
                  src={image.url}
                  alt={image.name}
                  fill
                  className="object-cover transition-all duration-[1s] ease-out group-hover:scale-110"
                  sizes="(max-width: 1024px) 50vw, 20vw"
                />
                
                {/* Minimal overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />
                
                {/* Minimal caption */}
                <div className="absolute inset-0 flex items-end p-4 lg:p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-full">
                    <div className="w-8 h-px bg-gold mb-2" />
                    <p className="font-montserrat text-xs lg:text-sm tracking-wider text-white uppercase">
                      {image.name}
                    </p>
                  </div>
                </div>

                {/* Subtle border */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-500" />
              </div>
            ))}
          </div>

          {/* Minimal footer text */}
          <div className="text-center mt-20 lg:mt-32">
            <div className="w-16 h-px bg-gold/50 mx-auto mb-6" />
            <p className="font-lato text-sm text-gray-500 tracking-[0.3em] uppercase">
              Scroll to explore more
            </p>
          </div>
        </div>
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom]}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        }}
      />
    </>
  )
}
