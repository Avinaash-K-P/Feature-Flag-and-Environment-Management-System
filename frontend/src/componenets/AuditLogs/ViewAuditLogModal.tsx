import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'

import type { AuditLog } from '../../types/auditLog'

interface ViewAuditLogModalProps {
  open: boolean
  auditLog: AuditLog | null
  onClose: () => void
}

function ViewAuditLogModal({
  open,
  auditLog,
  onClose,
}: ViewAuditLogModalProps) {
  if (!auditLog) {
    return null
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        View Audit Log
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="ID"
          value={auditLog.id}
          disabled
        />

        <TextField
          fullWidth
          margin="normal"
          label="User ID"
          value={auditLog.user_id}
          disabled
        />

        <TextField
          fullWidth
          margin="normal"
          label="Action"
          value={auditLog.action}
          disabled
        />

        <TextField
          fullWidth
          margin="normal"
          label="Entity Type"
          value={auditLog.entity_type}
          disabled
        />

        <TextField
          fullWidth
          margin="normal"
          label="Entity ID"
          value={auditLog.entity_id}
          disabled
        />

        <TextField
          fullWidth
          margin="normal"
          label="Old Value"
          value={
            auditLog.old_value
              ? JSON.stringify(
                  auditLog.old_value,
                  null,
                  2,
                )
              : 'No previous value'
          }
          multiline
          minRows={4}
          disabled
        />

        <TextField
          fullWidth
          margin="normal"
          label="New Value"
          value={
            auditLog.new_value
              ? JSON.stringify(
                  auditLog.new_value,
                  null,
                  2,
                )
              : 'No new value'
          }
          multiline
          minRows={4}
          disabled
        />

        <TextField
          fullWidth
          margin="normal"
          label="Created At"
          value={auditLog.created_at}
          disabled
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewAuditLogModal