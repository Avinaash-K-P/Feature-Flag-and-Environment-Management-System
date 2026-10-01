import {
  useEffect,
  useState,
  type ChangeEvent,
} from 'react'

import {
  getUsers,
  updateUserStatus,
} from '../../services/userService'

import type {
  User,
} from '../../types/user'

import ViewUserModal from '../../componenets/ManageUsers/ViewUserModal'

import EditUserStatusModal from '../../componenets/ManageUsers/EditUserStatusModal'

import '../../styles/manageUsers.css'


interface EditUserStatusForm {
  is_active: boolean
}


function ManageUsers() {
  const [users, setUsers] =
    useState<User[]>([])

  const [selectedUser, setSelectedUser] =
    useState<User | null>(null)

  const [viewOpen, setViewOpen] =
    useState(false)

  const [editOpen, setEditOpen] =
    useState(false)

  const [editForm, setEditForm] =
    useState<EditUserStatusForm>({
      is_active: true,
    })

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [error, setError] =
    useState('')


  /* =========================================
     Load Users
     ========================================= */

  const loadUsers = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getUsers()

      setUsers(data)
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          'Failed to load users.',
      )
    } finally {
      setLoading(false)
    }
  }


  /* =========================================
     View User
     ========================================= */

  const handleView = (
    user: User,
  ) => {
    setSelectedUser(user)
    setViewOpen(true)
  }


  const handleViewClose = () => {
    setViewOpen(false)
    setSelectedUser(null)
  }


  /* =========================================
     Edit User
     ========================================= */

  const handleEditOpen = (
    user: User,
  ) => {
    setSelectedUser(user)

    setEditForm({
      is_active: user.is_active,
    })

    setEditOpen(true)
  }


  const handleEditClose = () => {
    setEditOpen(false)
    setSelectedUser(null)
  }


  /* =========================================
     Edit Status Change
     ========================================= */

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


  /* =========================================
     Update User Status
     ========================================= */

  const handleUpdate = async () => {
    if (!selectedUser) {
      return
    }

    try {
      setSaving(true)
      setError('')

      await updateUserStatus(
        selectedUser.id,
        {
          is_active:
            editForm.is_active,
        },
      )

      setEditOpen(false)
      setSelectedUser(null)

      await loadUsers()
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          'Failed to update user status.',
      )
    } finally {
      setSaving(false)
    }
  }


  /* =========================================
     Initial Load
     ========================================= */

  useEffect(() => {
    loadUsers()
  }, [])


  /* =========================================
     Page
     ========================================= */

  return (
    <div className="manage-users-page">

      {/* Header */}
      <div className="manage-users-header">
        <div>
          <h1>
            Manage Users
          </h1>

          <p>
            View and manage user account
            status and information.
          </p>
        </div>
      </div>


      {/* Error */}
      {error && (
        <div className="manage-users-error">
          {error}
        </div>
      )}


      {/* Loading */}
      {loading ? (
        <div className="manage-users-loading">
          Loading users...
        </div>

      ) : users.length === 0 ? (

        /* Empty */
        <div className="manage-users-empty">
          No users found.
        </div>

      ) : (

        /* Table */
        <div className="manage-users-table-container">

          <div className="manage-users-table-wrapper">

            <table className="manage-users-table">

              <thead>
                <tr>
                  <th>
                    ID
                  </th>

                  <th>
                    Username
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Role ID
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map(
                  (user) => (
                    <tr
                      key={user.id}
                    >

                      <td>
                        {user.id}
                      </td>

                      <td>
                        {user.username}
                      </td>

                      <td>
                        {user.email}
                      </td>

                      <td>
                        {user.role_id}
                      </td>

                      <td>
                        <span
                          className={`manage-users-status ${
                            user.is_active
                              ? 'active'
                              : 'inactive'
                          }`}
                        >
                          {user.is_active
                            ? 'Active'
                            : 'Inactive'}
                        </span>
                      </td>

                      <td>
                        <div className="manage-users-actions">

                          <button
                            className="manage-users-view-button"
                            onClick={() =>
                              handleView(
                                user,
                              )
                            }
                          >
                            View
                          </button>

                          <button
                            className="manage-users-edit-button"
                            onClick={() =>
                              handleEditOpen(
                                user,
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


      {/* View Modal */}
      <ViewUserModal
        open={viewOpen}
        user={selectedUser}
        roleName={
          selectedUser
            ? String(
                selectedUser.role_id,
              )
            : ''
        }
        onClose={handleViewClose}
      />


      {/* Edit Modal */}
      <EditUserStatusModal
        open={editOpen}
        user={selectedUser}
        roleName={
          selectedUser
            ? String(
                selectedUser.role_id,
              )
            : ''
        }
        formData={editForm}
        saving={saving}
        onClose={handleEditClose}
        onChange={handleEditChange}
        onUpdate={handleUpdate}
      />

    </div>
  )
}


export default ManageUsers
