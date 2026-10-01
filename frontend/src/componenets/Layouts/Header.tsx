import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'

interface HeaderProps {
  onMenuClick: () => void
}

interface TokenPayload {
  username: string
}

function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null)

  const handleProfileClick = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileClose = () => {
    setAnchorEl(null)
  }

  const handleProfileNavigate = () => {
    setAnchorEl(null)
    navigate('/profile')
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    setAnchorEl(null)
    navigate('/login')
  }

  const token = localStorage.getItem('access_token')

  let username = 'User'

  if (token) {
    try {
      const decodedToken =
        jwtDecode<TokenPayload>(token)

      username =
        decodedToken.username || 'User'
    } catch {
      username = 'User'
    }
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Feature Flag Management System
        </Typography>

        <Typography className="dashboard-welcome-text">
          Welcome, {username}
        </Typography>

        <IconButton
          color="inherit"
          onClick={handleProfileClick}
        >
          <AccountCircleIcon className="dashboard-account-icon" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileClose}
        >
          <MenuItem onClick={handleProfileNavigate}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>

            Profile
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>

            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header

