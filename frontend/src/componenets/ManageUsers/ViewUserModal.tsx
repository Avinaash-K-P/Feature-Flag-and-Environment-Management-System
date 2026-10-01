import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'

import type { User } from '../../types/user'

interface ViewUserModalProps {
  open: boolean
  user: User | null
  roleName: string
  onClose: () => void
}

function ViewUserModal({
  open,
  user,
  roleName,
  onClose,
}: ViewUserModalProps) {
  if (!user) {
    return null
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        View User
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="User ID"
          value={user.id}
          disabled
        />

        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={user.username}
          disabled
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={user.email}
          disabled
        />

        <TextField
          fullWidth
          margin="normal"
          label="Role"
          value={roleName}
          disabled
        />

        <TextField
          fullWidth
          margin="normal"
          label="Status"
          value={
            user.is_active
              ? 'Active'
              : 'Inactive'
          }
          disabled
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewUserModal

