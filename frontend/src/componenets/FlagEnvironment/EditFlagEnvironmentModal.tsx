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

import type { FeatureFlagEnvironment } from '../../types/flagEnvironment'


interface EditFlagEnvironmentForm {
  value: string
  is_enabled: boolean
}


interface EditFlagEnvironmentModalProps {
  open: boolean
  flagEnvironment: FeatureFlagEnvironment | null
  featureFlagName: string
  environmentName: string
  formData: EditFlagEnvironmentForm
  saving: boolean
  onClose: () => void
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => void
  onUpdate: () => void
}


function EditFlagEnvironmentModal({
  open,
  flagEnvironment,
  featureFlagName,
  environmentName,
  formData,
  saving,
  onClose,
  onChange,
  onUpdate,
}: EditFlagEnvironmentModalProps) {

  if (!flagEnvironment) {
    return null
  }


  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>
        Edit Flag Environment
      </DialogTitle>


      <DialogContent>

        {/* Feature Flag */}
        <TextField
          fullWidth
          margin="normal"
          label="Feature Flag"
          value={featureFlagName}
          disabled
        />


        {/* Environment */}
        <TextField
          fullWidth
          margin="normal"
          label="Environment"
          value={environmentName}
          disabled
        />


        {/* Value */}
        <TextField
          fullWidth
          margin="normal"
          label="Value"
          name="value"
          value={formData.value}
          onChange={onChange}
          disabled={saving}
          placeholder="Enter feature value"
        />


        {/* Enabled */}
        <FormControlLabel
          control={
            <Switch
              name="is_enabled"
              checked={formData.is_enabled}
              onChange={onChange}
              disabled={saving}
            />
          }
          label={
            formData.is_enabled
              ? 'Enabled'
              : 'Disabled'
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
          variant="contained"
          onClick={onUpdate}
          disabled={saving}
        >
          {saving
            ? 'Updating...'
            : 'Update Flag Environment'}
        </Button>

      </DialogActions>

    </Dialog>
  )
}

export default EditFlagEnvironmentModal

