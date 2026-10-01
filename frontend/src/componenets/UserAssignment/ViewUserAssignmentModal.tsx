import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'

import type { UserAssignment } from '../../types/userAssignment'

interface ViewUserAssignmentModalProps {
  open: boolean
  assignment: UserAssignment | null
  username: string
  featureFlagName: string
  environmentName: string
  onClose: () => void
}

function ViewUserAssignmentModal({
  open,
  assignment,
  username,
  featureFlagName,
  environmentName,
  onClose,
}: ViewUserAssignmentModalProps) {
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
        View User Assignment
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

        <TextField
          fullWidth
          margin="normal"
          label="Status"
          value={
            assignment.is_enabled
              ? 'Enabled'
              : 'Disabled'
          }
          disabled
        />

        <TextField
          fullWidth
          margin="normal"
          label="Created At"
          value={assignment.created_at}
          disabled
        />

        <TextField
          fullWidth
          margin="normal"
          label="Updated At"
          value={
            assignment.updated_at ||
            'Not updated'
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

export default ViewUserAssignmentModal

