import React, { Suspense } from 'react';
import {Head} from 'blitz'
import { Loading } from '../../core/components/Loading';

export const MainLayout: React.FC = ({ children }) => {
	return (
  <>
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
	<main className="main-content  mt-0" style={{ minHeight: "100vh" }}>
      <section>
        <div className="page-header min-vh-75">
          <div className="container">
            <div className="row" style={{ height: "100vh" }}>
              <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                <div className="card card-plain mt-8">
                  <div className="card-header pb-0 text-left bg-transparent">
                    <h3 className="font-weight-bolder text-info text-gradient">Login Admin</h3>
                  </div>
                  
                  <Suspense fallback={<Loading/>}> 
                    {children}
                  </Suspense>

                </div>
              </div>
              <div className="col-md-6">
                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                  <div
                    className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                    style={{ backgroundImage: `url(/assets/img/curved-images/curved6.jpg)` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
                     {/*<!--   Core JS Files   -->*/}
      <script src="/assets/js/core/popper.min.js"></script>
      <script src="/assets/js/core/bootstrap.min.js"></script>
      <script src="/assets/js/plugins/perfect-scrollbar.min.js"></script>
      <script src="/assets/js/plugins/smooth-scrollbar.min.js"></script>
      <script src="/assets/js/plugins/chartjs.min.js"></script>
      <script async defer src="https://buttons.github.io/buttons.js"></script>
    </main>
    </>
	)
}
