export interface Environment {
  id: number
  name: string
  description: string | null
  is_active: boolean
  created_by: number
  created_at: string
  updated_at: string | null
}

export interface EnvironmentUpdateData {
  name?: string
  description?: string
  is_active?: boolean
}

