import { useEffect, useState } from 'react'

import {
  getDashboardSummary,
  getAllFeatureUsage,
  getFeatureUsage,
} from '../../services/dashboardService'

import '../../styles/dashboard.css'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material'
import FeatureStatus from '../../componenets/Analytics/FeatureStatus'
import EnvironmentStatus from '../../componenets/Analytics/EnvironmentStatus'
import RolloutStatus from '../../componenets/Analytics/RolloutStatus'

// =========================
// Types
// =========================

interface DashboardSummary {
  features: {
    total: number
    active: number
    inactive: number
  }

  environments: {
    total: number
    active: number
    inactive: number
  }

  rollouts: {
    total: number
    active: number
    inactive: number
  }
}

interface FeatureUsage {
  feature_id: number
  feature_name: string
  is_active: boolean
  environment_count: number
  enabled_environment_count: number
  rollout_count: number
  active_rollout_count: number
  user_assignment_count: number
  enabled_assignment_count: number
}

interface FeatureDetails {
  id: number
  name: string
  description: string
  flag_type: string
  default_value: string
  is_active: boolean
  created_by: number
  created_at: string
  updated_at: string | null
}

interface EnvironmentConfig {
  id: number
  value: string
  is_enabled: boolean
  updated_at: string | null
  feature_flag_id: number
  environment_id: number
  created_at: string
}

interface Rollout {
  is_active: boolean
  created_at: string
  feature_flag_environment_id: number
  id: number
  rollout_percentage: number
  updated_at: string | null
}

interface UserAssignment {
  user_id: number
  feature_flag_id: number
  environment_id: number
  updated_at: string | null
  id: number
  is_enabled: boolean
  created_at: string
}

interface FeatureUsageDetails {
  feature: FeatureDetails
  environment_configs: EnvironmentConfig[]
  rollouts: Rollout[]
  user_assignments: UserAssignment[]
}

// =========================
// Component
// =========================

function Dashboard() {

  // =========================
  // State
  // =========================

  const [summary, setSummary] =
    useState<DashboardSummary | null>(null)

  const [featureUsage, setFeatureUsage] =
    useState<FeatureUsage[]>([])

  const [selectedFeature, setSelectedFeature] =
    useState<FeatureUsageDetails | null>(null)

  const [loading, setLoading] =
    useState(true)

  const [detailsLoading, setDetailsLoading] =
    useState(false)

  const [error, setError] =
    useState<string | null>(null)


  // =========================
  // Load Dashboard Summary
  // =========================

  const loadDashboardSummary = async () => {
    try {
      const data = await getDashboardSummary()

      setSummary(data)
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        'Failed to load dashboard summary.'

      setError(message)
    }
  }


  // =========================
  // Load Feature Usage
  // =========================

  const loadFeatureUsage = async () => {
    try {
      const data = await getAllFeatureUsage()

      setFeatureUsage(data)
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        'Failed to load feature usage.'

      setError(message)
    }
  }


  // =========================
  // Load Complete Dashboard
  // =========================

  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError(null)

      await Promise.all([
        loadDashboardSummary(),
        loadFeatureUsage(),
      ])

    } finally {
      setLoading(false)
    }
  }


  // =========================
  // Load Feature Details
  // =========================

  const loadFeatureDetails = async (
    featureId: number,
  ) => {
    try {
      setDetailsLoading(true)
      setError(null)

      const data = await getFeatureUsage(featureId)

      setSelectedFeature(data)

      return data
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        'Failed to load feature details.'

      setError(message)

      return null
    } finally {
      setDetailsLoading(false)
    }
  }


  // =========================
  // Clear Selected Feature
  // =========================

  const clearSelectedFeature = () => {
    setSelectedFeature(null)
  }


  // =========================
  // Initial Dashboard Load
  // =========================

  useEffect(() => {
    loadDashboard()
  }, [])


  // =========================
  // Temporary return
  // =========================

