import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material'

import type { FeatureFlag } from '../../types/featureflag'
import type { Environment } from '../../types/environment'

interface CreateFlagEnvironmentForm {
  feature_flag_id: number | ''
  environment_id: number | ''
  value: string
  is_enabled: boolean
}


interface CreateFlagEnvironmentModalProps {
  open: boolean
  formData: CreateFlagEnvironmentForm
  featureFlags: FeatureFlag[]
  environments: Environment[]
  saving: boolean
  onClose: () => void
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => void
  onFeatureFlagChange: (
    event: any,
  ) => void
  onEnvironmentChange: (
    event: any,
  ) => void
  onCreate: () => void
}


function CreateFlagEnvironmentModal({
  open,
  formData,
  featureFlags,
  environments,
  saving,
  onClose,
  onChange,
  onFeatureFlagChange,
  onEnvironmentChange,
  onCreate,
}: CreateFlagEnvironmentModalProps) {

  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>
        Create Flag Environment
      </DialogTitle>


      <DialogContent>

        {/* Feature Flag */}
        <FormControl
          fullWidth
          margin="normal"
        >
          <InputLabel>
            Feature Flag
          </InputLabel>

          <Select
            value={formData.feature_flag_id}
            label="Feature Flag"
            onChange={onFeatureFlagChange}
            disabled={saving}
          >
            {featureFlags.map((featureFlag) => (
              <MenuItem
                key={featureFlag.id}
                value={featureFlag.id}
              >
                {featureFlag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        {/* Environment */}
        <FormControl
          fullWidth
          margin="normal"
        >
          <InputLabel>
            Environment
          </InputLabel>

          <Select
            value={formData.environment_id}
            label="Environment"
            onChange={onEnvironmentChange}
            disabled={saving}
          >
            {environments.map((environment) => (
              <MenuItem
                key={environment.id}
                value={environment.id}
              >
                {environment.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


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
          onClick={onCreate}
          disabled={
            saving ||
            formData.feature_flag_id === '' ||
            formData.environment_id === ''
          }
        >
          {saving
            ? 'Creating...'
            : 'Create Flag Environment'}
        </Button>

      </DialogActions>

    </Dialog>
  )
}


export default CreateFlagEnvironmentModal

