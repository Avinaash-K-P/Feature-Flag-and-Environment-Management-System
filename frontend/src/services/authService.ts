import api from './api'

export interface RegisterData {
  username: string
  email: string
  password: string
  role_id: number
}

export interface LoginData {
  email: string
  password: string
}

export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  reset_token: string
  new_password: string
  retype_password: string  
}

export const registerUser = async (data: RegisterData) => {
  const response = await api.post('/auth/register', data)
  return response.data
}

export const loginUser = async (data: LoginData) => {
  const response = await api.post('/auth/login', data)

  const { access_token, refresh_token } = response.data

  localStorage.setItem('access_token', access_token)
  localStorage.setItem('refresh_token', refresh_token)

  return response.data
}

export const forgotPassword = async (data: ForgotPasswordData) => {
  const response = await api.post('/auth/forgot-password', data)
  return response.data
}

export const resetPassword = async (
  token: string,
  new_password: string,
) => {
  const response = await api.post(
    '/reset-password',
    {
      token,
      new_password,
    },
  )

  return response.data
}