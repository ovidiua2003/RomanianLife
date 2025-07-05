import React from 'react'
import { useGameStore } from '../store/useGameStore'

const PrestigeModal: React.FC = () => {
  const totalXP = useGameStore(state => state.totalXP)
  const prestige = useGameStore(state => state.prestige)
  const prestigeCount = useGameStore(state => state.prestigeCount)

  if (totalXP < 500) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
        <h2 className="text-xl font-bold mb-2">Generația Nouă 🔁</h2>
        <p className="text-sm mb-4">
          Ai acumulat peste 500 XP! Poți reseta progresul pentru un bonus permanent de XP.
        </p>
        <p className="text-sm mb-4 text-green-600">
          Bonus actual: {prestigeCount}x → {prestigeCount + 0.5}x XP
        </p>
        <button
          onClick={prestige}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Reîncepe cu bonus
        </button>
      </div>
    </div>
  )
}

export default PrestigeModal
