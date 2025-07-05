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
    }, 1000)
    return () => clearInterval(interval)
  }, [tick, load])

  return (
    <>
      <div className="min-h-screen p-4 bg-gradient-to-br from-white to-gray-100">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Progress România 🇷🇴
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            <StatsPanel />
            <ShopPanel />
            <EventLog />
          </div>

          {/* Main content: Jobs and Skills */}
          <div className="md:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <JobList />
            <SkillList />
          </div>
        </div>
      </div>

      <PrestigeModal />
    </>
  )
}

export default App
