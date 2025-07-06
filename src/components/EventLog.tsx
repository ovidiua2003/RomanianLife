import React from 'react'
import { useGameStore } from '../store/useGameStore'

const EventLog: React.FC = () => {
  const log = useGameStore(state => state.eventLog || [])

  return (
    <div className="bg-gray-800 p-3 rounded shadow text-sm space-y-2 max-h-64 overflow-y-auto">
      <h2 className="text-lg font-semibold text-white">📜 Jurnal de viață</h2>
      <div className="space-y-1">
        {log.map((entry, index) => (
          <p key={index} className="text-gray-300 text-xs leading-snug">
            {entry}
          </p>
        ))}
      </div>
    </div>
  )
}

export default EventLog
