import api from './api'

import type {
  UserAssignmentCreateData,
  UserAssignmentUpdateData,
} from '../types/userAssignment'

export const createUserAssignment = async (
  data: UserAssignmentCreateData,
) => {
  const response = await api.post(
    '/user-assignment',
    data,
  )

  return response.data
}

export const getUserAssignments = async () => {
  const response = await api.get(
    '/user-assignment',
  )

  return response.data
}

export const updateUserAssignment = async (
  id: number,
  data: UserAssignmentUpdateData,
) => {
  const response = await api.patch(
    `/user-assignment/${id}`,
    data,
  )

  return response.data
}

