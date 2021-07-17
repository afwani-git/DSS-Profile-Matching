import {
  Head,
  Link,
  usePaginatedQuery,
  useRouter,
  BlitzPage,
  Routes,
  useMutation,
  useQuery,
} from "blitz"
import { Spinner, FormControl, Modal, Button } from "react-bootstrap"
import * as yup from "yup"
import { useState, useRef, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { AdminLayout } from "../../../core/layouts/Admin"
import Moment from "react-moment"
import addCriteria from "../../../criteria/mutations/createCriterion"
import updateCriteria from "../../../criteria/mutations/updateCriterion"
import deleteCriteria from "../../../criteria/mutations/deleteCriterion"
import fetchAllCriteria from "../../../criteria/queries/getCriteria"

const CriteriaPage: BlitzPage = () => {
  //api
  const [add, resAdd] = useMutation(addCriteria)
  const [update, resUpdate] = useMutation(updateCriteria)
  const [deleteOne, resDelete] = useMutation(deleteCriteria)
  const [data, extraRes] = useQuery(fetchAllCriteria, {})

  //state
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [show, setShow] = useState(false)

  //ref
  const refNamaInput = useRef<HTMLInputElement>(null)
  const refBobotInput = useRef<HTMLInputElement>(null)
  const refCoInput = useRef<HTMLInputElement>(null)
  const refSecFactorInput = useRef<HTMLInputElement>(null)

  //action
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleUpdate = async (e: React.FormEvent, id: number) => {
    e.preventDefault()
    await update({
      id,
      nama: refNamaInput.current!.value,
      secondaryFactor: Number.parseFloat(refSecFactorInput.current!.value),
      coreFactor: Number.parseFloat(refCoInput.current!.value),
      bobot: Number.parseFloat(refBobotInput.current!.value),
    })
    await extraRes.refetch()
    setSelectedId(null)
  }

  const handleDelete = async (id: number) => {
    await deleteOne({ id })
    await extraRes.refetch()
  }

  //validationSchema
  const validationSchema = yup.object().shape({
    nama: yup.string().required(),
    secondaryFactor: yup.number().required(),
    coreFactor: yup.number().required(),
    bobot: yup.number().required(),
  })

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ nama: "", secondaryFactor: "", coreFactor: "", bobot: "" }}
            onSubmit={async (value, { setSubmitting }) => {
              await add({
                nama: value.nama,
                secondaryFactor: Number.parseFloat(value.secondaryFactor),
                coreFactor: Number.parseFloat(value.coreFactor),
                bobot: Number.parseFloat(value.bobot),
              })
              await extraRes.refetch()
              setShow(false)
            }}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label>Nama</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="nama"
                    placeholder="nama... . "
                  />
                  <ErrorMessage name="nama" component="small" className="text-danger" />
                </div>

                <div className="form-group">
                  <label>Bobot</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="bobot"
                    placeholder="bobot... ."
                  />
                  <ErrorMessage name="bobot" component="small" className="text-danger" />
                </div>

                <div className="form-group">
                  <label>Secondary Factor</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="secondaryFactor"
                    placeholder="secondaryFactor... ."
                  />
                  <ErrorMessage name="secondaryFactor" component="small" className="text-danger" />
                </div>

                <div className="form-group">
                  <label>Core Factor</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="coreFactor"
                    placeholder="coreFactor... ."
                  />
                  <ErrorMessage name="coreFactor" component="small" className="text-danger" />
                </div>

                <button
                  className="btn bg-gradient-success m-1"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
                <Button variant="secondary" onClick={handleClose} className="m-1">
                  Close
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      <div className="row">
        <div className="col-12">
          <div className="card mb-4" style={{ minHeight: "340px" }}>
            <div className="card-header pb-0">
              <h6>
                Criteria Table
                <span
                  style={{ cursor: "pointer" }}
                  className="badge m-2 badge-sm bg-gradient-success"
                  onClick={handleShow}
                >
                  + Tambah Data
                </span>
              </h6>
            </div>
            <div className="card-body px-0 pt-0 pb-2">
              {extraRes.isLoading ? (
                <>
                  <Spinner animation="grow" />
                  Fetch data...
                </>
              ) : (
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Nama
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Bobot
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Core Factor
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Secondary Factor
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Updated At
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Created At
                        </th>
                        <th className="text-secondary opacity-7"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.criteria.map((data) => (
                        <tr key={data.id}>
                          <td className="align-middle text-center">
                            {selectedId == data.id ? (
                              <FormControl defaultValue={data.nama} ref={refNamaInput} />
                            ) : (
                              data.nama
                            )}
                          </td>
                          <td className="align-middle text-center">
                            {selectedId == data.id ? (
                              <FormControl defaultValue={data.bobot} ref={refBobotInput} />
                            ) : (
                              data.bobot
                            )}
                          </td>
                          <td className="align-middle text-center">
                            {selectedId == data.id ? (
                              <FormControl defaultValue={data.coreFactor} ref={refCoInput} />
                            ) : (
                              <>{data.coreFactor}%</>
                            )}
                          </td>
                          <td className="align-middle text-center">
                            {selectedId == data.id ? (
                              <FormControl
                                defaultValue={data.secondaryFactor}
                                ref={refSecFactorInput}
                              />
                            ) : (
                              <>{data.secondaryFactor}%</>
                            )}
                          </td>
                          <td className="align-middle text-center">
                            <Moment fromNow ago>
                              {data.updatedAt}
                            </Moment>
                          </td>
                          <td className="align-middle text-center">
                            <Moment fromNow ago>
                              {data.createdAt}
                            </Moment>
                          </td>
                          <td className="align-middle d-flex">
                            <span
                              style={{ cursor: "pointer" }}
                              className="badge m-2 badge-sm bg-gradient-warning"
                              onClick={
                                selectedId == data.id
                                  ? (evt) => handleUpdate(evt, data.id)
                                  : () => setSelectedId(data.id)
                              }
                            >
                              {selectedId == data.id ? "save" : "edit"}
                            </span>
                            <span
                              style={{ cursor: "pointer" }}
                              className="badge m-2 badge-sm bg-gradient-danger"
                              onClick={() => handleDelete(data.id)}
                            >
                              delete
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// AdminsPage.authenticate = true
CriteriaPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default CriteriaPage
