import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Header from '../componenets/Layouts/Header'
import Sidebar from '../componenets/Layouts/Sidebar'
import "../styles/layout.css"

function DashboardLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleMenuClick = () => {
    setSidebarOpen((previous) => !previous)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="dashboard-layout">

      {/* Fixed Header */}
      <header className="dashboard-header">
        <Header onMenuClick={handleMenuClick} />
      </header>

      {/* Fixed Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={handleSidebarClose}
      />

      {/* Main Content */}
<main
  className={`dashboard-content ${
    sidebarOpen ? 'sidebar-open' : 'sidebar-closed'
  }`}
>
  <Outlet />
</main>

      {/* Footer */}
<footer
  className={`dashboard-footer ${
    sidebarOpen ? 'sidebar-open' : 'sidebar-closed'
  }`}
>
  © 2026 Feature Flag Management System
</footer>

    </div>
  )
}

export default DashboardLayout