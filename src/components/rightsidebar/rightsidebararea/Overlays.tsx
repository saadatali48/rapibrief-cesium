import { UrlTemplateImageryProvider } from 'cesium'
import React, { useState } from 'react'
import { useAppSelector } from '../../../hooks/AppHooks'
import DragDrop from '../../dragdrop/DrapDrop'
import './style.css'

const OnBtnClickOverlay = (props) => {
  const mapState = useAppSelector((state) => state.mapViewer)
  const [nauticalChartLayer]: any = useState(
    new UrlTemplateImageryProvider({
      url: 'http://10.20.20.110:8089/overlays/nautical_charts/{z}/{x}/{y}.png',
    })
  )
  const toggleNauticalCharts = (e) => {
    if (e.target.checked) {
      addNauticalChartsLayerToMap()
    } else {
      removeNauticalChartsLayerToMap()
    }
  }
  const addNauticalChartsLayerToMap = () => {
    nauticalChartLayer.properties = { name: 'nautical_charts' }
    mapState.viewer.imageryLayers.addImageryProvider(nauticalChartLayer)
  }
  const removeNauticalChartsLayerToMap = () => {
    mapState.viewer.imageryLayers._layers.forEach((layer) => {
      if (
        layer._imageryProvider.properties &&
        layer._imageryProvider.properties.name == 'nautical_charts'
      ) {
        mapState.viewer.imageryLayers.remove(layer)
      }
    })
  }
  const {
    isOverlay,
    ToggleOverlays,
    twodside,
    satellite,
    terrain,
    heatmap,
    custom,
  } = props
  return (
    <div className={`sidebar ${isOverlay == true ? 'active' : ''}`}>
      <div className="sd-header">
        <h4 className="mb-0">Map Layers</h4>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={ToggleOverlays}
        ></button>
      </div>
      <hr />
      <div className="sd-body">
        <DragDrop />
        <div className="on-off">
          <span>Overlays</span>
          <button
            type="button"
            className="btn btn-lg btn-toggle active"
            data-toggle="button"
            aria-pressed="true"
            // autocomplete="false"
          >
            {/* <div className="handle">on</div> */}
          </button>
        </div>
        <hr className="hr" />
        <p>Select overlays and turn on to view it</p>
        <ul>
          <li className=" d-flex justify-content-between">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={toggleNauticalCharts}
            />
            <img
              src={twodside}
              alt="Nautical Charts"
              width="20%"
              height="40%"
            />
            <span>Nautical Charts</span>
          </li>
          {/* <li className="d-flex justify-content-between">
            <input type="checkbox" className="form-check-input" />
            <img src={satellite} alt="2d mapp" width="20%" height="40%" />
            <span>AreaX101 Map</span>
          </li>

          <li className="d-flex justify-content-between">
            <input type="checkbox" className="form-check-input" />
            <img src={terrain} alt="2d mapp" width="20%" height="40%" />
            <span>Military Camps</span>
          </li>
          <li className=" d-flex justify-content-between">
            <input type="checkbox" className="form-check-input" />
            <img src={heatmap} alt="2d mapp" width="20%" height="40%" />
            <span>AreaX101 Map</span>
          </li>
          <li className="d-flex justify-content-between">
            <input type="checkbox" className="form-check-input" />
            <img src={custom} alt="2d mapp" width="20%" height="40%" />
            <span>AreaX101 Map</span>
          </li>
          <li className=" d-flex justify-content-between">
            <input type="checkbox" className="form-check-input" />
            <img src={satellite} alt="2d mapp" width="20%" height="40%" />
            <span>AreaX101 Map</span>
          </li> */}
        </ul>
      </div>
    </div>
  )
}

export default OnBtnClickOverlay
