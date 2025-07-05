export const skillsData = [
  // 📚 Education
  { id: 'english', name: 'Limba Engleză', category: 'Education', level: 1, xp: 0, xpPerSecond: 0.5, isTraining: false, isUnlocked: true },
  { id: 'math', name: 'Matematică', category: 'Education', level: 1, xp: 0, xpPerSecond: 0.6, isTraining: false, isUnlocked: false },
  { id: 'computer_basics', name: 'Bază de calculatoare', category: 'Education', level: 1, xp: 0, xpPerSecond: 0.4, isTraining: false, isUnlocked: false },
  { id: 'pedagogy', name: 'Pedagogie', category: 'Education', level: 1, xp: 0, xpPerSecond: 0.5, isTraining: false, isUnlocked: false },
  { id: 'foreign_languages', name: 'Limbi Străine', category: 'Education', level: 1, xp: 0, xpPerSecond: 0.5, isTraining: false, isUnlocked: false },

  // 💻 Tech
  { id: 'coding', name: 'Programare', category: 'Tech', level: 1, xp: 0, xpPerSecond: 1.0, isTraining: false, isUnlocked: false },
  { id: 'cybersecurity', name: 'Securitate Cibernetică', category: 'Tech', level: 1, xp: 0, xpPerSecond: 0.8, isTraining: false, isUnlocked: false },
  { id: 'data_analysis', name: 'Analiză de Date', category: 'Tech', level: 1, xp: 0, xpPerSecond: 0.7, isTraining: false, isUnlocked: false },
  { id: 'erp_systems', name: 'Sisteme ERP', category: 'Tech', level: 1, xp: 0, xpPerSecond: 0.6, isTraining: false, isUnlocked: false },
  { id: 'ux_ui', name: 'UX/UI Design', category: 'Tech', level: 1, xp: 0, xpPerSecond: 0.6, isTraining: false, isUnlocked: false },
  { id: 'ai_ml', name: 'Inteligență Artificială', category: 'Tech', level: 1, xp: 0, xpPerSecond: 0.9, isTraining: false, isUnlocked: false },

  // 🧰 Trades
  { id: 'driving', name: 'Permis Auto (Categoria B)', category: 'Education', level: 0, xp: 0, xpPerSecond: 0.5, isTraining: false, isUnlocked: false },
  { id: 'electrician', name: 'Electrician', category: 'Trades', level: 1, xp: 0, xpPerSecond: 0.7, isTraining: false, isUnlocked: false },
  { id: 'plumbing', name: 'Instalații Sanitare', category: 'Trades', level: 1, xp: 0, xpPerSecond: 0.6, isTraining: false, isUnlocked: false },
  { id: 'welding', name: 'Sudură', category: 'Trades', level: 1, xp: 0, xpPerSecond: 0.6, isTraining: false, isUnlocked: false },
  { id: 'carpentry', name: 'Tâmplărie', category: 'Trades', level: 1, xp: 0, xpPerSecond: 0.5, isTraining: false, isUnlocked: false },
  { id: 'hvac', name: 'Instalații HVAC', category: 'Trades', level: 1, xp: 0, xpPerSecond: 0.5, isTraining: false, isUnlocked: false },
  { id: 'blueprint_reading', name: 'Citire Planuri', category: 'Trades', level: 1, xp: 0, xpPerSecond: 0.4, isTraining: false, isUnlocked: false },

  // 🧑‍⚕️ Medical
  { id: 'nursing', name: 'Asistență Medicală', category: 'Medical', level: 1, xp: 0, xpPerSecond: 0.6, isTraining: false, isUnlocked: false },
  { id: 'surgery', name: 'Chirurgie', category: 'Medical', level: 1, xp: 0, xpPerSecond: 0.9, isTraining: false, isUnlocked: false },
  { id: 'radiology', name: 'Radiologie', category: 'Medical', level: 1, xp: 0, xpPerSecond: 0.7, isTraining: false, isUnlocked: false },
  { id: 'physiotherapy', name: 'Fizioterapie', category: 'Medical', level: 1, xp: 0, xpPerSecond: 0.6, isTraining: false, isUnlocked: false },
  { id: 'pharmacology', name: 'Farmacologie', category: 'Medical', level: 1, xp: 0, xpPerSecond: 0.5, isTraining: false, isUnlocked: false },
  { id: 'emergency_care', name: 'Îngrijire de Urgență', category: 'Medical', level: 1, xp: 0, xpPerSecond: 0.6, isTraining: false, isUnlocked: false },

  // 🌱 Green
  { id: 'sustainability', name: 'Sustenabilitate', category: 'Green', level: 1, xp: 0, xpPerSecond: 0.4, isTraining: false, isUnlocked: false },
  { id: 'solar_tech', name: 'Tehnologie Solară', category: 'Green', level: 1, xp: 0, xpPerSecond: 0.5, isTraining: false, isUnlocked: false },
  { id: 'energy_audit', name: 'Audit Energetic', category: 'Green', level: 1, xp: 0, xpPerSecond: 0.5, isTraining: false, isUnlocked: false },
  { id: 'environmental_science', name: 'Știința Mediului', category: 'Green', level: 1, xp: 0, xpPerSecond: 0.6, isTraining: false, isUnlocked: false },

  // 🎨 Creative
  { id: 'design', name: 'Design Grafic', category: 'Creative', level: 1, xp: 0, xpPerSecond: 0.5, isTraining: false, isUnlocked: false },
  { id: 'video_editing', name: 'Editare Video', category: 'Creative', level: 1, xp: 0, xpPerSecond: 0.4, isTraining: false, isUnlocked: false },
  { id: 'copywriting', name: 'Copywriting', category: 'Creative', level: 1, xp: 0, xpPerSecond: 0.4, isTraining: false, isUnlocked: false },
  { id: 'music', name: 'Muzică', category: 'Creative', level: 1, xp: 0, xpPerSecond: 0.3, isTraining: false, isUnlocked: false },
  { id: 'animation', name: 'Animație', category: 'Creative', level: 1, xp: 0, xpPerSecond: 0.5, isTraining: false, isUnlocked: false },

  // 🧳 Tourism
  { id: 'hospitality', name: 'Servicii Hoteliere', category: 'Tourism', level: 1, xp: 0, xpPerSecond: 0.4, isTraining: false, isUnlocked: false },
  { id: 'event_planning', name: 'Organizare Evenimente', category: 'Tourism', level: 1, xp: 0, xpPerSecond: 0.5, isTraining: false, isUnlocked: false },
  { id: 'tourism_culture', name: 'Cultură și Turism', category: 'Tourism', level: 1, xp: 0, xpPerSecond: 0.4, isTraining: false, isUnlocked: false },
  { id: 'culinary', name: 'Gastronomie', category: 'Tourism', level: 1, xp: 0, xpPerSecond: 0.5, isTraining: false, isUnlocked: false }
]
