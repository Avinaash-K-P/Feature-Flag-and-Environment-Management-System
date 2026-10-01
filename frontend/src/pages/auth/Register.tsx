import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TextField, MenuItem, Button, InputAdornment, IconButton } from '@mui/material'
import { toast } from 'react-toastify'
import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { registerUser } from '../../services/authService'
import '../../styles/register.css'

const roles = [
  { id: 2, name: 'Developer' },
  { id: 3, name: 'Tester' },
  { id: 4, name: 'Viewer' },
]

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role_id: '',
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

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.role_id
    ) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      setLoading(true)

      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role_id: Number(formData.role_id),
      })

      toast.success('Registration successful')

      navigate('/login')
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        'Registration failed. Please try again.'

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

return (
  <div className="register-page">
    <div className="register-card">

      <div className="register-header">
        <h1 className="register-title">
          Create Account
        </h1>

        <p className="register-subtitle">
          Register for Feature Flag Management System
        </p>
      </div>

      <form onSubmit={handleSubmit} className="register-form">

        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

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

        <TextField
          fullWidth
          select
          label="Role"
          name="role_id"
          value={formData.role_id}
          onChange={handleChange}
          required
        >
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </TextField>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          className="register-button"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Register'}
        </Button>

      </form>

      <div className="register-footer">
        Already have an account?
        <Link to="/login" className="register-login-link">
          Login
        </Link>
      </div>

    </div>
  </div>
)  
    
}

export default Register