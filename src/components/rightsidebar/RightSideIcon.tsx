import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './RightSidebarToolbar.css'
const RightSideIcon = (props) => {
  const {
    ToggleSidebar,
    isOpen,
    faMap,
    faInfoCircle,
    faLayerGroup,
    ToggleOverlays,
    isOverlay,
  } = props

  const [activeToolbar, setActiveToolbar] = useState('')

  const handleActive = (activeType: string) => {
    setActiveToolbar(activeType)
    if (activeType === 'map') {
      if (isOverlay) {
        ToggleOverlays()
      }
      ToggleSidebar()
    }
    if (activeType === 'Overlay') {
      if (isOpen) {
        ToggleSidebar()
      }
      ToggleOverlays()
    }
  }
  useEffect(() => {
    if (!isOpen && activeToolbar === 'map') {
      setActiveToolbar('')
    }
    if (!isOverlay && activeToolbar === 'Overlay') {
      setActiveToolbar('')
    }
  }, [isOpen, isOverlay])

  return (
    <div
      className={`right-sidebar ${isOpen || isOverlay == true ? 'active' : ''}`}
    >
      <div
        className={
          activeToolbar === 'map' ? 'toolbar-btn active' : 'toolbar-btn'
        }
      >
        <FontAwesomeIcon
          icon={faMap}
          size="lg"
          color="white"
          onClick={() => handleActive('map')}
          data-toggle="tooltip"
          title="Layers"
        />
      </div>

      <div
        className={
          activeToolbar === 'info' ? 'toolbar-btn active' : 'toolbar-btn'
        }
      >
        <FontAwesomeIcon
          icon={faInfoCircle}
          size="lg"
          color="white"
          onClick={() => handleActive('info')}
          data-toggle="tooltip"
          title="info"
        />
      </div>

      <div
        className={
          activeToolbar === 'Overlay' ? 'toolbar-btn active' : 'toolbar-btn'
        }
      >
        <FontAwesomeIcon
          icon={faLayerGroup}
          size="lg"
          color="white"
          onClick={() => handleActive('Overlay')}
          data-toggle="tooltip"
          title="Overlay"
        />
      </div>
    </div>
  )
}

export default RightSideIcon
