import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'

import type { FeatureRollout } from '../../types/rollout'


interface ViewRolloutModalProps {
  open: boolean
  rollout: FeatureRollout | null
  featureFlagEnvironmentName: string
  onClose: () => void
}


function ViewRolloutModal({
  open,
  rollout,
  featureFlagEnvironmentName,
  onClose,
}: ViewRolloutModalProps) {

  if (!rollout) {
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
        View Feature Rollout
      </DialogTitle>


      <DialogContent>

        <TextField
          fullWidth
          margin="normal"
          label="Feature Flag Environment"
          value={featureFlagEnvironmentName}
          disabled
        />


        <TextField
          fullWidth
          margin="normal"
          label="Rollout Percentage"
          value={`${rollout.rollout_percentage}%`}
          disabled
        />


        <TextField
          fullWidth
          margin="normal"
          label="Status"
          value={
            rollout.is_active
              ? 'Active'
              : 'Inactive'
          }
          disabled
        />


        <TextField
          fullWidth
          margin="normal"
          label="Created At"
          value={rollout.created_at}
          disabled
        />


        <TextField
          fullWidth
          margin="normal"
          label="Updated At"
          value={
            rollout.updated_at || 'Not updated'
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


export default ViewRolloutModal

