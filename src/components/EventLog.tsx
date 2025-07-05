import React from 'react'
import { useGameStore } from '../store/useGameStore'

const EventLog: React.FC = () => {
  const log = useGameStore(state => state.eventLog || [])

  return (
    <div className="bg-white p-4 rounded shadow border-l-4 border-purple-500 mt-6">
      <h2 className="text-xl font-semibold mb-2">Evenimente</h2>
      <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
        {log.map((entry, index) => (
          <li key={index}>📢 {entry}</li>
        ))}
      </ul>
    </div>
  )
}

export default EventLog
