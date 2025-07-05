import { create } from 'zustand'
import { jobsData } from '../data/jobs'
import { skillsData } from '../data/skills'
import { events } from '../data/events'
import { shopItems } from '../data/shop'

const STORAGE_KEY = 'progress-romania-save'

type Skill = {
  id: string
  name: string
  category: string
  level: number
  xp: number
  xpPerSecond: number
  isTraining: boolean
  isUnlocked: boolean
}

type Job = {
  id: string
  name: string
  category: string
  income: number
  xpPerSecond: number
  isWorking: boolean
  isUnlocked: boolean
  requiredSkill: string
  requiredLevel: number
  level: number
  xp: number
}

type GameState = {
  money: number
  age: number
  energy: number
  totalXP: number
  xpMultiplier: number
  prestigeCount: number
  skills: Skill[]
  jobs: Job[]
  eventLog: string[]
  happinessMultiplier: number
  purchasedItems: string[]
  buyItem: (id: string) => void
  tick: () => void
  queueSkill: (id: string) => void
  queueJob: (id: string) => void
  prestige: () => void
  save: () => void
  load: () => void
  reset: () => void
}

export const useGameStore = create<GameState>((set, get) => {
  const initialState = {
    money: 0,
    age: 16,
    energy: 100,
    totalXP: 0,
    xpMultiplier: 1,
    prestigeCount: 0,
    skills: skillsData,
    jobs: jobsData,
    happinessMultiplier: 1,
    purchasedItems: []
  }

  const save = () => {
    const state = get()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }

  const load = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      set(JSON.parse(saved))
    }
  }

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY)
    set(initialState)
  }

  return {
    ...initialState,
    tick: () => {
      const state = get()
      let { money, totalXP, skills, jobs } = state
      const xpBoost = state.xpMultiplier * state.happinessMultiplier

      // Auto-unlock skills
      skills = skills.map(skill => {
        if (!skill.isUnlocked && totalXP >= 0) {
          return { ...skill, isUnlocked: true }
        }
        return skill
      })

      // Apply job income
      jobs.forEach(job => {
        const skill = skills.find(s => s.id === job.requiredSkill)

        if (!job.isUnlocked && skill && skill.level >= job.requiredLevel) {
          job.isUnlocked = true;
        }

        if (job.isWorking && job.isUnlocked) {
          const xpBoost = state.xpMultiplier * state.happinessMultiplier
          const newXP = job.xp + job.xpPerSecond * xpBoost
          const newLevel = Math.floor(newXP / 10) + 1
          const incomeBoost = 1 + (newLevel - 1) * 0.05 // +5% per level

          money += job.income * incomeBoost
          totalXP += job.xpPerSecond * xpBoost

          job.xp = newXP
          job.level = newLevel
        }
        
        return job
      })

      // Apply skill XP
      skills = skills.map(skill => {
        if (skill.isTraining && skill.isUnlocked) {
          const newXP = skill.xp + skill.xpPerSecond * xpBoost
          const newLevel = Math.floor(newXP / 10) + 1
          return { ...skill, xp: newXP, level: newLevel }
        }
        return skill
      })

      // Random event
      if (Math.random() < 0.05) {
        const event = events[Math.floor(Math.random() * events.length)]
        const log = get().eventLog || []
        set({ eventLog: [...log.slice(-9), event.text] })
      }

      set({ money, totalXP, skills, jobs })
      state.save()
    },
    queueSkill: (id: string) => {
      set(state => ({
        skills: state.skills.map(skill =>
          skill.id === id
            ? { ...skill, isTraining: true }
            : { ...skill, isTraining: false }
        )
      }))
    },

    queueJob: (id: string) => {
      set(state => ({
        jobs: state.jobs.map(job =>
          job.id === id
            ? { ...job, isWorking: true }
            : { ...job, isWorking: false }
        )
      }))
    },
    prestige: () => {
      const state = get()
      const newMultiplier = state.xpMultiplier + 0.5
      const newCount = state.prestigeCount + 1
      localStorage.removeItem(STORAGE_KEY)
      set({
        ...initialState,
        xpMultiplier: newMultiplier,
        prestigeCount: newCount,
      })
    },
    save,
    load: () => {
      const saved = localStorage.getItem('progress-romania')
      if (!saved) return

      const parsed = JSON.parse(saved)

      // Merge saved skills with new ones from skillsData
      const mergedSkills = skillsData.map(skill => {
        const savedSkill = parsed.skills?.find((s: any) => s.id === skill.id)
        return savedSkill ? { ...skill, ...savedSkill } : skill
      })

      set({
        ...parsed,
        skills: mergedSkills
      })
    },
    reset,
    buyItem: (id) => {
      const state = get()
      const item = shopItems.find(i => i.id === id)
      if (!item || state.money < item.cost || state.purchasedItems.includes(id)) return

      set({
        money: state.money - item.cost,
        happinessMultiplier: state.happinessMultiplier + item.bonus,
        purchasedItems: [...state.purchasedItems, id]
      })
    }
  }
})
