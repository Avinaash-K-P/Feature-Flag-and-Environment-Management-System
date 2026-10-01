import api from './api'

export const getAuditLogs = async (
  page: number = 1,
  limit: number = 10,
) => {
  const response = await api.get(
    '/audit-logs',
    {
      params: {
        page,
        limit,
      },
    },
  )

  return response.data
}
