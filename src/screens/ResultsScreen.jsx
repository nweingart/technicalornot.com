import { useState, useEffect } from 'react'
import { api } from '../services/api'

export function ResultsScreen({ score, sessionId, playerName, onPlayAgain }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Single async function to handle the submission
    const submitScore = async () => {
      if (isSubmitting) return // Prevent concurrent submissions
      
      setIsSubmitting(true)
      try {
        await api.submitScore({
          playerName,
          score: score.correct,
          totalAttempted: score.total,
          sessionId
        })
      } catch (err) {
        setError('Failed to submit score')
        console.error('Score submission error:', err)
      } finally {
        setIsSubmitting(false)
      }
    }

    submitScore()
  }, []) // Empty dependency array

  return (
    <div className="container mx-auto px-4 py-4 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Game Results</h1>
        
        <div className="text-6xl font-bold mb-4 text-[#FF6601]">
          {Math.round((score.correct / score.total) * 100)}%
        </div>
        
        <p className="text-xl mb-8">
          You got {score.correct} out of {score.total + 1} correct!
        </p>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <button
          onClick={onPlayAgain}
          disabled={isSubmitting}
          className={`
            px-8 py-3 rounded-lg font-semibold transition
            ${isSubmitting 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-[#FF6601] hover:bg-orange-700 text-white'
            }
          `}
        >
          {isSubmitting ? 'Submitting Score...' : 'Play Again'}
        </button>
      </div>
    </div>
  )
} 