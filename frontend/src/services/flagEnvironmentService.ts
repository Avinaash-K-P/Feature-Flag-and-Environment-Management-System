import api from './api'

import type {
  FeatureFlagEnvironmentCreateData,
  FeatureFlagEnvironmentUpdateData,
} from '../types/flagEnvironment'


// Create Feature Flag Environment
export const createFlagEnvironment = async (
  data: FeatureFlagEnvironmentCreateData,
) => {
  const response = await api.post(
    '/feature_flag_environment',
    data,
  )

  return response.data
}

// Get all Feature Flag Environments
export const getFlagEnvironments = async () => {
  const response = await api.get(
    '/feature_flag_environment',
  )

  return response.data
}


// Update Feature Flag Environment
export const updateFlagEnvironment = async (
  id: number,
  data: FeatureFlagEnvironmentUpdateData,
) => {
  const response = await api.put(
    `/feature_flag_environment/${id}`,
    data,
  )

  return response.data
}
