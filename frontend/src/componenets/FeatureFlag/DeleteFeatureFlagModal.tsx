import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'

interface DeleteFeatureFlagModalProps {
  open: boolean
  featureName: string
  deleting: boolean
  onClose: () => void
  onDelete: () => void
}

function DeleteFeatureFlagModal({
  open,
  featureName,
  deleting,
  onClose,
  onDelete,
}: DeleteFeatureFlagModalProps) {
  return (
    <Dialog
      open={open}
      onClose={deleting ? undefined : onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Delete Feature Flag</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete the feature flag{' '}
          <strong>{featureName}</strong>?
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={deleting}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onDelete}
          disabled={deleting}
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteFeatureFlagModal

