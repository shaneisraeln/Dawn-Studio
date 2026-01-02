'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const taglineRef = useRef(null)
  const slideshowRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Hero slideshow images - using local images from public/images/slideshow/
  const heroImages = [
    {
      url: '/images/slideshow/slide1.jpg',
      alt: 'Dawn HD Studio Photography 1',
      objectPosition: 'center' // Default center positioning
    },
    {
      url: '/images/slideshow/slide2.JPG', 
      alt: 'Dawn HD Studio Photography 2',
      objectPosition: 'center middle' // Show bottom part of portrait image
    },
    {
      url: '/images/slideshow/slide3.jpg',
      alt: 'Dawn HD Studio Photography 3',
      objectPosition: 'center' // Default center positioning
    }
  ]

  useEffect(() => {
    // Auto-advance slideshow
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [heroImages.length])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial fade in
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 100,
        duration: 1.2,
        delay: 0.5,
        ease: 'power3.out'
      })

      gsap.from(taglineRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
      })

      // Enhanced parallax effect on scroll
      gsap.to(titleRef.current, {
        y: -200,
        opacity: 0,
        scale: 0.8,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        }
      })

      gsap.to(taglineRef.current, {
        y: -150,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        }
      })

      // Slideshow scale and blur effect
      gsap.to(slideshowRef.current, {
        scale: 1.3,
        filter: 'blur(10px)',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Slideshow Container */}
      <div ref={slideshowRef} className="absolute inset-0 w-full h-full">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              style={{ objectPosition: image.objectPosition }}
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
        <h1 
          ref={titleRef}
          className="font-montserrat text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.3em] mb-6 drop-shadow-2xl"
        >
          DAWN HD STUDIO
        </h1>
        <p 
          ref={taglineRef}
          className="font-lato text-xl md:text-2xl lg:text-3xl font-light tracking-[0.2em] drop-shadow-lg"
        >
          Capturing Life's Most Precious Moments
        </p>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-gold scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30 z-20">
        <div 
          className="h-full bg-gold transition-all duration-300 ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / heroImages.length) * 100}%` 
          }}
        />
      </div>
    </section>
  )
}
