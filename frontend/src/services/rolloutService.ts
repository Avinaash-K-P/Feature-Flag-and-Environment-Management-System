
import api from './api'

import type {
  FeatureRolloutCreateData,
  FeatureRolloutUpdateData,
} from '../types/rollout'


export const createRollout = async (
  data: FeatureRolloutCreateData,
) => {
  const response = await api.post(
    '/feature-rollout',
    data,
  )

  return response.data
}


export const getRollouts = async () => {
  const response = await api.get(
    '/feature-rollout',
  )

  return response.data
}


export const updateRollout = async (
  id: number,
  data: FeatureRolloutUpdateData,
) => {
  const response = await api.put(
    `/feature-rollout/${id}`,
    data,
  )

  return response.data
}
