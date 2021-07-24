import React from "react"
import { useRouter } from "blitz"

export const Header: React.FC = () => {
  const router = useRouter()

  const lenPath = router.pathname.split("/").length
  const pathList = router.pathname.split("/")
  const name = pathList[lenPath - 1]

  return (
    <nav
      className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
      id="navbarBlur"
      navbar-scroll="true"
    >
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            {pathList.map((dataList, key) => (
              <>
                <li
                  style={{ cursor: "pointer" }}
                  key={key}
                  className={`breadcrumb-item text-sm ${
                    dataList == name ? "text-dark active" : ""
                  }`}
                >
                  {dataList}
                </li>
              </>
            ))}
          </ol>
          <h3 className="font-weight-bolder mb-0">{name}</h3>
        </nav>
      </div>
    </nav>
  )
}
