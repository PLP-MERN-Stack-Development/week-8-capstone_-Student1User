// This file provides simulated data for the admin dashboard.
// In a real application, this data would be fetched from a database (e.g., Supabase).

export interface SimulatedUser {
  id: string
  name: string
  email: string
  lastActive: string
  moodAverage: number // 1-10 scale
  journalEntries: number
  chatSessions: number
  religion: string
  gender: string
}

export interface SimulatedMoodTrend {
  month: string
  averageMood: number
}

export interface SimulatedSentimentDistribution {
  sentiment: string
  count: number
}

export function generateSimulatedUsers(count: number): SimulatedUser[] {
  const users: SimulatedUser[] = []
  const names = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "Diana Prince",
    "Eve Adams",
    "Frank White",
    "Grace Lee",
    "Henry Wilson",
    "Ivy King",
    "Jack Green",
  ]
  const religions = ["Christianity", "Islam", "Hinduism", "Buddhism", "None", "Other"]
  const genders = ["Male", "Female", "Non-binary"]

  for (let i = 0; i < count; i++) {
    const name = names[Math.floor(Math.random() * names.length)]
    const id = `user_${i + 1}`
    const email = `${name.toLowerCase().replace(/\s/g, ".")}@example.com`
    const lastActiveDaysAgo = Math.floor(Math.random() * 30)
    const lastActive = `${lastActiveDaysAgo} days ago`
    const moodAverage = Number.parseFloat((Math.random() * (9 - 4) + 4).toFixed(1)) // Mood between 4 and 9
    const journalEntries = Math.floor(Math.random() * 50)
    const chatSessions = Math.floor(Math.random() * 100)
    const religion = religions[Math.floor(Math.random() * religions.length)]
    const gender = genders[Math.floor(Math.random() * genders.length)]

    users.push({
      id,
      name,
      email,
      lastActive,
      moodAverage,
      journalEntries,
      chatSessions,
      religion,
      gender,
    })
  }
  return users
}

export function generateSimulatedMoodTrends(): SimulatedMoodTrend[] {
  const data = []
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let currentMood = 6.5

  for (let i = 0; i < 12; i++) {
    currentMood += (Math.random() - 0.5) * 0.8 // Fluctuate mood slightly
    currentMood = Math.max(4, Math.min(9, currentMood)) // Keep between 4 and 9
    data.push({
      month: months[i],
      averageMood: Number.parseFloat(currentMood.toFixed(1)),
    })
  }
  return data
}

export function generateSimulatedSentimentDistribution(): SimulatedSentimentDistribution[] {
  return [
    { sentiment: "Positive", count: 150 },
    { sentiment: "Neutral", count: 80 },
    { sentiment: "Negative", count: 40 },
  ]
}
