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

interface CreateFeatureFlagForm {
  name: string
  description: string
  flag_type: string
  default_value: string
  is_active: boolean
}

interface CreateFeatureFlagModalProps {
  open: boolean
  formData: CreateFeatureFlagForm
  saving: boolean
  onClose: () => void
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  onCreate: () => void
}

function CreateFeatureFlagModal({
  open,
  formData,
  saving,
  onClose,
  onChange,
  onCreate,
}: CreateFeatureFlagModalProps) {
  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Create Feature Flag</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Feature Name"
          name="name"
          value={formData.name}
          onChange={onChange}
          disabled={saving}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          value={formData.description}
          onChange={onChange}
          multiline
          rows={3}
          disabled={saving}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Flag Type"
          name="flag_type"
          value={formData.flag_type}
          onChange={onChange}
          placeholder="Example: boolean"
          disabled={saving}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Default Value"
          name="default_value"
          value={formData.default_value}
          onChange={onChange}
          placeholder="Example: true"
          disabled={saving}
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
          label="Active"
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
          onClick={onCreate}
          disabled={saving}
        >
          {saving ? 'Creating...' : 'Create Feature'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateFeatureFlagModal

