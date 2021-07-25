import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes, useSession } from "blitz"
import { AdminLayout } from "../../core/layouts/Admin"

const AdminsPage: BlitzPage = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <h4 className="card-body text-center">Welcome To Dashboard</h4>
        </div>
      </div>
    </div>
  )
}

AdminsPage.authenticate = { redirectTo: "/" }
AdminsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminsPage
