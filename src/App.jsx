import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { StartScreen } from './screens/StartScreen'
import { GameScreen } from './screens/GameScreen'
import { ResultsScreen } from './screens/ResultsScreen'
import { LeaderboardScreen } from './screens/LeaderboardScreen'
import { PersonScreen } from './screens/PersonScreen'
import { AddProfileScreen } from './screens/AddProfileScreen'
import { AboutScreen } from './screens/AboutScreen'

const STORAGE_KEY = 'technicalOrNot_gameState'
const SESSION_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

export function App() {
  const [gameState, setGameState] = useState(null)

  // On mount - check for existing game
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY)
    if (savedState) {
      const parsed = JSON.parse(savedState)
      const now = Date.now()
      
      // Check if session is still valid
      if (parsed.startedAt && (now - parsed.startedAt) < SESSION_DURATION) {
        setGameState(parsed)
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (gameState) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState))
    }
  }, [gameState])

  const handleGameStart = (data) => {
    setGameState({
      sessionId: data.sessionId,
      playerName: data.playerName,
      deck: data.deck,
      currentIndex: 0,
      score: { correct: 0, total: 0 },
      person: data.deck[0]
    })
  }

  const handleGuessResult = (isCorrect) => {
    setGameState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex + 1,
      person: prev.deck[prev.currentIndex + 1],
      score: {
        correct: prev.score.correct + (isCorrect ? 1 : 0),
        total: prev.score.total + 1
      }
    }))
  }

  const handleShowResults = () => {
    setGameState(prev => ({
      ...prev,
      showResults: true
    }))
  }

  const handlePlayAgain = () => {
    setGameState(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/start" element={<StartScreen onGameStart={handleGameStart} />} />
          <Route path="/game" element={
            <GameScreen 
              person={gameState?.person}
              sessionId={gameState?.sessionId}
              onGuessResult={handleGuessResult}
              onShowResults={handleShowResults}
              currentIndex={gameState?.currentIndex}
              deckLength={gameState?.deck?.length}
            />
          } />
          <Route path="/results" element={
            <ResultsScreen 
              score={gameState?.score}
              sessionId={gameState?.sessionId}
              playerName={gameState?.playerName}
              onPlayAgain={handlePlayAgain}
            />
          } />
          <Route path="/leaderboard" element={<LeaderboardScreen />} />
          <Route path="/add-profile" element={<AddProfileScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/" element={<Navigate to="/start" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
