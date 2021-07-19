import React from "react"
import { FormGroup, FormLabel, FormControl, Table, Dropdown, Form } from "react-bootstrap"

export const Penilaian: React.FC = () => (
  <div>
    <div className="card" style={{ minHeight: "340px" }}>
      <div className="card-header pb-0">
        <div className="row">
          <div className="col-lg-6 col-7" style={{ width: "100%" }}>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "100%" }}
            >
              <h6>List Penilian Sub Kriteria</h6>

              <span className="d-flex">
                <FormGroup className="d-flex text-xxs align-items-center">
                  <FormLabel>criteria:</FormLabel>
                  <FormControl size="sm" as="select">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </FormControl>
                </FormGroup>
                <FormGroup className="d-flex text-xxs align-items-center">
                  <FormLabel>sub criteria:</FormLabel>
                  <FormControl size="sm" as="select">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </FormControl>
                </FormGroup>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body px-0 pb-2">
        <div className="table-responsive">
          <table className="table align-items-center mb-0">
            <thead>
              <tr>
                <th className="text-uppercase text-center text-xxs font-weight-bolder text-bold p-2">
                  Nama
                </th>
                <th className="text-uppercase text-center text-xxs p-2">Sub K1</th>
                <th className="text-uppercase text-center text-xxs p-2">Sub K2</th>
                <th className="text-uppercase text-center text-xxs p-2">Sub K3</th>
                <th className="text-uppercase text-center text-xxs p-2">Sub K4</th>
                <th className="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              <tr key={1}>
                <td className="align-middle text-center">1</td>
                <td className="align-middle text-center">2</td>
                <td className="align-middle text-center">3</td>
                <td className="align-middle text-center">4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
)
