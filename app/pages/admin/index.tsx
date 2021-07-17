import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import { AdminLayout } from "../../core/layouts/Admin"

const AdminsPage: BlitzPage = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">fooo baarreeeed</div>
        </div>
      </div>
    </div>
  )
}

// AdminsPage.authenticate = true
AdminsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminsPage
