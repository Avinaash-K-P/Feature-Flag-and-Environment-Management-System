import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material'

interface FeatureFlag {
  id: number
  name: string
  description: string | null
  flag_type: string
  default_value: string
  is_active: boolean
  created_by: number
  created_at: string
  updated_at: string | null
}

interface ViewFeatureFlagModalProps {
  open: boolean
  feature: FeatureFlag | null
  onClose: () => void
}

function ViewFeatureFlagModal({
  open,
  feature,
  onClose,
}: ViewFeatureFlagModalProps) {
  if (!feature) {
    return null
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Feature Flag Details</DialogTitle>

      <DialogContent>
        <Typography variant="subtitle2" color="text.secondary">
          Feature Name
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {feature.name}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" color="text.secondary">
          Description
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {feature.description || 'No description provided'}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" color="text.secondary">
          Flag Type
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {feature.flag_type}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" color="text.secondary">
          Default Value
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {feature.default_value}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" color="text.secondary">
          Status
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {feature.is_active ? 'Active' : 'Inactive'}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" color="text.secondary">
          Created By
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          User ID: {feature.created_by}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" color="text.secondary">
          Created At
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {new Date(feature.created_at).toLocaleString()}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" color="text.secondary">
          Updated At
        </Typography>

        <Typography variant="body1">
          {feature.updated_at
            ? new Date(feature.updated_at).toLocaleString()
            : 'Not updated'}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewFeatureFlagModal
