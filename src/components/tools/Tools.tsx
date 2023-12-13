import React from 'react'
import './Tools.css'
import { ToolsData } from './ToolsData'
import { useAppSelector } from '../../hooks/AppHooks'
import { store } from '../../store'
import {
  CallbackProperty,
  Cartesian3,
  Cartographic,
  ClockRange,
  Color,
  Ellipsoid,
  Entity,
  HeadingPitchRange,
  HeadingPitchRoll,
  HeightReference,
  HermitePolynomialApproximation,
  HorizontalOrigin,
  JulianDate,
  Model,
  SampledPositionProperty,
  SceneMode,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Transforms,
  VerticalOrigin,
  Math as cesiumMath,
  defined,
} from 'cesium'
import { aircrafts1, planeModel } from '../../assests/images'
import { forEach, result } from 'lodash'

const Tools = () => {
  const viewer = useAppSelector((store) => store.mapViewer.viewer)
  let r = 0

  const hpRoll = new HeadingPitchRoll()
  const hpRange = new HeadingPitchRange()
  let speed = 10
  const deltaRadians = cesiumMath.toRadians(3.0)

  let position = Cartesian3.fromDegrees(
    72.99635561452611,
    33.646269376139735,
    1500.0
  )
  let speedVector = new Cartesian3()
  const fixedFrameTransform = Transforms.localFrameToFixedFrameGenerator(
    'north',
    'west'
  )

  let pathPositions = []

  const addPlaneEntity = () => {
    const entity = viewer.entities.add({
      name: 'plane',
      // position: position,
      position: new CallbackProperty(getPosition, false),

      model: {
        uri: planeModel,
        heightReference: HeightReference.NONE,
        scale: 50,
        show: true,
        minimumPixelSize: 128,
      },
      // scale: 50,
    })

    // viewer.entities.add(entity)

    var times = [
      JulianDate.fromIso8601('2023-01-01T00:00:00Z'),
      JulianDate.fromIso8601('2023-01-02T00:00:00Z'),
      JulianDate.fromIso8601('2023-01-03T00:00:00Z'),
      // Add more times corresponding to positions
    ]

    var startTime = JulianDate.fromIso8601('2023-01-01T00:00:00Z')
    var endTime = JulianDate.addSeconds(startTime, 20, new JulianDate())
    pathPositions.forEach((pos) => {
      viewer.entities.add({
        position: pos,
        point: {
          pixelSize: 8,
          color: Color.TRANSPARENT,
          outlineColor: Color.YELLOW,
          outlineWidth: 3,
        },
      })
    })

    function getPosition(time, result) {
      var timeInterval = JulianDate.secondsDifference(endTime, startTime)
      var currentTime = JulianDate.secondsDifference(time, startTime)
      var index = Math.floor(
        (currentTime / timeInterval) * (pathPositions.length - 1)
      )

      return Cartesian3.lerp(
        pathPositions[index],
        pathPositions[index + 1],
        (currentTime % timeInterval) / timeInterval,
        result
      )
    }

    viewer.clock.startTime = startTime.clone()
    viewer.clock.stopTime = endTime.clone()
    viewer.clock.currentTime = startTime.clone()
    viewer.clock.clockRange = ClockRange.LOOP_STOP // Loop animation
    viewer.clock.multiplier = 1 // Adjust the multiplier as needed

    // Play the animation
    viewer.clock.shouldAnimate = true
    console.log(entity)
    // viewer.zoomTo(entity)
  }

  const onLeftClick = (movement: any) => {
    console.log(movement)

    if (movement.position && viewer) {
      let ellipsoid = viewer.scene.globe.ellipsoid
      let cartesian = viewer.camera.pickEllipsoid(movement.position, ellipsoid)
      const cartographicPos = Cartographic.fromCartesian(cartesian)
      cartographicPos.height = 300
      const newPos = Cartesian3.fromRadians(
        cartographicPos.longitude,
        cartographicPos.latitude,
        1500
      )
      pathPositions.push(newPos)
      console.log(cartographicPos)
    }
  }
  const onRightClick = (movement: any) => {
    if (movement.position && viewer) {
      // const pos = viewer.scene.pickPosition(movement.position);
      // Cancel the events
      addPlaneEntity()
    }
  }

  const drawPolyline = () => {
    console.log('Here')
    pathPositions = []
    const handler: any = new ScreenSpaceEventHandler(viewer.scene?.canvas)
    handler.setInputAction(function (movement: any) {
      onLeftClick(movement)
    }, ScreenSpaceEventType.LEFT_CLICK)
    handler.setInputAction(function (movement: any) {
      if (viewer.scene?.mode !== SceneMode.MORPHING) {
        onRightClick(movement)
      }
    }, ScreenSpaceEventType.RIGHT_CLICK)
  }

  const handleIconClick = (selectedItemId: number) => {
    if (selectedItemId === 11) {
      drawPolyline()
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
                        <div
                          className="col-sm"
                          key={childItem.id}
                          id={childItem.id}
                        >
                          <div
                            className="btn-icon"
                            onClick={(e) => {
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
    </>
  )
}

export default Tools
