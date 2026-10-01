import {
  useEffect,
  useState,
} from 'react'

import {
  Pagination,
} from '@mui/material'

import {
  getAuditLogs,
} from '../../services/auditLogService'

import type {
  AuditLog as AuditLogType,
} from '../../types/auditLog'

import ViewAuditLogModal from '../../componenets/AuditLogs/ViewAuditLogModal'

import '../../styles/auditLog.css'

function AuditLog() {

  const [currentPage, setCurrentPage] =
  useState(1)

const [rowsPerPage, setRowsPerPage] =
  useState(10)

const [totalPages, setTotalPages] =
  useState(1)

  const [auditLogs, setAuditLogs] = useState<
    AuditLogType[]
  >([])

  const [selectedAuditLog, setSelectedAuditLog] =
    useState<AuditLogType | null>(null)

  const [viewOpen, setViewOpen] =
    useState(false)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

const loadAuditLogs = async () => {
  try {
    setLoading(true)
    setError('')

    const response = await getAuditLogs(
      currentPage,
      rowsPerPage,
    )

    setAuditLogs(response.data)

    setTotalPages(
      response.pagination.total_pages,
    )
  } catch (err: any) {
    setError(
      err?.response?.data?.detail ||
        'Failed to load audit logs.',
    )
  } finally {
    setLoading(false)
  }
}

  const handleView = (
    auditLog: AuditLogType,
  ) => {
    setSelectedAuditLog(auditLog)
    setViewOpen(true)
  }

  const handleViewClose = () => {
    setViewOpen(false)
    setSelectedAuditLog(null)
  }

useEffect(() => {
  loadAuditLogs()
}, [currentPage, rowsPerPage])


  return (
    <div className="audit-log-page">

      {/* Header */}
      <div className="audit-log-header">
        <div>
          <h1>Audit Logs</h1>

          <p>
            View system activity and track
            changes made by users.
          </p>
        </div>
      </div>


      {/* Error */}
      {error && (
        <div className="audit-log-error">
          {error}
        </div>
      )}


      {/* Loading */}
      {loading ? (
        <div className="audit-log-loading">
          Loading audit logs...
        </div>

      ) : auditLogs.length === 0 ? (

        /* Empty */
        <div className="audit-log-empty">
          No audit logs found.
        </div>

      ) : (

        /* Table */
        <div className="audit-log-table-container">

          <div className="audit-log-table-wrapper">

            <table className="audit-log-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Action</th>
                  <th>Entity Type</th>
                  <th>Entity ID</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {auditLogs.map(
                  (auditLog) => (
                    <tr
                      key={auditLog.id}
                    >

                      <td>
                        {auditLog.id}
                      </td>

                      <td>
                        {auditLog.user_id}
                      </td>

                      <td>
                        <span className="audit-log-action">
                          {auditLog.action}
                        </span>
                      </td>

                      <td>
                        {auditLog.entity_type}
                      </td>

                      <td>
                        {auditLog.entity_id}
                      </td>

                      <td>
                        {new Date(
                          auditLog.created_at,
                        ).toLocaleString()}
                      </td>

                      <td>
                        <div className="audit-log-actions">

                          <button
                            className="audit-log-view-button"
                            onClick={() =>
                              handleView(
                                auditLog,
                              )
                            }
                          >
                            View
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

      <div className="audit-log-pagination">
  <Pagination
    count={totalPages}
    page={currentPage}
    onChange={(
      _event,
      page,
    ) => setCurrentPage(page)}
    color="primary"
  />
</div>

      {/* View Modal */}
      <ViewAuditLogModal
        open={viewOpen}
        auditLog={selectedAuditLog}
        onClose={handleViewClose}
      />

    </div>
  )
}

export default AuditLog