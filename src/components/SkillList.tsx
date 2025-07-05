import React from 'react'
import { useGameStore } from '../store/useGameStore'
import { categoryMeta } from '../data/categories'

const SkillList: React.FC = () => {
  const skills = useGameStore(state => state.skills)
  const queueSkill = useGameStore(state => state.queueSkill)

  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, typeof skills>)

  return (
    <div className="bg-white p-4 rounded shadow border-l-4 border-green-500">
      <h2 className="text-xl font-semibold mb-2">Abilități</h2>
      {Object.entries(grouped).sort().map(([category, skills]) => (
        <div key={category} className="mb-4">
          <h3 className="text-md font-bold mb-1">
            {categoryMeta[category]?.icon || '💼'} {categoryMeta[category]?.label || category}
          </h3>
          <ul className="text-sm space-y-2">
            {skills.map(skill => {
              const progress = (skill.xp % 10) * 10
              return (
                <li key={skill.id} className={`p-2 rounded ${!skill.isUnlocked ? 'opacity-50' : ''}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{skill.name}</p>
                      <p className="text-xs text-gray-500">
                        Nivel: {skill.level} | XP: {skill.xp.toFixed(1)}
                      </p>
                    </div>
                    <button
                      className={`px-2 py-1 rounded text-xs ${
                        skill.isTraining ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
                      } text-white`}
                      onClick={() => skill.isUnlocked && queueSkill(skill.id)}
                      disabled={!skill.isUnlocked}
                    >
                      {skill.isTraining ? 'Se învață...' : 'Învață'}
                    </button>
                  </div>
                  {skill.isTraining && (
                    <div className="w-full bg-gray-200 h-2 mt-1 rounded">
                      <div
                        className="bg-green-500 h-2 rounded transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default SkillList
