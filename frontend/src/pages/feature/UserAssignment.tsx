import {
  useEffect,
  useState,
  type ChangeEvent,
} from 'react'

import {
  createUserAssignment,
  getUserAssignments,
  updateUserAssignment,
} from '../../services/userAssignmentService'

import {
  getUsers,
} from '../../services/userService'

import {
  getFeatureFlags,
} from '../../services/featureFlagService'

import {
  getEnvironments,
} from '../../services/environmentService'

import type {
  UserAssignment,
} from '../../types/userAssignment'

import type {
  User,
} from '../../types/user'

import type {
  FeatureFlag,
} from '../../types/featureflag'

import type {
  Environment as EnvironmentType,
} from '../../types/environment'

import CreateUserAssignmentModal from '../../componenets/UserAssignment/CreateUserAssignmentModal'
import ViewUserAssignmentModal from '../../componenets/UserAssignment/ViewUserAssignmentModal'
import EditUserAssignmentModal from '../../componenets/UserAssignment/EditUserAssignmentModal'

import '../../styles/userAssignment.css'


interface CreateUserAssignmentForm {
  user_id: number | ''
  feature_flag_id: number | ''
  environment_id: number | ''
  is_enabled: boolean
}


interface EditUserAssignmentForm {
  is_enabled: boolean
}


