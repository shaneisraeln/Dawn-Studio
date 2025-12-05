'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function IDCardsSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)

  const cardTypes = [
    {
      title: 'Student ID Cards',
      description: 'Professional student identification cards with photo',
      features: ['High-quality printing', 'Durable material', 'Custom design', 'Quick turnaround'],
      icon: '🎓'
    },
    {
      title: 'Staff ID Cards',
      description: 'Professional staff identification with security features',
      features: ['Security features', 'Professional design', 'Bulk orders', 'Fast delivery'],
      icon: '👨‍🏫'
    },
    {
      title: 'Visitor Passes',
      description: 'Temporary visitor identification cards',
      features: ['Customizable', 'Date-specific', 'Security compliant', 'Affordable'],
      icon: '🎫'
    }
  ]

  const samples = [
    'https://images.unsplash.com/photo-1633613286991-611fe299c4be?w=800&q=80',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80',
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

      // Card type animations
      const cards = contentRef.current.querySelectorAll('.id-card-type')
      gsap.from(cards, {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 70%',
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

      // Floating animation for icons
      const icons = contentRef.current.querySelectorAll('.card-icon')
      icons.forEach((icon, i) => {
        gsap.to(icon, {
          y: -10,
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
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

        {/* Card types grid */}
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {cardTypes.map((card, index) => (
            <div 
              key={index}
              className="id-card-type bg-dark-lighter border border-gold/20 rounded-xl p-8 hover:border-gold/60 transition-all duration-500 hover:transform hover:scale-105 group"
            >
              <div className="card-icon text-6xl mb-6">{card.icon}</div>
              <h3 className="font-montserrat text-2xl font-semibold mb-3 tracking-wide">
                {card.title}
              </h3>
              <p className="font-lato text-gray-400 mb-6 leading-relaxed">
                {card.description}
              </p>
              <ul className="space-y-3">
                {card.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full bg-gold/10 hover:bg-gold text-white py-3 rounded font-semibold transition-all duration-300 border border-gold/30 hover:border-gold">
                Order Now
              </button>
            </div>
          ))}
        </div>

        {/* Sample images */}
        <div className="text-center mb-12">
          <h3 className="font-montserrat text-2xl font-semibold mb-8 tracking-wide">
            Sample Designs
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                sizes="(max-width: 768px) 100vw, 33vw"
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

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="font-lato text-gray-400 mb-6">
            Need custom ID cards for your school?
          </p>
          <button className="bg-gold hover:bg-gold-dark text-white px-10 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/30">
            Get a Quote
          </button>
        </div>
      </div>
    </section>
  )
}
