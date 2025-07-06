import { useState } from 'react'
import SkillList from './SkillList'
import JobList from './JobList'

const SkillsJobsTabs = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'jobs'>('skills')

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
      </div>

      {activeTab === 'skills' ? <SkillList /> : <JobList />}
    </div>
  )
}

export default SkillsJobsTabs
