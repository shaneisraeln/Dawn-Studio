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
import ReviewModal from '@/components/ReviewModal'

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
          { url: '/images/prewedding/prewedding1.jpg', name: 'Aashna & Amit' },
          { url: '/images/prewedding/prewedding2.jpg', name: 'Priya & Rahul' },
          { url: '/images/prewedding/prewedding3.jpg', name: 'Neha & Karan' },
          { url: '/images/prewedding/prewedding4.jpg', name: 'Sanya & Rohan' },
          { url: '/images/prewedding/prewedding5.jpg', name: 'Diya & Arjun' },
          { url: '/images/prewedding/prewedding6.jpg', name: 'Riya & Vikram' },
        ]}
      />
      <WeddingSection 
        images={[
          { url: '/images/wedding/wedding1.jpg', name: 'Meera & Aditya' },
          { url: '/images/wedding/wedding2.jpg', name: 'Ananya & Dev' },
          { url: '/images/wedding/wedding3.JPG', name: 'Kavya & Sameer' },
          { url: '/images/wedding/wedding4.JPG', name: 'Ishita & Nikhil' },
          { url: '/images/wedding/wedding5.JPG', name: 'Tara & Ayaan' },
          { url: '/images/wedding/wedding6.jpg', name: 'Zara & Kabir' },
        ]}
      />
      <SchoolFunctionsSection />
      <IDCardsSection />
      <FamilySection 
        images={[
          { url: '/images/family/family1.jpg', name: 'Newborn Dreams' },
          { url: '/images/family/family2.jpg', name: 'Toddler Joy' },
          { url: '/images/family/family3.jpg', name: 'Maternity Glow' },
          { url: '/images/family/family4.jpg', name: 'Family Love' },
          { url: '/images/family/family5.jpg', name: 'Baby Smiles' },
          { url: '/images/family/family6.jpg', name: 'Expecting' },
        ]}
      />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
      <EnquiryModal />
      <ReviewModal />
    </main>
  )
}