return (
  <div className="analytics-dashboard">

    {/* Dashboard Header */}
    <div className="analytics-dashboard-header">
      <div>
        <h1 className="analytics-dashboard-title">
          Dashboard
        </h1>

        <p className="analytics-dashboard-subtitle">
          Overview of feature flags, environments, and rollouts
        </p>
      </div>
    </div>

    {/* Loading State */}
    {loading && (
      <div className="dashboard-loading">
        Loading dashboard...
      </div>
    )}

    {/* Error State */}
    {!loading && error && (
      <div className="dashboard-error">
        {error}
      </div>
    )}

    {/* KPI Cards */}
    {!loading && summary && (
      <div className="dashboard-kpi-grid">

        {/* Features KPI */}
        <div className="dashboard-kpi-card">
          <div className="dashboard-kpi-header">
            <h2>Features</h2>
          </div>

          <div className="dashboard-kpi-value">
            {summary.features.total}
          </div>

          <div className="dashboard-kpi-status">
            <span>
              Active: {summary.features.active}
            </span>

            <span>
              Inactive: {summary.features.inactive}
            </span>
          </div>
        </div>

        {/* Environments KPI */}
        <div className="dashboard-kpi-card">
          <div className="dashboard-kpi-header">
            <h2>Environments</h2>
          </div>

          <div className="dashboard-kpi-value">
            {summary.environments.total}
          </div>

          <div className="dashboard-kpi-status">
            <span>
              Active: {summary.environments.active}
            </span>

            <span>
              Inactive: {summary.environments.inactive}
            </span>
          </div>
        </div>

        {/* Rollouts KPI */}
        <div className="dashboard-kpi-card">
          <div className="dashboard-kpi-header">
            <h2>Rollouts</h2>
          </div>

          <div className="dashboard-kpi-value">
            {summary.rollouts.total}
          </div>

          <div className="dashboard-kpi-status">
            <span>
              Active: {summary.rollouts.active}
            </span>

            <span>
              Inactive: {summary.rollouts.inactive}
            </span>
          </div>
        </div>

      </div>
    )}


   {/* Feature Usage Table */}
{!loading && featureUsage.length > 0 && (
  <div className="feature-usage-section">

    <div className="feature-usage-header">
      <div>
        <h2>Feature Usage</h2>

        <p>
          Feature flag usage across environments, rollouts, and users
        </p>
      </div>
    </div>

    <div className="feature-usage-table-wrapper">
      <table className="feature-usage-table">

        <thead>
          <tr>
            <th>Feature</th>
            <th>Status</th>
            <th>Environments</th>
            <th>Rollouts</th>
            <th>User Assignments</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {featureUsage.map((feature) => (
            <tr key={feature.feature_id}>

              {/* Feature Name */}
              <td>
                {feature.feature_name}
              </td>

              {/* Feature Status */}
              <td>
                {feature.is_active
                  ? 'Active'
                  : 'Inactive'}
              </td>

              {/* Environment Count */}
              <td>
                {feature.enabled_environment_count}
                {' / '}
                {feature.environment_count}
              </td>

              {/* Rollout Count */}
              <td>
                {feature.active_rollout_count}
                {' / '}
                {feature.rollout_count}
              </td>

              {/* User Assignment Count */}
              <td>
                {feature.enabled_assignment_count}
                {' / '}
                {feature.user_assignment_count}
              </td>

              {/* View Details */}
              <td>
                <button
                  type="button"
                  onClick={() =>
                    loadFeatureDetails(
                      feature.feature_id,
                    )
                  }
                >
                  View Details
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>

  </div>
)} 

{/* Feature Details Dialog */}
<Dialog
  open={Boolean(selectedFeature)}
  onClose={clearSelectedFeature}
  fullWidth
  maxWidth="md"
>
  <DialogTitle>
    Feature Details
  </DialogTitle>

  <DialogContent>

    {detailsLoading ? (
      <div className="feature-details-loading">
        <CircularProgress />
      </div>
    ) : selectedFeature ? (
      <div className="feature-details-content">

        {/* Feature Information */}
        <div className="feature-details-section">

          <h3>Feature Information</h3>

          <div className="feature-info-grid">

            <div>
              <strong>Name</strong>
              <span>
                {selectedFeature.feature.name}
              </span>
            </div>

            <div>
              <strong>Type</strong>
              <span>
                {selectedFeature.feature.flag_type}
              </span>
            </div>

            <div>
              <strong>Default Value</strong>
              <span>
                {selectedFeature.feature.default_value}
              </span>
            </div>

            <div>
              <strong>Status</strong>
              <span>
                {selectedFeature.feature.is_active
                  ? 'Active'
                  : 'Inactive'}
              </span>
            </div>

            <div>
              <strong>Created By</strong>
              <span>
                User ID: {selectedFeature.feature.created_by}
              </span>
            </div>

            <div>
              <strong>Created At</strong>
              <span>
                {selectedFeature.feature.created_at}
              </span>
            </div>

            <div>
              <strong>Updated At</strong>
              <span>
                {selectedFeature.feature.updated_at || 'Not updated'}
              </span>
            </div>

            <div className="feature-info-description">
              <strong>Description</strong>
              <span>
                {selectedFeature.feature.description}
              </span>
            </div>

          </div>

        </div>

        {/* Environment Configurations */}
        <div className="feature-details-section">

          <h3>
            Environment Configurations
          </h3>

          {selectedFeature.environment_configs.length > 0 ? (
            <div className="feature-details-table-wrapper">

              <table className="feature-details-table">

                <thead>
                  <tr>
                    <th>Environment ID</th>
                    <th>Value</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedFeature.environment_configs.map(
                    (config) => (
                      <tr key={config.id}>

                        <td>
                          {config.environment_id}
                        </td>

                        <td>
                          {config.value}
                        </td>

                        <td>
                          {config.is_enabled
                            ? 'Enabled'
                            : 'Disabled'}
                        </td>

                        <td>
                          {config.created_at}
                        </td>

                        <td>
                          {config.updated_at || 'Not updated'}
                        </td>

                      </tr>
                    ),
                  )}
                </tbody>

              </table>

            </div>
          ) : (
            <p>No environment configurations found.</p>
          )}

        </div>

        {/* Rollouts */}
        <div className="feature-details-section">

          <h3>Rollouts</h3>

          {selectedFeature.rollouts.length > 0 ? (
            <div className="feature-details-table-wrapper">

              <table className="feature-details-table">

                <thead>
                  <tr>
                    <th>Environment Config ID</th>
                    <th>Rollout</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedFeature.rollouts.map(
                    (rollout) => (
                      <tr key={rollout.id}>

                        <td>
                          {rollout.feature_flag_environment_id}
                        </td>

                        <td>
                          {rollout.rollout_percentage}%
                        </td>

                        <td>
                          {rollout.is_active
                            ? 'Active'
                            : 'Inactive'}
                        </td>

                        <td>
                          {rollout.created_at}
                        </td>

                        <td>
                          {rollout.updated_at || 'Not updated'}
                        </td>

                      </tr>
                    ),
                  )}
                </tbody>

              </table>

            </div>
          ) : (
            <p>No rollouts found.</p>
          )}

        </div>

        {/* User Assignments */}
        <div className="feature-details-section">

          <h3>User Assignments</h3>

          {selectedFeature.user_assignments.length > 0 ? (
            <div className="feature-details-table-wrapper">

              <table className="feature-details-table">

                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Environment ID</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedFeature.user_assignments.map(
                    (assignment) => (
                      <tr key={assignment.id}>

                        <td>
                          {assignment.user_id}
                        </td>

                        <td>
                          {assignment.environment_id}
                        </td>

                        <td>
                          {assignment.is_enabled
                            ? 'Enabled'
                            : 'Disabled'}
                        </td>

                        <td>
                          {assignment.created_at}
                        </td>

                        <td>
                          {assignment.updated_at || 'Not updated'}
                        </td>

                      </tr>
                    ),
                  )}
                </tbody>

              </table>

            </div>
          ) : (
            <p>No user assignments found.</p>
          )}

        </div>

      </div>
    ) : null}

  </DialogContent>

  <DialogActions>
    <Button
      onClick={clearSelectedFeature}
      variant="outlined"
    >
      Close
    </Button>
  </DialogActions>
</Dialog>

{/* Dashboard Charts */}
{!loading && summary && (
<div className="dashboard-charts-section">

  {/* Feature Status Chart */}
  <div className="dashboard-chart-card">
    <div className="dashboard-chart-header">
      <h2>Feature Status</h2>

      <p>
        Active and inactive feature flags
      </p>
    </div>

    <div className="dashboard-chart-container">
              <FeatureStatus
          active={summary.features.active}
          inactive={summary.features.inactive}
        />
    </div>
  </div>

  {/* Environment Status Chart */}
  <div className="dashboard-chart-card">
    <div className="dashboard-chart-header">
      <h2>Environment Status</h2>

      <p>
        Active and inactive environments
      </p>
    </div>

    <div className="dashboard-chart-container">
             <EnvironmentStatus
          active={summary.environments.active}
          inactive={summary.environments.inactive}
        />
    </div>
  </div>

  {/* Rollout Status Chart */}
  <div className="dashboard-chart-card dashboard-chart-full">
    <div className="dashboard-chart-header">
      <h2>Rollout Status</h2>

      <p>
        Active and inactive rollouts
      </p>
    </div>

    <div className="dashboard-chart-container">
            <RolloutStatus
          active={summary.rollouts.active}
          inactive={summary.rollouts.inactive}
        />
    </div>
  </div>

</div>
)}

  </div>
)

}

export default Dashboard