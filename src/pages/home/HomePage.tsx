import React from 'react'
import MapComponent from '../../shared/components/map/Map'
import RightSidebar from '../../shared/components/sidebar/rightsidebar/RightSidebar'
import Tools from '../../components/tools/Tools'
import { appLogo } from '../../assests/images'

const HomePage = () => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '5px',
          margin: 'auto',
          left: '22px',
          zIndex: 10000,
          height: '2rem',
        }}
      >
        <img
          src={appLogo}
          alt="logo"
          width={'100%'}
          style={{ height: '2rem' }}
        />
      </div>
      <MapComponent />
      <RightSidebar />
      <Tools />
    </>
  )
}

export default HomePage
