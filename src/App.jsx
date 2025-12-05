import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Portfolio 
        id="pre-wedding"
        title="Pre-Wedding"
        images={[
          { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800', name: 'Aashna & Amit' },
          { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800', name: 'Priya & Rahul' },
          { url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800', name: 'Neha & Karan' },
          { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', name: 'Sanya & Rohan' },
          { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800', name: 'Diya & Arjun' },
          { url: 'https://images.unsplash.com/photo-1529634597217-b7c0b5e6e8e0?w=800', name: 'Riya & Vikram' },
        ]}
      />
      <Portfolio 
        id="wedding"
        title="Wedding"
        images={[
          { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800', name: 'Meera & Aditya' },
          { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800', name: 'Ananya & Dev' },
          { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800', name: 'Kavya & Sameer' },
          { url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800', name: 'Ishita & Nikhil' },
          { url: 'https://images.unsplash.com/photo-1525258437537-f9a5a0f1e4e5?w=800', name: 'Tara & Ayaan' },
          { url: 'https://images.unsplash.com/photo-1594552072238-5d8f0c0c3f3f?w=800', name: 'Zara & Kabir' },
        ]}
      />
      <Portfolio 
        id="films"
        title="Films"
        isVideo={true}
        videos={[
          'https://www.youtube.com/embed/dQw4w9WgXcQ',
          'https://www.youtube.com/embed/dQw4w9WgXcQ',
          'https://www.youtube.com/embed/dQw4w9WgXcQ',
          'https://www.youtube.com/embed/dQw4w9WgXcQ',
          'https://www.youtube.com/embed/dQw4w9WgXcQ',
          'https://www.youtube.com/embed/dQw4w9WgXcQ',
        ]}
      />
      <Portfolio 
        id="family"
        title="Newborn / Toddler / Maternity"
        images={[
          { url: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800', name: 'Newborn Session' },
          { url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800', name: 'Toddler Session' },
          { url: 'https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=800', name: 'Maternity Session' },
          { url: 'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=800', name: 'Family Session' },
          { url: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800', name: 'Baby Session' },
          { url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800', name: 'Maternity Session' },
        ]}
      />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
