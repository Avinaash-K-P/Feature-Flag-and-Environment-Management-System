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

import type { FeatureRollout } from '../../types/rollout'


interface EditRolloutForm {
  rollout_percentage: number | ''
  is_active: boolean
}


interface EditRolloutModalProps {
  open: boolean
  rollout: FeatureRollout | null
  featureFlagEnvironmentName: string
  formData: EditRolloutForm
  saving: boolean
  onClose: () => void
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void
  onUpdate: () => void
}


function EditRolloutModal({
  open,
  rollout,
  featureFlagEnvironmentName,
  formData,
  saving,
  onClose,
  onChange,
  onUpdate,
}: EditRolloutModalProps) {

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
        Edit Feature Rollout
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
          name="rollout_percentage"
          type="number"
          value={formData.rollout_percentage}
          onChange={onChange}
          slotProps={{
            htmlInput: {
              min: 0,
              max: 100,
            },
          }}
          helperText="Enter a value between 0 and 100"
        />


        <FormControlLabel
          control={
            <Switch
              checked={formData.is_active}
              onChange={onChange}
              name="is_active"
            />
          }
          label="Active"
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
          disabled={
            saving ||
            formData.rollout_percentage === ''
          }
        >
          {saving ? 'Updating...' : 'Update'}
        </Button>

      </DialogActions>

    </Dialog>
  )
}


export default EditRolloutModal
