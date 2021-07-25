import React, { useEffect, useState } from "react"
import { useQuery, BlitzPage } from "blitz"
import { Row, Col, Collapse, Button, Card, Dropdown, Accordion } from "react-bootstrap"
import { ProfileMatchType } from "../../../penilaians/helpers/profile-matching"
import fetchAllPenilaian from "../../../penilaians/queries/getPenilaians"
import fetchAllTableBobot from "../../../tabel-bobot-gaps/queries/getTabelBobotGaps"
import fetchAllCriteria from "../../../criteria/queries/getCriteria"
import { ProfileMatchingExec } from "../../../penilaians/helpers/profile-matching"
import { AdminLayout } from "../../../core/layouts/Admin"

const RankingPage: BlitzPage = () => {
  const [penilaian, resPenilaian] = useQuery(fetchAllPenilaian, {})
  const [gapTable, resTable] = useQuery(fetchAllTableBobot, {})
  const [criteria, resCriteria] = useQuery(fetchAllCriteria, {})
  const [resultPM, setResultPM] = useState<ProfileMatchType>({
    avgTotalCriteria: [],
    pembobotanTable: [],
    ranking: [],
  })

  useEffect(() => {
    const result = ProfileMatchingExec(
      penilaian.penilaians,
      criteria.criteria,
      gapTable.tabelBobotGaps
    )
    setResultPM(result)
  }, [criteria.criteria, gapTable.tabelBobotGaps, penilaian.penilaians])

  return (
    <>
      <Row className="mb-3">
        <Col md={4}>
          <Card className="bg-gradient-dark text-white">
            <Card.Body>
              <h6 className="mb-3 text-white">Ranking Result</h6>
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-center text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                        No
                      </th>
                      <th className="text-center text-uppercase text-white text-xxs font-weight-bolder opacity-7 ps-2">
                        Nama
                      </th>
                      <th className="text-center text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultPM.ranking.map((data, no) => (
                      <tr key={no} className={`${no == 0 ? "bg-gradient-danger text-white" : ""}`}>
                        <td className="text-white align-middle text-center">{no + 1}</td>
                        <td className="text-white align-middle text-center">
                          {data.nameCandidate}
                        </td>
                        <td className="text-white align-middle text-center">
                          {data.value.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="">
            <Card.Body>
              <h6 className="mb-3">Pembobotan Nilai</h6>
              {resultPM.pembobotanTable.map((data, noP) => (
                <Accordion className="mb-1" key={noP++}>
                  <Accordion.Toggle
                    className="bg-gradient-dark p-2 d-block"
                    style={{ color: "white", border: "none", width: "100%" }}
                    eventKey="0"
                  >
                    {data.namaCriteria}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <div className="p-2" style={{ border: "1px solid #333" }}>
                      {data.table.map((tabData, no) => (
                        <Card key={no++}>
                          <Card.Body>
                            <h6 className="mb-2">
                              {tabData.namaSub}
                              <span className="badge bg-gradient-success">
                                Type: {tabData.type}
                              </span>
                            </h6>
                            <table className="table align-items-center mb-0">
                              <thead>
                                <tr>
                                  <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7">
                                    Nama
                                  </th>
                                  <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7 ps-2">
                                    Selisih Nilai
                                  </th>
                                  <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7">
                                    Mapped Gap Value
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {tabData.listCandidate.map((candidate, noC) => (
                                  <tr key={noC++}>
                                    <td className=" align-middle text-center">
                                      {candidate.namaCandidate}
                                    </td>
                                    <td className=" align-middle text-center">{candidate.value}</td>
                                    <td className=" align-middle text-center">
                                      {candidate.bobotValue}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  </Accordion.Collapse>
                </Accordion>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {resultPM.avgTotalCriteria.map((data, noAvg) => (
          <Col key={noAvg++} className="mb-2">
            <Card className="">
              <Card.Body>
                <h6 className="mb-3 ">
                  Perhitungan Kriteria{" "}
                  <span className="badge bg-gradient-success">{data.namaCriteria}</span>
                </h6>
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7">
                          Nama
                        </th>
                        <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7 ps-2">
                          Core Factor Value
                        </th>
                        <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7">
                          Second Factor Value
                        </th>
                        <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7">
                          Total Nilai
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.listCandidate.map((datCandidate, noD) => (
                        <tr key={noD++}>
                          <td className=" align-middle text-center">{datCandidate.nama}</td>
                          <td className=" align-middle text-center">
                            {`${datCandidate.coreFactorDesc.join(" + ")} / ${
                              datCandidate.coreFactorDesc.length
                            } = ${datCandidate.coreFactor.toFixed(2)}`}
                          </td>
                          <td className=" align-middle text-center">
                            {`${datCandidate.secondFactorDesc.join(" + ")} / ${
                              datCandidate.secondFactorDesc.length
                            } = ${datCandidate.secondFactor.toFixed(2)}`}
                          </td>

                          <td className="text-white font-weight-bolder align-middle text-center bg-gradient-warning">
                            {datCandidate.nilaiTotal.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

RankingPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default RankingPage
