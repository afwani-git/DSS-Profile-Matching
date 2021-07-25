import { BlitzPage, useMutation, useErrorHandler, useSession, useRouter } from "blitz"
import { useEffect, Suspense } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import Login from "../auth/mutations/login"
import { MainLayout } from "../core/layouts/Main"
import { Spinner } from "react-bootstrap"

type Error = {
  isError?: true
  msg?: string
}

const LoginPage: BlitzPage<Error> = (props) => {
  const [login, resLogin] = useMutation(Login)
  const router = useRouter()

  //validation Schema
  const validationSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  })

  const errorHandler = useErrorHandler(resLogin.error)

  return (
    <MainLayout>
      <div className="card-body">
        {props.isError ? <p className="text-danger">* {props.msg}</p> : ""}
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (value, { setSubmitting }) => {
            try {
              await login({ ...value })
            } catch (err) {
              errorHandler(err)
            }
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label>Email</label>
                <Field
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="email... . "
                />
                <ErrorMessage name="nama" component="small" className="text-danger" />
              </div>

              <div className="form-group">
                <label>Password</label>
                <Field
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="password... . "
                />
                <ErrorMessage name="password" component="small" className="text-danger" />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn bg-gradient-info w-100 mt-4 mb-0"
                  disabled={isSubmitting}
                >
                  {resLogin.isLoading ? <Spinner animation="grow" /> : "Sign in"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </MainLayout>
  )
}
LoginPage.redirectAuthenticatedTo = { pathname: "/admin" }

export default LoginPage
