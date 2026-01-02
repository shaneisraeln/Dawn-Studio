'use client'

import { useState, useEffect } from 'react'

export default function ReviewManager() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/reviews')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setReviews(data.reviews)
        }
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateReviewStatus = async (reviewId, status) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: reviewId, status }),
      })

      if (response.ok) {
        // Update local state
        setReviews(reviews.map(review => 
          review.id === reviewId ? { ...review, status } : review
        ))
      }
    } catch (error) {
      console.error('Failed to update review status:', error)
    }
  }

  const deleteReview = async (reviewId) => {
    if (!confirm('Are you sure you want to delete this review?')) return

    try {
      const response = await fetch(`/api/reviews?id=${reviewId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setReviews(reviews.filter(review => review.id !== reviewId))
      }
    } catch (error) {
      console.error('Failed to delete review:', error)
    }
  }

  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true
    return review.status === filter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-400 bg-green-400/10'
      case 'rejected': return 'text-red-400 bg-red-400/10'
      case 'pending': return 'text-yellow-400 bg-yellow-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getServiceLabel = (service) => {
    const serviceLabels = {
      wedding: 'Wedding Photography',
      prewedding: 'Pre-Wedding Shoot',
      family: 'Family Photography',
      school: 'School Functions',
      idcards: 'ID Cards'
    }
    return serviceLabels[service] || service
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Review Management</h2>
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                filter === status
                  ? 'bg-gold text-dark'
                  : 'bg-dark-lighter text-gray-300 hover:bg-gray-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'all' && (
                <span className="ml-2 bg-gray-600 text-white px-2 py-1 rounded-full text-xs">
                  {reviews.filter(r => r.status === status).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>No reviews found for the selected filter.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-dark-lighter rounded-lg p-6 border border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{review.name}</h3>
                  <p className="text-gray-400 text-sm">{review.email}</p>
                  <p className="text-gray-500 text-sm">
                    {getServiceLabel(review.service)} • {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < review.rating ? 'text-gold' : 'text-gray-600'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                    {review.status}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                "{review.review}"
              </p>

              <div className="flex items-center gap-3">
                {review.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateReviewStatus(review.id, 'approved')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateReviewStatus(review.id, 'rejected')}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                    >
                      Reject
                    </button>
                  </>
                )}
                
                {review.status === 'approved' && (
                  <button
                    onClick={() => updateReviewStatus(review.id, 'rejected')}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                  >
                    Reject
                  </button>
                )}
                
                {review.status === 'rejected' && (
                  <button
                    onClick={() => updateReviewStatus(review.id, 'approved')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                  >
                    Approve
                  </button>
                )}

                <button
                  onClick={() => deleteReview(review.id)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}