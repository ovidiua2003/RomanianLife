export const jobsData = [
  // 🧹 Entry-Level
  { id: 'janitor', name: 'Îngrijitor', category: 'Entry-Level', income: 15, xpPerSecond: 0.5, isWorking: false, isUnlocked: true, requiredSkill: 'english', requiredLevel: 1, level: 1, xp: 0 },
  { id: 'call_center', name: 'Operator Call Center', category: 'Entry-Level', income: 25, xpPerSecond: 1.0, isWorking: false, isUnlocked: false, requiredSkill: 'english', requiredLevel: 2, level: 1, xp: 0 },
  { id: 'delivery_driver', name: 'Curier Livrări', category: 'Entry-Level', income: 30, xpPerSecond: 1.0, isWorking: false, isUnlocked: false, requiredSkill: 'driving', requiredLevel: 2, level: 1, xp: 0 },

  // 💻 Tech
  { id: 'software_dev', name: 'Dezvoltator Software', category: 'Tech', income: 120, xpPerSecond: 2.5, isWorking: false, isUnlocked: false, requiredSkill: 'coding', requiredLevel: 5, level: 1, xp: 0 },
  { id: 'cybersec_specialist', name: 'Specialist Securitate', category: 'Tech', income: 110, xpPerSecond: 2.3, isWorking: false, isUnlocked: false, requiredSkill: 'cybersecurity', requiredLevel: 4, level: 1, xp: 0 },
  { id: 'data_analyst', name: 'Analist de Date', category: 'Tech', income: 100, xpPerSecond: 2.0, isWorking: false, isUnlocked: false, requiredSkill: 'data_analysis', requiredLevel: 4, level: 1, xp: 0 },
  { id: 'erp_consultant', name: 'Consultant ERP', category: 'Tech', income: 95, xpPerSecond: 1.8, isWorking: false, isUnlocked: false, requiredSkill: 'erp_systems', requiredLevel: 4, level: 1, xp: 0 },
  { id: 'ux_ui_designer', name: 'Designer UX/UI', category: 'Tech', income: 90, xpPerSecond: 1.7, isWorking: false, isUnlocked: false, requiredSkill: 'ux_ui', requiredLevel: 3, level: 1, xp: 0 },

  // 🧰 Trades
  { id: 'electrician_job', name: 'Electrician', category: 'Trades', income: 75, xpPerSecond: 1.5, isWorking: false, isUnlocked: false, requiredSkill: 'electrician', requiredLevel: 3, level: 1, xp: 0 },
  { id: 'welder', name: 'Sudor', category: 'Trades', income: 70, xpPerSecond: 1.4, isWorking: false, isUnlocked: false, requiredSkill: 'welding', requiredLevel: 3, level: 1, xp: 0 },
  { id: 'plumber', name: 'Instalator', category: 'Trades', income: 65, xpPerSecond: 1.3, isWorking: false, isUnlocked: false, requiredSkill: 'plumbing', requiredLevel: 3, level: 1, xp: 0 },
  { id: 'hvac_tech', name: 'Tehnician HVAC', category: 'Trades', income: 68, xpPerSecond: 1.4, isWorking: false, isUnlocked: false, requiredSkill: 'hvac', requiredLevel: 3, level: 1, xp: 0 },

  // 🧑‍⚕️ Medical
  { id: 'nurse', name: 'Asistent Medical', category: 'Medical', income: 70, xpPerSecond: 1.5, isWorking: false, isUnlocked: false, requiredSkill: 'nursing', requiredLevel: 3, level: 1, xp: 0 },
  { id: 'doctor', name: 'Medic Generalist', category: 'Medical', income: 130, xpPerSecond: 2.8, isWorking: false, isUnlocked: false, requiredSkill: 'surgery', requiredLevel: 5, level: 1, xp: 0 },
  { id: 'radiologist', name: 'Radiolog', category: 'Medical', income: 125, xpPerSecond: 2.6, isWorking: false, isUnlocked: false, requiredSkill: 'radiology', requiredLevel: 4, level: 1, xp: 0 },
  { id: 'physio', name: 'Fizioterapeut', category: 'Medical', income: 85, xpPerSecond: 1.6, isWorking: false, isUnlocked: false, requiredSkill: 'physiotherapy', requiredLevel: 3, level: 1, xp: 0 },
  { id: 'pharmacist', name: 'Farmacist', category: 'Medical', income: 90, xpPerSecond: 1.7, isWorking: false, isUnlocked: false, requiredSkill: 'pharmacology', requiredLevel: 3, level: 1, xp: 0 },

  // 🧑‍🏫 Education
  { id: 'teacher', name: 'Profesor', category: 'Education', income: 60, xpPerSecond: 1.2, isWorking: false, isUnlocked: false, requiredSkill: 'pedagogy', requiredLevel: 3, level: 1, xp: 0 },
  { id: 'language_teacher', name: 'Profesor Limbi Străine', category: 'Education', income: 65, xpPerSecond: 1.3, isWorking: false, isUnlocked: false, requiredSkill: 'foreign_languages', requiredLevel: 3, level: 1, xp: 0 },

  // 🌱 Green
  { id: 'solar_installer', name: 'Instalator Panouri Solare', category: 'Green', income: 85, xpPerSecond: 1.8, isWorking: false, isUnlocked: false, requiredSkill: 'solar_tech', requiredLevel: 3, level: 1, xp: 0 },
  { id: 'eco_consultant', name: 'Consultant Mediu', category: 'Green', income: 90, xpPerSecond: 1.9, isWorking: false, isUnlocked: false, requiredSkill: 'sustainability', requiredLevel: 4, level: 1, xp: 0 },
  { id: 'energy_auditor', name: 'Auditor Energetic', category: 'Green', income: 95, xpPerSecond: 2.0, isWorking: false, isUnlocked: false, requiredSkill: 'energy_audit', requiredLevel: 4, level: 1, xp: 0 },

  // 🎨 Creative
  { id: 'graphic_designer', name: 'Designer Grafic', category: 'Creative', income: 70, xpPerSecond: 1.5, isWorking: false, isUnlocked: false, requiredSkill: 'design', requiredLevel: 3, level: 1, xp: 0 },
  { id: 'video_editor', name: 'Editor Video', category: 'Creative', income: 65, xpPerSecond: 1.4, isWorking: false, isUnlocked: false, requiredSkill: 'video_editing', requiredLevel: 3, level: 1, xp: 0 },
  { id: 'copywriter', name: 'Copywriter', category: 'Creative', income: 60, xpPerSecond: 1.3, isWorking: false, isUnlocked: false, requiredSkill: 'copywriting', requiredLevel: 3, level: 1, xp: 0 },

  // 🧳 Tourism
  { id: 'tour_guide', name: 'Ghid Turistic', category: 'Tourism', income: 60, xpPerSecond: 1.2, isWorking: false, isUnlocked: false, requiredSkill: 'foreign_languages', requiredLevel: 3, level: 1, xp: 0 },
  { id: 'event_manager', name: 'Manager Evenimente', category: 'Tourism', income: 75, xpPerSecond: 1.6, isWorking: false, isUnlocked: false, requiredSkill: 'event_planning', requiredLevel: 4, level: 1, xp: 0 },
  { id: 'hotel_receptionist', name: 'Recepționer Hotel', category: 'Tourism', income: 55, xpPerSecond: 1.1, isWorking: false, isUnlocked: false, requiredSkill: 'hospitality', requiredLevel: 2, level: 1, xp: 0 },
]
