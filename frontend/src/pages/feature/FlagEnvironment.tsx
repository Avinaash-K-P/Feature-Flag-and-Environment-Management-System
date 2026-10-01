import { useEffect, useState } from 'react'
import CreateFlagEnvironmentModal from '../../componenets/FlagEnvironment/CreateFlagEnvironmentModal'
import ViewFlagEnvironmentModal from '../../componenets/FlagEnvironment/ViewFlagEnvironmentModal'
import EditFlagEnvironmentModal from '../../componenets/FlagEnvironment/EditFlagEnvironmentModal'

import '../../styles/flagEnvironment.css'

import {
  createFlagEnvironment,
  getFlagEnvironments,
  updateFlagEnvironment,
} from '../../services/flagEnvironmentService'

import {
  getFeatureFlags,
} from '../../services/featureFlagService'

import {
  getEnvironments,
} from '../../services/environmentService'

import type {
  FeatureFlagEnvironment,
} from '../../types/flagEnvironment'

import type {
  FeatureFlag,
} from '../../types/featureflag'

import type {
  Environment,
} from '../../types/environment'


interface CreateFlagEnvironmentForm {
  feature_flag_id: number | ''
  environment_id: number | ''
  value: string
  is_enabled: boolean
}


interface EditFlagEnvironmentForm {
  value: string
  is_enabled: boolean
}


