import React, { useEffect } from 'react'
import JobList from './components/JobList'
import SkillList from './components/SkillList'
import StatsPanel from './components/StatsPanel'
import PrestigeModal from './components/PrestigeModal'
import EventLog from './components/EventLog'
import ShopPanel from './components/ShopPanel'
import { useGameStore } from './store/useGameStore'

const App: React.FC = () => {
  const tick = useGameStore(state => state.tick)
  const load = useGameStore(state => state.load)

  useEffect(() => {
    load()
    const interval = setInterval(() => {
      tick()
    }, 500)
    return () => clearInterval(interval)
  }, [tick, load])

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Sticky Stats Bar */}
      <StatsPanel />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Left Column: Skills + Jobs */}
        <div className="space-y-4">
          <section>
            <h2 className="text-md font-bold text-gray-300 uppercase tracking-wide mb-1">Abilități</h2>
            <SkillList />
          </section>

          <section>
            <h2 className="text-md font-bold text-gray-300 uppercase tracking-wide mb-1">Locuri de muncă</h2>
            <JobList />
          </section>
        </div>

        {/* Right Column: Shop + Log */}
        <div className="space-y-4">
          <section>
            <h2 className="text-md font-bold text-gray-300 uppercase tracking-wide mb-1">Magazin</h2>
            <ShopPanel />
          </section>

          <section>
            <h2 className="text-md font-bold text-gray-300 uppercase tracking-wide mb-1">📜 Jurnal de viață</h2>
            <EventLog />
          </section>
        </div>
      </div>
    </div>

      <PrestigeModal />
    </>
  )
}

export default App
