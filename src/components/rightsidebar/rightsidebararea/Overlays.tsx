import {
  Cartesian2,
  Cartesian3,
  ClockRange,
  Color,
  CustomDataSource,
  Entity,
  HorizontalOrigin,
  JulianDate,
  NearFarScalar,
  SampledPositionProperty,
  UrlTemplateImageryProvider,
  VerticalOrigin,
  Viewer,
} from 'cesium'
import React, { useState } from 'react'
import { useAppSelector } from '../../../hooks/AppHooks'
import DragDrop from '../../dragdrop/DrapDrop'
import * as satelliteLib from 'satellite.js'
import './style.css'
import {
  satelliteIcon,
  satelliteDataFile,
  windStream,
  surfaceTemperature,
  airTemperature,
  precipitation,
  satellitePicture,
} from '../../../assests/images'

const OnBtnClickOverlay = (props) => {
  const mapState = useAppSelector((state) => state.mapViewer)
  // const weatherData = useAppSelector((state) => state.weatherPicture)

  const satelliteEntityCollection = new CustomDataSource('satellite_data')

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
  function createSatelliteEntities(data, name) {
    const viewer = mapState.viewer
    const totalSeconds = 600
    const timestepInSeconds = 1
    const start = JulianDate.fromDate(new Date())
    const stop = JulianDate.addSeconds(start, totalSeconds, new JulianDate())
    viewer.clock.startTime = start.clone()
    viewer.clock.stopTime = stop.clone()
    viewer.clock.currentTime = start.clone()
    viewer.timeline.zoomTo(start, stop)

    viewer.clock.multiplier = 1
    viewer.clock.clockRange = ClockRange.LOOP_STOP
    const positionsOverTime = new SampledPositionProperty()
    for (let i = 0; i < totalSeconds; i += timestepInSeconds) {
      const time = JulianDate.addSeconds(start, i, new JulianDate())
      const jsDate = JulianDate.toDate(time)
      const positionAndVelocity: any = satelliteLib.propagate(data, jsDate)
      const gmst = satelliteLib.gstime(jsDate)
      const p = satelliteLib.eciToGeodetic(positionAndVelocity.position, gmst)
      const position = Cartesian3.fromRadians(
        p.longitude,
        p.latitude,
        p.height * 1000
      )
      positionsOverTime.addSample(time, position)
    }
    let entity = new Entity({
      position: positionsOverTime,
      name: name,
      //@ts-expect-error
      type: 'satellite',

      billboard: {
        image: satelliteIcon,
        scale: 0.5,
      },
      label: {
        text: name,
        font: '12px sans-serif',
        horizontalOrigin: HorizontalOrigin.CENTER,
        verticalOrigin: VerticalOrigin.CENTER,
        pixelOffset: new Cartesian2(0, 10),
        outlineColor: Color.BLACK,
        outlineWidth: 1,
        scaleByDistance: new NearFarScalar(1.5e2, 2, 8.0e6, 0.0),
      },
    })
    //@ts-expect-error
    entity.satProperties = {
      name: name,
      satnum: data.satnum,
      epoch: data.epochdays,
    }
    satelliteEntityCollection.entities.add(entity)
    viewer.clock.shouldAnimate = true
  }

  const addSatellitesToMap = () => {
    const viewer = mapState.viewer
    viewer.dataSources.add(satelliteEntityCollection)
    fetch(satelliteDataFile)
      .then((res) => res.text())
      .then((parsedText) => {
        var rowsList = parsedText.split('\n')
        for (let i = 0; i < rowsList.length; i += 3) {
          let satrec = satelliteLib.twoline2satrec(
            rowsList[i + 1],
            rowsList[i + 2]
          )
          createSatelliteEntities(satrec, rowsList[i])
        }
      })
  }

  const removeSatellitesFromMap = () => {
    const viewer: any = mapState.viewer
    viewer?.dataSources?._dataSources?.forEach((ds) => {
      if (ds.name == 'satellite_data') {
        ds.entities.removeAll()
        viewer.dataSources.remove(ds)
      }
    })
  }

  const toggleSatellitePicture = (e) => {
    if (e.target.checked) {
      addSatellitesToMap()
    } else {
      removeSatellitesFromMap()
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
          <li className=" d-flex ">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={toggleSurfaceTemperature}
            />
            <img
              className="ms-2 me-2"
              src={surfaceTemperature}
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
              src={windStream}
              alt="Wind Stream"
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
              src={airTemperature}
              alt="Air Temperature"
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
              src={precipitation}
              alt="Precipitation"
              width="20%"
              // height="40%"
            />
            <span>Precipitation</span>
          </li>
          <li className=" d-flex ">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={toggleSatellitePicture}
            />
            <img
              className="ms-2 me-2"
              src={satellitePicture}
              alt="Satellite Picture"
              width="20%"
              // height="40%"
            />
            <span>Satellite Picture</span>
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
