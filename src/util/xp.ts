export function getXPForLevel(level: number): number {
  // Quadratic curve: XP = 5 * level²
  return 5 * level * level
}

export function getLevelFromXP(xp: number): number {
  let level = 1
  while (xp >= getXPForLevel(level + 1)) {
    level += 1
  }
  return level
}