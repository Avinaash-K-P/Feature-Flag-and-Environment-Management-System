import { useEffect, useState } from 'react'

import {
  getEnvironments,
  updateEnvironment,
} from '../../services/environmentService'
import '../../styles/environment.css'

import type {
  Environment,
} from '../../types/environment' 

import EditEnvironmentModal from '../../componenets/Environment/EditEnvironmentModal'

interface EditEnvironmentForm {
  is_active: boolean
}

function Environments() {
  const [environments, setEnvironments] = useState<Environment[]>([])

  const [selectedEnvironment, setSelectedEnvironment] =
    useState<Environment | null>(null)

  const [editOpen, setEditOpen] = useState(false)

  const [editForm, setEditForm] =
    useState<EditEnvironmentForm>({
      is_active: true,
    })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [error, setError] = useState<string | null>(null)

  // Load all environments
  const loadEnvironments = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getEnvironments()

      setEnvironments(data)
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        'Failed to load environments.'

      setError(message)
    } finally {
      setLoading(false)
    }
  }

  // Open edit modal
  const handleEditOpen = (
    environment: Environment,
  ) => {
    setSelectedEnvironment(environment)

    setEditForm({
      is_active: environment.is_active,
    })

    setEditOpen(true)
  }

  // Close edit modal
  const handleEditClose = () => {
    if (saving) return

    setEditOpen(false)
    setSelectedEnvironment(null)
  }

  // Handle status change
  const handleEditChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = event.target

    setEditForm({
      is_active: checked,
    })
  }

  // Update environment
  const handleEdit = async () => {
    if (!selectedEnvironment) return

    try {
      setSaving(true)
      setError(null)

      await updateEnvironment(
        selectedEnvironment.id,
        {
          is_active: editForm.is_active,
        },
      )

      setEditOpen(false)
      setSelectedEnvironment(null)

      await loadEnvironments()
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        'Failed to update environment.'

      setError(message)
    } finally {
      setSaving(false)
    }
  }

  // Load environments when page opens
  useEffect(() => {
    loadEnvironments()
  }, [])


return (
  <div className="environment-page">

    {/* Page Header */}
    <div className="environment-header">
      <div>
        <h1>Environments</h1>
        <p>
          Manage the status of application environments.
        </p>
      </div>
    </div>

    {/* Error Message */}
    {error && (
      <div className="environment-error">
        {error}
      </div>
    )}

    {/* Environment Table */}
    <div className="environment-table-container">

      {loading ? (
        <div className="environment-loading">
          Loading environments...
        </div>
      ) : environments.length === 0 ? (
        <div className="environment-empty">
          No environments found.
        </div>
      ) : (
        <table className="environment-table">

          <thead>
            <tr>
              <th>Environment Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {environments.map((environment) => (
              <tr key={environment.id}>

                {/* Environment Name */}
                <td className="environment-name">
                  {environment.name}
                </td>

                {/* Description */}
                <td>
                  {environment.description || '-'}
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`environment-status ${
                      environment.is_active
                        ? 'active'
                        : 'inactive'
                    }`}
                  >
                    {environment.is_active
                      ? 'Active'
                      : 'Inactive'}
                  </span>
                </td>

                {/* Created Date */}
                <td>
                  {new Date(
                    environment.created_at,
                  ).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td>
                  <button
                    className="environment-edit-button"
                    onClick={() =>
                      handleEditOpen(environment)
                    }
                  >
                    Edit
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}

    </div>

    {/* Edit Environment Modal */}
    {selectedEnvironment && (
      <EditEnvironmentModal
        open={editOpen}
        environmentName={
          selectedEnvironment.name
        }
        formData={editForm}
        saving={saving}
        onClose={handleEditClose}
        onChange={handleEditChange}
        onUpdate={handleEdit}
      />
    )}

  </div>
)

}

export default Environments

