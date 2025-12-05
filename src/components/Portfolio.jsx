import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Portfolio.css'

const Portfolio = ({ id, title, images, videos, isVideo }) => {
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section id={id} className="portfolio-section">
      <motion.div 
        ref={titleRef}
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2>{title}</h2>
      </motion.div>
      
      <motion.div 
        className="masonry-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {isVideo ? (
          videos.map((video, index) => (
            <motion.div 
              key={index} 
              className="gallery-item video-item"
              variants={itemVariants}
            >
              <iframe 
                src={video} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </motion.div>
          ))
        ) : (
          images.map((image, index) => (
            <motion.div 
              key={index} 
              className="gallery-item"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={image.url} alt={image.name} loading="lazy" />
              <div className="gallery-overlay">
                <p className="couple-name">{image.name}</p>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </section>
  )
}

export default Portfolio
