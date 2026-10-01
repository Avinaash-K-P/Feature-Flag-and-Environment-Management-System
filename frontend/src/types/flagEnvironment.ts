export interface FeatureFlagEnvironment {
  id: number
  feature_flag_id: number
  environment_id: number
  value: string | null
  is_enabled: boolean
  created_at: string
  updated_at: string | null
}


export interface FeatureFlagEnvironmentCreateData {
  feature_flag_id: number
  environment_id: number
  value?: string | null
  is_enabled: boolean
}

export interface FeatureFlagEnvironmentUpdateData {
  value?: string | null
  is_enabled?: boolean
}

