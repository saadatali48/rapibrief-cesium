import React, { useState } from 'react'
import './Sidebar.css'
import SidebarDetail from './sidebardetail/SidebarDetail'

const Sidebar = (props: any) => {
  const arrData = props.arrData
  const [latestSidebar, setLatestSidebar] = useState(arrData)

  const toggleMenu = (items: any) => {
    let updatedArray = [...latestSidebar]
    const selctedIndex = latestSidebar?.findIndex(
      (item: any) => item?.name === items?.name
    )
    latestSidebar?.map((data: { name: any; active: boolean }) => {
      if (data?.name == items?.name) {
        updatedArray[selctedIndex].active = !updatedArray[selctedIndex].active
      } else {
        data.active = false
      }
    })
    setLatestSidebar(updatedArray)
  }

  return (
    <div className="d-flex">
      <div className="sidebarMain d-flex flex-column align-items-center">
        {latestSidebar?.map((items: any, index: any) => {
          return (
            <div key={index} className="even">
              <div className={items.active ? 'btn bg-white p-0' : 'btn p-0'}>
                <img
                  src={items.active ? items.selectedIcon : items.icon}
                  onClick={() => {
                    toggleMenu(items)
                  }}
                  title= {items?.title}
                  className="nav-image"
                />
              </div>
            </div>
          )
        })}
      </div>
      <div> 
        {latestSidebar?.map((item: any, index: any) =>
          item?.active ? <SidebarDetail key={index} showdetail={item}/> : ''
        )}
        
      </div>
    </div>
  )
}

export default Sidebar
