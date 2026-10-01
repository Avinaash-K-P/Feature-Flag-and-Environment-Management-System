import api from './api'

import type { EnvironmentUpdateData } from '../types/environment'

export const getEnvironments = async () => {
  const response = await api.get('/environment')
  return response.data
}

export const updateEnvironment = async (
  id: number,
  data: EnvironmentUpdateData,
) => {
  const response = await api.put(
    `/environment/${id}`,
    data,
  )

  return response.data
}

