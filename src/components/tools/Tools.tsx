import React, { useEffect } from 'react'
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
  LagrangePolynomialApproximation,
  LinearApproximation,
  Model,
  PolylineGlowMaterialProperty,
  SampledPositionProperty,
  SceneMode,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  TimeInterval,
  TimeIntervalCollection,
  Transforms,
  VelocityOrientationProperty,
  VerticalOrigin,
  Math as cesiumMath,
  defined,
} from 'cesium'
import {
  aircrafts1,
  heli1,
  planeModel,
  planeModel1,
} from '../../assests/images'

const Tools = () => {
  const viewer = useAppSelector((store) => store.mapViewer.viewer)
  let handler: any
  useEffect(() => {
    if (viewer) {
      handler = new ScreenSpaceEventHandler(viewer.scene?.canvas)
    }
  }, [viewer])
  let pathPositions = []
  var startTime = JulianDate.fromIso8601('2023-01-01T00:00:00Z')
  var endTime = JulianDate.addSeconds(startTime, 20, new JulianDate())
  let modelPositionNow = new Cartesian3()

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

  const addPlaneEntity2 = () => {
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
        uri: planeModel1,
        minimumPixelSize: 32,
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
  const addHeliEntity = () => {
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
        uri: heli1,
        minimumPixelSize: 128,
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

  const addPlaneEntity = () => {
    const entity = viewer.entities.add({
      name: 'plane',
      // position: position,
      position: new CallbackProperty(getPosition, false),
      model: {
        uri: planeModel1,
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
      modelPositionNow = Cartesian3.lerp(
        pathPositions[index],
        pathPositions[index + 1],
        (currentTime % timeInterval) / timeInterval,
        result
      )

      return modelPositionNow
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

  const onLeftDown = (movement: any, selectedItemId: number) => {
    console.log(movement)

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
      console.log(cartographicPos)
    }
  }
  const onLeftDoubleClick = (movement: any, selectedItemId: number) => {
    if (movement.position && viewer) {
      // const pos = viewer.scene.pickPosition(movement.position);
      // Cancel the events
      // addPlaneEntity()
      if (selectedItemId === 11) {
        addPlaneEntity2()
      } else if (selectedItemId === 12) {
        addHeliEntity()
      }
      handler.removeInputAction(ScreenSpaceEventType.LEFT_DOWN)
      handler.removeInputAction(ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    }
  }

  const drawPolyline = (selectedItemId) => {
    pathPositions = []

    handler.setInputAction(function (movement: any) {
      onLeftDown(movement, selectedItemId)
    }, ScreenSpaceEventType.LEFT_DOWN)
    handler.setInputAction(function (movement: any) {
      if (viewer.scene?.mode !== SceneMode.MORPHING) {
        onLeftDoubleClick(movement, selectedItemId)
      }
    }, ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
  }

  const handleIconClick = (selectedItemId: number) => {
    if (selectedItemId === 11 || selectedItemId === 12) {
      drawPolyline(selectedItemId)
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
