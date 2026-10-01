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

import type { UserAssignment } from '../../types/userAssignment'

interface EditUserAssignmentForm {
  is_enabled: boolean
}

interface EditUserAssignmentModalProps {
  open: boolean
  assignment: UserAssignment | null
  username: string
  featureFlagName: string
  environmentName: string
  formData: EditUserAssignmentForm
  saving: boolean
  onClose: () => void
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void
  onUpdate: () => void
}

function EditUserAssignmentModal({
  open,
  assignment,
  username,
  featureFlagName,
  environmentName,
  formData,
  saving,
  onClose,
  onChange,
  onUpdate,
}: EditUserAssignmentModalProps) {
  if (!assignment) {
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
        Edit User Assignment
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="User"
          value={username}
          disabled
        />

        <TextField
          fullWidth
          margin="normal"
          label="Feature Flag"
          value={featureFlagName}
          disabled
        />

        <TextField
          fullWidth
          margin="normal"
          label="Environment"
          value={environmentName}
          disabled
        />

        <FormControlLabel
          control={
            <Switch
              checked={formData.is_enabled}
              onChange={onChange}
              name="is_enabled"
            />
          }
          label="Enabled"
          sx={{ mt: 1 }}
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
          variant="contained"
          onClick={onUpdate}
          disabled={saving}
        >
          {saving ? 'Updating...' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditUserAssignmentModal

