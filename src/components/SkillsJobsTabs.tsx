import { useState } from 'react'
import SkillList from './SkillList'
import JobList from './JobList'
import LifeTimeline from './LifeTimeline'

const SkillsJobsTabs = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'jobs' | 'graph'>('skills')

  return (
    <div className="bg-gray-800 p-3 rounded shadow">
      <div className="flex space-x-2 mb-3">
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-3 py-1 rounded text-sm font-semibold ${
            activeTab === 'skills'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Abilități
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-3 py-1 rounded text-sm font-semibold ${
            activeTab === 'jobs'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Locuri de muncă
        </button>
        <button
          onClick={() => setActiveTab('graph')}
          className={`px-3 py-1 rounded text-sm font-semibold ${
            activeTab === 'graph'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Grafic Viață
        </button>
      </div>

      {(() => {
        switch (activeTab) {
          case 'skills':
            return <SkillList />
          case 'jobs':
            return <JobList />
          case 'graph':
            return <LifeTimeline />
          default:
            return null
        }
      })()}
    </div>
  )
}

export default SkillsJobsTabs
