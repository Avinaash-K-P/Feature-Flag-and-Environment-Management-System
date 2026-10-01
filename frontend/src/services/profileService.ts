import api from './api'

export interface UpdateProfileData {
  username: string
  email: string
}

export const getProfile = async () => {
  const response = await api.get('/profile')

  return response.data
}

export const updateProfile = async (
  data: UpdateProfileData,
) => {
  const response = await api.put(
    '/profile/edit',
    data,
  )

  return response.data
}