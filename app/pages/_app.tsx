import { AppProps, ErrorBoundary, ErrorComponent, useQueryErrorResetBoundary, Head } from "blitz"
import LoginPage from "./index"
export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
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
        <link id="pagestyle" href="/assets/css/soft-ui-dashboard.css?v=1.0.3" rel="stylesheet" />
      </Head>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <Component {...pageProps} />
      </ErrorBoundary>
      {/*<!--   Core JS Files   -->*/}
      <script src="/assets/js/core/popper.min.js"></script>
      <script src="/assets/js/core/bootstrap.min.js"></script>
      <script src="/assets/js/plugins/perfect-scrollbar.min.js"></script>
      <script src="/assets/js/plugins/smooth-scrollbar.min.js"></script>
      <script src="/assets/js/plugins/chartjs.min.js"></script>
      <script async defer src="https://buttons.github.io/buttons.js"></script>
      {/*<!-- Control Center for Soft Dashboard: parallax effects, scripts for the example pages etc -->*/}
      {/*<script src="/assets/js/soft-ui-dashboard.min.js?v=1.0.3"></script>*/}
    </>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }) {
  if (error.name === "AuthenticationError") {
    return <LoginPage isError={true} msg="Authentication Failed" />
  } else if (error.name === "AuthorizationError") {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
