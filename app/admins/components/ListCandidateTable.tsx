import { useQuery, useMutation } from "blitz"
import React, { useRef, useState } from "react"
import { Modal, Button, Card, Dropdown } from "react-bootstrap"
import * as yup from "yup"
import Moment from "react-moment"
import { Formik, Form, Field, ErrorMessage } from "formik"
import createCandidate from "../../candidates/mutations/createCandidate"
import updateCandidate from "../../candidates/mutations/updateCandidate"
import deleteCandidate from "../../candidates/mutations/deleteCandidate"
import fetchAllCandidate from "../../candidates/queries/getCandidates"

export const ListCandidateTable: React.FC = () => {
  //ref
  const refNamaInput = useRef<HTMLInputElement>(null)
  const refAlamatInput = useRef<HTMLInputElement>(null)
  const refEmailInput = useRef<HTMLInputElement>(null)

  //state
  const [selectedData, setSelectedData] = useState<{
    nama: string
    alamat: string
    email: string
    id: number | null
  }>({
    nama: "",
    email: "",
    alamat: "",
    id: null,
  })
  const [showAddModal, setShowAddModal] = useState(false)
  const [showModModal, setShowModModal] = useState(false)

  //api
  const [add, resAdd] = useMutation(createCandidate)
  const [update, redUpdate] = useMutation(updateCandidate)
  const [deleteOne, resDelete] = useMutation(deleteCandidate)
  const [data, resFetch] = useQuery(fetchAllCandidate, {})

  //action
  const handleDelete = async (id: number) => {
    await deleteOne({ id })
    await resFetch.refetch()
  }

  //validateSchema
  const validateCreateSchema = yup.object().shape({
    nama: yup.string().required(),
    alamat: yup.string().optional().default("Addr Not Set"),
    email: yup.string().required(),
  })

  //validateSchema
  const validateUpdateSchema = yup.object().shape({
    nama: yup.string().required(),
    alamat: yup.string().optional().default("Addr Not Set"),
    email: yup.string().required(),
    id: yup.number().required(),
  })

  return (
    <>
      {/* add candidate */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header>
          <Modal.Title>Add Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              nama: "",
              alamat: "",
              email: "",
            }}
            onSubmit={async (value, { setSubmitting }) => {
              await add({ ...value })
              await resFetch.refetch()
              setShowAddModal(false)
            }}
            validationSchema={validateCreateSchema}
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
                  <label>Email</label>
                  <Field
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="email... . "
                  />
                  <ErrorMessage name="email" component="small" className="text-danger" />
                </div>

                <div className="form-group">
                  <label>Alamat</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="alamat"
                    placeholder="alamat... . "
                  />
                  <ErrorMessage name="alamat" component="small" className="text-danger" />
                </div>

                <button disabled={isSubmitting}  className="btn bg-gradient-success m-1" type="submit">
                  Submit
                </button>
                <Button variant="secondary" onClick={() => setShowAddModal(false)} className="m-1">
                  Close
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      {/* add UPDATE */}
      <Modal show={showModModal} onHide={() => setShowModModal(false)}>
        <Modal.Header>
          <Modal.Title>Update Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              nama: selectedData.nama,
              alamat: selectedData.alamat,
              email: selectedData.email,
              id: selectedData.id ? selectedData.id : 1,
            }}
            onSubmit={async (value, { setSubmitting }) => {
              await update({ ...value })
              await resFetch.refetch()
              setShowModModal(false)
            }}
            validationSchema={validateCreateSchema}
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
                  <label>Email</label>
                  <Field
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="email... . "
                  />
                  <ErrorMessage name="email" component="small" className="text-danger" />
                </div>

                <Field value={selectedData.id} type="hidden" />

                <div className="form-group">
                  <label>Alamat</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="alamat"
                    placeholder="alamat... . "
                  />
                  <ErrorMessage name="alamat" component="small" className="text-danger" />
                </div>

                <button
                  className="btn bg-gradient-success m-1"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
                <Button variant="secondary" onClick={() => setShowModModal(false)} className="m-1">
                  Close
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      <div className="card" style={{ minHeight: "340px" }}>
        <div className="card-header pb-0">
          <div className="row">
            <div className="col-lg-6 col-7" style={{ width: "100%" }}>
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ width: "100%" }}
              >
                <h6>List Data User</h6>
                <span className="btn btn-sm bg-gradient-dark" onClick={() => setShowAddModal(true)}>
                  + Tambah Data
                </span>
              </div>

              <p className="text-sm mb-0">
                <i className="fa fa-check text-info" aria-hidden="true"></i>
                <span className="font-weight-bold ms-1 text-success">
                  {data.candidates.length} user
                </span>{" "}
                in this table
              </p>
            </div>
          </div>
        </div>
        <div className="card-body px-0 pb-2">
          <div className="table-responsive">
            <table className="table align-items-center mb-0">
              <thead>
                <tr>
                  <th className="text-uppercase text-center text-xxs font-weight-bolder p-2">
                    Nama
                  </th>
                  <th className="text-uppercase text-center text-xxs font-weight-bolder p-2">
                    Email
                  </th>
                  <th className="text-uppercase text-center text-xxs font-weight-bolder p-2">
                    Alamat
                  </th>
                  <th className="text-uppercase text-center text-xxs font-weight-bolder p-2">
                    Updated At
                  </th>
                  <th className="text-uppercase text-center text-xxs font-weight-bolder p-2">
                    Created At
                  </th>
                  <th className="text-secondary opacity-7"></th>
                </tr>
              </thead>
              <tbody>
                {resFetch.isFetched &&
                  data.candidates.map((data) => (
                    <tr key={data.id}>
                      <td className="align-middle text-center">{data.nama}</td>
                      <td className="align-middle text-center">{data.email}</td>
                      <td className="align-middle text-center">{data.alamat}</td>
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
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant="warning" id="dropdown-basic">
                            Action
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={(e) => {
                                e.preventDefault()
                                setSelectedData({
                                  nama: data.nama,
                                  email: data.email,
                                  alamat: data.alamat ? data.alamat : "",
                                  id: data.id,
                                })
                                setShowModModal(true)
                              }}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={async (e) => {
                                e.preventDefault()
                                await handleDelete(data.id)
                              }}
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
