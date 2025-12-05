'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Portfolio from '@/components/Portfolio'
import WeddingSection from '@/components/WeddingSection'
import SchoolFunctionsSection from '@/components/SchoolFunctionsSection'
import IDCardsSection from '@/components/IDCardsSection'
import FamilySection from '@/components/FamilySection'
import Testimonials from '@/components/Testimonials'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import EnquiryModal from '@/components/EnquiryModal'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh()
  }, [])

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Portfolio 
        id="pre-wedding"
        title="Pre-Wedding"
        animationType="pre-wedding"
        images={[
          { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200', name: 'Aashna & Amit' },
          { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200', name: 'Priya & Rahul' },
          { url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200', name: 'Neha & Karan' },
          { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200', name: 'Sanya & Rohan' },
          { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200', name: 'Diya & Arjun' },
          { url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200', name: 'Riya & Vikram' },
        ]}
      />
      <WeddingSection 
        images={[
          { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1600&q=80', name: 'Meera & Aditya' },
          { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80', name: 'Ananya & Dev' },
          { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80', name: 'Kavya & Sameer' },
          { url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80', name: 'Ishita & Nikhil' },
          { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80', name: 'Tara & Ayaan' },
          { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80', name: 'Zara & Kabir' },
        ]}
      />
      <SchoolFunctionsSection />
      <IDCardsSection />
      <FamilySection 
        images={[
          { url: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&q=80', name: 'Newborn Dreams' },
          { url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1200&q=80', name: 'Toddler Joy' },
          { url: 'https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=1200&q=80', name: 'Maternity Glow' },
          { url: 'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=1200&q=80', name: 'Family Love' },
          { url: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200&q=80', name: 'Baby Smiles' },
          { url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80', name: 'Expecting' },
        ]}
      />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
      <EnquiryModal />
    </main>
  )
}
