import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TextField, Button, InputAdornment, IconButton } from '@mui/material'
import { toast } from 'react-toastify'

import { loginUser } from '../../services/authService'
import '../../styles/login.css'

import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error('Please enter email and password')
      return
    }

    try {
      setLoading(true)

      await loginUser({
        email: formData.email,
        password: formData.password,
      })

      toast.success('Login successful')

      navigate('/dashboard')
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        'Login failed. Please check your credentials.'

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <h1 className="login-title">
            Welcome Back
          </h1>

          <p className="login-subtitle">
            Sign in to Feature Flag Management System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
  
  <TextField
    fullWidth
    label="Password"
    name="password"
    type={showPassword ? 'text' : 'password'}
    value={formData.password}
    onChange={handleChange}
    required
    slotProps={{
      input: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      },
    }}
  />
  
          <div className="login-forgot">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Login'}
          </Button>

        </form>

        <div className="login-footer">
          Don't have an account?
          <Link to="/register" className="login-register-link">
            Register
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Login