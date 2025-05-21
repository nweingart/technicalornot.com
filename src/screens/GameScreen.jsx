import { useState } from 'react'
import { GameCard } from '../components/GameCard'
import { VoteResults } from '../components/VoteResults'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'

export function GameScreen({ person, sessionId, onGuessResult, onShowResults, currentIndex, deckLength }) {
  const [guessResult, setGuessResult] = useState(null)
  const [voteTotals, setVoteTotals] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasGuessed, setHasGuessed] = useState(false)
  const navigate = useNavigate()

  const handleGuess = async (isTechnical) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await api.submitGuess(sessionId, person.id, isTechnical)
      console.log('Guess result:', result)
      setGuessResult(result.isCorrect)
      setVoteTotals(person.voteTotals)
      setHasGuessed(true)
    } catch (err) {
      setError('Failed to submit guess. Please try again.')
      console.error('Guess submission error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNext = () => {
    console.log('handleNext called', {
      currentIndex,
      deckLength,
      personId: person.id,
      guessResult
    })

    if (currentIndex === deckLength - 1) {
      console.log('Reaching end of deck, showing results')
      onShowResults()
      navigate('/results')
    } else {
      console.log('Moving to next person')
      onGuessResult(guessResult)
      setHasGuessed(false)
      setGuessResult(null)
      setVoteTotals(null)
    }
  }

  if (!person) return null

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="flex flex-col w-full items-center gap-4 p-6 h-full">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <GameCard 
          person={person}
          onGuess={handleGuess}
          disabled={isLoading || hasGuessed}
        />

        {hasGuessed && (
          <>
            <div className={`text-2xl font-bold ${guessResult ? 'text-green-600' : 'text-red-600'}`}>
              {guessResult ? 'Correct! 🎉' : 'Wrong! 😢'}
            </div>
            
            {voteTotals && <VoteResults voteTotals={voteTotals} />}

            <button
              onClick={handleNext}
              className="bg-[#FF6601] w-fit text-white px-8 py-3 rounded-md font-medium text-lg"
            >
              {currentIndex === deckLength - 1 ? 'Finish' : 'Next Person'}
            </button>
          </>
        )}
      </div>
    </div>
  )
} 