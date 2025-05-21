const API_BASE = 'http://localhost:4000'

// Track submissions in memory during the session
const submittedSessions = new Set()

export const api = {
  startGame: async (playerName, length) => {
    const response = await fetch(
      `${API_BASE}/startGame?playerName=${encodeURIComponent(playerName)}&length=${length}`
    )
    if (!response.ok) throw new Error('Failed to start game')
    return response.json()
  },

  submitGuess: async (sessionId, personId, guess) => {
    const response = await fetch(`${API_BASE}/submitGuess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        personId,
        guess
      })
    })
    if (!response.ok) throw new Error('Failed to submit guess')
    return response.json()
  },

  submitScore: async (scoreData) => {
    const { sessionId } = scoreData
    
    // Triple-check if this session was already submitted
    // 1. Check memory
    if (submittedSessions.has(sessionId)) {
      console.log('Score already submitted (memory check)')
      return { success: true } // Return success to prevent errors
    }

    // 2. Check localStorage
    const storageKey = `score_submitted_${sessionId}`
    if (localStorage.getItem(storageKey)) {
      console.log('Score already submitted (localStorage check)')
      return { success: true }
    }

    // 3. Mark as submitted BEFORE making the request
    submittedSessions.add(sessionId)
    localStorage.setItem(storageKey, 'true')

    try {
      const response = await fetch(`${API_BASE}/submitScore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scoreData)
      })

      if (!response.ok) throw new Error('Failed to submit score')
      return response.json()
      
    } catch (error) {
      // Even if the request fails, we don't want to try again
      console.error('Score submission error:', error)
      throw error
    }
  },

  getLeaderboardScores: async () => {
    const response = await fetch(`${API_BASE}/leaderboard/scores`)
    if (!response.ok) throw new Error('Failed to fetch leaderboard scores')
    return response.json()
  },

  getLeaderboardTechnicality: async () => {
    const response = await fetch(`${API_BASE}/leaderboard/technicality`)
    if (!response.ok) throw new Error('Failed to fetch technicality scores')
    return response.json()
  }
} 