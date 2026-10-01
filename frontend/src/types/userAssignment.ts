export interface UserAssignment {
  id: number
  user_id: number
  feature_flag_id: number
  environment_id: number
  is_enabled: number
  created_at: string
  updated_at: string | null
}

export interface UserAssignmentCreateData {
  user_id: number
  feature_flag_id: number
  environment_id: number
  is_enabled: boolean
}

export interface UserAssignmentUpdateData {
  is_enabled?: boolean
}
