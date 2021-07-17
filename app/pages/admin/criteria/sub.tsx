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
import Moment from "react-moment"
import { AdminLayout } from "../../../core/layouts/Admin"
import fetchAllCriteria from "../../../criteria/queries/getCriteria"
import createSubCriteria from "../../../sub-criteria/mutations/createSubCriterion"
import deleteSubCriteria from "../../../sub-criteria/mutations/deleteSubCriterion"
import updateSubCriteria from "../../../sub-criteria/mutations/updateSubCriterion"

const CriteriaPage: BlitzPage = () => {
  //api
  const [add, resAdd] = useMutation(createSubCriteria)
  const [update, resUpdate] = useMutation(updateSubCriteria)
  const [deleteOne, resDelete] = useMutation(deleteSubCriteria)
  const [data, extraRes] = useQuery(fetchAllCriteria, {})

  //state
  const [selectedId, setSelectedId] = useState<{
    parentId: number | null
    childId: number | null
  }>({
    parentId: null,
    childId: null,
  })
  const [show, setShow] = useState(false)

  //ref
  const refNamaInput = useRef<HTMLInputElement>(null)
  const refNilaiTargetInput = useRef<HTMLInputElement>(null)
  const refTypeInput = useRef<HTMLInputElement>(null)

  //validationSchema
  const validationSchema = yup.object().shape({
    nama: yup.string().required(),
    nilaiTarget: yup.string().required(),
    type: yup.string().oneOf(["CORE_FACTOR", "SECOND_FACTOR"]),
    criteriaId: yup.number().required(),
  })

  //action
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleUpdate = async (evt: React.FormEvent, id: number) => {
    evt.preventDefault()
    await update({
      id,
      nama: refNamaInput.current!.value,
      nilaiTarget: Number.parseFloat(refNilaiTargetInput.current!.value),
      type: refTypeInput.current!.value,
    })
    await extraRes.refetch()
    setSelectedId({
      parentId: null,
      childId: null,
    })
  }

  const handleDelete = async (id: number) => {
    await deleteOne({ id })
    await extraRes.refetch()
  }

  return (
    <>
      <div className="row">
        {extraRes.isSuccess &&
          data.criteria.map((data) => (
            <div key={data.id}>
              {/*Modal*/}

              <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                  <Modal.Title>Add Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Formik
                    initialValues={{ nama: "", nilaiTarget: "", type: "", criteriaId: data.id }}
                    onSubmit={async (value, { setSubmitting }) => {
                      await add({
                        nama: value.nama,
                        nilaiTarget: Number.parseFloat(value.nilaiTarget),
                        type: value.type,
                        criteriaId: data.id,
                      })
                      await extraRes.refetch()
                      setShow(false)
                    }}
                    validationSchema={validationSchema}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <Field type="hidden" value={data.id} />

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
                          <label>Nilai Target</label>
                          <Field
                            className="form-control"
                            type="text"
                            name="nilaiTarget"
                            placeholder="nilaiTarget... . "
                          />
                          <ErrorMessage
                            name="nilaiTarget"
                            component="small"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group">
                          <label>Type</label>
                          <Field
                            className="form-control"
                            type="text"
                            name="type"
                            placeholder="type... . "
                          />
                          <ErrorMessage name="type" component="small" className="text-danger" />
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

              {/*TABLE SHOW*/}
              <div className="col-12">
                <div className="card mb-4" style={{ minHeight: "340px" }}>
                  <div className="card-header pb-0">
                    <h5>
                      {data.nama}
                      <span
                        style={{ cursor: "pointer" }}
                        className="badge m-2 badge-sm bg-gradient-success"
                        onClick={handleShow}
                      >
                        + Tambah Data
                      </span>
                    </h5>
                  </div>
                  <div className="card-body px-0 pt-0 pb-2">
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Nama
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Nilai Target
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Type
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Created At
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Updated At
                            </th>
                            <th className="text-secondary opacity-7"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.subCriteria.map((dataSub) => (
                            <tr key={`${dataSub}-${data}`}>
                              <td className="align-middle text-center">
                                {selectedId.parentId == data.id &&
                                selectedId.childId == dataSub.id ? (
                                  <FormControl defaultValue={dataSub.nama} ref={refNamaInput} />
                                ) : (
                                  dataSub.nama
                                )}
                              </td>
                              <td className="align-middle text-center">
                                {selectedId.parentId == data.id &&
                                selectedId.childId == dataSub.id ? (
                                  <FormControl
                                    defaultValue={dataSub.nilaiTarget}
                                    ref={refNilaiTargetInput}
                                  />
                                ) : (
                                  dataSub.nilaiTarget
                                )}
                              </td>
                              <td className="align-middle text-center">
                                {selectedId.parentId == data.id &&
                                selectedId.childId == dataSub.id ? (
                                  <FormControl defaultValue={dataSub.type} ref={refTypeInput} />
                                ) : (
                                  dataSub.type
                                )}
                              </td>
                              <td className="align-middle text-center">
                                <Moment fromNow ago>
                                  {dataSub.updatedAt}
                                </Moment>
                              </td>
                              <td className="align-middle text-center">
                                <Moment fromNow ago>
                                  {dataSub.createdAt}
                                </Moment>
                              </td>
                              <td className="align-middle d-flex">
                                <span
                                  style={{ cursor: "pointer" }}
                                  className="badge m-2 badge-sm bg-gradient-warning"
                                  onClick={
                                    selectedId.parentId == data.id &&
                                    selectedId.childId == dataSub.id
                                      ? (evt) => handleUpdate(evt, dataSub.id)
                                      : () =>
                                          setSelectedId({ parentId: data.id, childId: dataSub.id })
                                  }
                                >
                                  {selectedId.parentId == data.id &&
                                  selectedId.childId == dataSub.id
                                    ? "save"
                                    : "edit"}
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
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

// AdminsPage.authenticate = true
CriteriaPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default CriteriaPage
