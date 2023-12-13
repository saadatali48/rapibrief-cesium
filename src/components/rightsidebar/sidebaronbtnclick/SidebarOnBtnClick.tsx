import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/AppHooks'
import { setBaseMap, setMapMode } from '../../../shared/reducer/reducer'
import { osm, lightGray, darkGray } from '../../../assests/images/index'
import './SidebarOnBtnClick.css'
const SidebarOnBtnClick = (props) => {
  const dispatch = useAppDispatch()
  const mapState = useAppSelector((state) => state.mapViewer)
  const [modeStatus, setModeStatus] = useState('ThreeD')
  const [activeBasemap, setActiveBasemap] = useState('satellite')
  const toggleBaseMap = (basemap: any) => {
    dispatch(setBaseMap(basemap))
    setActiveBasemap(basemap)
  }
  const show2DMap = () => {
    if (mapState.viewer) {
      mapState.viewer.scene.morphTo2D()
      setModeStatus('TwoD')
      dispatch(setMapMode('2D'))
    }
  }
  const show3DMap = () => {
    if (mapState.viewer) {
      mapState.viewer.scene.morphTo3D()
      setModeStatus('ThreeD')
      dispatch(setMapMode('3D'))
    }
  }
  const { isOpen, ToggleSidebar, threedside, twodside, satellite } = props
  return (
    <div className={`sidebar ${isOpen == true ? 'active' : ''}`}>
      <div className="sd-header">
        <h4 className="mb-0">Map Layers</h4>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={ToggleSidebar}
        ></button>
      </div>
      <hr className="hr" />
      <div className="sd-body hoverPointer">
        <ul>
          <li onClick={show3DMap}>
            <span className="title">3D</span>
            <img
              src={threedside}
              className={modeStatus === 'ThreeD' ? 'mode-style' : ''}
              alt="3d mapp"
              width="100%"
            />
          </li>
          <li onClick={show2DMap}>
            <span className="title">2D</span>
            <img
              src={twodside}
              className={modeStatus === 'TwoD' ? 'mode-style' : ''}
              alt="2d mapp"
              width="100%"
            />
          </li>
          <hr />

          <li onClick={() => toggleBaseMap('satellite')}>
            <span className="title"> Satellite </span>
            <img
              className={activeBasemap === 'satellite' ? 'mode-style' : ''}
              src={satellite}
              alt="satellite"
              width="100%"
            />
          </li>
          <li onClick={() => toggleBaseMap('osm')}>
            <span className="title">OSM </span>
            <img
              className={activeBasemap === 'osm' ? 'mode-style' : ''}
              src={osm}
              alt="osm"
              width="100%"
            />
          </li>
          <li onClick={() => toggleBaseMap('lightgray')}>
            <span className="title">Light Gray</span>
            <img
              className={activeBasemap === 'lightgray' ? 'mode-style' : ''}
              src={lightGray}
              alt="lightgray"
              width="100%"
            />
          </li>
          <li onClick={() => toggleBaseMap('darkgray')}>
            <span className="title">Dark Gray</span>
            <img
              className={activeBasemap === 'darkgray' ? 'mode-style' : ''}
              src={darkGray}
              alt="darkgray"
              width="100%"
            />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SidebarOnBtnClick
