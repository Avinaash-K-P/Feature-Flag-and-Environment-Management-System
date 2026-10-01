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
} from '@mui/material'

import type { FeatureFlag } from '../../types/featureflag'
import type { Environment } from '../../types/environment'
import type { User } from '../../types/user'

interface CreateUserAssignmentForm {
  user_id: number | ''
  feature_flag_id: number | ''
  environment_id: number | ''
  is_enabled: boolean
}

interface CreateUserAssignmentModalProps {
  open: boolean
  formData: CreateUserAssignmentForm
  users: User[]
  featureFlags: FeatureFlag[]
  environments: Environment[]
  saving: boolean
  onClose: () => void
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void
  onUserChange: (event: any) => void
  onFeatureFlagChange: (event: any) => void
  onEnvironmentChange: (event: any) => void
  onCreate: () => void
}

function CreateUserAssignmentModal({
  open,
  formData,
  users,
  featureFlags,
  environments,
  saving,
  onClose,
  onChange,
  onUserChange,
  onFeatureFlagChange,
  onEnvironmentChange,
  onCreate,
}: CreateUserAssignmentModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Create User Assignment
      </DialogTitle>

      <DialogContent>
        <FormControl
          fullWidth
          margin="normal"
        >
          <InputLabel>
            User
          </InputLabel>

          <Select
            value={formData.user_id}
            label="User"
            onChange={onUserChange}
          >
            <MenuItem value="">
              Select User
            </MenuItem>

            {users
              .filter((user) => user.is_active)
              .map((user) => (
                <MenuItem
                  key={user.id}
                  value={user.id}
                >
                  {user.username}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

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
          >
            <MenuItem value="">
              Select Feature Flag
            </MenuItem>

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
          >
            <MenuItem value="">
              Select Environment
            </MenuItem>

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
          onClick={onCreate}
          disabled={
            saving ||
            formData.user_id === '' ||
            formData.feature_flag_id === '' ||
            formData.environment_id === ''
          }
        >
          {saving ? 'Creating...' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateUserAssignmentModal
