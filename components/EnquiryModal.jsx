'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useModalStore } from '@/store/modalStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function EnquiryModal() {
  const { isEnquiryOpen, closeEnquiry } = useModalStore()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  useEffect(() => {
    if (isEnquiryOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isEnquiryOpen])

  const onSubmit = (data) => {
    console.log('Form data:', data)
    alert('Thank you for your enquiry! We will get back to you soon.')
    reset()
    closeEnquiry()
  }

  return (
    <AnimatePresence>
      {isEnquiryOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEnquiry}
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
                  Enquiry Form
                </h2>
                <button
                  onClick={closeEnquiry}
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
                    placeholder="Full Name"
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
                    placeholder="E-Mail"
                    className="w-full px-4 py-3 bg-dark border border-gray-700 rounded focus:border-gold focus:outline-none transition-smooth"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register('phone', { required: 'Phone number is required' })}
                    type="tel"
                    placeholder="Contact Number"
                    className="w-full px-4 py-3 bg-dark border border-gray-700 rounded focus:border-gold focus:outline-none transition-smooth"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register('city', { required: 'City is required' })}
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-3 bg-dark border border-gray-700 rounded focus:border-gold focus:outline-none transition-smooth"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    placeholder="Message"
                    rows="5"
                    className="w-full px-4 py-3 bg-dark border border-gray-700 rounded focus:border-gold focus:outline-none transition-smooth resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-dark text-white py-4 rounded font-semibold transition-smooth hover:scale-105 hover:shadow-lg hover:shadow-gold/30"
                >
                  Send Enquiry
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
