import React from 'react'
import { useGameStore } from '../store/useGameStore'
import { categoryMeta } from '../data/categories'
import { getLevelFromXP, getXPForLevel } from '../util/xp'

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
    <div className="rounded shadow">
      {/* <h2 className="text-xl font-semibold mb-2">Locuri de muncă</h2> */}
      {Object.entries(grouped).sort().map(([category, jobs]) => (
        <div key={category} className="mb-4">
          <h3 className="text-md font-bold mb-1">
            {categoryMeta[category]?.icon || '💼'} {categoryMeta[category]?.label || category}
          </h3>
          <ul className="text-sm space-y-1">
            {jobs.map(job => {
              const level = getLevelFromXP(job.xp)
              const currentLevelXP = getXPForLevel(level)
              const nextLevelXP = getXPForLevel(level + 1)
              const progress = ((job.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
              
              return (
                <li
                  key={job.id}
                  className={`relative h-6 rounded overflow-hidden text-sm text-white ${
                    !job.isUnlocked ? 'opacity-50' : ''
                  }`}
                >
                  <div className="absolute top-0 left-0 h-full w-full bg-gray-700" />
                  {/* Progress bar background */}
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-800 transition-[width] duration-500 ease-in"
                    style={{ width: `${progress}%` }}
                  />

                  {/* Foreground content */}
                  <div className="relative z-10 px-2 pr-0 h-full flex items-center justify-between">
                    <div className="truncate text-white/50">
                      <span className="text-white/75">{job.name}</span> • Nivel {job.level} • XP: {job.xp.toFixed(1)} / {nextLevelXP.toFixed(1)} • {job.incomePerTick ? job.incomePerTick.toFixed(0) : job.income.toFixed(0)} RON/zi
                    </div>
                    <button
                      className={`ml-2 px-2 py-0.5 rounded text-sm ${
                        job.isWorking ? 'bg-gray-500 text-black' : 'bg-white text-blue-800'
                      }`}
                      onClick={() => job.isUnlocked && queueJob(job.id)}
                      disabled={!job.isUnlocked}
                    >
                      {job.isWorking ? 'Activ' : 'Lucrează'}
                    </button>
                  </div>
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
