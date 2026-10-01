import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import { toast } from 'react-toastify'

import { forgotPassword } from '../../services/authService'
import '../../styles/forgotPassword.css'

function ForgotPassword() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (!email) {
      toast.error('Please enter your email')
      return
    }

    try {
      setLoading(true)

      await forgotPassword({
        email,
      })

      toast.success('Password reset request submitted')

      navigate('/reset-password')
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        'Unable to process password reset request.'

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/login')
  }

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">

        <div className="forgot-password-header">
          <h1 className="forgot-password-title">
            Forgot Password
          </h1>

          <p className="forgot-password-subtitle">
            Enter your registered email to reset your password
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="forgot-password-form"
        >
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <div className="forgot-password-actions">
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default ForgotPassword