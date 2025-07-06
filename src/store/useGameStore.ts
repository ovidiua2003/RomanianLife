import { create } from 'zustand'
import { jobsData } from '../data/jobs'
import { skillsData } from '../data/skills'
import { events } from '../data/events'
import { shopItems } from '../data/shop'
import { getLevelFromXP, getXPForLevel } from '../util/xp'
import { formatAge } from '../util/format'

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
  income: number,
  incomePerTick?: number
  xpPerSecond: number
  isWorking: boolean
  isUnlocked: boolean
  requiredSkill: string
  requiredLevel: number
  level: number
  xp: number
}

type ShopItem = {
  id: string
  name: string
  cost: number
  bonus: number
  maxPurchases?: number
  recurringCost?: number
  category?: 'vehicle' | 'home' | 'lifestyle' | 'consumable'
  resaleValue?: number // e.g. 0.5 = 50% refund
}

type LogEntry = {
  message: string
  age: string
}

type GameState = {
  money: number
  incomePerTick: number,
  expensesPerTick: number,
  ageYears: number
  ageDays: number
  energy: number
  totalXP: number
  xpMultiplier: number
  prestigeCount: number
  skills: Skill[]
  jobs: Job[]
  eventLog: LogEntry[]
  happinessMultiplier: number
  purchasedItems: Record<string, number>
  buyItem: (id: string) => void
  sellItem: (id: string) => void
  tick: () => void
  queueSkill: (id: string) => void
  queueJob: (id: string) => void
  prestige: () => void
  save: () => void
  load: () => void
  reset: () => void
  isPaused: boolean
  togglePause: () => void
}

