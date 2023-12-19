import { UrlTemplateImageryProvider } from 'cesium'
import React, { useState } from 'react'
import { useAppSelector } from '../../../hooks/AppHooks'
import DragDrop from '../../dragdrop/DrapDrop'
import './style.css'

const OnBtnClickOverlay = (props) => {
  const mapState = useAppSelector((state) => state.mapViewer)
  const weatherData = useAppSelector((state) => state.weatherPicture)

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

  const toggleSurfaceTemperature = (e) => {
    if (e.target.checked) {
      const surfaceTemperatureOverlay = new UrlTemplateImageryProvider({
        url: 'https://weather.openportguide.org/tiles/actual/surface_pressure/0h/{z}/{x}/{y}.png',
        credit: '',
        customTags: 'Surface Temperature',
      })
      mapState.viewer.imageryLayers.addImageryProvider(
        surfaceTemperatureOverlay
      )
    } else {
      mapState.viewer.imageryLayers._layers.forEach((layer) => {
        if (
          layer.imageryProvider.url ==
          'https://weather.openportguide.org/tiles/actual/surface_pressure/0h/{z}/{x}/{y}.png'
        ) {
          mapState.viewer.imageryLayers.remove(layer)
        }
      })
    }
  }
  const toggleWindStream = (e) => {
    if (e.target.checked) {
      const surfaceTemperatureOverlay = new UrlTemplateImageryProvider({
        url: 'https://openportguide.org/tiles/actual/wind_stream/0h/{z}/{x}/{y}.png',
        credit: '',
        customTags: 'Surface Temperature',
      })
      mapState.viewer.imageryLayers.addImageryProvider(
        surfaceTemperatureOverlay
      )
    } else {
      mapState.viewer.imageryLayers._layers.forEach((layer) => {
        if (
          layer.imageryProvider.url ==
          'https://openportguide.org/tiles/actual/wind_stream/0h/{z}/{x}/{y}.png'
        ) {
          mapState.viewer.imageryLayers.remove(layer)
        }
      })
    }
  }
  const toggleAirTemperature = (e) => {
    if (e.target.checked) {
      const surfaceTemperatureOverlay = new UrlTemplateImageryProvider({
        url: 'https://openportguide.org/tiles/actual/air_temperature/0h/{z}/{x}/{y}.png',
        credit: '',
        customTags: 'Surface Temperature',
      })
      mapState.viewer.imageryLayers.addImageryProvider(
        surfaceTemperatureOverlay
      )
    } else {
      mapState.viewer.imageryLayers._layers.forEach((layer) => {
        if (
          layer.imageryProvider.url ==
          'https://openportguide.org/tiles/actual/air_temperature/0h/{z}/{x}/{y}.png'
        ) {
          mapState.viewer.imageryLayers.remove(layer)
        }
      })
    }
  }

  const togglePrecipitation = (e) => {
    if (e.target.checked) {
      const surfaceTemperatureOverlay = new UrlTemplateImageryProvider({
        url: 'http://openportguide.org/tiles/actual/precipitation/0h/{z}/{x}/{y}.png',
        credit: '',
        customTags: 'Surface Temperature',
      })
      mapState.viewer.imageryLayers.addImageryProvider(
        surfaceTemperatureOverlay
      )
    } else {
      mapState.viewer.imageryLayers._layers.forEach((layer) => {
        if (
          layer.imageryProvider.url ==
          'http://openportguide.org/tiles/actual/precipitation/0h/{z}/{x}/{y}.png'
        ) {
          mapState.viewer.imageryLayers.remove(layer)
        }
      })
    }
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
      <div className="sd-body-1">
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
          {/* <li className=" d-flex ">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={toggleNauticalCharts}
            />
            <img
              className="ms-2 me-2"
              src={twodside}
              alt="Nautical Charts"
              width="20%"
              // height="40%"
            />
            <span>Nautical Charts</span>
          </li> */}
          <li className=" d-flex ">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={toggleSurfaceTemperature}
            />
            <img
              className="ms-2 me-2"
              src={twodside}
              alt="Nautical Charts"
              width="20%"
              // height="40%"
            />
            <span>Surface Temperature</span>
          </li>
          <li className=" d-flex ">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={toggleWindStream}
            />
            <img
              className="ms-2 me-2"
              src={twodside}
              alt="Nautical Charts"
              width="20%"
              // height="40%"
            />
            <span>Wind Stream</span>
          </li>
          <li className=" d-flex ">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={toggleAirTemperature}
            />
            <img
              className="ms-2 me-2"
              src={twodside}
              alt="Nautical Charts"
              width="20%"
              // height="40%"
            />
            <span>Air Temperature</span>
          </li>
          <li className=" d-flex ">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={togglePrecipitation}
            />
            <img
              className="ms-2 me-2"
              src={twodside}
              alt="Nautical Charts"
              width="20%"
              // height="40%"
            />
            <span>Precipitation</span>
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
