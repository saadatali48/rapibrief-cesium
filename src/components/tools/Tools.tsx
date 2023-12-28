import React, { useEffect, useState } from 'react'
import './Tools.css'
import { ToolsData } from './ToolsData'
import { useAppSelector } from '../../hooks/AppHooks'
import {
  BoundingSphere,
  BoxEmitter,
  Cartesian2,
  Cartesian3,
  Cartographic,
  ClockRange,
  Color,
  CustomDataSource,
  Entity,
  HeightReference,
  HorizontalOrigin,
  JulianDate,
  LinearApproximation,
  Matrix4,
  Model,
  NearFarScalar,
  ParticleEmitter,
  ParticleSystem,
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
  sampleTerrainMostDetailed,
} from 'cesium'
import * as satellite from 'satellite.js'
import {
  heli1,
  planeModel1,
  drone,
  locationPoi,
  missile,
  satelliteDataFile,
  satelliteIcon,
  ship,
  explosion,
  locationTarget,
  soldierModel,
  miltVehModel,
  tank,
} from '../../assests/images'
import CesiumDrawer from '../../shared/components/map/cesiumDraw'
import ColorPicker from '@nafise622/material-ui-color-picker'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

let activeEntity: any = null
const Tools = () => {
  const viewer = useAppSelector((store: any) => store.mapViewer.viewer)
  const satelliteEntityCollection = new CustomDataSource('satellite_data')

  const [editStyle, setEditStyle] = useState(false)
  const [show, setShow] = useState(false)
  const [inputLabel, setInputLabel] = useState('')

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
      // viewer.entities.add({
      //   position: pathPositions[i],
      //   point: {
      //     pixelSize: 8,
      //     color: Color.TRANSPARENT,
      //     outlineColor: Color.YELLOW,
      //     outlineWidth: 3,
      //   },
      // })
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
    viewer.clock.clockRange = ClockRange.UNBOUNDED //Loop at the end
    viewer.clock.multiplier = 5
    viewer.clock.shouldAnimate = true

    //Set timeline to simulation bounds
    viewer.timeline.zoomTo(start, stop)
    const position = computePath()

    //Actually create the entity
    const entity = viewer.entities.add({
      //Set the entity availability to the same interval as the simulation time.
      /* availability: new TimeIntervalCollection([
        new TimeInterval({
          start: start,
          stop: stop,
        }),
      ]), */

      //Use our computed positions
      position: position,

      //Automatically compute orientation based on position movement.
      orientation: new VelocityOrientationProperty(position),

      //Load the Cesium plane model to represent the entity
      model: {
        uri: modelUrl,
        minimumPixelSize: minPixelSize,
      },
    })
    entity.position.setInterpolationOptions({
      interpolationDegree: 5,
      interpolationAlgorithm: LinearApproximation,
    })
    viewer.clock.onTick.addEventListener(function (clock) {
      // console.log(clock)
      // console.log(viewer.clock.currentTime)
      // if (s < 100) {
      //   console.log(viewer.clock.currentTime)
      // } else {
      //   viewer.clock.canAnimate = true
      //   viewer.clock.shouldAnimate = true
      // }
      // s++
    })
  }

  const onLeftDown = (movement: any, selectedItemId) => {
    if (movement.position && viewer) {
      let ellipsoid = viewer.scene.globe.ellipsoid
      let cartesian = viewer.camera.pickEllipsoid(movement.position, ellipsoid)
      const cartographicPos = Cartographic.fromCartesian(cartesian)
      cartographicPos.height = 300
      if (selectedItemId === 16 || selectedItemId === 13 || selectedItemId === 14) {
     
       
        const newPos = Cartesian3.fromRadians(
          cartographicPos.longitude,
          cartographicPos.latitude,
          0
        )
        pathPositions.push(newPos)
      } else {
        const newPos = Cartesian3.fromRadians(
          cartographicPos.longitude,
          cartographicPos.latitude,
          15000
        )
        pathPositions.push(newPos)
      }
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
      } else if (selectedItemId === 19) {
        addFlyingEntity(missile, 128)
      } else if (selectedItemId === 16) {
        addFlyingEntity(ship, 128)
      }
      else if (selectedItemId === 16) {
        addFlyingEntity(ship, 128)
      }
      else if (selectedItemId === 13) {
        addFlyingEntity(miltVehModel, 128)
      }
      else if (selectedItemId === 14) {
        addFlyingEntity(tank, 128)
      }
      handler.removeInputAction(ScreenSpaceEventType.LEFT_DOWN)
      handler.removeInputAction(ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    }
  }

  const drawPolyline = (selectedItemId) => {
    pathPositions = []
    handler = new ScreenSpaceEventHandler(viewer.scene?.canvas)
    handler.setInputAction(function (movement: any) {
      onLeftDown(movement, selectedItemId)
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
      drawer.on('finishDraw', function (e) {
        e.polyline.width.setValue(3)
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
        handleShow()
        activeEntity = e
        const entityCenter = BoundingSphere.fromPoints(
          e.polygon.hierarchy._value.positions
        ).center
        console.log(entityCenter)
        e.position = entityCenter

        e.height = 0
        e.heightReference =
          viewer.scene.mode === SceneMode.SCENE3D
            ? HeightReference.CLAMP_TO_GROUND
            : HeightReference.NONE
      })
    } else if (drawType === 'point') {
      const defaultPoint = new PointGraphics({
        show: true,
        pixelSize: 10,
        color: Color.RED,
        outlineColor: Color.WHITE,
        outlineWidth: 2,
        heightReference:
          viewer.scene.mode === SceneMode.SCENE3D
            ? HeightReference.CLAMP_TO_GROUND
            : HeightReference.NONE,
      })
      const label = {
        text: inputLabel,
        horizintalOrigin: HorizontalOrigin.RIGHT,
        verticalOrigin: VerticalOrigin.TOP,
      }
      drawer.startDraw({
        type: 'point',
        // billboard: pointIcon,
        point: defaultPoint,
        label: label,
      })
      drawer.on('finishDraw', function (e) {
        handleShow()
        activeEntity = e
        //  drawer.activeEntity = e
      })
    } else if (drawType === 'explosion') {
      const defaultPoint = new PointGraphics({
        show: true,
        pixelSize: 10,
        color: Color.RED,
        outlineColor: Color.WHITE,
        outlineWidth: 2,
        heightReference:
          viewer.scene.mode === SceneMode.SCENE3D
            ? HeightReference.CLAMP_TO_GROUND
            : HeightReference.NONE,
      })
      const label = {
        text: inputLabel,
        horizintalOrigin: HorizontalOrigin.RIGHT,
        verticalOrigin: VerticalOrigin.TOP,
      }
      drawer.startDraw({
        type: 'point',
        billboard: {
          image: explosion,
          // scale: 0.5,
          width: 50,
          height: 50,
        },
        // point: defaultPoint,
        // label: label,
      })
      drawer.on('finishDraw', function (e) {
        //  handleShow()
        activeEntity = e
        //  drawer.activeEntity = e
      })
    } else if (drawType === 'locationTarget') {
      const label = {
        text: inputLabel,
        horizintalOrigin: HorizontalOrigin.RIGHT,
        verticalOrigin: VerticalOrigin.TOP,
      }
      drawer.startDraw({
        type: 'point',
        billboard: {
          image: locationTarget,
        },
        //point: defaultPoint,
        label: label,
      })
      drawer.on('finishDraw', function (e) {
        handleShow()
        activeEntity = e
        //  drawer.activeEntity = e
      })
    }
  }
  let showSatelliteFlag = false

  const handleIconClick = (selectedItemId: number) => {
    if (
      selectedItemId === 10 ||
      selectedItemId === 11 ||
      selectedItemId === 12 ||
      selectedItemId === 19 ||
      selectedItemId === 16 ||
      selectedItemId === 13 ||
      selectedItemId === 14
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
    } else if (selectedItemId === 21) {
      drawShape('explosion')
    } else if (selectedItemId === 4) {
      drawShape('locationTarget')
    } else if (selectedItemId === 7) {
      createEntityOnClick(soldierModel)
    }
    // else if (selectedItemId === 13) {
    //   createEntityOnClick(miltVehModel)
    // } 
    
    
    else if (selectedItemId === 20) {
      if (!showSatelliteFlag) {
        addSatellitesToMap()
      } else {
        removeSatellitesFromMap()
      }
    }
  }
  const setEntityColor = (selectedColor: any) => {
    if (activeEntity && defined(activeEntity.polygon)) {
      activeEntity.polygon.material = Color.fromCssColorString(selectedColor)
    }
  }
  const handleClose = () => {
    setShow(false)
    setInputLabel(inputLabel)
    if (inputLabel && activeEntity) {
      // const entityLabel = new Label()
      // entityLabel.text = inputLabel
      activeEntity.label = {
        text: inputLabel,
        show: true,
        horizintalOrigin: HorizontalOrigin.RIGHT,
        verticalOrigin: VerticalOrigin.TOP,
        scaleByDistance: new NearFarScalar(1.5e2, 1.5, 8.0e6, 0.0),
        pixelOffset: new Cartesian2(5.0, 0.0),
      }
      console.log(activeEntity)

      setInputLabel('')
    }
  }
  const handleShow = () => setShow(true)

  const minimumExplosionSize = 30.0
  const maximumExplosionSize = 100.0
  const particlePixelSize = new Cartesian2(7.0, 7.0)
  const burstSize = 400.0
  const lifetime = 10.0
  const numberOfFireworks = 20.0
  const emitterModelMatrixScratch = new Matrix4()

  const addExplosion = (offset, color, bursts) => {
    /*     const particleSystem = viewer.scene.primitives.add(
      new ParticleSystem({
        image: '../../SampleData/smoke.png',
        imageSize: new Cartesian2(20, 20),
        startScale: 1.0,
        endScale: 4.0,
        particleLife: 1.0,
        speed: 5.0,
        emitter: new BoxEmitter(new Cartesian3(0.5, 0.5, 0.5)),
        emissionRate: 5.0,
        modelMatrix: entity.computeModelMatrix(
          viewer.clock.startTime,
          new Matrix4()
        ),
        lifetime: 16.0,
      })
    ) */
  }
  function createSatelliteEntities(data, name) {
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
      const positionAndVelocity: any = satellite.propagate(data, jsDate)
      const gmst = satellite.gstime(jsDate)
      const p = satellite.eciToGeodetic(positionAndVelocity.position, gmst)
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
    showSatelliteFlag = true
    viewer.dataSources.add(satelliteEntityCollection)
    fetch(satelliteDataFile)
      .then((res) => res.text())
      .then((parsedText) => {
        var rowsList = parsedText.split('\n')
        for (let i = 0; i < rowsList.length; i += 3) {
          let satrec = satellite.twoline2satrec(
            rowsList[i + 1],
            rowsList[i + 2]
          )
          createSatelliteEntities(satrec, rowsList[i])
        }
      })
  }

  const removeSatellitesFromMap = () => {
    viewer?.dataSources?._dataSources?.forEach((ds) => {
      if (ds.name == 'satellite_data') {
        ds.entities.removeAll()
      }
    })
  }

  const createEntityOnClick = (entityUri) => {
    const eventHandler1 = new ScreenSpaceEventHandler(viewer.scene?.canvas)
    eventHandler1.setInputAction(function (movement: any) {
      if (movement.position) {
        const pickedPosition = viewer.camera.pickEllipsoid(
          movement.position,
          viewer.scene.globe.ellipsoid
        )
         const cartographicPos = Cartographic.fromCartesian(pickedPosition)
        const positionsElevations = sampleTerrainMostDetailed(
          viewer?.terrainProvider,
          [cartographicPos],
        );
        Promise.resolve(positionsElevations).then(function (updatedPositions) {
          const soldEnt = new Entity({
            model: {
              uri: entityUri,
              minimumPixelSize: 128,
              maximumScale:10,
            },
           
            position: Cartesian3.fromRadians(
              cartographicPos.longitude,
              cartographicPos.latitude,
              updatedPositions[0].height
            ),
            // heightReference: HeightReference.CLAMP_TO_GROUND,
          })
          viewer.entities.add(soldEnt)
          viewer.zoomTo(soldEnt)
      });
        

   
        //eventHandler1.destroy()
      }
    }, ScreenSpaceEventType.LEFT_DOWN)

    eventHandler1.setInputAction(function (movement: any) { 
      eventHandler1.destroy()
    }, ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
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
      <Modal show={show} onHide={handleClose} style={{ color: 'black' }}>
        <Modal.Header closeButton>
          <Modal.Title>Add Label</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Label</Form.Label>
              <Form.Control
                type="text"
                value={inputLabel}
                onChange={(e) => setInputLabel(e.target.value)}
                placeholder="Saudi Arab"
              />
            </Form.Group>
          </Form>
          {/* <input
            type="text"
            value={inputLabel}
            onChange={(e) => setInputLabel(e.target.value)}
          /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Tools
