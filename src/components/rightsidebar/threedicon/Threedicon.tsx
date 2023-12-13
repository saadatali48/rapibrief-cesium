import React from 'react'
import { useAppSelector } from '../../../hooks/AppHooks'
import './threedIconStyle.css'

const Threedicon = (props: {
  isOpen: any
  fa3: any
  fad: any
  isOverlay: any
}) => {
  const { isOpen, isOverlay } = props
  const mapMode = useAppSelector((state) => state.mapViewer.mapMode)
  return (
    <div className={`threed ${isOpen || isOverlay == true ? 'active' : ''}`}>
      <div className="map-mode">
        <span className="text-light">{mapMode}</span>
      </div>
    </div>
  )
}

export default Threedicon
