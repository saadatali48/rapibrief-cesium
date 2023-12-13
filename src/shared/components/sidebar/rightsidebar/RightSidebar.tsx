import React, { useState } from 'react'
import {
  fa3,
  faD,
  faFileEdit,
  faInfoCircle,
  faLayerGroup,
  faMap,
  faRuler,
} from '@fortawesome/free-solid-svg-icons'
import {
  terrain,
  satellite,
  heatmap,
  custom,
  twodside,
  threedside,
} from '../../../../assests/images'
import './RightSidebar.css'
import RightSideIcon from '../../../../components/rightsidebar/RightSideIcon'
import Threedicon from '../../../../components/rightsidebar/threedicon/Threedicon'
import DrawIcons from '../../../../components/rightsidebar/drawicons/DrawIcons'
import SidebarOnBtnClick from '../../../../components/rightsidebar/sidebaronbtnclick/SidebarOnBtnClick'
import OnBtnClickOverlay from '../../../../components/rightsidebar/rightsidebararea/Overlays'

const RightSidebar = () => {
  const [isOpen, setIsopen] = useState(false)
  const [isOverlay, setIsOverlay] = useState(false)

  const ToggleSidebar = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isOpen === true ? setIsopen(false) : setIsopen(true)
  }
  const ToggleOverlays = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isOverlay === true ? setIsOverlay(false) : setIsOverlay(true)
  }
  return (
    <>
      <RightSideIcon
        ToggleSidebar={ToggleSidebar}
        isOpen={isOpen}
        faMap={faMap}
        faInfoCircle={faInfoCircle}
        faLayerGroup={faLayerGroup}
        ToggleOverlays={ToggleOverlays}
        isOverlay={isOverlay}
      />

      <Threedicon isOpen={isOpen} fa3={fa3} fad={faD} isOverlay={isOverlay} />
      <DrawIcons isOpen={isOpen} isOverlay={isOverlay} />
      <SidebarOnBtnClick
        isOpen={isOpen}
        ToggleSidebar={ToggleSidebar}
        threedside={threedside}
        twodside={twodside}
        satellite={satellite}
        terrain={terrain}
        heatmap={heatmap}
        custom={custom}
      />
      <OnBtnClickOverlay
        isOverlay={isOverlay}
        ToggleOverlays={ToggleOverlays}
        threedside={threedside}
        twodside={twodside}
        satellite={satellite}
        terrain={terrain}
        heatmap={heatmap}
        custom={custom}
      />
      <div
        className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`}
        onClick={ToggleSidebar}
      ></div>
    </>
  )
}

export default RightSidebar