export const useGameStore = create<GameState>((set, get) => {
  const initialState = {
    money: 0,
    incomePerTick: 0,
    expensesPerTick: 0,
    ageYears: 17,
    ageDays: 0,
    energy: 100,
    totalXP: 0,
    xpMultiplier: 1,
    prestigeCount: 0,
    skills: skillsData,
    jobs: jobsData,
    happinessMultiplier: 1,
    purchasedItems: [],
    eventLog: [],
    isPaused: false,
    togglePause: () => set(state => ({ isPaused: !state.isPaused }))
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
      const isPaused = state.isPaused
      if (isPaused) return

      let { money, totalXP, skills, jobs, ageYears, ageDays } = state
      const xpBoost = state.xpMultiplier * state.happinessMultiplier
      let income = 0
      let expenses = 0

      ageDays += 1
      if (ageDays >= 365) {
        ageYears += 1
        ageDays = 0
      }

      // Auto-unlock skills
      skills = skills.map(skill => {
        if (!skill.isUnlocked && totalXP >= 0) {
          return { ...skill, isUnlocked: true }
        }
        return skill
      })

      shopItems.forEach(item => {
        const owned = state.purchasedItems[item.id] || 0
        if (owned && item.recurringCost) {
          expenses += item.recurringCost
        }
      })

      // Apply job income
      jobs.forEach(job => {
        const skill = skills.find(s => s.id === job.requiredSkill)

        if (!job.isUnlocked && skill && skill.level >= job.requiredLevel) {
          job.isUnlocked = true;
        }

        if (job.isWorking && job.isUnlocked) {
          const xpBoost = state.xpMultiplier * state.happinessMultiplier
          // 🔍 Get the required skill and its level
          const requiredSkill = state.skills.find(s => s.id === job.requiredSkill)
          const skillLevel = requiredSkill?.level || 1

          // 📈 Scale job XP gain based on skill level (+5% per level above 1)
          const skillMultiplier = 1 + (skillLevel - 1) * 0.5

          const newXP = job.xp + job.xpPerSecond * xpBoost * skillMultiplier
          let level = job.level
          while (newXP >= getXPForLevel(level)) {
            level += 1
          }
          const prevLevel = getLevelFromXP(job.xp)
          const newLevel = level;
          const incomeBoost = 1 + (newLevel - 1) * 0.05
          const jobIncome = job.income * incomeBoost
          income += jobIncome

          job.incomePerTick = income

          money += income - expenses
          totalXP += job.xpPerSecond * xpBoost * skillMultiplier

          job.xp = newXP
          job.level = newLevel

          const msgExists = state.eventLog.find(log => log.message === `Ai atins nivelul ${newLevel} ca ${job.name}.`)
          if (!msgExists && newLevel > prevLevel) {
            state.eventLog.push({
              message: `Ai atins nivelul ${newLevel} ca ${job.name}.`,
              age: formatAge(state.ageYears, state.ageDays)
            })
          }
        }
        
        return job
      })

      // Apply skill XP
      skills = skills.map(skill => {
        if (skill.isTraining && skill.isUnlocked) {
          const newXP = skill.xp + skill.xpPerSecond * xpBoost
          let level = skill.level
          while (newXP >= getXPForLevel(level)) {
            level += 1
          }
          const prevLevel = getLevelFromXP(skill.xp)
          const msgExists = state.eventLog.find(log => log.message === `Ai atins nivelul ${level} în ${skill.name}.`)
          if (!msgExists && level > prevLevel) {
            state.eventLog.push({
              message: `Ai atins nivelul ${level} în ${skill.name}.`,
              age: formatAge(state.ageYears, state.ageDays)
            })
          }
          return { ...skill, xp: newXP, level: level }
        }
        return skill
      })

      // Random event
      if (Math.random() < 0.05) {
        const event = events[Math.floor(Math.random() * events.length)]
        const log = get().eventLog || []
        
        set({ eventLog: [...log, {
          message: event.text,
          age: formatAge(state.ageYears, state.ageDays)
        }] })
      }

      set({ money, incomePerTick: income, expensesPerTick: expenses, totalXP, skills, jobs, ageYears, ageDays })
      state.save()
    },
    queueSkill: (id: string) => {
      set(state => {
        const currentSkill = state.skills.find(skill => skill.isTraining === true)
        const newSkill = state.skills.find(skill => skill.id === id)

        // Only log if the skill is actually changing
        if (newSkill && currentSkill?.id !== newSkill.id) {
          const msg = {
            message: `Ai început să te antrenezi în ${newSkill.name}.`,
            age: formatAge(state.ageYears, state.ageDays)
          }

          set({ eventLog: [...state.eventLog, msg] })
        }
        
        return {
          skills: state.skills.map(skill =>
            skill.id === id
              ? { ...skill, isTraining: true }
              : { ...skill, isTraining: false }
          )
        }
      })
    },

    queueJob: (id: string) => {
      set(state => {
        const currentJob = state.jobs.find(job => job.isWorking)
        const newJob = state.jobs.find(job => job.id === id)

        // Only log if the job is actually changing
        if (newJob && currentJob?.id !== newJob.id) {
          const msg = {
            message: `Ai început să lucrezi ca ${newJob.name}.`,
            age: formatAge(state.ageYears, state.ageDays)
          }
          set({ eventLog: [...state.eventLog, msg] })
        }

        return {
          jobs: state.jobs.map(job =>
            job.id === id
              ? { ...job, isWorking: true }
              : { ...job, isWorking: false }
          )
        }
      })
    },
    prestige: () => {
      const state = get()

      // Reset skills
      const resetSkills = state.skills.map(skill => ({
        ...skill,
        level: 1,
        xp: 0,
        isTraining: false,
        isUnlocked: skill.id === 'english' // keep only base skill unlocked
      }))

      // Reset jobs
      const resetJobs = state.jobs.map(job => ({
        ...job,
        level: 1,
        xp: 0,
        isWorking: false,
        isUnlocked: job.id === 'janitor'
      }))

      set({
        money: 0,
        incomePerTick: 0,
        expensesPerTick: 0,
        ageYears: 17,
        ageDays: 0,
        totalXP: 0,
        skills: resetSkills,
        jobs: resetJobs,
        prestigeCount: state.prestigeCount + 1,
        xpMultiplier: 1 + (state.prestigeCount + 1) * 0.25,
        eventLog: [{message: `Ai renăscut! Bonus XP: x${(1 + (state.prestigeCount + 1) * 0.25).toFixed(2)}`, age: formatAge(state.ageYears, state.ageDays)}]
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
      if (!item) return

      const owned = state.purchasedItems[id] || 0
      const isRepeatable = item.maxPurchases === undefined || owned < item.maxPurchases
      const exclusiveCategories = ['vehicle', 'home']

      // Prevent multiple in same category (e.g. cars)
      const categoryConflict =
        exclusiveCategories.includes(item.category || '') &&
        Object.entries(state.purchasedItems).some(([otherId, qty]) => {
          const other = shopItems.find(i => i.id === otherId)
          return other?.category === item.category && otherId !== id && qty > 0
        })

      if (state.money < item.cost || !isRepeatable || categoryConflict) return

      const logMsg = {
        message: `Ai cumpărat un ${item.name}.`,
        age: formatAge(state.ageYears, state.ageDays)
      }

      set({
        money: state.money - item.cost,
        happinessMultiplier: state.happinessMultiplier + item.bonus,
        purchasedItems: {
          ...state.purchasedItems,
          [id]: owned + 1
        },
        eventLog: [...state.eventLog, logMsg]
      })
    },
    sellItem: (id) => {
      const state = get()
      const item = shopItems.find(i => i.id === id)
      const owned = state.purchasedItems[id] || 0
      if (!item || owned <= 0 || !item.resaleValue) return

      const refund = item.cost * item.resaleValue
      const newQty = owned - 1

      const logMsg = {
        message: `Ai vândut un ${item.name} pentru ${item.resaleValue} RON.`,
        age: formatAge(state.ageYears, state.ageDays)
      }

      set({
        money: state.money + refund,
        happinessMultiplier: state.happinessMultiplier - item.bonus,
        purchasedItems: {
          ...state.purchasedItems,
          [id]: newQty
        },
        eventLog: [...state.eventLog, logMsg]
      })
    }
  }
})
