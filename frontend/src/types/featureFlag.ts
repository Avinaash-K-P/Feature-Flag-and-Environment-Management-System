export interface FeatureFlag {
  id: number
  name:string
  description: string
  flag_type:string
  default_value: string | null
  is_active:boolean
  created_by: number
  created_at: string
  updated_at: string | null
}