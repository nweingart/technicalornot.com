import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export function StartScreen({ onGameStart }) {
  const [playerName, setPlayerName] = useState('')
  const [gameLength, setGameLength] = useState(20)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!playerName.trim()) {
      setError('Please enter your first name')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const data = await api.startGame(playerName.trim(), gameLength)
      onGameStart({ ...data, playerName: playerName.trim() })
      navigate('/game')
    } catch (err) {
      setError('Failed to start game. Please try again.')
      console.error('Start game error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">
          Technical or Not?
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your first name
            </label>
            <input
              type="text"
              id="name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6601] focus:border-[#FF6601]"
              placeholder="Your first name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How many people do you want to guess?
            </label>
            <div className="flex gap-4 justify-center">
              {[20, 50, 100].map((length) => (
                <button
                  key={length}
                  type="button"
                  onClick={() => setGameLength(length)}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition
                    ${gameLength === length
                      ? 'bg-[#FF6601] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }
                  `}
                >
                  {length}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-3 rounded-lg font-semibold text-white transition
              ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#FF6601] hover:bg-orange-700'
              }
            `}
          >
            {isLoading ? 'Starting Game...' : 'Start Game'}
          </button>
        </form>
      </div>
    </div>
  )
} 