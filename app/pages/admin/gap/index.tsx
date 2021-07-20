import { BlitzPage, useQuery, useMutation } from "blitz"
import { useState, useRef } from "react"
import { Spinner, FormControl, Modal, Button } from "react-bootstrap"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import Moment from "react-moment"
import { AdminLayout } from "../../../core/layouts/Admin"
import fetchAllGapTable from "../../../tabel-bobot-gaps/queries/getTabelBobotGaps"
import deleteGapTable from "../../../tabel-bobot-gaps/mutations/deleteTabelBobotGap"
import updateGapTable from "../../../tabel-bobot-gaps/mutations/updateTabelBobotGap"
import createGapTable from "../../../tabel-bobot-gaps/mutations/createTabelBobotGap"

const GapTablePage: BlitzPage = () => {
  //api
  const [fetchGapTable, resGapTable] = useQuery(fetchAllGapTable, {})
  const [deleteOne, resDelete] = useMutation(deleteGapTable)
  const [update, resUpdate] = useMutation(updateGapTable)
  const [create, resCreate] = useMutation(createGapTable)

  //ref
  const selisihInputRef = useRef<HTMLInputElement>(null)
  const bobotNInputRef = useRef<HTMLInputElement>(null)
  const keteranganInputRef = useRef<HTMLInputElement>(null)

  //state
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [show, setShow] = useState(false)

  //action
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleUpdate = async (e: React.FormEvent, id: number) => {
    e.preventDefault()
    await update({
      id,
      keterangan: keteranganInputRef.current!.value,
      bobtNilia: Number.parseFloat(bobotNInputRef.current!.value),
      selisih: Number.parseFloat(selisihInputRef.current!.value),
    })
    await resGapTable.refetch()
    setSelectedId(null)
  }

  const handleDelete = async (id: number) => {
    await deleteOne({ id })
    await resGapTable.refetch()
  }

  //validationSchema
  const validationSchema = yup.object().shape({
    selisih: yup.number().required(),
    bobtNilia: yup.number().required(),
    keterangan: yup.string().required(),
  })

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ selisih: "", bobtNilia: "", keterangan: "" }}
            onSubmit={async (value, { setSubmitting }) => {
              await create({
                selisih: Number.parseFloat(value.selisih),
                bobtNilia: Number.parseFloat(value.bobtNilia),
                keterangan: value.keterangan,
              })
              await resGapTable.refetch()
              setShow(false)
            }}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label>Selisih</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="selisih"
                    placeholder="selisih... . "
                  />
                  <ErrorMessage name="selisih" component="small" className="text-danger" />
                </div>

                <div className="form-group">
                  <label>Bobot Nilai</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="bobtNilia"
                    placeholder="bobot nilai... . "
                  />
                  <ErrorMessage name="bobtNilia" component="small" className="text-danger" />
                </div>

                <div className="form-group">
                  <label>keterangan</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="keterangan"
                    placeholder="keterangan... . "
                  />
                  <ErrorMessage name="keterangan" component="small" className="text-danger" />
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
              {resGapTable.isLoading ? (
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
                          selisih
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Bobot Nilai
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          keterangan
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
                      {fetchGapTable.tabelBobotGaps.map((data) => (
                        <tr key={data.id}>
                          <td className="align-middle text-center">
                            {selectedId == data.id ? (
                              <FormControl defaultValue={data.selisih} ref={selisihInputRef} />
                            ) : (
                              data.selisih
                            )}
                          </td>
                          <td className="align-middle text-center">
                            {selectedId == data.id ? (
                              <FormControl defaultValue={data.bobtNilia} ref={bobotNInputRef} />
                            ) : (
                              data.bobtNilia
                            )}
                          </td>
                          <td className="align-middle text-center">
                            {selectedId == data.id ? (
                              <FormControl
                                defaultValue={data.keterangan}
                                ref={keteranganInputRef}
                              />
                            ) : (
                              <>{data.keterangan}</>
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

GapTablePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default GapTablePage