function FlagEnvironment() {

  // =========================================
  // Data States
  // =========================================

  const [flagEnvironments, setFlagEnvironments] =
    useState<FeatureFlagEnvironment[]>([])

  const [featureFlags, setFeatureFlags] =
    useState<FeatureFlag[]>([])

  const [environments, setEnvironments] =
    useState<Environment[]>([])


  // =========================================
  // Selected Record
  // =========================================

  const [
    selectedFlagEnvironment,
    setSelectedFlagEnvironment,
  ] = useState<FeatureFlagEnvironment | null>(null)


  // =========================================
  // Create Modal
  // =========================================

  const [createOpen, setCreateOpen] =
    useState(false)

  const [createForm, setCreateForm] =
    useState<CreateFlagEnvironmentForm>({
      feature_flag_id: '',
      environment_id: '',
      value: '',
      is_enabled: false,
    })


  // =========================================
  // View Modal
  // =========================================

  const [viewOpen, setViewOpen] =
    useState(false)


  // =========================================
  // Edit Modal
  // =========================================

  const [editOpen, setEditOpen] =
    useState(false)

  const [editForm, setEditForm] =
    useState<EditFlagEnvironmentForm>({
      value: '',
      is_enabled: false,
    })


  // =========================================
  // Loading / Saving
  // =========================================

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)


  // =========================================
  // Error
  // =========================================

  const [error, setError] =
    useState<string | null>(null)


  // =========================================
  // Load All Data
  // =========================================

  const loadData = async () => {

    try {

      setLoading(true)
      setError(null)

      const [
        flagEnvironmentData,
        featureFlagData,
        environmentData,
      ] = await Promise.all([
        getFlagEnvironments(),
        getFeatureFlags(),
        getEnvironments(),
      ])

      setFlagEnvironments(
        flagEnvironmentData,
      )

      setFeatureFlags(
        featureFlagData,
      )

      setEnvironments(
        environmentData,
      )

    } catch (error: any) {

      const message =
        error.response?.data?.detail ||
        'Failed to load flag environments.'

      setError(message)

    } finally {

      setLoading(false)

    }
  }


  // =========================================
  // Feature Flag Name
  // =========================================

  const getFeatureFlagName = (
    id: number,
  ) => {

    const featureFlag =
      featureFlags.find(
        (flag) => flag.id === id,
      )

    return (
      featureFlag?.name ||
      `Feature Flag #${id}`
    )
  }


  // =========================================
  // Environment Name
  // =========================================

  const getEnvironmentName = (
    id: number,
  ) => {

    const environment =
      environments.find(
        (environment) =>
          environment.id === id,
      )

    return (
      environment?.name ||
      `Environment #${id}`
    )
  }


  // =========================================
  // Open Create Modal
  // =========================================

  const handleCreateOpen = () => {

    setCreateForm({
      feature_flag_id: '',
      environment_id: '',
      value: '',
      is_enabled: false,
    })

    setCreateOpen(true)
  }


  // =========================================
  // Close Create Modal
  // =========================================

  const handleCreateClose = () => {

    if (saving) return

    setCreateOpen(false)
  }


  // =========================================
  // Create Form Change
  // =========================================

  const handleCreateChange = (
    event: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >,
  ) => {

    const {
      name,
      value,
      type,
    } = event.target

    const checked =
      (event.target as HTMLInputElement).checked

    setCreateForm((previous) => ({
      ...previous,

      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }))
  }


  // =========================================
  // Feature Flag Selection
  // =========================================

  const handleFeatureFlagChange = (
    event: any,
  ) => {

    setCreateForm((previous) => ({
      ...previous,

      feature_flag_id:
        event.target.value,
    }))
  }


  // =========================================
  // Environment Selection
  // =========================================

  const handleEnvironmentChange = (
    event: any,
  ) => {

    setCreateForm((previous) => ({
      ...previous,

      environment_id:
        event.target.value,
    }))
  }


  // =========================================
  // Create Flag Environment
  // =========================================

  const handleCreate = async () => {

    if (
      createForm.feature_flag_id === '' ||
      createForm.environment_id === ''
    ) {
      return
    }

    try {

      setSaving(true)
      setError(null)

      await createFlagEnvironment({
        feature_flag_id:
          Number(createForm.feature_flag_id),

        environment_id:
          Number(createForm.environment_id),

        value:
          createForm.value || null,

        is_enabled:
          createForm.is_enabled,
      })

      setCreateOpen(false)

      await loadData()

    } catch (error: any) {

      const message =
        error.response?.data?.detail ||
        'Failed to create flag environment.'

      setError(message)

    } finally {

      setSaving(false)

    }
  }


  // =========================================
  // Open View Modal
  // =========================================

  const handleView = (
    flagEnvironment: FeatureFlagEnvironment,
  ) => {

    setSelectedFlagEnvironment(
      flagEnvironment,
    )

    setViewOpen(true)
  }


  // =========================================
  // Close View Modal
  // =========================================

  const handleViewClose = () => {

    setViewOpen(false)

    setSelectedFlagEnvironment(null)
  }


  // =========================================
  // Open Edit Modal
  // =========================================

  const handleEditOpen = (
    flagEnvironment: FeatureFlagEnvironment,
  ) => {

    setSelectedFlagEnvironment(
      flagEnvironment,
    )

    setEditForm({
      value:
        flagEnvironment.value || '',

      is_enabled:
        flagEnvironment.is_enabled,
    })

    setEditOpen(true)
  }


  // =========================================
  // Close Edit Modal
  // =========================================

  const handleEditClose = () => {

    if (saving) return

    setEditOpen(false)

    setSelectedFlagEnvironment(null)
  }


  // =========================================
  // Edit Form Change
  // =========================================

  const handleEditChange = (
    event: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >,
  ) => {

    const {
      name,
      value,
      type,
    } = event.target

    const checked =
      (event.target as HTMLInputElement).checked

    setEditForm((previous) => ({
      ...previous,

      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }))
  }


  // =========================================
  // Update Flag Environment
  // =========================================

  const handleEdit = async () => {

    if (!selectedFlagEnvironment) {
      return
    }

    try {

      setSaving(true)
      setError(null)

      await updateFlagEnvironment(
        selectedFlagEnvironment.id,
        {
          value:
            editForm.value || null,

          is_enabled:
            editForm.is_enabled,
        },
      )

      setEditOpen(false)

      setSelectedFlagEnvironment(null)

      await loadData()

    } catch (error: any) {

      const message =
        error.response?.data?.detail ||
        'Failed to update flag environment.'

      setError(message)

    } finally {

      setSaving(false)

    }
  }


  // =========================================
  // Load Data When Page Opens
  // =========================================

  useEffect(() => {
    loadData()
  }, [])


