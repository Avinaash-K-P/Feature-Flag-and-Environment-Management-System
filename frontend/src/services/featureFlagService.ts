import api from './api'

export interface FeatureFlagCreateData {
  name: string
  description: string
  flag_type: string
  default_value: string
  is_active: boolean
}

export interface FeatureFlagUpdateData {
  name?: string
  description?: string
  flag_type?: string
  default_value?: string
  is_active?: boolean
}

export const createFeatureFlag = async (
  data: FeatureFlagCreateData,
) => {
  const response = await api.post('/feature-flag', data)
  return response.data
}

export const getFeatureFlags = async () => {
  const response = await api.get('/feature-flag')
  return response.data
}

export const getFeatureFlag = async (id: number) => {
  const response = await api.get(`/feature-flag/${id}`)
  return response.data
}

export const updateFeatureFlag = async (
  id: number,
  data: FeatureFlagUpdateData,
) => {
  const response = await api.put(`/feature-flag/${id}`, data)
  return response.data
}

export const deleteFeatureFlag = async (id: number) => {
  const response = await api.delete(`/feature-flag/${id}`)
  return response.data
}

