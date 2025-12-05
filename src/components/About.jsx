import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './About.css'

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Taj Studio is a premier luxury photography and filmmaking studio specializing in weddings, pre-wedding shoots, and family portraits. With years of experience and a passion for storytelling, we capture the essence of your most precious moments with elegance and artistry.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Our team of talented photographers and filmmakers work tirelessly to ensure every frame tells your unique story. From intimate family sessions to grand wedding celebrations, we bring creativity, professionalism, and heart to every project.
        </motion.p>
      </div>
    </section>
  )
}

export default About