return (
  <div className="flag-environment-page">

    {/* Page Header */}
    <div className="flag-environment-header">
      <div>
        <h1>Flag Environments</h1>

        <p>
          Manage feature flag configurations across environments.
        </p>
      </div>

      <button
        className="flag-environment-create-button"
        onClick={handleCreateOpen}
      >
        + Create Flag Environment
      </button>
    </div>


    {/* Error Message */}
    {error && (
      <div className="flag-environment-error">
        {error}
      </div>
    )}


    {/* Flag Environment Table */}
    <div className="flag-environment-table-container">

      {loading ? (
        <div className="flag-environment-loading">
          Loading flag environments...
        </div>
      ) : flagEnvironments.length === 0 ? (
        <div className="flag-environment-empty">
          No flag environments found.
        </div>
      ) : (
        <table className="flag-environment-table">

          <thead>
            <tr>
              <th>Feature Flag</th>
              <th>Environment</th>
              <th>Value</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>


          <tbody>

            {flagEnvironments.map(
              (flagEnvironment) => (
                <tr
                  key={flagEnvironment.id}
                >

                  {/* Feature Flag */}
                  <td className="flag-environment-name">
                    {getFeatureFlagName(
                      flagEnvironment.feature_flag_id,
                    )}
                  </td>


                  {/* Environment */}
                  <td className="flag-environment-name">
                    {getEnvironmentName(
                      flagEnvironment.environment_id,
                    )}
                  </td>


                  {/* Value */}
                  <td>
                    {flagEnvironment.value || '-'}
                  </td>


                  {/* Status */}
                  <td>
                    <span
                      className={`flag-environment-status ${
                        flagEnvironment.is_enabled
                          ? 'enabled'
                          : 'disabled'
                      }`}
                    >
                      {flagEnvironment.is_enabled
                        ? 'Enabled'
                        : 'Disabled'}
                    </span>
                  </td>


                  {/* Created */}
                  <td>
                    {new Date(
                      flagEnvironment.created_at,
                    ).toLocaleDateString()}
                  </td>


                  {/* Actions */}
                  <td>

                    <div className="flag-environment-actions">

                      <button
                        className="flag-environment-view-button"
                        onClick={() =>
                          handleView(
                            flagEnvironment,
                          )
                        }
                      >
                        View
                      </button>


                      <button
                        className="flag-environment-edit-button"
                        onClick={() =>
                          handleEditOpen(
                            flagEnvironment,
                          )
                        }
                      >
                        Edit
                      </button>

                    </div>

                  </td>

                </tr>
              ),
            )}

          </tbody>

        </table>
      )}

    </div>


    {/* Create Modal */}
    <CreateFlagEnvironmentModal
      open={createOpen}
      formData={createForm}
      featureFlags={featureFlags}
      environments={environments}
      saving={saving}
      onClose={handleCreateClose}
      onChange={handleCreateChange}
      onFeatureFlagChange={
        handleFeatureFlagChange
      }
      onEnvironmentChange={
        handleEnvironmentChange
      }
      onCreate={handleCreate}
    />


    {/* View Modal */}
    <ViewFlagEnvironmentModal
      open={viewOpen}
      flagEnvironment={
        selectedFlagEnvironment
      }
      featureFlags={featureFlags}
      environments={environments}
      onClose={handleViewClose}
    />


    {/* Edit Modal */}
    <EditFlagEnvironmentModal
      open={editOpen}
      flagEnvironment={
        selectedFlagEnvironment
      }
      featureFlagName={
        selectedFlagEnvironment
          ? getFeatureFlagName(
              selectedFlagEnvironment.feature_flag_id,
            )
          : ''
      }
      environmentName={
        selectedFlagEnvironment
          ? getEnvironmentName(
              selectedFlagEnvironment.environment_id,
            )
          : ''
      }
      formData={editForm}
      saving={saving}
      onClose={handleEditClose}
      onChange={handleEditChange}
      onUpdate={handleEdit}
    />

  </div>
)


}


export default FlagEnvironment

