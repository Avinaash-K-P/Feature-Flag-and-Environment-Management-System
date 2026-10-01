import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'

import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'

import { useSearchParams } from 'react-router-dom'

import {
  resetPassword,
} from '../../services/authService'

import '../../styles/resetPassword.css'

function ResetPassword() {
  const [searchParams] =
    useSearchParams()

  const token =
    searchParams.get('token') || ''

  const [password, setPassword] =
    useState('')

  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [showPassword, setShowPassword] =
    useState(false)

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [message, setMessage] =
    useState('')

  const [error, setError] =
    useState('')

  const handlePasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setPassword(event.target.value)
  }

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(
      event.target.value,
    )
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    setMessage('')
    setError('')

    if (!token) {
      setError(
        'Invalid or missing reset token.',
      )
      return
    }

    if (!password || !confirmPassword) {
      setError(
        'Please enter both password fields.',
      )
      return
    }

    if (password !== confirmPassword) {
      setError(
        'Passwords do not match.',
      )
      return
    }

    try {
      setLoading(true)

      const response =
        await resetPassword(
          token,
          password,
        )

      setMessage(
        response?.message ||
          'Password reset successfully.',
      )

      setPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          'Failed to reset password.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="reset-password-page">

      <div className="reset-password-card">

        <h1>
          Reset Password
        </h1>

        <p>
          Enter your new password below.
        </p>

        {message && (
          <div className="reset-password-success">
            {message}
          </div>
        )}

        {error && (
          <div className="reset-password-error">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
        >

          <div className="reset-password-field">

            <label>
              New Password
            </label>

            <div className="reset-password-input-wrapper">

              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                value={password}
                onChange={
                  handlePasswordChange
                }
                placeholder="Enter new password"
              />

              <button
                type="button"
                className="reset-password-eye-button"
                onClick={() =>
                  setShowPassword(
                    (previous) =>
                      !previous,
                  )
                }
              >
                {showPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </button>

            </div>

          </div>

          <div className="reset-password-field">

            <label>
              Confirm Password
            </label>

            <div className="reset-password-input-wrapper">

              <input
                type={
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                }
                value={
                  confirmPassword
                }
                onChange={
                  handleConfirmPasswordChange
                }
                placeholder="Confirm new password"
              />

              <button
                type="button"
                className="reset-password-eye-button"
                onClick={() =>
                  setShowConfirmPassword(
                    (previous) =>
                      !previous,
                  )
                }
              >
                {showConfirmPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            className="reset-password-submit-button"
            disabled={loading}
          >
            {loading
              ? 'Resetting...'
              : 'Reset Password'}
          </button>

        </form>

      </div>

    </div>
  )
}

export default ResetPassword

