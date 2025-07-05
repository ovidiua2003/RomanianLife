import React from 'react'
import { useGameStore } from '../store/useGameStore'
import { categoryMeta } from '../data/categories'

const JobList: React.FC = () => {
  const jobs = useGameStore(state => state.jobs)
  const queueJob = useGameStore(state => state.queueJob)
  const skills = useGameStore(state => state.skills)

  const grouped = jobs.reduce((acc, job) => {
    if (!acc[job.category]) acc[job.category] = []
    acc[job.category].push(job)
    return acc
  }, {} as Record<string, typeof jobs>)

  return (
    <div className="bg-white p-4 rounded shadow border-l-4 border-yellow-500">
      <h2 className="text-xl font-semibold mb-2">Locuri de muncă</h2>
      {Object.entries(grouped).sort().map(([category, jobs]) => (
        <div key={category} className="mb-4">
          <h3 className="text-md font-bold mb-1">
            {categoryMeta[category]?.icon || '💼'} {categoryMeta[category]?.label || category}
          </h3>
          <ul className="text-sm space-y-2">
            {jobs.map(job => {
              const jobProgress = (job.xp % 10) * 10
              
              return (
                <li key={job.id} className={`p-2 rounded ${!job.isUnlocked ? 'opacity-50' : ''}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{job.name}</p>
                      <p className="text-xs text-gray-500">
                        {job.income.toFixed(0)} RON/zi • Nivel: {job.level} • XP: {job.xp.toFixed(1)}<br />
                        Necesită {skills.find(s => s.id === job.requiredSkill)?.name || job.requiredSkill} lvl {job.requiredLevel}
                      </p>
                    </div>
                    <button
                      className={`px-2 py-1 rounded text-xs ${
                        job.isWorking ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                      } text-white`}
                      onClick={() => job.isUnlocked && queueJob(job.id)}
                      disabled={!job.isUnlocked}
                    >
                      {job.isWorking ? 'Activ' : 'Lucrează'}
                    </button>
                  </div>
                  {job.isWorking && (
                    <div className="w-full bg-gray-200 h-2 mt-1 rounded">
                      <div
                        className="bg-blue-500 h-2 rounded transition-all duration-300"
                        style={{ width: `${jobProgress}%` }}
                      />
                    </div>
                  )}
                </li>
              )}
            )}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default JobList
