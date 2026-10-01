import api from './api'

import type {
  UserAssignStatus,
} from '../types/user'

export const getUsers = async () => {
  const response = await api.get(
    '/manage-users',
  )

  return response.data
}

export const getUser = async (
  id: number,
) => {
  const response = await api.get(
    `/manage-users/${id}`,
  )

  return response.data
}

export const updateUserStatus = async (
  id: number,
  data: UserAssignStatus,
) => {
  const response = await api.put(
    `/manage-users/${id}`,
    data,
  )

  return response.data
}
