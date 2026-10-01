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

interface EditEnvironmentForm {
  is_active: boolean
}

interface EditEnvironmentModalProps {
  open: boolean
  environmentName: string
  formData: EditEnvironmentForm
  saving: boolean
  onClose: () => void
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void
  onUpdate: () => void
}

function EditEnvironmentModal({
  open,
  environmentName,
  formData,
  saving,
  onClose,
  onChange,
  onUpdate,
}: EditEnvironmentModalProps) {
  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit Environment</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Environment Name"
          value={environmentName}
          disabled
        />

        <FormControlLabel
          control={
            <Switch
              name="is_active"
              checked={formData.is_active}
              onChange={onChange}
              disabled={saving}
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
          variant="contained"
          onClick={onUpdate}
          disabled={saving}
        >
          {saving ? 'Updating...' : 'Update Environment'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditEnvironmentModal

