import { useEffect, useState } from 'react'

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'

import { toast } from 'react-toastify'

import {
  getProfile,
  updateProfile,
} from '../../services/profileService'

import '../../styles/profile.css'

interface ProfileData {
  id: number
  username: string
  email: string
  role_id: number
}

interface ProfileResponse {
  message: string
  data: ProfileData
}

function Profile() {
  const [profile, setProfile] =
    useState<ProfileData | null>(null)

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [error, setError] =
    useState<string | null>(null)

  const [editOpen, setEditOpen] =
    useState(false)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
  })

  const getRoleName = (roleId: number) => {
    const roles: Record<number, string> = {
      1: 'Admin',
      2: 'Developer',
      3: 'Tester',
      4: 'Viewer',
    }

    return roles[roleId] || 'Unknown'
  }

  const loadProfile = async () => {
    try {
      setLoading(true)
      setError(null)

      const response: ProfileResponse =
        await getProfile()

      setProfile(response.data)
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        'Failed to load profile.'

      setError(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProfile()
  }, [])

  const handleEditOpen = () => {
    if (!profile) {
      return
    }

    setFormData({
      username: profile.username,
      email: profile.email,
    })

    setEditOpen(true)
  }

  const handleEditClose = () => {
    if (saving) {
      return
    }

    setEditOpen(false)
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    if (!formData.username.trim()) {
      toast.error('Username is required')
      return
    }

    if (!formData.email.trim()) {
      toast.error('Email is required')
      return
    }

    try {
      setSaving(true)

      await updateProfile({
        username: formData.username.trim(),
        email: formData.email.trim(),
      })

      toast.success('Profile updated successfully')

      setEditOpen(false)

      await loadProfile()
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        'Failed to update profile.'

      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="profile-loading">
        <CircularProgress />
        <p>Loading profile...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="profile-error">
        {error}
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="profile-error">
        Profile information is unavailable.
      </div>
    )
  }

  return (
    <div className="profile-page">

      {/* Page Header */}
      <div className="profile-header">
        <div>
          <h1 className="profile-title">
            Profile
          </h1>

          <p className="profile-subtitle">
            Manage your account information
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="profile-card">

        <div className="profile-card-header">
          <h2>
            Profile Information
          </h2>

          <p>
            Your current account details
          </p>
        </div>

        <div className="profile-info-grid">

          {/* Username */}
          <div className="profile-info-item">
            <span className="profile-info-label">
              Username
            </span>

            <span className="profile-info-value">
              {profile.username}
            </span>
          </div>

          {/* Email */}
          <div className="profile-info-item">
            <span className="profile-info-label">
              Email
            </span>

            <span className="profile-info-value">
              {profile.email}
            </span>
          </div>

          {/* Role */}
          <div className="profile-info-item">
            <span className="profile-info-label">
              Role
            </span>

            <span className="profile-info-value">
              {getRoleName(profile.role_id)}
            </span>
          </div>

        </div>

        <div className="profile-card-actions">
          <Button
            variant="contained"
            onClick={handleEditOpen}
          >
            Edit Profile
          </Button>
        </div>

      </div>

      {/* Edit Profile Dialog */}
      <Dialog
        open={editOpen}
        onClose={handleEditClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Edit Profile
        </DialogTitle>

        <DialogContent>

          <div className="profile-edit-form">

            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={saving}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={saving}
            />

          </div>

        </DialogContent>

        <DialogActions>

          <Button
            variant="outlined"
            onClick={handleEditClose}
            disabled={saving}
          >
            CANCEL
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'SAVING...' : 'SAVE'}
          </Button>

        </DialogActions>

      </Dialog>

    </div>
  )
}

export default Profile