function UserAssignments() {

  const [assignments, setAssignments] =
    useState<UserAssignment[]>([])

  const [users, setUsers] =
    useState<User[]>([])

  const [featureFlags, setFeatureFlags] =
    useState<FeatureFlag[]>([])

  const [environments, setEnvironments] =
    useState<EnvironmentType[]>([])


  const [selectedAssignment, setSelectedAssignment] =
    useState<UserAssignment | null>(null)


  const [createOpen, setCreateOpen] =
    useState(false)

  const [createForm, setCreateForm] =
    useState<CreateUserAssignmentForm>({
      user_id: '',
      feature_flag_id: '',
      environment_id: '',
      is_enabled: true,
    })


  const [viewOpen, setViewOpen] =
    useState(false)


  const [editOpen, setEditOpen] =
    useState(false)

  const [editForm, setEditForm] =
    useState<EditUserAssignmentForm>({
      is_enabled: true,
    })


  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [error, setError] =
    useState('')


  /*
   * Load all required data
   */

  const loadData = async () => {

    try {

      setLoading(true)
      setError('')

      const [
        assignmentData,
        userData,
        featureFlagData,
        environmentData,
      ] = await Promise.all([
        getUserAssignments(),
        getUsers(),
        getFeatureFlags(),
        getEnvironments(),
      ])

      setAssignments(assignmentData)
      setUsers(userData)
      setFeatureFlags(featureFlagData)
      setEnvironments(environmentData)

    } catch (err: any) {

      setError(
        err?.response?.data?.detail ||
        'Failed to load user assignment data.',
      )

    } finally {

      setLoading(false)

    }
  }


  /*
   * Resolve User ID to Username
   */

  const getUsername = (id: number) => {

    const user = users.find(
      (item) => item.id === id,
    )

    return (
      user?.username ||
      `User #${id}`
    )
  }


  /*
   * Resolve Feature Flag ID to Name
   */

  const getFeatureFlagName = (id: number) => {

    const featureFlag = featureFlags.find(
      (item) => item.id === id,
    )

    return (
      featureFlag?.name ||
      `Feature Flag #${id}`
    )
  }


  /*
   * Resolve Environment ID to Name
   */

  const getEnvironmentName = (id: number) => {

    const environment = environments.find(
      (item) => item.id === id,
    )

    return (
      environment?.name ||
      `Environment #${id}`
    )
  }


  /*
   * Create
   */

  const handleCreateOpen = () => {

    setError('')

    setCreateForm({
      user_id: '',
      feature_flag_id: '',
      environment_id: '',
      is_enabled: true,
    })

    setCreateOpen(true)
  }


  const handleCreateClose = () => {
    setCreateOpen(false)
  }


  const handleCreateChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {

    const {
      name,
      checked,
    } = event.target

    setCreateForm((previous) => ({
      ...previous,
      [name]: checked,
    }))
  }


  const handleUserChange = (
    event: any,
  ) => {

    setCreateForm((previous) => ({
      ...previous,
      user_id:
        event.target.value === ''
          ? ''
          : Number(event.target.value),
    }))
  }


  const handleFeatureFlagChange = (
    event: any,
  ) => {

    setCreateForm((previous) => ({
      ...previous,
      feature_flag_id:
        event.target.value === ''
          ? ''
          : Number(event.target.value),
    }))
  }


  const handleEnvironmentChange = (
    event: any,
  ) => {

    setCreateForm((previous) => ({
      ...previous,
      environment_id:
        event.target.value === ''
          ? ''
          : Number(event.target.value),
    }))
  }


  const handleCreate = async () => {

    if (
      createForm.user_id === '' ||
      createForm.feature_flag_id === '' ||
      createForm.environment_id === ''
    ) {

      setError(
        'Please select a user, feature flag, and environment.',
      )

      return
    }


    try {

      setSaving(true)
      setError('')

      await createUserAssignment({
        user_id: Number(createForm.user_id),
        feature_flag_id:
          Number(createForm.feature_flag_id),
        environment_id:
          Number(createForm.environment_id),
        is_enabled:
          createForm.is_enabled,
      })

      setCreateOpen(false)

      await loadData()

    } catch (err: any) {

      setError(
        err?.response?.data?.detail ||
        'Failed to create user assignment.',
      )

    } finally {

      setSaving(false)

    }
  }


  /*
   * View
   */

  const handleView = (
    assignment: UserAssignment,
  ) => {

    setSelectedAssignment(assignment)
    setViewOpen(true)
  }


  const handleViewClose = () => {

    setViewOpen(false)
    setSelectedAssignment(null)
  }


  /*
   * Edit
   */

  const handleEditOpen = (
    assignment: UserAssignment,
  ) => {

    setSelectedAssignment(assignment)

    setEditForm({
      is_enabled:
        Boolean(assignment.is_enabled),
    })

    setEditOpen(true)
  }


  const handleEditClose = () => {

    setEditOpen(false)
    setSelectedAssignment(null)
  }


  const handleEditChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {

    const {
      name,
      checked,
    } = event.target

    setEditForm((previous) => ({
      ...previous,
      [name]: checked,
    }))
  }


  const handleEdit = async () => {

    if (!selectedAssignment) {
      return
    }


    try {

      setSaving(true)
      setError('')

      await updateUserAssignment(
        selectedAssignment.id,
        {
          is_enabled:
            editForm.is_enabled,
        },
      )

      setEditOpen(false)
      setSelectedAssignment(null)

      await loadData()

    } catch (err: any) {

      setError(
        err?.response?.data?.detail ||
        'Failed to update user assignment.',
      )

    } finally {

      setSaving(false)

    }
  }


  /*
   * Initial load
   */

  useEffect(() => {
    loadData()
  }, [])


  /*
   * Page
   */

  return (
    <div className="user-assignment-page">

      <div className="user-assignment-header">

        <div>
          <h1>
            User Assignments
          </h1>

          <p>
            Manage feature flag assignments
            for users across environments.
          </p>
        </div>


        <button
          className="user-assignment-create-button"
          onClick={handleCreateOpen}
        >
          + Create Assignment
        </button>

      </div>


      {error && (
        <div className="user-assignment-error">
          {error}
        </div>
      )}


      {loading ? (

        <div className="user-assignment-loading">
          Loading user assignments...
        </div>

      ) : assignments.length === 0 ? (

        <div className="user-assignment-empty">
          No user assignments found.
        </div>

      ) : (

        <div className="user-assignment-table-container">

          <div className="user-assignment-table-wrapper">

            <table className="user-assignment-table">

              <thead>
                <tr>

                  <th>
                    User
                  </th>

                  <th>
                    Feature Flag
                  </th>

                  <th>
                    Environment
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

                {assignments.map(
                  (assignment) => (
                    <tr
                      key={assignment.id}
                    >

                      <td>
                        {getUsername(
                          assignment.user_id,
                        )}
                      </td>


                      <td>
                        {getFeatureFlagName(
                          assignment.feature_flag_id,
                        )}
                      </td>


                      <td>
                        {getEnvironmentName(
                          assignment.environment_id,
                        )}
                      </td>


                      <td>

                        <span
                          className={`user-assignment-status ${
                            assignment.is_enabled
                              ? 'active'
                              : 'inactive'
                          }`}
                        >
                          {assignment.is_enabled
                            ? 'Enabled'
                            : 'Disabled'}
                        </span>

                      </td>


                      <td>
                        {new Date(
                          assignment.created_at,
                        ).toLocaleDateString()}
                      </td>


                      <td>

                        <div className="user-assignment-actions">

                          <button
                            className="user-assignment-view-button"
                            onClick={() =>
                              handleView(
                                assignment,
                              )
                            }
                          >
                            View
                          </button>


                          <button
                            className="user-assignment-edit-button"
                            onClick={() =>
                              handleEditOpen(
                                assignment,
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

          </div>

        </div>
      )}


      {/* Create Modal */}

      <CreateUserAssignmentModal
        open={createOpen}
        formData={createForm}
        users={users}
        featureFlags={featureFlags}
        environments={environments}
        saving={saving}
        onClose={handleCreateClose}
        onChange={handleCreateChange}
        onUserChange={handleUserChange}
        onFeatureFlagChange={
          handleFeatureFlagChange
        }
        onEnvironmentChange={
          handleEnvironmentChange
        }
        onCreate={handleCreate}
      />


      {/* View Modal */}

      <ViewUserAssignmentModal
        open={viewOpen}
        assignment={selectedAssignment}
        username={
          selectedAssignment
            ? getUsername(
                selectedAssignment.user_id,
              )
            : ''
        }
        featureFlagName={
          selectedAssignment
            ? getFeatureFlagName(
                selectedAssignment.feature_flag_id,
              )
            : ''
        }
        environmentName={
          selectedAssignment
            ? getEnvironmentName(
                selectedAssignment.environment_id,
              )
            : ''
        }
        onClose={handleViewClose}
      />


      {/* Edit Modal */}

      <EditUserAssignmentModal
        open={editOpen}
        assignment={selectedAssignment}
        username={
          selectedAssignment
            ? getUsername(
                selectedAssignment.user_id,
              )
            : ''
        }
        featureFlagName={
          selectedAssignment
            ? getFeatureFlagName(
                selectedAssignment.feature_flag_id,
              )
            : ''
        }
        environmentName={
          selectedAssignment
            ? getEnvironmentName(
                selectedAssignment.environment_id,
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

export default UserAssignments
