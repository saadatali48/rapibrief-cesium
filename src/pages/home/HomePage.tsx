import React from 'react'
import MapComponent from '../../shared/components/map/Map'
import RightSidebar from '../../shared/components/sidebar/rightsidebar/RightSidebar'
import Tools from '../../components/tools/Tools'
import { logo } from '../../assests/images'

const HomePage = () => {
  return (
    <>
      <div style={{position:'absolute',top:'5px',margin:'auto',left:"40%",zIndex:10000,height:"2rem"}}>
        <img src={logo} alt="logo" width={"100%"}  />
      </div>
      <MapComponent />
      <RightSidebar />
      <Tools />
    </>
  )
}

export default HomePage
