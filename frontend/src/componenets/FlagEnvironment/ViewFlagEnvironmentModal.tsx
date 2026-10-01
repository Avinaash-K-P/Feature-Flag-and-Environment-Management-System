import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'

import type { FeatureFlagEnvironment } from '../../types/flagEnvironment'
import type { FeatureFlag } from '../../types/featureflag'
import type { Environment } from '../../types/environment'


interface ViewFlagEnvironmentModalProps {
  open: boolean
  flagEnvironment: FeatureFlagEnvironment | null
  featureFlags: FeatureFlag[]
  environments: Environment[]
  onClose: () => void
}


function ViewFlagEnvironmentModal({
  open,
  flagEnvironment,
  featureFlags,
  environments,
  onClose,
}: ViewFlagEnvironmentModalProps) {

  if (!flagEnvironment) {
    return null
  }


  const featureFlag = featureFlags.find(
    (flag) =>
      flag.id === flagEnvironment.feature_flag_id,
  )


  const environment = environments.find(
    (environment) =>
      environment.id === flagEnvironment.environment_id,
  )


  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>
        View Flag Environment
      </DialogTitle>


      <DialogContent>

        {/* Feature Flag */}
        <TextField
          fullWidth
          margin="normal"
          label="Feature Flag"
          value={
            featureFlag?.name ||
            `Feature Flag #${flagEnvironment.feature_flag_id}`
          }
          disabled
        />


        {/* Environment */}
        <TextField
          fullWidth
          margin="normal"
          label="Environment"
          value={
            environment?.name ||
            `Environment #${flagEnvironment.environment_id}`
          }
          disabled
        />


        {/* Value */}
        <TextField
          fullWidth
          margin="normal"
          label="Value"
          value={flagEnvironment.value ?? '-'}
          disabled
        />


        {/* Status */}
        <TextField
          fullWidth
          margin="normal"
          label="Status"
          value={
            flagEnvironment.is_enabled
              ? 'Enabled'
              : 'Disabled'
          }
          disabled
        />


        {/* Created */}
        <TextField
          fullWidth
          margin="normal"
          label="Created At"
          value={
            new Date(
              flagEnvironment.created_at,
            ).toLocaleString()
          }
          disabled
        />


        {/* Updated */}
        <TextField
          fullWidth
          margin="normal"
          label="Updated At"
          value={
            flagEnvironment.updated_at
              ? new Date(
                  flagEnvironment.updated_at,
                ).toLocaleString()
              : '-'
          }
          disabled
        />

      </DialogContent>


      <DialogActions>

        <Button
          onClick={onClose}
        >
          Close
        </Button>

      </DialogActions>

    </Dialog>
  )
}


export default ViewFlagEnvironmentModal

