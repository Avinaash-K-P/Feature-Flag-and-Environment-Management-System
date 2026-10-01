import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material'

import type { User } from '../../types/user'

interface EditUserStatusForm {
  is_active: boolean
}

interface EditUserStatusModalProps {
  open: boolean
  user: User | null
  roleName: string
  formData: EditUserStatusForm
  saving: boolean
  onClose: () => void
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void
  onUpdate: () => void
}

function EditUserStatusModal({
  open,
  user,
  roleName,
  formData,
  saving,
  onClose,
  onChange,
  onUpdate,
}: EditUserStatusModalProps) {
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
        Edit User Status
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

        <FormControlLabel
          control={
            <Switch
              name="is_active"
              checked={formData.is_active}
              onChange={onChange}
            />
          }
          label={
            formData.is_active
              ? 'Active'
              : 'Inactive'
          }
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={saving}
        >
          Cancel
        </Button>

        <Button
          onClick={onUpdate}
          variant="contained"
          disabled={saving}
        >
          {saving ? 'Updating...' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditUserStatusModal

