import { BlitzPage, useMutation, useErrorHandler } from "blitz"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import Login from "../auth/mutations/login"
import { Spinner } from "react-bootstrap"

type Error = {
  isError?: true
  msg?: string
}

const LoginPage: BlitzPage<Error> = (props) => {
  const [login, resLogin] = useMutation(Login)

  //validation Schema
  const validationSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  })

  const errorHandler = useErrorHandler(resLogin.error)

  return (
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
                            <label>Nama</label>
                            <Field
                              className="form-control"
                              type="email"
                              name="email"
                              placeholder="email... . "
                            />
                            <ErrorMessage name="nama" component="small" className="text-danger" />
                          </div>

                          <div className="form-group">
                            <label>Nama</label>
                            <Field
                              className="form-control"
                              type="password"
                              name="password"
                              placeholder="password... . "
                            />
                            <ErrorMessage
                              name="password"
                              component="small"
                              className="text-danger"
                            />
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
    </main>
  )
}

export default LoginPage
