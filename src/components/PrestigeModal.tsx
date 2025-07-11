import React, { useState } from 'react'
import { useGameStore } from '../store/useGameStore'
import { prestigeLimit } from '../util/globalVars'

const PrestigeModal: React.FC = () => {
  const prestige = useGameStore(state => state.prestige)
  const totalXP = useGameStore(state => state.totalXP)
  const prestigeCount = useGameStore(state => state.prestigeCount)
  const xpMultiplier = useGameStore(state => state.xpMultiplier)

  const [open, setOpen] = useState(false)

  const canPrestige = useGameStore(state => state.totalXP >= prestigeLimit)

  return (
    <>
      {canPrestige && (
        <button
          onClick={() => setOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded text-sm"
        >
          Reîncarnare
        </button>
      )}

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-2">🔁 Prestigiu</h2>
            <p className="text-sm mb-4">
              Ești gata să o iei de la capăt? Vei pierde tot progresul, dar vei primi un bonus permanent de XP.
            </p>
            <ul className="text-sm mb-4 list-disc list-inside text-gray-700">
              <li>Reîncarnări actuale: {prestigeCount}</li>
              <li>Bonus XP: x{xpMultiplier.toFixed(2)}</li>
              <li>Următorul bonus: x{(xpMultiplier + 0.25).toFixed(2)}</li>
            </ul>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 text-sm bg-gray-300 hover:bg-gray-400 rounded"
              >
                Anulează
              </button>
              <button
                onClick={() => {
                  prestige()
                  setOpen(false)
                }}
                className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded"
              >
                Confirmă
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PrestigeModal
