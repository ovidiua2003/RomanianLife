import { useGameStore } from '../store/useGameStore'
import { gameTitle, gameVersion } from '../util/globalVars'
import AudioPlayer from './AudioPlayer'
import { BanknotesIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, IdentificationIcon, LightBulbIcon, ArrowPathIcon, BoltIcon } from '@heroicons/react/24/outline'

const StatsPanel = () => {
  const money = useGameStore(state => state.money)
  const incomePerTick = useGameStore(state => state.incomePerTick)
  const expensesPerTick = useGameStore(state => state.expensesPerTick)
  const totalXP = useGameStore(state => state.totalXP)
  const ageYears = useGameStore(state => state.ageYears)
  const ageDays = useGameStore(state => state.ageDays)
  const energy = useGameStore(state => state.energy)
  const prestigeCount = useGameStore(state => state.prestigeCount)
  const resetGame = useGameStore(state => state.reset)
  const prestige = useGameStore(state => state.prestige)
  const canPrestige = useGameStore(state => state.totalXP >= 1000)
  const isPaused = useGameStore(state => state.isPaused)
  const togglePause = useGameStore(state => state.togglePause)

  return (
    <div className="sticky top-0 z-50 bg-gray-800 p-3 rounded shadow text-sm flex flex-wrap justify-between items-center gap-4">
      <ul className="space-y-0.5 text-white text-sm grid grid-cols-2 md:grid-cols-4 justify-items-start items-center gap-x-4 md:gap-y-2 order-2 md:order-1">
        <li className="flex flex-wrap justify-between items-center gap-2"><BanknotesIcon className="size-4 md:size-6 text-white-500" /> Avere: {money.toFixed(2)} RON</li>
        <li className="flex flex-wrap justify-between items-center gap-2"><ArrowTrendingUpIcon className="size-4 md:size-6 text-white-500" /> Salariu: {incomePerTick.toFixed(0)} RON / zi</li>
        <li className="flex flex-wrap justify-between items-center gap-2"><ArrowTrendingDownIcon className="size-4 md:size-6 text-white-500" /> Cheltuieli: {expensesPerTick.toFixed(0)} RON / zi</li>
        <li className="flex flex-wrap justify-between items-center gap-2"><LightBulbIcon className="size-4 md:size-6 text-white-500" /> XP Total: {totalXP.toFixed(1)}</li>
        <li className="flex flex-wrap justify-between items-center gap-2"><IdentificationIcon className="size-4 md:size-6 text-white-500" /> Vârstă: {ageYears} ani și {ageDays} zile</li>
        <li className="flex flex-wrap justify-between items-center gap-2"><BoltIcon className="size-4 md:size-6 text-white-500" /> Energie: {energy}%</li>
        <li className="flex flex-wrap justify-between items-center gap-2"><ArrowPathIcon className="size-4 md:size-6 text-white-500" /> Reîncarnări: {prestigeCount}</li>
      </ul>

      <div className="flex flex-col order-1 md:order-2 w-full md:w-auto">
        <h1 className="text-2xl font-serif text-center md:text-right">{gameTitle} <span className="text-sm text-white/50">ver. {gameVersion}</span></h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0 ml-auto w-full md:w-auto">
          <AudioPlayer />
          <button
            onClick={togglePause}
            className={`px-2 py-1 rounded text-sm text-white ${
              isPaused ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-500 hover:bg-orange-600'
            } text-black`}
          >
            {isPaused ? 'Continuă Joc' : 'Pauză Joc'}
          </button>
          <button
            onClick={() => {
              if (confirm('Ești sigur că vrei să resetezi progresul?')) resetGame()
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
          >
            Resetare
          </button>
          <button
            onClick={prestige}
            disabled={!canPrestige}
            className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded text-sm"
          >
            Reîncarnare
          </button>
        </div>
      </div>
    </div>
  )
}

export default StatsPanel
