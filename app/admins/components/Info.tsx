import React from "react"
import { Candidate, Criteria, SubCriteria, TabelBobotGap } from "db"
import { Row, Col } from "react-bootstrap"
import Moment from "react-moment"

interface Props {
  candidateData: Candidate[]
  subCriteriaData: SubCriteria[]
  criteriaData: Criteria[]
  tabelBobotGap: TabelBobotGap[]
}

export const Info: React.FC<Props> = ({
  candidateData,
  subCriteriaData,
  criteriaData,
  tabelBobotGap,
}) => (
  <Row>
    <Col md={4} xl={4} sm={12}>
      <div className="card mb-3 bg-gradient-dark text-white">
        <div className="card-body p-3">
          <div className="row">
            <div className="col-8">
              <div className="numbers">
                <p className="text-sm mb-0 text-capitalize font-weight-bold">Candidate</p>
                <h5 className="font-weight-bolder mb-0 text-white">{candidateData.length}</h5>
              </div>
            </div>
            <div className="col-4 text-end">
              <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                <i className="ni ni-single-02 text-lg opacity-10" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
    <Col md={4} xl={4} sm={12}>
      <div className="card mb-3 bg-black bg-gradient-dark text-white">
        <div className="card-body p-3">
          <div className="row">
            <div className="col-8">
              <div className="numbers">
                <p className="text-sm mb-0 text-capitalize font-weight-bold">Sub Criteria</p>
                <h5 className="font-weight-bolder mb-0 text-white">{subCriteriaData.length}</h5>
              </div>
            </div>
            <div className="col-4 text-end">
              <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                <i className="ni ni-archive-2 text-lg opacity-10" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
    <Col md={4} xl={4} sm={12}>
      <div className="card mb-3 bg-black bg-gradient-dark text-white">
        <div className="card-body p-3">
          <div className="row">
            <div className="col-8">
              <div className="numbers">
                <p className="text-sm mb-0 text-capitalize font-weight-bold">Criteria</p>
                <h5 className="font-weight-bolder mb-0 text-white">{criteriaData.length}</h5>
              </div>
            </div>
            <div className="col-4 text-end">
              <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                <i className="ni ni-bullet-list-67 text-lg opacity-10" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
    <Col md={4} xl={4} sm={12}>
      <div className="card bg-gradient-dark text-white">
        <div className="card-body p-3">
          <div className="row">
            <div className="col-8">
              <div className="numbers">
                <p className="text-sm mb-0 text-capitalize font-weight-bold">Gap Table</p>
                <h5 className="font-weight-bolder mb-0 text-white">{tabelBobotGap.length}</h5>
              </div>
            </div>
            <div className="col-4 text-end">
              <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                <i className="ni ni-ruler-pencil text-lg opacity-10" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
    <Col md={4} xl={4} sm={12}>
      <div className="card bg-gradient-dark text-white">
        <div className="card-body p-3">
          <div className="row">
            <div className="col-8">
              <div className="numbers">
                <p className="text-sm mb-0 text-capitalize font-weight-bold">Clock</p>
                <h5 className="font-weight-bolder mb-0 text-white">
                  <Moment format="hh:mm A" />
                </h5>
              </div>
            </div>
            <div className="col-4 text-end">
              <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                <i className="ni ni-watch-time text-lg opacity-10" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
  </Row>
)
