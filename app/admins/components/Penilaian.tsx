import { useQuery, useMutation } from "blitz"
import * as _ from "lodash"
import React, { useState, useEffect, useRef } from "react"
import { FormGroup, FormLabel, FormControl, Button,Table, Dropdown, Form, InputGroup } from "react-bootstrap"
import fetchAllCriteria from "../../criteria/queries/getCriteria"
import fetchAllPenilaian from "../../penilaians/queries/getPenilaians"
import updatePenilaian from "../../penilaians/mutations/updatePenilaian"
import { Criteria } from "db"

export const Penilaian: React.FC = () => {
  //ref
  const inputNilaiRef = useRef<HTMLInputElement>(null);

  //state
  const [filteredData, setFilteredData] = useState<any>(null)
  const [colFilData, setColFilData] = useState<any>(null)
  const [selectedData, setSelectedData] = useState<string>("")
  const [filteredId, setFilteredId] = useState<number[]>([])
  const [tableData, setTableData] = useState<any[]>([])
  const [selectedId, setSelectedId] = useState<number|null>(null);

  //api
  const [dataCriteria, criteriaRes] = useQuery(fetchAllCriteria, {})
  const [updateNilai, updateNilaiRes] = useMutation(updatePenilaian)
  const [dataPenilaian, penilaianRes] = useQuery(fetchAllPenilaian, {
    where: {
      subCiteriaId: {
        in: filteredId,
      },
    },
  })

  //action

  const handleUpdatePenilaian = async (id: number) => {
    await updateNilai({
      id,
      nilai: Number.parseFloat(inputNilaiRef.current!.value),
    })

    await penilaianRes.refetch();
    setSelectedId(null)
  }

  const handleChange = (evt: React.ChangeEvent<any>) => {
    const filteredData = dataCriteria.criteria.filter(
      (data) => data.nama == evt.currentTarget.value
    )[0]

    setFilteredData(filteredData)
    let filteredId: number[] = []
    filteredData!.subCriteria.map((data) => {
      filteredId.push(data.id)
    })

    setFilteredId(filteredId)
  }

  useEffect(() => {
    let dataResult: any[] = []
    setTableData(dataResult)
    _.forEach(_.groupBy(dataPenilaian.penilaians, "candidate.id"), function (data, value) {
      const result = data.map((dat) => {
        return {
          nilai: dat.nilai,
          idPenilaian: dat.id,
          subCId: dat.subCiteria.id,
          subCName: dat.subCiteria.nama,
        }
      })
      const nameCandidate = data[0]!.candidate.nama
      dataResult.push({
        data: result,
        nameCandidate,
      })
    })
    setTableData(dataResult)
  }, [filteredId])

  useEffect(() => {
    if (criteriaRes.isFetched && tableData.length == 0) {
      setFilteredData(dataCriteria.criteria[0])
      let filteredId: number[] = []
      if (filteredData && tableData.length == 0) {
        filteredData.subCriteria.map((data) => {
          filteredId.push(data.id)
        })

        setFilteredId(filteredId)
      }
    }
  }, [filteredData])

  return (
    <div>
      {tableData.length ? (
        <div className="card" style={{ minHeight: "340px" }}>
          <div className="card-header pb-0">
            <div className="row">
              <div className="col-lg-6 col-7" style={{ width: "100%" }}>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ width: "100%" }}
                >
                  <h6>
                    List Penilian Sub Kriteria{" "}
                    <span className="text-success text-bold">
                      ( {filteredData && filteredData.nama} )
                    </span>
                  </h6>

                  <span>
                    <FormGroup className="text-xxs">
                      <FormLabel>criteria : </FormLabel>
                      <FormControl onChange={handleChange} size="sm" as="select">
                        {dataCriteria &&
                          dataCriteria.criteria.map((data) => (
                            <option key={data.id} value={data.nama}>
                              {data.nama}
                            </option>
                          ))}
                      </FormControl>
                    </FormGroup>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body px-0 pb-2">
            <sub className="ml-1 text-sm text-danger">
            * click nilai untuk edit
            </sub>
            <div className="table-responsive">
              <table className="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th className="text-uppercase text-center font-weight-bolder text-bold p-2">
                      Nama*
                    </th>
                    {filteredData &&
                      filteredData.subCriteria.map((subCData, num = 1) => (
                        <th key={num++} className="text-uppercase text-center text-xxs p-2">
                          {subCData.nama}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.length &&
                    tableData.map((data, num = 1) => {
                      return (
                        <tr key={num++}>
                          <td className="align-middle text-center">{data.nameCandidate}</td>
                          {data.data.map((resDat, num = 1) => (
                            <td key={num++} className="align-middle text-center">
                            {
                              selectedId == resDat.idPenilaian ? (
                                    <div>
                                      <FormControl
                                        defaultValue={resDat.nilai}
                                        ref={inputNilaiRef}
                                        size="sm"
                                      />
                                      <Button size="sm" variant="outline-secondary" onClick={() => handleUpdatePenilaian(resDat.idPenilaian)}>
                                        Save
                                      </Button>
                                    </div>
                                ) : (
                                <span
                                  style={{
                                    cursor: "pointer"
                                  }}
                                  onClick={() => setSelectedId(resDat.idPenilaian)}
                                >
                                    {resDat.nilai}
                                </span>
                                )
                              }
                            </td>
                          ))}
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>Load Data. . . </div>
      )}
    </div>
  )
}
