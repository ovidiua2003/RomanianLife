import React, { useState } from 'react'
import { useGameStore } from '../store/useGameStore'

const StatsPanel: React.FC = () => {
  const { money, totalXP, age, energy, prestigeCount, reset } = useGameStore()
  const [maneleOn, setManeleOn] = useState(false)

  return (
    <div className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
      <h2 className="text-xl font-semibold mb-2">Statistici</h2>
      <ul className="text-sm space-y-1">
        <li>💰 Bani: {money.toFixed(2)} RON</li>
        <li>🧠 XP Total: {totalXP.toFixed(1)}</li>
        <li>📅 Vârstă: {age} ani</li>
        <li>⚡ Energie: {energy}%</li>
        <li>🔁 Prestigii: {prestigeCount}</li>
      </ul>

      <button
        onClick={() => setManeleOn(!maneleOn)}
        className="mt-4 text-xs text-blue-600 underline hover:text-blue-800"
      >
        {maneleOn ? '🔇 Oprește manelele' : '🎵 Pornește manelele'}
      </button>

      {maneleOn && (
        <audio autoPlay loop>
          <source src="/RomaniaGame.mp3" type="audio/mpeg" />
        </audio>
      )}

      <button
        onClick={reset}
        className="mt-2 text-xs text-red-600 underline hover:text-red-800 block"
      >
        Resetează progresul
      </button>
    </div>
  )
}

export default StatsPanel
