import React, { useEffect, useRef, useState } from 'react'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRuler } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from '../../../../hooks/AppHooks'
import Measure from './lib/measurement'
import './MeasureTools.css'
const MeasureTools = ({
  activeMenu,
  handleMeasureActive,
  setMeasureActive,
}) => {
  const mapState = useAppSelector((state) => state.mapViewer)
  const [measure, setMeasure] = useState(null)

  useEffect(() => {
    if (mapState.viewer) {
      let measureValue = new Measure(mapState.viewer)
      setMeasure(measureValue)
    }
  }, [mapState.viewer])

  const measureToolsRef = useRef(null)
  const hideMeasureMenu = () => {
    setMeasureActive(false)
    measureToolsRef.current.style.display = 'none'
  }

  const calculateDistance = () => {
    measure.drawLineMeasureGraphics({
      clampToGround: true,
      callback: () => {},
    })
    hideMeasureMenu()
  }
  const calculateArea = () => {
    measure.drawAreaMeasureGraphics({
      clampToGround: true,
    })
    hideMeasureMenu()
  }
  const calculateTriangulation = () => {
    measure.drawTrianglesMeasureGraphics({
      clampToGround: true,
      callback: () => {},
    })
    hideMeasureMenu()
  }
  const clearMeasurements = () => {
    measure._drawLayer.entities.removeAll()
    hideMeasureMenu()
  }

  const toggleMeasureMenu = () => {
    handleMeasureActive()
    // measureToolsRef.current.style
    if (measureToolsRef.current.style.display === 'flex') {
      measureToolsRef.current.style.display = 'none'
    } else {
      measureToolsRef.current.style.display = 'flex'
    }
  }

  if (measureToolsRef.current && !activeMenu) {
    measureToolsRef.current.style.display = 'none'
  }

  return (
    <div className={activeMenu ? 'measure activeMenu' : 'measure'}>
      <button type="button" className="measure-btn" onClick={toggleMeasureMenu}>
        <FontAwesomeIcon
          icon={faRuler}
          size="lg"
          color="white"
          data-toggle="tooltip"
          data-placement="top"
          title="Measure Tool"
        />
      </button>
      <div
        ref={measureToolsRef}
        className="measure-menu"
        style={{ display: 'none' }}

        // dismissable={true}
        // position="bottom"
        // my="center right"
        // at="center bottom"
        // // toggle={toggleOverlayPanel}
      >
        <div
          className="m-1 btn-fa"
          title="Distance Measurement"
          onClick={calculateDistance}
        >
          <i className="fa fa-ruler" aria-hidden="true"></i>
        </div>
        <div className="m-1" title="Area Measurement" onClick={calculateArea}>
          <i className=" fa  fa-draw-polygon"></i>
        </div>
        <div
          className="m-1"
          title="Triangulated Distance Measurement"
          onClick={calculateTriangulation}
        >
          <i className="fa fa-ruler-combined"></i>
        </div>
        <div
          className="m-1"
          title="Clear Measurements"
          onClick={clearMeasurements}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  )
}
export default MeasureTools
