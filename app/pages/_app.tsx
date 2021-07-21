import { AppProps, ErrorBoundary, ErrorComponent, useQueryErrorResetBoundary, Head } from "blitz"
import LoginPage from "./index"
export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <>
    
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <Component {...pageProps} />
      </ErrorBoundary>

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
