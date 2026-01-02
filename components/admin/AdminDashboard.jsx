'use client'

import { useState } from 'react'
import PhotoManager from './PhotoManager'
import EnquiryManager from './EnquiryManager'
import ReviewManager from './ReviewManager'

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('photos')

  const tabs = [
    { id: 'photos', label: 'Photo Management', icon: '📷' },
    { id: 'enquiries', label: 'Enquiries', icon: '📧' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
  ]

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <header className="bg-dark-lighter border-b border-gold/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-montserrat text-2xl font-bold text-gold">
              DAWN HD STUDIO
            </h1>
            <p className="text-gray-400 text-sm">Admin Dashboard</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-dark-lighter border-b border-gold/10">
        <div className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-300 ${
                activeTab === tab.id
                  ? 'border-gold text-gold'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="p-6">
        {activeTab === 'photos' && <PhotoManager />}
        {activeTab === 'enquiries' && <EnquiryManager />}
        {activeTab === 'reviews' && <ReviewManager />}
      </main>
    </div>
  )
}