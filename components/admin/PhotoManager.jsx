'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function PhotoManager() {
  const [selectedSection, setSelectedSection] = useState('slideshow')
  const [photos, setPhotos] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const sections = [
    { id: 'slideshow', label: 'Hero Slideshow', count: 3 },
    { id: 'prewedding', label: 'Pre-Wedding', count: 6 },
    { id: 'wedding', label: 'Wedding', count: 6 },
    { id: 'school', label: 'School Functions', count: 4 },
    { id: 'family', label: 'Family', count: 6 },
    { id: 'idcards', label: 'ID Cards', count: 2 },
  ]

  useEffect(() => {
    loadPhotos()
  }, [])

  const loadPhotos = async () => {
    // In a real app, this would fetch from an API
    // For now, we'll simulate the current photo structure
    const mockPhotos = {
      slideshow: [
        { id: 1, url: '/images/slideshow/slide1.jpg', name: 'Slide 1' },
        { id: 2, url: '/images/slideshow/slide2.jpg', name: 'Slide 2' },
        { id: 3, url: '/images/slideshow/slide3.jpg', name: 'Slide 3' },
      ],
      prewedding: Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        url: `/images/prewedding/prewedding${i + 1}.jpg`,
        name: `Pre-Wedding ${i + 1}`
      })),
      wedding: Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        url: `/images/wedding/wedding${i + 1}.jpg`,
        name: `Wedding ${i + 1}`
      })),
      school: [
        { id: 1, url: '/images/school/annual-day.jpeg', name: 'Annual Day' },
        { id: 2, url: '/images/school/sports-day.JPG', name: 'Sports Day' },
        { id: 3, url: '/images/school/graduation.JPG', name: 'Graduation' },
        { id: 4, url: '/images/school/cultural-events.JPG', name: 'Cultural Events' },
      ],
      family: Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        url: `/images/family/family${i + 1}.jpg`,
        name: `Family ${i + 1}`
      })),
      idcards: Array.from({ length: 2 }, (_, i) => ({
        id: i + 1,
        url: `/images/idcards/idcards${i + 1}.jpg`,
        name: `ID Card ${i + 1}`
      })),
    }
    setPhotos(mockPhotos)
  }

  const handleFileUpload = async (event, photoId) => {
    const file = event.target.files[0]
    if (!file) return

    setIsLoading(true)

    try {
      // In a real app, you would upload to a server/cloud storage
      // For now, we'll simulate the upload
      const reader = new FileReader()
      reader.onload = (e) => {
        const newPhotos = { ...photos }
        const photoIndex = newPhotos[selectedSection].findIndex(p => p.id === photoId)
        if (photoIndex !== -1) {
          newPhotos[selectedSection][photoIndex].url = e.target.result
        }
        setPhotos(newPhotos)
        setIsLoading(false)
        
        // Show success message
        alert('Photo updated successfully! Note: This is a demo - changes are not permanent.')
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Upload error:', error)
      setIsLoading(false)
      alert('Upload failed. Please try again.')
    }
  }

  const currentPhotos = photos[selectedSection] || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-montserrat text-2xl font-semibold text-white">
          Photo Management
        </h2>
        <div className="text-sm text-gray-400">
          Select a section to manage photos
        </div>
      </div>

      {/* Section Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setSelectedSection(section.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              selectedSection === section.id
                ? 'border-gold bg-gold/10 text-gold'
                : 'border-gray-700 bg-dark-lighter text-gray-300 hover:border-gold/50'
            }`}
          >
            <div className="font-semibold">{section.label}</div>
            <div className="text-sm opacity-75">{section.count} photos</div>
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="bg-dark-lighter rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-4 text-gold">
          {sections.find(s => s.id === selectedSection)?.label} Photos
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPhotos.map((photo) => (
            <div key={photo.id} className="bg-dark rounded-lg p-4 border border-gray-700">
              <div className="relative aspect-[4/3] mb-4 rounded overflow-hidden">
                <Image
                  src={photo.url}
                  alt={photo.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-white">{photo.name}</h4>
                
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, photo.id)}
                    className="hidden"
                    disabled={isLoading}
                  />
                  <div className="bg-gold hover:bg-gold-dark text-white px-4 py-2 rounded cursor-pointer text-center transition-colors duration-300 disabled:opacity-50">
                    {isLoading ? 'Uploading...' : 'Replace Photo'}
                  </div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <h4 className="font-semibold text-blue-300 mb-2">📝 Instructions:</h4>
        <ul className="text-sm text-blue-200 space-y-1">
          <li>• Select a section above to view and manage its photos</li>
          <li>• Click "Replace Photo" to upload a new image</li>
          <li>• Supported formats: JPG, PNG, WebP</li>
          <li>• Recommended size: 1920x1080 for best quality</li>
          <li>• Note: This is a demo - changes are temporary</li>
        </ul>
      </div>
    </div>
  )
}