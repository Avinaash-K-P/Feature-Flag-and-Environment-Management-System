export interface FeatureRollout {
  id: number
  feature_flag_environment_id: number
  rollout_percentage: number
  is_active: boolean
  created_at: string
  updated_at: string | null
}

export interface FeatureRolloutCreateData {
  feature_flag_environment_id: number
  rollout_percentage: number
  is_active: boolean
}

export interface FeatureRolloutUpdateData {
  rollout_percentage: number
  is_active?: boolean
}

