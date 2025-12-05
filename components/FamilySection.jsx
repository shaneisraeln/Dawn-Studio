'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

gsap.registerPlugin(ScrollTrigger)

export default function FamilySection({ images }) {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Title animation - split and reveal
      const titleText = titleRef.current.textContent
      titleRef.current.innerHTML = titleText.split('').map((char, i) => 
        `<span class="inline-block" style="display: inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('')

      const chars = titleRef.current.querySelectorAll('span')
      
      gsap.from(chars, {
        opacity: 0,
        y: 50,
        rotationX: -90,
        stagger: 0.03,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })

      // Category tabs animation
      const tabs = sectionRef.current.querySelectorAll('.category-tab')
      gsap.from(tabs, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: tabs[0],
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })

      // Large featured image
      const featured = sectionRef.current.querySelector('.featured-image')
      if (featured) {
        gsap.from(featured, {
          scale: 0.8,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featured,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        })

        // Parallax on featured
        gsap.to(featured, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: featured,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        })
      }

      // Grid items with different animations
      const gridItems = sectionRef.current.querySelectorAll('.grid-item')
      gridItems.forEach((item, index) => {
        const direction = index % 2 === 0 ? -100 : 100
        
        gsap.from(item, {
          x: direction,
          opacity: 0,
          rotation: index % 2 === 0 ? -10 : 10,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        })

        // Parallax
        gsap.to(item, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        })
      })

      // Decorative elements
      const decorElements = sectionRef.current.querySelectorAll('.decor-circle')
      decorElements.forEach((el, i) => {
        gsap.to(el, {
          y: -30,
          rotation: 360,
          duration: 4 + i,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
      })

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
        id="family"
        ref={sectionRef}
        className="py-32 lg:py-40 px-6 lg:px-12 bg-gradient-to-b from-dark via-dark-lighter to-dark relative overflow-hidden"
      >
        {/* Decorative circles */}
        <div className="decor-circle absolute top-20 left-10 w-40 h-40 border-2 border-gold/20 rounded-full" />
        <div className="decor-circle absolute bottom-40 right-20 w-60 h-60 border-2 border-gold/10 rounded-full" />
        <div className="decor-circle absolute top-1/2 left-1/4 w-32 h-32 border border-gold/15 rounded-full" />

        {/* Floating hearts */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-gold/20 text-2xl pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            ♥
          </div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 
              ref={titleRef}
              className="font-montserrat text-5xl lg:text-7xl font-bold tracking-wider mb-6"
            >
              Family Moments
            </h2>
            <p className="font-lato text-xl text-gray-400 max-w-2xl mx-auto">
              Celebrating the joy of new beginnings and precious family bonds
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['Newborn', 'Toddler', 'Maternity', 'Family'].map((cat, i) => (
              <div 
                key={i}
                className="category-tab px-6 py-3 bg-dark-lighter border-2 border-gold/30 rounded-full hover:bg-gold hover:border-gold transition-all duration-300 cursor-pointer"
              >
                <span className="font-montserrat text-sm tracking-wider uppercase">{cat}</span>
              </div>
            ))}
          </div>

          {/* Featured large image */}
          <div className="featured-image relative h-[60vh] rounded-2xl overflow-hidden mb-8 group cursor-pointer"
               onClick={() => openLightbox(0)}>
            <Image
              src={images[0].url}
              alt={images[0].name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-12">
              <div>
                <p className="font-montserrat text-3xl font-bold text-gold mb-2">{images[0].name}</p>
                <div className="w-32 h-1 bg-gold" />
              </div>
            </div>
            <div className="absolute inset-0 border-4 border-gold/0 group-hover:border-gold/60 transition-all duration-500 rounded-2xl" />
          </div>

          {/* Grid layout - asymmetric */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Large item */}
            <div 
              className="grid-item col-span-2 row-span-2 relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              onClick={() => openLightbox(1)}
            >
              <Image
                src={images[1].url}
                alt={images[1].name}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                <p className="font-montserrat text-2xl text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 tracking-wider uppercase">
                  {images[1].name}
                </p>
              </div>
            </div>

            {/* Small items */}
            {images.slice(2).map((image, index) => (
              <div 
                key={index + 2}
                className="grid-item relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => openLightbox(index + 2)}
              >
                <Image
                  src={image.url}
                  alt={image.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <p className="font-montserrat text-sm text-gold tracking-wider uppercase">
                    {image.name}
                  </p>
                </div>
                <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/80 transition-all duration-500 rounded-xl" />
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

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
      `}</style>
    </>
  )
}
