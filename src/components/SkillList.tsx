import React from 'react'
import { useGameStore } from '../store/useGameStore'
import { categoryMeta } from '../data/categories'
import { getLevelFromXP, getXPForLevel } from '../util/xp'

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
          <ul className="text-sm space-y-1">
            {skills.map(skill => {
              const level = getLevelFromXP(skill.xp)
              const currentLevelXP = getXPForLevel(level)
              const nextLevelXP = getXPForLevel(level + 1)
              const progress = ((skill.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
              
              return (
                <li key={skill.id} className="relative h-8 rounded overflow-hidden text-xs text-white">
                  <div className="absolute top-0 left-0 h-full w-full bg-gray-200" />
                  <div
                    className="absolute top-0 left-0 h-full bg-green-600 ttransition-[width] duration-500 ease-in"
                    style={{
                      width: `${progress}%`,
                      opacity: skill.isUnlocked ? 1 : 0.4
                    }}
                  />
                  <div className="relative z-10 px-2 h-full flex items-center justify-between">
                    <span className="truncate text-gray-800">
                      {skill.name} • Nivel {skill.level} • XP: {skill.xp.toFixed(1)} / {nextLevelXP.toFixed(1)}
                    </span>
                    <button
                      onClick={() => skill.isUnlocked && queueSkill(skill.id)}
                      disabled={!skill.isUnlocked}
                      className={`ml-2 px-2 py-0.5 rounded text-xs ${
                        skill.isTraining ? 'bg-gray-300 text-black' : 'bg-white text-green-700'
                      }`}
                    >
                      {skill.isTraining ? 'Activ' : 'Învață'}
                    </button>
                  </div>
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
