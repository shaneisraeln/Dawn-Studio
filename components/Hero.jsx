'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const taglineRef = useRef(null)
  const videoRef = useRef(null)

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

      // Video scale and blur effect
      gsap.to(videoRef.current, {
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

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative h-screen overflow-hidden"
    >
      <div ref={videoRef} className="absolute inset-0 w-full h-full">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
        </video>
      </div>
      
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <h1 
          ref={titleRef}
          className="font-montserrat text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.3em] mb-6 drop-shadow-2xl"
        >
          TAJ STUDIO
        </h1>
        <p 
          ref={taglineRef}
          className="font-lato text-xl md:text-2xl lg:text-3xl font-light tracking-[0.2em] drop-shadow-lg"
        >
          Capturing Life's Most Precious Moments
        </p>
      </div>
    </section>
  )
}
