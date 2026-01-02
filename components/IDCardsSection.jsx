'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function IDCardsSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  const samples = [
    '/images/idcards/idcards1.jpg',
    '/images/idcards/idcards2.jpg',
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      })

      // Sample images animation
      const samples = sectionRef.current.querySelectorAll('.sample-image')
      gsap.from(samples, {
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: samples[0],
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="id-cards"
      ref={sectionRef}
      className="py-32 lg:py-40 px-6 lg:px-12 bg-dark relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(45deg, #c9a961 1px, transparent 1px), linear-gradient(-45deg, #c9a961 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-20">
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <h2 
            ref={titleRef}
            className="font-montserrat text-5xl lg:text-7xl font-bold tracking-wider mb-6"
          >
            School ID Cards
          </h2>
          <p className="font-lato text-xl text-gray-400 max-w-3xl mx-auto">
            Professional identification cards for students, staff, and visitors with high-quality printing and custom designs
          </p>
        </div>

        {/* Sample images */}
        <div className="text-center mb-6">
          <h3 className="font-montserrat text-2xl font-semibold mb-4 tracking-wide">
            Sample Designs
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {samples.map((sample, index) => (
            <div 
              key={index}
              className="sample-image relative aspect-[3/2] rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={sample}
                alt={`ID Card Sample ${index + 1}`}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />
              <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/60 transition-all duration-500 rounded-lg" />
              
              {/* Sample label */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="font-montserrat text-lg text-gold tracking-wider">
                  Sample Design {index + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
