import React, { useEffect, useState } from 'react'
import './Tools.css'
import { ToolsData } from './ToolsData'
import { useAppSelector } from '../../hooks/AppHooks'
import {
  Cartesian3,
  Cartographic,
  ClockRange,
  Color,
  HeightReference,
  HorizontalOrigin,
  JulianDate,
  LinearApproximation,
  PointGraphics,
  SampledPositionProperty,
  SceneMode,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  TimeInterval,
  TimeIntervalCollection,
  VelocityOrientationProperty,
  VerticalOrigin,
  Math as cesiumMath,
  defined,
} from 'cesium'
import { heli1, planeModel1, drone, locationPoi } from '../../assests/images'
import CesiumDrawer from '../../shared/components/map/cesiumDraw'
import ColorPicker from '@nafise622/material-ui-color-picker'
let activeEntity: any = null
const Tools = () => {
  const viewer = useAppSelector((store: any) => store.mapViewer.viewer)
  const [editStyle, setEditStyle] = useState(false)

  let handler: any
  let eventHandler: any
  let drawer: CesiumDrawer

  useEffect(() => {
    if (viewer) {
      handler = new ScreenSpaceEventHandler(viewer.scene?.canvas)
      drawer = new CesiumDrawer(viewer, {})
      eventHandler = new ScreenSpaceEventHandler(viewer.scene?.canvas)
      eventHandler.setInputAction(function (movement: any) {
        if (movement.position) {
          const pickedObject = viewer.scene.pick(movement.position)
          if (
            defined(pickedObject) &&
            defined(pickedObject.id) &&
            defined(pickedObject.id.polygon)
          ) {
            activeEntity = pickedObject.id
            setEditStyle(true)
          } else {
            setEditStyle(false)
          }
        }
      }, ScreenSpaceEventType.LEFT_DOWN)
    }
  }, [viewer])

  let pathPositions = []

  const start = JulianDate.fromDate(new Date())
  const stop = JulianDate.addSeconds(start, 360, new JulianDate())

  const computePath = () => {
    var times = []
    const property = new SampledPositionProperty()

    for (let i = 0; i < pathPositions.length; i++) {
      const time = JulianDate.addSeconds(start, i * 10, new JulianDate())
      times.push(time)
      property.addSample(time, pathPositions[i])
      viewer.entities.add({
        position: pathPositions[i],
        point: {
          pixelSize: 8,
          color: Color.TRANSPARENT,
          outlineColor: Color.YELLOW,
          outlineWidth: 3,
        },
      })
    }

    return property
  }

  const addFlyingEntity = (modelUrl: any, minPixelSize: number) => {
    //Set the random number seed for consistent results.
    cesiumMath.setRandomNumberSeed(3)

    //Set bounds of our simulation time

    //Make sure viewer is at the desired time.
    viewer.clock.startTime = start.clone()
    viewer.clock.stopTime = stop.clone()
    viewer.clock.currentTime = start.clone()
    viewer.clock.clockRange = ClockRange.LOOP_STOP //Loop at the end
    viewer.clock.multiplier = 5
    viewer.clock.shouldAnimate = true

    //Set timeline to simulation bounds
    viewer.timeline.zoomTo(start, stop)
    const position = computePath()

    //Actually create the entity
    const entity = viewer.entities.add({
      //Set the entity availability to the same interval as the simulation time.
      availability: new TimeIntervalCollection([
        new TimeInterval({
          start: start,
          stop: stop,
        }),
      ]),

      //Use our computed positions
      position: position,

      //Automatically compute orientation based on position movement.
      orientation: new VelocityOrientationProperty(position),

      //Load the Cesium plane model to represent the entity
      model: {
        uri: modelUrl,
        minimumPixelSize: minPixelSize,
      },

      //Show the path as a pink line sampled in 1 second increments.
      // path: {
      //   resolution: 1,
      //   material: new PolylineGlowMaterialProperty({
      //     glowPower: 0.1,
      //     color: Color.YELLOW,
      //   }),
      //   width: 10,
      // },
    })
    entity.position.setInterpolationOptions({
      interpolationDegree: 5,
      interpolationAlgorithm: LinearApproximation,
    })
  }

  const onLeftDown = (movement: any) => {
 

    if (movement.position && viewer) {
      let ellipsoid = viewer.scene.globe.ellipsoid
      let cartesian = viewer.camera.pickEllipsoid(movement.position, ellipsoid)
      const cartographicPos = Cartographic.fromCartesian(cartesian)
      cartographicPos.height = 300
      const newPos = Cartesian3.fromRadians(
        cartographicPos.longitude,
        cartographicPos.latitude,
        15000
      )
      pathPositions.push(newPos)
     
    }
  }
  const onLeftDoubleClick = (movement: any, selectedItemId: number) => {
    if (movement.position && viewer) {
      if (selectedItemId === 11) {
        addFlyingEntity(planeModel1, 32)
      } else if (selectedItemId === 12) {
        addFlyingEntity(heli1, 128)
      } else if (selectedItemId === 10) {
        addFlyingEntity(drone, 128)
      }
      handler.removeInputAction(ScreenSpaceEventType.LEFT_DOWN)
      handler.removeInputAction(ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    }
  }

  const drawPolyline = (selectedItemId) => {
    pathPositions = []
    handler.setInputAction(function (movement: any) {
      onLeftDown(movement)
    }, ScreenSpaceEventType.LEFT_DOWN)
    handler.setInputAction(function (movement: any) {
      if (viewer.scene?.mode !== SceneMode.MORPHING) {
        onLeftDoubleClick(movement, selectedItemId)
      }
    }, ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
  }

  const drawShape = (drawType: string) => {
    var pointIcon = {
      image: locationPoi,
      scale: 1,
      clampToGround: true,
    }
    drawer = new CesiumDrawer(viewer, {})


    if (drawType === 'polyline') {
      drawer.startDraw({
        type: 'polyline',
      })
    } else if (drawType === 'rectangle') {
      drawer.startDraw({
        type: 'rectangle',
      })
    } else if (drawType === 'polygon') {
      drawer.startDraw({
        type: 'polygon',
      })
      drawer.on('finishDraw', function (e) {
        drawer.activeEntity = e
      })
    } else if (drawType === 'point') {
      const defaultPoint = new PointGraphics({
        show: true,
        pixelSize: 10,
        color: Color.RED,
        outlineColor: Color.WHITE,
        outlineWidth: 2,

        //Turn off the depth detection of points to prevent being blocked by elevation
        // disableDepthTestDistance: Number.MAX_SAFE_INTEGER,
        // Altitude reference, always stick to the ground in 3D, and close in 2D.
        heightReference:
          viewer.scene.mode === SceneMode.SCENE3D
            ? HeightReference.CLAMP_TO_GROUND
            : HeightReference.NONE,
      })
      const label = {
        text: 'City Name',
        horizintalOrigin: HorizontalOrigin.RIGHT,
        verticalOrigin: VerticalOrigin.TOP,
      }
      drawer.startDraw({
        type: 'point',
        // billboard: pointIcon,
        point: defaultPoint,
        label: label,
      })
    }
  }

  const handleIconClick = (selectedItemId: number) => {
    if (
      selectedItemId === 10 ||
      selectedItemId === 11 ||
      selectedItemId === 12
    ) {
      drawPolyline(selectedItemId)
    }
    if (selectedItemId === 1) {
      drawShape('polyline')
    } else if (selectedItemId === 2) {
      drawShape('rectangle')
    } else if (selectedItemId === 3) {
      drawShape('polygon')
    } else if (selectedItemId === 5) {
      drawShape('point')
    }
  }
  const setEntityColor = (selectedColor: any) => {
    if (activeEntity && defined(activeEntity.polygon)) {
      activeEntity.polygon.material = Color.fromCssColorString(selectedColor)
    }
  }

  return (
    <>
      <div className="tools w-auto">
        <div className="container">
          {ToolsData.map((item, index) => {
            return (
              <>
                <div className="row m-1" key={item.groupId}>
                  {item.groupName}
                </div>
                <hr style={{ margin: '0 0 1rem 0' }}></hr>
                <div className="row">
                  {item.children.map((childItem) => {
                    return (
                      <>
                        <div className="col" key={childItem.id}>
                          <div
                            className="btn-icon"
                            onClick={() => {
                              handleIconClick(childItem.id)
                            }}
                          >
                            <img
                              src={childItem.icon}
                              alt="icon"
                              style={{ margin: 'auto' }}
                            />
                          </div>
                        </div>
                      </>
                    )
                  })}
                </div>
                {index === ToolsData.length - 1 ? <hr></hr> : null}
              </>
            )
          })}
        </div>
      </div>
      {editStyle ? (
        <div style={{ position: 'absolute', top: '0px', left: '22rem' }}>
          <ColorPicker
            name="color"
            defaultValue="#000"
            // value={this.state.color} - for controlled component
            onChange={(color) => {
              setEntityColor(color)
            }}
          />
        </div>
      ) : null}
    </>
  )
}

export default Tools
