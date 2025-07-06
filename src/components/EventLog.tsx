import React from 'react'
import { useGameStore } from '../store/useGameStore'

const EventLog: React.FC = () => {
  const log = useGameStore(state => state.eventLog)

  return (
    <div className="rounded shadow">
      <h2 className="text-xl font-semibold text-gray-300 tracking-wide mb-2">📜 Jurnal de viață</h2>
      <div className="space-y-1 text-xs text-gray-300 font-mono leading-snug max-h-64 overflow-y-scroll">
        {log.map((entry, index) => (
          <div key={index}>
            <span className="text-gray-500 mr-2">[{entry.age}]</span>
            {entry.message}
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventLog
