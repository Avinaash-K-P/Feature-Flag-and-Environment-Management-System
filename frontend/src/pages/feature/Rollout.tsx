import { useEffect, useState } from 'react'

import {
  createRollout,
  getRollouts,
  updateRollout,
} from '../../services/rolloutService'

import {
  getFlagEnvironments,
} from '../../services/flagEnvironmentService'

import {
  getFeatureFlags,
} from '../../services/featureFlagService'

import {
  getEnvironments,
} from '../../services/environmentService'

import type {
  FeatureRollout,
} from '../../types/rollout'

import type {
  FeatureFlagEnvironment,
} from '../../types/flagEnvironment'

import type {
  FeatureFlag,
} from '../../types/featureflag'

import type {
  Environment as EnvironmentType,
} from '../../types/environment'

import CreateRolloutModal from '../../componenets/Rollout/CreateRolloutModal'
import ViewRolloutModal from '../../componenets/Rollout/ViewRolloutModal'
import EditRolloutModal from '../../componenets/Rollout/EditRolloutModal'

import '../../styles/rollout.css'


interface CreateRolloutForm {
  feature_flag_environment_id: number | ''
  rollout_percentage: number | ''
  is_active: boolean
}


interface EditRolloutForm {
  rollout_percentage: number | ''
  is_active: boolean
}


function Rollout() {

  // -----------------------------
  // Main data
  // -----------------------------

  const [rollouts, setRollouts] = useState<
    FeatureRollout[]
  >([])

  const [flagEnvironments, setFlagEnvironments] =
    useState<FeatureFlagEnvironment[]>([])

  const [featureFlags, setFeatureFlags] =
    useState<FeatureFlag[]>([])

  const [environments, setEnvironments] =
    useState<EnvironmentType[]>([])


  // -----------------------------
  // Selected rollout
  // -----------------------------

  const [selectedRollout, setSelectedRollout] =
    useState<FeatureRollout | null>(null)


  // -----------------------------
  // Create modal
  // -----------------------------

  const [createOpen, setCreateOpen] =
    useState(false)

  const [createForm, setCreateForm] =
    useState<CreateRolloutForm>({
      feature_flag_environment_id: '',
      rollout_percentage: '',
      is_active: true,
    })


  // -----------------------------
  // View modal
  // -----------------------------

  const [viewOpen, setViewOpen] =
    useState(false)


  // -----------------------------
  // Edit modal
  // -----------------------------

  const [editOpen, setEditOpen] =
    useState(false)

  const [editForm, setEditForm] =
    useState<EditRolloutForm>({
      rollout_percentage: '',
      is_active: true,
    })


  // -----------------------------
  // UI states
  // -----------------------------

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [error, setError] =
    useState('')


  // -----------------------------
  // Load all required data
  // -----------------------------

  const loadData = async () => {

    try {

      setLoading(true)
      setError('')

      const [
        rolloutData,
        flagEnvironmentData,
        featureFlagData,
        environmentData,
      ] = await Promise.all([
        getRollouts(),
        getFlagEnvironments(),
        getFeatureFlags(),
        getEnvironments(),
      ])

      setRollouts(rolloutData)
      setFlagEnvironments(flagEnvironmentData)
      setFeatureFlags(featureFlagData)
      setEnvironments(environmentData)

    } catch (err: any) {

      setError(
        err?.response?.data?.detail ||
        'Failed to load rollout data.',
      )

    } finally {

      setLoading(false)

    }
  }


  // -----------------------------
  // Get Feature Flag Environment
  // name
  // -----------------------------

  const getFeatureFlagEnvironmentName = (
    id: number,
  ) => {

    const flagEnvironment =
      flagEnvironments.find(
        (item) => item.id === id,
      )

    if (!flagEnvironment) {
      return `Flag Environment #${id}`
    }


    const featureFlag =
      featureFlags.find(
        (flag) =>
          flag.id ===
          flagEnvironment.feature_flag_id,
      )


    const environment =
      environments.find(
        (item) =>
          item.id ===
          flagEnvironment.environment_id,
      )


    const featureFlagName =
      featureFlag?.name ||
      `Feature Flag #${flagEnvironment.feature_flag_id}`


    const environmentName =
      environment?.name ||
      `Environment #${flagEnvironment.environment_id}`


    return `${featureFlagName} - ${environmentName}`
  }


  // -----------------------------
  // Create handlers
  // -----------------------------

  const handleCreateOpen = () => {

    setError('')

    setCreateForm({
      feature_flag_environment_id: '',
      rollout_percentage: '',
      is_active: true,
    })

    setCreateOpen(true)
  }


  const handleCreateClose = () => {
    setCreateOpen(false)
  }


  const handleCreateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {

    const {
      name,
      value,
      type,
      checked,
    } = event.target


    setCreateForm((previous) => ({
      ...previous,

      [name]:
        type === 'checkbox'
          ? checked
          : name === 'rollout_percentage'
            ? value === ''
              ? ''
              : Number(value)
            : value,
    }))
  }


  const handleCreateFlagEnvironmentChange = (
    event: any,
  ) => {

    setCreateForm((previous) => ({
      ...previous,

      feature_flag_environment_id:
        event.target.value === ''
          ? ''
          : Number(event.target.value),
    }))
  }


  const handleCreate = async () => {

    if (
      createForm.feature_flag_environment_id === '' ||
      createForm.rollout_percentage === ''
    ) {

      setError(
        'Please select a flag environment and enter a rollout percentage.',
      )

      return
    }


    if (
      createForm.rollout_percentage < 0 ||
      createForm.rollout_percentage > 100
    ) {

      setError(
        'Rollout percentage must be between 0 and 100.',
      )

      return
    }


    try {

      setSaving(true)
      setError('')

      await createRollout({
        feature_flag_environment_id:
          Number(
            createForm.feature_flag_environment_id,
          ),

        rollout_percentage:
          Number(
            createForm.rollout_percentage,
          ),

        is_active:
          createForm.is_active,
      })


      setCreateOpen(false)

      await loadData()

    } catch (err: any) {

      setError(
        err?.response?.data?.detail ||
        'Failed to create rollout.',
      )

    } finally {

      setSaving(false)

    }
  }


  // -----------------------------
  // View handlers
  // -----------------------------

  const handleView = (
    rollout: FeatureRollout,
  ) => {

    setSelectedRollout(rollout)
    setViewOpen(true)
  }


  const handleViewClose = () => {

    setViewOpen(false)
    setSelectedRollout(null)

  }


  // -----------------------------
  // Edit handlers
  // -----------------------------

  const handleEditOpen = (
    rollout: FeatureRollout,
  ) => {

    setSelectedRollout(rollout)

    setEditForm({
      rollout_percentage:
        rollout.rollout_percentage,

      is_active:
        rollout.is_active,
    })

    setEditOpen(true)
  }


  const handleEditClose = () => {

    setEditOpen(false)
    setSelectedRollout(null)

  }


  const handleEditChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {

    const {
      name,
      value,
      type,
      checked,
    } = event.target


    setEditForm((previous) => ({
      ...previous,

      [name]:
        type === 'checkbox'
          ? checked
          : name === 'rollout_percentage'
            ? value === ''
              ? ''
              : Number(value)
            : value,
    }))
  }


  const handleEdit = async () => {

    if (!selectedRollout) {
      return
    }


    if (
      editForm.rollout_percentage === ''
    ) {

      setError(
        'Please enter a rollout percentage.',
      )

      return
    }


    if (
      editForm.rollout_percentage < 0 ||
      editForm.rollout_percentage > 100
    ) {

      setError(
        'Rollout percentage must be between 0 and 100.',
      )

      return
    }


    try {

      setSaving(true)
      setError('')

      await updateRollout(
        selectedRollout.id,
        {
          rollout_percentage:
            Number(
              editForm.rollout_percentage,
            ),

          is_active:
            editForm.is_active,
        },
      )


      setEditOpen(false)

      setSelectedRollout(null)

      await loadData()

    } catch (err: any) {

      setError(
        err?.response?.data?.detail ||
        'Failed to update rollout.',
      )

    } finally {

      setSaving(false)

    }
  }


  // -----------------------------
  // Initial load
  // -----------------------------

  useEffect(() => {
    loadData()
  }, [])


  // -----------------------------
  // JSX
  // -----------------------------

  return (
    <div className="rollout-page">

      <div className="rollout-header">

        <div>
          <h1>Feature Rollouts</h1>

          <p>
            Manage feature rollout percentages
            across environments.
          </p>
        </div>


        <button
          className="rollout-create-button"
          onClick={handleCreateOpen}
        >
          + Create Rollout
        </button>

      </div>


      {error && (
        <div className="rollout-error">
          {error}
        </div>
      )}


      <div className="rollout-table-container">

        {loading ? (

          <div className="rollout-loading">
            Loading rollouts...
          </div>

        ) : rollouts.length === 0 ? (

          <div className="rollout-empty">
            No feature rollouts found.
          </div>

        ) : (

          <div className="rollout-table-wrapper">

            <table className="rollout-table">

              <thead>
                <tr>

                  <th>
                    Feature Flag
                  </th>

                  <th>
                    Environment
                  </th>

                  <th>
                    Rollout
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Created
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>
              </thead>


              <tbody>

                {rollouts.map(
                  (rollout) => {

                    const flagEnvironment =
                      flagEnvironments.find(
                        (item) =>
                          item.id ===
                          rollout.feature_flag_environment_id,
                      )


                    const featureFlag =
                      featureFlags.find(
                        (flag) =>
                          flag.id ===
                          flagEnvironment?.feature_flag_id,
                      )


                    const environment =
                      environments.find(
                        (item) =>
                          item.id ===
                          flagEnvironment?.environment_id,
                      )


                    return (
                      <tr key={rollout.id}>

                        <td>
                          {featureFlag?.name ||
                            `Feature Flag #${
                              flagEnvironment?.feature_flag_id ||
                              rollout.feature_flag_environment_id
                            }`}
                        </td>


                        <td>
                          {environment?.name ||
                            `Environment #${
                              flagEnvironment?.environment_id ||
                              ''
                            }`}
                        </td>


                        <td>
                          <span className="rollout-percentage">
                            {rollout.rollout_percentage}%
                          </span>
                        </td>


                        <td>

                          <span
                            className={`rollout-status ${
                              rollout.is_active
                                ? 'active'
                                : 'inactive'
                            }`}
                          >
                            {rollout.is_active
                              ? 'Active'
                              : 'Inactive'}
                          </span>

                        </td>


                        <td>
                          {new Date(
                            rollout.created_at,
                          ).toLocaleDateString()}
                        </td>


                        <td>

                          <div className="rollout-actions">

                            <button
                              className="rollout-view-button"
                              onClick={() =>
                                handleView(rollout)
                              }
                            >
                              View
                            </button>


                            <button
                              className="rollout-edit-button"
                              onClick={() =>
                                handleEditOpen(
                                  rollout,
                                )
                              }
                            >
                              Edit
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  },
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* Create Modal */}

      <CreateRolloutModal
        open={createOpen}
        formData={createForm}
        flagEnvironments={flagEnvironments}
        getFeatureFlagEnvironmentName={
          getFeatureFlagEnvironmentName
        }
        saving={saving}
        onClose={handleCreateClose}
        onChange={handleCreateChange}
        onFlagEnvironmentChange={
          handleCreateFlagEnvironmentChange
        }
        onCreate={handleCreate}
      />


      {/* View Modal */}

      <ViewRolloutModal
        open={viewOpen}
        rollout={selectedRollout}
        featureFlagEnvironmentName={
          selectedRollout
            ? getFeatureFlagEnvironmentName(
                selectedRollout.feature_flag_environment_id,
              )
            : ''
        }
        onClose={handleViewClose}
      />


      {/* Edit Modal */}

      <EditRolloutModal
        open={editOpen}
        rollout={selectedRollout}
        featureFlagEnvironmentName={
          selectedRollout
            ? getFeatureFlagEnvironmentName(
                selectedRollout.feature_flag_environment_id,
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


export default Rollout

