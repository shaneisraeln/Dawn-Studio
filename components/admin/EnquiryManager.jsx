'use client'

import { useState, useEffect } from 'react'

export default function EnquiryManager() {
  const [enquiries, setEnquiries] = useState([])
  const [selectedEnquiry, setSelectedEnquiry] = useState(null)
  const [emailSettings, setEmailSettings] = useState({
    enabled: true,
    adminEmail: 'dawnhdstudio@gmail.com',
    autoReply: true
  })

  useEffect(() => {
    loadEnquiries()
  }, [])

  const loadEnquiries = () => {
    // Mock enquiries data - in real app, fetch from database
    const mockEnquiries = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        city: 'New York',
        message: 'Interested in wedding photography package',
        date: '2025-01-02T10:30:00Z',
        status: 'new'
      },
      {
        id: 2,
        name: 'Sarah Smith',
        email: 'sarah@example.com',
        phone: '+1987654321',
        city: 'Los Angeles',
        message: 'Looking for pre-wedding shoot in March',
        date: '2025-01-01T15:45:00Z',
        status: 'replied'
      }
    ]
    setEnquiries(mockEnquiries)
  }

  const updateEnquiryStatus = (id, status) => {
    setEnquiries(prev => 
      prev.map(enquiry => 
        enquiry.id === id ? { ...enquiry, status } : enquiry
      )
    )
  }

  const deleteEnquiry = (id) => {
    if (confirm('Are you sure you want to delete this enquiry?')) {
      setEnquiries(prev => prev.filter(enquiry => enquiry.id !== id))
      setSelectedEnquiry(null)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-green-600'
      case 'replied': return 'bg-blue-600'
      case 'closed': return 'bg-gray-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-montserrat text-2xl font-semibold text-white">
          Enquiry Management
        </h2>
        <div className="text-sm text-gray-400">
          {enquiries.length} total enquiries
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-dark-lighter rounded-lg p-6 border border-gold/20">
        <h3 className="font-semibold text-lg mb-4 text-gold">Email Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Admin Email</label>
            <input
              type="email"
              value={emailSettings.adminEmail}
              onChange={(e) => setEmailSettings({...emailSettings, adminEmail: e.target.value})}
              className="w-full px-3 py-2 bg-dark border border-gray-700 rounded focus:border-gold focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={emailSettings.enabled}
                onChange={(e) => setEmailSettings({...emailSettings, enabled: e.target.checked})}
                className="text-gold"
              />
              <span className="text-sm text-gray-300">Email Notifications</span>
            </label>
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={emailSettings.autoReply}
                onChange={(e) => setEmailSettings({...emailSettings, autoReply: e.target.checked})}
                className="text-gold"
              />
              <span className="text-sm text-gray-300">Auto Reply</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enquiries List */}
        <div className="bg-dark-lighter rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-4 text-white">Recent Enquiries</h3>
          
          <div className="space-y-3">
            {enquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                onClick={() => setSelectedEnquiry(enquiry)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                  selectedEnquiry?.id === enquiry.id
                    ? 'border-gold bg-gold/10'
                    : 'border-gray-700 bg-dark hover:border-gold/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{enquiry.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(enquiry.status)}`}>
                    {enquiry.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-1">{enquiry.email}</p>
                <p className="text-xs text-gray-500">{formatDate(enquiry.date)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enquiry Details */}
        <div className="bg-dark-lighter rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-4 text-white">Enquiry Details</h3>
          
          {selectedEnquiry ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Name</label>
                  <p className="text-white">{selectedEnquiry.name}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <p className="text-white">{selectedEnquiry.email}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Phone</label>
                  <p className="text-white">{selectedEnquiry.phone}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">City</label>
                  <p className="text-white">{selectedEnquiry.city}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Message</label>
                <p className="text-white bg-dark p-3 rounded border border-gray-700">
                  {selectedEnquiry.message}
                </p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Date</label>
                <p className="text-white">{formatDate(selectedEnquiry.date)}</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => updateEnquiryStatus(selectedEnquiry.id, e.target.value)}
                  className="px-3 py-2 bg-dark border border-gray-700 rounded focus:border-gold focus:outline-none text-white"
                >
                  <option value="new">New</option>
                  <option value="replied">Replied</option>
                  <option value="closed">Closed</option>
                </select>
                
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Re: Your Enquiry&body=Dear ${selectedEnquiry.name},%0D%0A%0D%0AThank you for your enquiry...`}
                  className="bg-gold hover:bg-gold-dark text-white px-4 py-2 rounded transition-colors duration-300"
                >
                  Reply via Email
                </a>
                
                <button
                  onClick={() => deleteEnquiry(selectedEnquiry.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Select an enquiry to view details</p>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
        <h4 className="font-semibold text-green-300 mb-2">📧 Email Integration:</h4>
        <ul className="text-sm text-green-200 space-y-1">
          <li>• Configure your admin email above to receive notifications</li>
          <li>• Enable auto-reply to send confirmation emails to customers</li>
          <li>• Click "Reply via Email" to respond directly from your email client</li>
          <li>• Update enquiry status to track progress</li>
          <li>• Note: For production, integrate with EmailJS or similar service</li>
        </ul>
      </div>
    </div>
  )
}