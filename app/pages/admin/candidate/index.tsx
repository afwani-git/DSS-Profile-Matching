import { BlitzPage, useQuery } from "blitz"
import { useState } from "react"
import { AdminLayout } from "../../../core/layouts/Admin"
import { Row, Col, Collapse, Button, Card, Dropdown } from "react-bootstrap"
import { ListCandidateTable } from "../../../admins/components/ListCandidateTable"
import { Info } from "../../../admins/components/Info"
import fetchAllCandidate from "../../../candidates/queries/getCandidates"
import fetchAllCriteria from "../../../criteria/queries/getCriteria"
import fetchAllSubCriteria from "../../../sub-criteria/queries/getSubCriteria"
import fetchAllGapTable from "../../../tabel-bobot-gaps/queries/getTabelBobotGaps"

const CandidatePage: BlitzPage = () => {
  //api
  const [fetchCandidate, resFCandidate] = useQuery(fetchAllCandidate, {})
  const [fetchCriteria, resCriteria] = useQuery(fetchAllCriteria, {})
  const [fetchSubCriteria, resSubCriteria] = useQuery(fetchAllSubCriteria, {})
  const [fetchGapTable, resAllGapTable] = useQuery(fetchAllGapTable, {})

  return (
    <>
      <Row className="mb-3">
        <Col md={3} sm={12}>
          <Card>
            <Card.Body>
              <h6 className="text-secondary text-center">Action</h6>
              <hr />
              <div className="d-flex flex-column">
                <Button variant="dark">
                  <i className="ni ni-badge"></i> Candidate
                </Button>
                <Button variant="dark">
                  <i className="ni ni-active-40"></i> Penilaian
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9} sm={12}>
          <Info
            criteriaData={resCriteria.isLoading ? [] : fetchCriteria.criteria}
            subCriteriaData={resSubCriteria.isLoading ? [] : fetchSubCriteria.subCriteria}
            candidateData={resFCandidate.isLoading ? [] : fetchCandidate.candidates}
            tabelBobotGap={resAllGapTable.isLoading ? [] : fetchGapTable.tabelBobotGaps}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12} sm={12}>
          <ListCandidateTable />
        </Col>
      </Row>
    </>
  )
}

CandidatePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default CandidatePage
