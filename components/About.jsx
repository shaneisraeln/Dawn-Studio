'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function About() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background gradient
      gsap.to(sectionRef.current, {
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        }
      })

      // Title with split text effect
      const titleText = titleRef.current.textContent
      titleRef.current.innerHTML = titleText.split('').map((char, i) => 
        `<span class="char" style="display: inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('')

      const chars = titleRef.current.querySelectorAll('.char')
      
      gsap.from(chars, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        stagger: 0.05,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Enhanced content paragraphs animations
      const paragraphs = contentRef.current.children
      
      gsap.from(paragraphs[0], {
        opacity: 0,
        x: -150,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: paragraphs[0],
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from(paragraphs[1], {
        opacity: 0,
        x: 150,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: paragraphs[1],
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Animate stats
      const stats = sectionRef.current.querySelectorAll('.stat-item')
      gsap.from(stats, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: stats[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })

      // Floating decorative elements
      const decorElements = []
      for (let i = 0; i < 5; i++) {
        const el = document.createElement('div')
        el.className = 'absolute w-20 h-20 border border-gold/20 rounded-full'
        el.style.left = `${10 + i * 20}%`
        el.style.top = `${20 + (i % 2) * 40}%`
        sectionRef.current.appendChild(el)
        decorElements.push(el)

        gsap.to(el, {
          y: -30,
          rotation: 360,
          duration: 3 + i,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-32 px-6 lg:px-12 bg-dark text-center relative overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#c9a961 1px, transparent 1px), linear-gradient(90deg, #c9a961 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 
          ref={titleRef}
          className="font-montserrat text-4xl lg:text-5xl font-semibold mb-12 tracking-wider"
        >
          About Us
        </h2>
        
        <div ref={contentRef} className="space-y-6">
          <p className="font-lato text-lg lg:text-xl leading-relaxed text-gray-300 relative">
            <span className="absolute -left-4 top-0 text-6xl text-gold/30 font-serif">"</span>
            Dawn HD Studio is a premier luxury photography and filmmaking studio specializing in weddings, pre-wedding shoots, and family portraits. With years of experience and a passion for storytelling, we capture the essence of your most precious moments with elegance and artistry.
          </p>
          <p className="font-lato text-lg lg:text-xl leading-relaxed text-gray-300 relative">
            Our team of talented photographers and filmmakers work tirelessly to ensure every frame tells your unique story. From intimate family sessions to grand wedding celebrations, we bring creativity, professionalism, and heart to every project.
            <span className="absolute -right-4 bottom-0 text-6xl text-gold/30 font-serif">"</span>
          </p>
        </div>

        {/* Animated stats */}
        <div className="flex justify-center gap-16 mt-16">
          {[
            { number: '500+', label: 'Happy Couples' },
            { number: '25+', label: 'Years Experience' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="stat-item text-center"
            >
              <div className="text-4xl font-bold text-gold mb-2">{stat.number}</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
