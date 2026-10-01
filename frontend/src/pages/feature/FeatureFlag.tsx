import { useEffect, useState } from 'react' 

import CreateFeatureFlagModal from '../../componenets/FeatureFlag/CreateFeatureFlagModal'
import ViewFeatureFlagModal from '../../componenets/FeatureFlag/ViewFeatureFlagModal'
import EditFeatureFlagModal from '../../componenets/FeatureFlag/EditFeatureFlagModal'
import DeleteFeatureFlagModal from '../../componenets/FeatureFlag/DeleteFeatureFlagModal'

import {
  createFeatureFlag,
  getFeatureFlags,
  getFeatureFlag,
  updateFeatureFlag,
  deleteFeatureFlag,
} from '../../services/featureFlagService'

import '../../styles/featureFlag.css'

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

interface CreateFeatureFlagForm {
  name: string
  description: string
  flag_type: string
  default_value: string
  is_active: boolean
}

interface UpdateFeatureFlagForm {
  name: string
  description: string
  flag_type: string
  default_value: string
  is_active: boolean
}

function FeatureFlag() {

  // --------------------------------
  // Feature Flag State
  // --------------------------------

  const [featureFlags, setFeatureFlags] =
    useState<FeatureFlag[]>([])

  const [selectedFeature, setSelectedFeature] =
    useState<FeatureFlag | null>(null)


  // --------------------------------
  // Dialog State
  // --------------------------------

  const [createOpen, setCreateOpen] =
    useState(false)

  const [editOpen, setEditOpen] =
    useState(false)

  const [viewOpen, setViewOpen] =
    useState(false)

  const [deleteOpen, setDeleteOpen] =
    useState(false)


  // --------------------------------
  // Create Form
  // --------------------------------

  const [createForm, setCreateForm] =
    useState<CreateFeatureFlagForm>({
      name: '',
      description: '',
      flag_type: '',
      default_value: '',
      is_active: true,
    })


  // --------------------------------
  // Edit Form
  // --------------------------------

  const [editForm, setEditForm] =
    useState<UpdateFeatureFlagForm>({
      name: '',
      description: '',
      flag_type: '',
      default_value: '',
      is_active: true,
    })


  // --------------------------------
  // Loading / Error State
  // --------------------------------

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [deleting, setDeleting] =
    useState(false)

  const [error, setError] =
    useState<string | null>(null)


  // --------------------------------
  // Load Feature Flags
  // --------------------------------

  const loadFeatureFlags = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getFeatureFlags()

      setFeatureFlags(data)
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        'Failed to load feature flags.'

      setError(message)
    } finally {
      setLoading(false)
    }
  }


  // --------------------------------
  // Create Dialog
  // --------------------------------

  const handleCreateOpen = () => {
    setCreateForm({
      name: '',
      description: '',
      flag_type: '',
      default_value: '',
      is_active: true,
    })

    setCreateOpen(true)
  }

  const handleCreateClose = () => {
    if (saving) {
      return
    }

    setCreateOpen(false)
  }


  // --------------------------------
  // Create Form Change
  // --------------------------------

  const handleCreateChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } =
      event.target

    const checked =
      type === 'checkbox'
        ? (event.target as HTMLInputElement).checked
        : undefined

    setCreateForm((previous) => ({
      ...previous,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }))
  }


  // --------------------------------
  // Create Feature Flag
  // --------------------------------

  const handleCreate = async () => {

    if (!createForm.name.trim()) {
      setError('Feature name is required')
      return
    }

    if (!createForm.description.trim()) {
      setError('Feature description is required')
      return
    }

    if (!createForm.flag_type.trim()) {
      setError('Flag type is required')
      return
    }

    if (!createForm.default_value.trim()) {
      setError('Default value is required')
      return
    }

    try {
      setSaving(true)
      setError(null)

    await createFeatureFlag({
    name: createForm.name.trim(),
    description: createForm.description.trim(),
    flag_type: createForm.flag_type.trim(),
    default_value: createForm.default_value.trim(),
    is_active: createForm.is_active,
    })

      setCreateOpen(false)

      await loadFeatureFlags()

    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        'Failed to create feature flag.'

      setError(message)
    } finally {
      setSaving(false)
    }
  }


  // --------------------------------
  // View Feature Flag
  // --------------------------------

  const handleView = async (
    featureId: number,
  ) => {
    try {
      setLoading(true)
      setError(null)

      const data =
        await getFeatureFlag(featureId)

      setSelectedFeature(data)

      setViewOpen(true)

    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        'Failed to load feature flag.'

      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleViewClose = () => {
    setViewOpen(false)
    setSelectedFeature(null)
  }


  // --------------------------------
  // Edit Dialog
  // --------------------------------

  const handleEditOpen = (
    feature: FeatureFlag,
  ) => {
    setSelectedFeature(feature)

    setEditForm({
      name: feature.name,
      description: feature.description || '',
      flag_type: feature.flag_type,
      default_value: feature.default_value,
      is_active: feature.is_active,
    })

    setEditOpen(true)
  }

  const handleEditClose = () => {
    if (saving) {
      return
    }

    setEditOpen(false)
  }


  // --------------------------------
  // Edit Form Change
  // --------------------------------

  const handleEditChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } =
      event.target

    const checked =
      type === 'checkbox'
        ? (event.target as HTMLInputElement).checked
        : undefined

    setEditForm((previous) => ({
      ...previous,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }))
  }


  // --------------------------------
  // Update Feature Flag
  // --------------------------------

  const handleEdit = async () => {

    if (!selectedFeature) {
      return
    }

    try {
      setSaving(true)
      setError(null)

      await updateFeatureFlag(
        selectedFeature.created_by,
        {
          name: editForm.name.trim(),
          description:
            editForm.description.trim(),
          flag_type:
            editForm.flag_type.trim(),
          default_value:
            editForm.default_value.trim(),
          is_active: editForm.is_active,
        },
      )

      setEditOpen(false)

      await loadFeatureFlags()

    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        'Failed to update feature flag.'

      setError(message)
    } finally {
      setSaving(false)
    }
  }


  // --------------------------------
  // Delete Dialog
  // --------------------------------

  const handleDeleteOpen = (
    feature: FeatureFlag,
  ) => {
    setSelectedFeature(feature)
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    if (deleting) {
      return
    }

    setDeleteOpen(false)
    setSelectedFeature(null)
  }


  // --------------------------------
  // Delete Feature Flag
  // --------------------------------

  const handleDelete = async () => {

    if (!selectedFeature) {
      return
    }

    try {
      setDeleting(true)
      setError(null)

      await deleteFeatureFlag(
        selectedFeature.created_by,
      )

      setDeleteOpen(false)
      setSelectedFeature(null)

      await loadFeatureFlags()

    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        'Failed to delete feature flag.'

      setError(message)
    } finally {
      setDeleting(false)
    }
  }


  // --------------------------------
  // Initial Load
  // --------------------------------

  useEffect(() => {
    loadFeatureFlags()
  }, [])

