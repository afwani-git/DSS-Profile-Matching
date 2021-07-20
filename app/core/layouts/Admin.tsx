import React, { Suspense } from "react"
import { BlitzPage, Head } from "blitz"
import { SideBar } from "../../admins/components/Sidebar"
import { Header } from "../../admins/components/Header"
import { Footer } from "../../admins/components/Footer"

export const AdminLayout: React.FC = ({ children }) => {
  return (
    <>
      <div>
        <SideBar />
        <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
          <Header />
          <div className="container-fluid py-4">
            <Suspense fallback="Load all...... ..">{children}</Suspense>
          </div>
        </main>
      </div>
    </>
  )
}
