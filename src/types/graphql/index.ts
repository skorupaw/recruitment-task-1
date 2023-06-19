export type Mood = {
  id: string
  emoji: string
  title: string
  description: string
}

export type PaginationData = {
  skip: number
  limit: number
  count: number
}

export type GetMoods = {
  moods: Mood[]
  pagination: PaginationData
}

export type GetMoodsData = {
  data: GetMoods
}

export type GetMoodsVariables = {
  skip?: number,
  limit?: number,
  search?: string
}