return (
  <div className="feature-flag-page">

    {/* Page Header */}
    <div className="feature-flag-header">
      <div>
        <h1>Feature Flags</h1>
        <p>
          Create, manage and monitor application feature flags.
        </p>
      </div>

      <button
        className="feature-create-button"
        onClick={handleCreateOpen}
      >
        + Create Feature
      </button>
    </div>

    {/* Error Message */}
    {error && (
      <div className="feature-error">
        {error}
      </div>
    )}

    {/* Feature Flag Table */}
    <div className="feature-table-card">

      <div className="feature-table-header">
        <h2>Feature Flag List</h2>
        <span>
          {featureFlags.length} feature
          {featureFlags.length !== 1 ? 's' : ''}
        </span>
      </div>

      {loading ? (
        <div className="feature-loading">
          Loading feature flags...
        </div>
      ) : featureFlags.length === 0 ? (
        <div className="feature-empty">
          <h3>No Feature Flags Found</h3>
          <p>
            Create your first feature flag to get started.
          </p>
        </div>
      ) : (
        <div className="feature-table-wrapper">
          <table className="feature-table">

            <thead>
              <tr>
                <th>Feature Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {featureFlags.map((feature) => (
                <tr key={feature.id}>

                  <td>
                    <div className="feature-name">
                      {feature.name}
                    </div>

                    <div className="feature-description">
                      {feature.description || 'No description'}
                    </div>
                  </td>

                  <td>
                    <span className="feature-type">
                      {feature.flag_type}
                    </span>
                  </td>

                  <td>
                    <span className="feature-default-value">
                      {feature.default_value}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        feature.is_active
                          ? 'feature-status active'
                          : 'feature-status inactive'
                      }
                    >
                      {feature.is_active
                        ? 'Active'
                        : 'Inactive'}
                    </span>
                  </td>

                  <td>
                    {new Date(
                      feature.created_at,
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <div className="feature-actions">

                      <button
                        className="feature-action view"
                        onClick={() =>
                          handleView(feature.id)
                        }
                      >
                        View
                      </button>

                      <button
                        className="feature-action edit"
                        onClick={() =>
                          handleEditOpen(feature)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="feature-action delete"
                        onClick={() =>
                          handleDeleteOpen(feature)
                        }
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>

    {/* Create Feature Flag Modal */}
    <CreateFeatureFlagModal
      open={createOpen}
      formData={createForm}
      saving={saving}
      onClose={handleCreateClose}
      onChange={handleCreateChange}
      onCreate={handleCreate}
    />

    {/* View Feature Flag Modal */}
    <ViewFeatureFlagModal
      open={viewOpen}
      feature={selectedFeature}
      onClose={handleViewClose}
    />

    {/* Edit Feature Flag Modal */}
    <EditFeatureFlagModal
      open={editOpen}
      formData={editForm}
      saving={saving}
      onClose={handleEditClose}
      onChange={handleEditChange}
      onUpdate={handleEdit}
    />

    {/* Delete Feature Flag Modal */}
    <DeleteFeatureFlagModal
      open={deleteOpen}
      featureName={selectedFeature?.name || ''}
      deleting={deleting}
      onClose={handleDeleteClose}
      onDelete={handleDelete}
    />

  </div>
)



}

export default FeatureFlag

