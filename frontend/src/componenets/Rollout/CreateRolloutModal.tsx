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

import type { FeatureFlagEnvironment } from '../../types/flagEnvironment'

interface CreateRolloutForm {
  feature_flag_environment_id: number | ''
  rollout_percentage: number | ''
  is_active: boolean
}


interface CreateRolloutModalProps {
  open: boolean
  formData: CreateRolloutForm
  flagEnvironments: FeatureFlagEnvironment[]
  getFeatureFlagEnvironmentName: (
    id: number,
  ) => string
  saving: boolean
  onClose: () => void
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void
  onFlagEnvironmentChange: (
    event: any,
  ) => void
  onCreate: () => void
}


function CreateRolloutModal({
  open,
  formData,
  flagEnvironments,
  getFeatureFlagEnvironmentName,
  saving,
  onClose,
  onChange,
  onFlagEnvironmentChange,
  onCreate,
}: CreateRolloutModalProps) {
  
  
  
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Create Feature Rollout
      </DialogTitle>

      <DialogContent>

        <FormControl
          fullWidth
          margin="normal"
        >
          <InputLabel>
            Feature Flag Environment
          </InputLabel>

          <Select
            value={formData.feature_flag_environment_id}
            label="Feature Flag Environment"
            onChange={onFlagEnvironmentChange}
          >
            <MenuItem value="">
              Select Feature Flag Environment
            </MenuItem>

            {flagEnvironments.map(
              (flagEnvironment) => (
                <MenuItem
                  key={flagEnvironment.id}
                  value={flagEnvironment.id}
                >
                  {getFeatureFlagEnvironmentName(
                    flagEnvironment.id,
                  )}
                </MenuItem>
              ),
            )}
          </Select>
        </FormControl>


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
          onClick={onCreate}
          disabled={
            saving ||
            formData.feature_flag_environment_id === '' ||
            formData.rollout_percentage === ''
          }
        >
          {saving ? 'Creating...' : 'Create'}
        </Button>
      </DialogActions>

    </Dialog>
  )
}


export default CreateRolloutModal
