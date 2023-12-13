import React, { useState } from 'react'
import MeasureTools from '../../../shared/components/map/measure-tools/MeasureTools'
import './DrawIcons.css'
import LineOfSight from '../../../shared/components/map/line-of-sight/LineOfSight'

const DrawIcons = (props: { isOpen: any; isOverlay: any }) => {
  const { isOpen, isOverlay } = props
  const [measureActive, setMeasureActive] = useState(false)
  const [losActive, setLosActive] = useState(false)

  const handleMeasureActive = () => {
    setMeasureActive(!measureActive)
    if (losActive) {
      setLosActive(false)
    }
  }
  const handleLosActive = () => {
    setLosActive(!losActive)
    if (measureActive) {
      setMeasureActive(false)
    }
  }
  return (
    <div className={`draw ${isOpen || isOverlay == true ? 'active' : ''}`}>
      <div className="draw-components">
        <MeasureTools
          activeMenu={measureActive}
          handleMeasureActive={handleMeasureActive}
          setMeasureActive={setMeasureActive}
        />
      </div>

      <div className="draw-components">
        <LineOfSight
          activeMenu={losActive}
          handleLosActive={handleLosActive}
          setLosActive={setLosActive}
        />
      </div>
    </div>
  )
}

export default DrawIcons
