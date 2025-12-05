import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Testimonials.css'

const testimonials = [
  {
    quote: "Taj Studio captured our wedding day perfectly. Every moment, every emotion - it was all beautifully preserved. We couldn't be happier with the results!",
    author: "PRANAV & MANSI"
  },
  {
    quote: "The pre-wedding shoot was an absolute dream. The team made us feel so comfortable and the photos turned out stunning. Highly recommend!",
    author: "AASHNA & AMIT"
  },
  {
    quote: "Professional, creative, and incredibly talented. Taj Studio exceeded all our expectations. Our wedding film is a masterpiece!",
    author: "RIYA & VIKRAM"
  }
]

const Testimonials = () => {
  const [current, setCurrent] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <motion.section 
      ref={ref}
      className="testimonials-section"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="testimonial-carousel">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="testimonial-item"
          >
            <p className="testimonial-quote">"{testimonials[current].quote}"</p>
            <p className="testimonial-author">{testimonials[current].author}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="testimonial-nav">
        <button className="testimonial-prev" onClick={handlePrev}>‹</button>
        <button className="testimonial-next" onClick={handleNext}>›</button>
      </div>
    </motion.section>
  )
}

export default Testimonials
