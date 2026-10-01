import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material'

import {
  Dashboard as DashboardIcon,
  Flag,
  Public,
  BarChart,
  Assignment,
  Description,
} from '@mui/icons-material'

import AccountTreeIcon from '@mui/icons-material/AccountTree'
import PeopleIcon from '@mui/icons-material/People'

import { useNavigate, useLocation } from 'react-router-dom'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const menuItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
  },

  {
  label: 'Manage Users',
  path: '/manage-users',
  icon: <PeopleIcon />,
  },
  {
    label: 'Feature Flags',
    path: '/feature-flags',
    icon: <Flag />,
  },
  {
    label: 'Environments',
    path: '/environments',
    icon: <Public />,
  },
  {
  label: 'Flag Environments',
  path: '/flag-environments',
  icon: <AccountTreeIcon />,
  },
  {
    label: 'Assignments',
    path: '/assignments',
    icon: <Assignment />,
  },
  
  {
    label: 'Rollouts',
    path: '/rollouts',
    icon: <BarChart />,
  },

  {
    label: 'Audit Logs',
    path: '/audit-logs',
    icon: <Description />,
  },
]

function Sidebar({ open }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <Drawer
      variant="persistent"
      open={open}
      className="dashboard-sidebar"
    >
      <div className="sidebar-container">

        {/* Sidebar Header */}
        <div className="sidebar-logo">
          Feature Flag System
        </div>

        <Divider />

        {/* Navigation */}
        <List className="sidebar-menu">

          {menuItems.map((item) => (
            <ListItem
              key={item.path}
              disablePadding
            >
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                />
              </ListItemButton>
            </ListItem>
          ))}

        </List>

      </div>
    </Drawer>
  )
}

export default Sidebar