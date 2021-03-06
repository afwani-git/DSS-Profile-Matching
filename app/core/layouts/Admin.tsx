import React, { Suspense } from "react"
import { BlitzPage, Head, useSession } from "blitz"
import { SideBar } from "../../admins/components/Sidebar"
import { Header } from "../../admins/components/Header"
import { Footer } from "../../admins/components/Footer"
import { Loading } from '../../core/components/Loading';

export const AdminLayout: React.FC = ({ children }) => {
  return (
    <>
      <div>
        <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/apple-icon.png" />
        <link rel="icon" type="image/png" href="/assets/img/favicon.png" />
        <title>Admin Dashboard</title>
        {/*<!--     Fonts and icons     -->*/}
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        {/*<!-- Nucleo Icons -->*/}
        <link href="/assets/css/nucleo-icons.css" rel="stylesheet" />
        <link href="/assets/css/nucleo-svg.css" rel="stylesheet" />
        {/*<!-- Font Awesome Icons -->*/}
        <script src="https://kit.fontawesome.com/42d5adcbca.js" crossOrigin="anonymous"></script>
        <link href="/assets/css/nucleo-svg.css" rel="stylesheet" />
        {/*<!-- CSS Files -->*/}
        <link id="pagestyle" href="/assets/css/soft-ui-dashboard.min.css?v=1.0.3" rel="stylesheet" />
      </Head>
        <SideBar />
        <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
          <Suspense fallback={<Loading/>}>
              <Header />
          </Suspense>
          <div className="container-fluid py-4">
            <Suspense fallback={<Loading/>}>{children}</Suspense>
          </div>
                {/*<!--   Core JS Files   -->*/}
      <script src="/assets/js/core/popper.min.js"></script>
      <script src="/assets/js/core/bootstrap.min.js"></script>
      <script src="/assets/js/plugins/perfect-scrollbar.min.js"></script>
      <script src="/assets/js/plugins/smooth-scrollbar.min.js"></script>
      <script src="/assets/js/plugins/chartjs.min.js"></script>
      <script async defer src="https://buttons.github.io/buttons.js"></script>
        </main>
      </div>
    </>
  )
}
