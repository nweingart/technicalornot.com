import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadImage } from '../services/storage'
import { collection, addDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { db, auth } from '../firebase/config'

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB

export function AddProfileScreen() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isTechnical: null,
    imageFile: null,
    justification: '',
    linkedInUrl: '',
    isYCFounder: false
  })
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    handleFiles(files)
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    handleFiles(files)
  }

  const handleFiles = (files) => {
    if (files?.length) {
      const file = files[0]
      
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file')
        return
      }

      if (file.size > MAX_FILE_SIZE) {
        setError('Image must be less than 20MB')
        return
      }

      setError(null)
      setFormData(prev => ({ ...prev, imageFile: file }))
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      // 1. Create Firebase Auth account
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      // 2. Upload image to Firebase Storage
      const imageUrl = await uploadImage(formData.imageFile)

      // 3. Create the person document
      const personData = {
        name: formData.name,
        email: formData.email,
        isTechnical: formData.isTechnical,
        imageUrl,
        justification: formData.justification,
        linkedInUrl: formData.linkedInUrl || null,
        isYCFounder: formData.isYCFounder,
        status: 'pending',
        createdAt: new Date().toISOString(),
        userId: user.uid
      }

      await addDoc(collection(db, 'people'), personData)
      navigate('/thank-you')
    } catch (err) {
      console.error('Submission error:', err)
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists')
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters')
      } else {
        setError(err.message || 'Failed to submit profile. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateForm = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">Add Your Profile</h1>
      
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div 
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= step ? 'bg-[#FF6601] text-white' : 'bg-gray-200'
            }`}
          >
            {step}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateForm('name', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6601]"
                required
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateForm('email', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6601]"
                required
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => updateForm('password', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6601]"
                required
                minLength={6}
                placeholder="Choose a password (min 6 characters)"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                LinkedIn URL (Optional)
              </label>
              <input
                type="url"
                value={formData.linkedInUrl}
                onChange={(e) => updateForm('linkedInUrl', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6601]"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isYCFounder}
                  onChange={(e) => updateForm('isYCFounder', e.target.checked)}
                  className="w-4 h-4 rounded accent-[#FF6601] border-gray-300 hover:border-[#FF6601] focus:ring-[#FF6601] focus:ring-offset-0 checked:bg-[#FF6601] checked:hover:bg-[#FF6601] checked:[&:not(:focus)]:bg-[#FF6601]"
                  style={{ 
                    accentColor: '#FF6601',
                    backgroundImage: formData.isYCFounder 
                      ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`
                      : ''
                  }}
                />
                <span className="text-gray-700">I'm a Y Combinator founder</span>
              </label>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-gray-700 font-medium">
                  Profile Image
                </label>
                <span className="text-sm text-gray-500">
                  (This is the picture people will guess on)
                </span>
              </div>
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
                  ${isDragging ? 'border-[#FF6601] bg-orange-50' : 'border-gray-300 hover:border-[#FF6601]'}`}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileInput}
                />
                
                {imagePreview ? (
                  <div className="space-y-4">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="mx-auto max-h-48 rounded-lg"
                    />
                    <p className="text-sm text-gray-500">
                      Click or drag to replace image
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <svg 
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path 
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="text-gray-600">
                      <span className="text-[#FF6601] font-medium">
                        Click to upload
                      </span>
                      {' '}or drag and drop
                    </div>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF up to 20MB
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Are you technical?
              </label>
              <div className="space-x-4">
                <button
                  type="button"
                  onClick={() => updateForm('isTechnical', true)}
                  className={`px-4 py-2 rounded-md ${
                    formData.isTechnical === true
                      ? 'bg-[#FF6601] text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => updateForm('isTechnical', false)}
                  className={`px-4 py-2 rounded-md ${
                    formData.isTechnical === false
                      ? 'bg-[#FF6601] text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Why {formData.isTechnical ? 'are you' : "aren't you"} technical?
              </label>
              <textarea
                value={formData.justification}
                onChange={(e) => updateForm('justification', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6601] h-32"
                required
                maxLength={100}
                placeholder="i.e. Engineer at Stripe, CS degree from Waterloo, etc"
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.justification.length}/100 characters
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-center">{error}</div>
        )}

        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-6 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200"
            >
              Back
            </button>
          )}
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-6 py-2 bg-[#FF6601] text-white rounded-md hover:bg-[#FF7F33] ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#FF6601] text-white rounded-md hover:bg-[#FF7F33] ml-auto disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
} 