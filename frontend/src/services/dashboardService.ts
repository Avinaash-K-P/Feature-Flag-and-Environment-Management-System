import api from './api'



export const getDashboardSummary = async () => {
  const response = await api.get('/dashboard-summary')

  return response.data
}

export const getAllFeatureUsage = async () => {
  const response = await api.get('/feature_usage')

  return response.data
}

export const getFeatureUsage = async (
  featureFlagId: number,
) => {
  const response = await api.get(
    `/feature_usage/${featureFlagId}`,
  )

  return response.data
}