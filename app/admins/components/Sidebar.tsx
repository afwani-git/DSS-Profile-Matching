import React from "react"
import { useRouter } from "blitz"

type listPageType = {
  name: string
  link: string
  icon: string
}

const listPage: listPageType[] = [
  {
    name: "Home",
    link: "/admin",
    icon: "ni ni-atom",
  },
  {
    name: "Criteria",
    link: "/admin/criteria",
    icon: "ni ni-bullet-list-67",
  },
  {
    name: "Sub Criteria",
    link: "/admin/criteria/sub",
    icon: "ni ni-archive-2",
  },
  {
    name: "Gap Table",
    link: "/admin/gap",
    icon: "ni ni-ruler-pencil",
  },
  {
    name: "Candidate",
    link: "/admin/candidate",
    icon: "ni ni-circle-08",
  },
  {
    name: "Ranking",
    link: "/admin/ranking",
    icon: "ni ni-trophy",
  },
]

export const SideBar: React.FC = () => {
  const router = useRouter()

  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 "
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <i
          className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <a className="navbar-brand m-0" href="/admin" target="_blank">
          <span className="ms-1 font-weight-bold">Spk - Profile Match</span>
        </a>
      </div>
      <hr className="horizontal dark mt-0" />
      <div
        className="collapse navbar-collapse  w-auto  max-height-vh-100 h-100"
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          {listPage.map((data) => (
            <li className="nav-item" key={data.link}>
              <a
                className={`nav-link ${router.pathname == data.link ? "active" : ""}`}
                href={data.link}
              >
                <div className="icon icon-shape icon-md shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i
                    className={data.icon}
                    style={{ color: `${router.pathname == data.link ? "white" : "black"}` }}
                  ></i>
                </div>
                <span className="nav-link-text ms-1">{data.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
