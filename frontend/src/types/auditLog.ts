export interface AuditLog {
  id: number
  user_id: number
  action: string
  entity_type: string
  entity_id: number
  old_value: Record<string, unknown> | null
  new_value: Record<string, unknown> | null
  created_at: string
}