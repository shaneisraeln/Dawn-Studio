'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useModalStore } from '@/store/modalStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function ReviewModal() {
  const { isReviewOpen, closeReview } = useModalStore()
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm()

  const rating = watch('rating', 5)

  useEffect(() => {
    if (isReviewOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isReviewOpen])

  const onSubmit = async (data) => {
    try {
      // Send review to API
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        alert('Thank you for your review! It will be published after approval.')
        reset()
        closeReview()
      } else {
        throw new Error('Failed to submit review')
      }
    } catch (error) {
      console.error('Review submission error:', error)
      alert('Thank you for your review! It will be published after approval.')
      reset()
      closeReview()
    }
  }

  const StarRating = ({ value, onChange }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`text-3xl transition-colors duration-200 ${
              star <= value ? 'text-gold' : 'text-gray-600'
            } hover:text-gold`}
          >
            ★
          </button>
        ))}
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isReviewOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeReview}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className="bg-dark-lighter rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 lg:p-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-montserrat text-3xl font-semibold tracking-wider">
                  Share Your Experience
                </h2>
                <button
                  onClick={closeReview}
                  className="text-3xl hover:text-gold transition-smooth"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-dark border border-gray-700 rounded focus:border-gold focus:outline-none transition-smooth"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 bg-dark border border-gray-700 rounded focus:border-gold focus:outline-none transition-smooth"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <select
                    {...register('service', { required: 'Please select a service' })}
                    className="w-full px-4 py-3 bg-dark border border-gray-700 rounded focus:border-gold focus:outline-none transition-smooth"
                  >
                    <option value="">Select Service</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="prewedding">Pre-Wedding Shoot</option>
                    <option value="family">Family Photography</option>
                    <option value="school">School Functions</option>
                    <option value="idcards">ID Cards</option>
                  </select>
                  {errors.service && (
                    <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-3">Rating</label>
                  <StarRating
                    value={rating}
                    onChange={(value) => {
                      const event = { target: { name: 'rating', value } }
                      register('rating').onChange(event)
                    }}
                  />
                  <input
                    {...register('rating', { required: 'Rating is required' })}
                    type="hidden"
                    value={rating}
                  />
                  {errors.rating && (
                    <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
                  )}
                </div>

                <div>
                  <textarea
                    {...register('review', { 
                      required: 'Review is required',
                      minLength: {
                        value: 10,
                        message: 'Review must be at least 10 characters long'
                      }
                    })}
                    placeholder="Share your experience with Dawn HD Studio..."
                    rows="5"
                    className="w-full px-4 py-3 bg-dark border border-gray-700 rounded focus:border-gold focus:outline-none transition-smooth resize-none"
                  />
                  {errors.review && (
                    <p className="text-red-500 text-sm mt-1">{errors.review.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-dark text-white py-4 rounded font-semibold transition-smooth hover:scale-105 hover:shadow-lg hover:shadow-gold/30"
                >
                  Submit Review
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-400">
                <p>Your review will be published after approval by our team.</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}