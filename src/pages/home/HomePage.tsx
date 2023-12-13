import React from 'react'
import MapComponent from '../../shared/components/map/Map'
import RightSidebar from '../../shared/components/sidebar/rightsidebar/RightSidebar'
import Tools from '../../components/tools/Tools'

const HomePage = () => {
  return (
    <>
      <MapComponent />
      <RightSidebar />
      <Tools />
    </>
  )
}

export default HomePage
