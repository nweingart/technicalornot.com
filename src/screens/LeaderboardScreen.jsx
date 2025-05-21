import { useState, useEffect } from 'react'
import { api } from '../services/api'

export function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState('people')
  const [viewType, setViewType] = useState('top')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [leaderboardData, setLeaderboardData] = useState({
    scores: null,
    technicality: null
  })

  // Reset everything when changing tabs
  const handleTabChange = (newTab) => {
    setActiveTab(newTab)
    setViewType('top')
    setLeaderboardData({
      scores: null,
      technicality: null
    })
  }

  // Reset data when changing view type
  const handleViewTypeChange = (newType) => {
    setViewType(newType)
    setLeaderboardData(prev => ({
      scores: null,
      technicality: null
    }))
  }

  const getCurrentData = () => {
    if (activeTab === 'people') {
      const techData = leaderboardData.technicality
      if (!techData) return []
      
      if (viewType === 'top') {
        return techData.mostTechnical || []
      } else {
        return [...(techData.leastTechnical || [])].reverse()
      }
    } else {
      const scoreData = leaderboardData.scores
      if (!scoreData) return []

      if (viewType === 'top') {
        // Sort high scores from highest to lowest
        return [...(scoreData.top || [])].sort((a, b) => b.accuracy - a.accuracy)
      } else {
        // Keep low scores sorting from lowest to highest
        return [...(scoreData.bottom || [])].sort((a, b) => a.accuracy - b.accuracy)
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        if (activeTab === 'people') {
          const techData = await api.getLeaderboardTechnicality()
          setLeaderboardData({ scores: null, technicality: techData })
        } else {
          const scoreData = await api.getLeaderboardScores()
          setLeaderboardData({ technicality: null, scores: scoreData })
        }
      } catch (err) {
        console.error('Failed to fetch leaderboard data:', err)
        setError('Failed to load leaderboard data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [activeTab, viewType])  // Added viewType as dependency

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Loading leaderboard data...
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Leaderboard</h1>
      
      {/* Main Navigation */}
      <div className="flex flex-col items-center mb-8">
        <div className="bg-white rounded-lg shadow inline-flex p-1">
          <button
            onClick={() => handleTabChange('people')}
            className={`px-6 py-2 rounded-md font-medium transition ${
              activeTab === 'people'
                ? 'bg-[#FF6601] text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            Appearance Scores
          </button>
          <button
            onClick={() => handleTabChange('games')}
            className={`px-6 py-2 rounded-md font-medium transition ${
              activeTab === 'games'
                ? 'bg-[#FF6601] text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            Game Scores
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header with Dropdown */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">
              {activeTab === 'people' ? 'Technical Appearance' : 'Player Performance'}
            </h2>
            <select
              value={viewType}
              onChange={(e) => handleViewTypeChange(e.target.value)}
              className="bg-gray-100 border-0 rounded-md px-4 py-2 font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6601]"
            >
              <option value="top">
                {activeTab === 'people' ? 'Most Technical' : 'High Scores'}
              </option>
              <option value="bottom">
                {activeTab === 'people' ? 'Least Technical' : 'Low Scores'}
              </option>
            </select>
          </div>

          {/* List Content */}
          {isLoading ? (
            <div className="p-6 text-center text-gray-500">Loading...</div>
          ) : (
            <div className="divide-y">
              {getCurrentData().map((item, index) => (
                <div key={activeTab === 'people' ? item.name : item.playerName} 
                     className="flex items-center p-4 hover:bg-gray-50"
                >
                  <span className="font-semibold text-gray-500 w-10">{index + 1}</span>
                  {activeTab === 'people' && (
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <span className="ml-6 flex-1">
                    {activeTab === 'people' ? item.name : item.playerName}
                  </span>
                  <span className="font-semibold text-[#FF6601]">
                    {Math.round((activeTab === 'people' ? item.technicalityScore : item.accuracy) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 