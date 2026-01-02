'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

gsap.registerPlugin(ScrollTrigger)

const animationVariants = {
  'pre-wedding': {
    title: { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' },
    items: { y: 50, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' }
  },
  'wedding': {
    title: { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' },
    items: { y: 50, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' }
  },
  'family': {
    title: { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' },
    items: { y: 50, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' }
  }
}

export default function Portfolio({ id, title, images, animationType = 'pre-wedding' }) {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    if (!titleRef.current || !gridRef.current) return

    const variant = animationVariants[animationType]
    
    const ctx = gsap.context(() => {
      // Enhanced title animation with glow
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })

      titleTl
        .from(titleRef.current, variant.title)
        .to(titleRef.current, {
          textShadow: '0 0 30px rgba(201, 169, 97, 0.6)',
          duration: 0.8,
          ease: 'power2.inOut'
        }, '-=0.5')

      // Decorative line
      const line = titleRef.current.nextElementSibling
      if (line) {
        gsap.from(line, {
          scaleX: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        })
      }

      // Enhanced grid items animation
      const items = gridRef.current.querySelectorAll('.gallery-item')
      
      items.forEach((item, index) => {
        // Main item animation
        gsap.from(item, {
          ...variant.items,
          delay: index * variant.items.stagger,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        })

        // Image scale animation
        const img = item.querySelector('img')
        if (img) {
          gsap.from(img, {
            scale: 1.4,
            duration: 1.5,
            delay: index * variant.items.stagger,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          })
        }

        // Parallax effect
        gsap.to(item, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        })
      })

      // Floating particles
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute w-1 h-1 bg-gold/30 rounded-full pointer-events-none'
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
        sectionRef.current.appendChild(particle)

        gsap.to(particle, {
          y: -100,
          opacity: 0,
          duration: 3 + Math.random() * 3,
          repeat: -1,
          ease: 'power1.out',
          delay: Math.random() * 2
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [animationType])

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const slides = images.map(img => ({ src: img.url }))

  return (
    <>
      <section 
        id={id}
        ref={sectionRef}
        className="py-24 lg:py-32 px-6 lg:px-12 bg-dark relative overflow-hidden"
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark to-dark-lighter opacity-50 pointer-events-none" />

        {/* Grid background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(201, 169, 97, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 169, 97, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              ref={titleRef}
              className="font-montserrat text-4xl lg:text-6xl font-bold tracking-wider"
            >
              {title}
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto mt-6 origin-center" />
          </div>
        
          <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {images.map((image, index) => (
              <div 
                key={index}
                className="gallery-item relative aspect-[4/3] overflow-hidden cursor-pointer group rounded-lg bg-dark-lighter"
                onClick={() => openLightbox(index)}
                style={{ perspective: '1000px' }}
              >
                <Image
                  src={image.url}
                  alt={image.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
                
                {/* Enhanced overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 border-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-gold" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-gold" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-gold" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-gold" />
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    style={{ width: '50%' }}
                  />
                </div>
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

      <style jsx global>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </>
  )
}
