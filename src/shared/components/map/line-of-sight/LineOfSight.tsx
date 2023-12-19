import {
  CustomDataSource,
  ScreenSpaceEventHandler,
  defined,
  Cartesian3,
  CallbackProperty,
  ScreenSpaceEventType,
  ArcType,
  Color,
  HeightReference,
  PolylineGlowMaterialProperty,
  PolylineOutlineMaterialProperty,
  Ray,
  Entity,
} from 'cesium'
import { Button } from 'primereact/button'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useAppSelector } from '../../../../hooks/AppHooks'
import './LineOfSight.css'
const LineOfSight = ({ activeMenu, handleLosActive, setLosActive }) => {
  const [tooltip, setTooltip] = useState(false)
  const tooltipRef = useRef(null)
  var earthPosition: any
  var activeShapePoints = []
  var activeEntity: any
  var startPoint: any
  var floatingPoint: any
  var floatingPoints = []
  var solidPolyline: any
  const losRef = useRef(null)
  const mapState = useAppSelector((state) => state.mapViewer)
  const [dataSource, setDataSource] = useState(null)

  useEffect(() => {
    if (mapState.viewer) {
      setDataSource(new CustomDataSource('losLayer'))
    }
  }, [mapState.viewer])
  useMemo(() => {
    if (mapState.viewer && dataSource) {
      mapState.viewer.dataSources.add(dataSource)
    }
  }, [dataSource])
  const hideLosMenu = () => {
    losRef.current.style.display = 'none'
    setLosActive(false)
  }
  const addLineOfSight = () => {
    setTooltip(true)

    if (mapState.viewer && mapState.defaultView) {
      destination: mapState?.viewer?.camera?.flyTo({
        destination: Cartesian3.fromDegrees(
          144.97378277055185,
          -37.78384323499092,
          15000
        ),
      })
    }

    var drawHandler = new ScreenSpaceEventHandler(mapState.viewer.canvas)
    drawHandler.setInputAction(function (event) {
      if (!defined(earthPosition)) {
        var newPosition: any
        if (
          mapState.viewer.terrainProvider.constructor.name ===
          'EllipsoidTerrainProvider'
        ) {
          newPosition = mapState.viewer.camera.pickEllipsoid(event.position)
        } else {
          newPosition = mapState.viewer.scene.pickPosition(event.position)
        }
        earthPosition = Cartesian3.clone(newPosition)
      }

      if (startPoint === undefined) {
        startPoint = Cartesian3.clone(earthPosition)
        floatingPoint = createPoint(earthPosition)
        floatingPoints.push(createPoint(earthPosition))
        activeShapePoints = [startPoint, startPoint]

        activeEntity = drawsolidline(
          new CallbackProperty(function () {
            return activeShapePoints
          }, false)
        )
      } else {
        var pickedobj = mapState.viewer.scene.pick(event.position)
        if (defined(pickedobj)) {
          if (defined(pickedobj.primitive)) {
            if (pickedobj.primitive.constructor.name === 'Billboard') {
              drawSightViewLine(activeShapePoints)
              return
            }

            if (pickedobj.primitive.constructor.name === 'Label') {
              drawSightViewLine(activeShapePoints)
              return
            }
          }
        }
        activeShapePoints = [startPoint, earthPosition]
        drawSightViewLine(activeShapePoints)
      }
    }, ScreenSpaceEventType.LEFT_CLICK)

    drawHandler.setInputAction(function (event) {
      var pickedobj = mapState.viewer.scene.pick(event.endPosition)
      tooltipRef.current.style.display = 'block'
      tooltipRef.current.style.bottom = `${
        mapState.viewer.canvas.clientHeight - event.endPosition.y
      }px`
      tooltipRef.current.style.left = `${event.endPosition.x}px`

      tooltipRef.current.innerHTML = `Left click to add a target <br> Right click to end LOS.`

      if (pickedobj) {
        if (pickedobj.primitive) {
          if (pickedobj.primitive.constructor.name === 'Billboard') {
            return
          }
          if (pickedobj.primitive.constructor.name === 'Label') {
            return
          }
        }
      }
      if (startPoint === undefined) {
        return
      }

      if (defined(floatingPoint)) {
        var newPosition
        if (
          mapState.viewer.terrainProvider.constructor.name ===
          'EllipsoidTerrainProvider'
        ) {
          newPosition = mapState.viewer.camera.pickEllipsoid(event.endPosition)
        } else {
          newPosition = mapState.viewer.scene.pickPosition(event.endPosition)
        }

        earthPosition = newPosition
        if (defined(newPosition)) {
          dataSource.entities.remove(solidPolyline)

          floatingPoint.position.setValue(newPosition)
          activeShapePoints = [startPoint, newPosition]
        }
      }
    }, ScreenSpaceEventType.MOUSE_MOVE)

    drawHandler.setInputAction(function (event) {
      setTooltip(false)
      //stop measure line of sight
      dataSource.entities.remove(floatingPoint)
      floatingPoints.forEach(function (point) {
        dataSource.entities.remove(point)
      })

      dataSource.entities.remove(activeEntity)
      activeShapePoints = []
      startPoint = undefined
      floatingPoint = undefined
      floatingPoints = []
      earthPosition = undefined
      drawHandler.destroy()
    }, ScreenSpaceEventType.RIGHT_CLICK)

    hideLosMenu()
  }
  const clearLineOfSight = () => {
    if (mapState.viewer.dataSources.getByName('losLayer').length > 0) {
      mapState.viewer.dataSources.getByName('losLayer').forEach((ds) => {
        ds.entities.removeAll()
        // mapState.viewer.dataSources.remove(ds)
      })
    }
    dataSource.entities.remove(floatingPoint)
    floatingPoints.forEach(function (point) {
      dataSource.entities.remove(point)
    })

    dataSource.entities.remove(activeEntity)
    activeShapePoints = []
    startPoint = undefined
    floatingPoint = undefined
    floatingPoints = []
    earthPosition = undefined

    hideLosMenu()
  }
  function createPoint(worldPosition: any) {
    var pointEntity = new Entity({
      position: worldPosition,
      point: {
        color: Color.WHITE,
        pixelSize: 5,
        // height: 0,
        heightReference: HeightReference.CLAMP_TO_GROUND,
      },
    })
    dataSource.entities.add(pointEntity)
    return pointEntity
    /* return dataSource.entities.add({
      position: worldPosition,
      point: {
        color: Color.WHITE,
        pixelSize: 5,
        // height: 0.0,
        heightReference: HeightReference.CLAMP_TO_GROUND,
      },
    }) */
  }
  var drawsolidline = function (positionData) {
    return dataSource.entities.add({
      polyline: {
        positions: positionData,
        arcType: ArcType.NONE,
        width: 3,

        material: new PolylineOutlineMaterialProperty({
          color: Color.YELLOW,
          outlineWidth: 0,
        }),
        depthFailMaterial: new PolylineOutlineMaterialProperty({
          color: Color.YELLOW.withAlpha(0.3),
          outlineWidth: 0,
        }),
      },
    })
  }
  var drawSightViewLine = function (positionData) {
    var direction = Cartesian3.normalize(
      Cartesian3.subtract(positionData[1], positionData[0], new Cartesian3()),
      new Cartesian3()
    )
    var ray = new Ray(positionData[0], direction)
    var objectsToExclude = []
    var result = mapState.viewer.scene.pickFromRay(
      ray,
      dataSource.entities.values
    )
    if (result !== undefined) {
      dataSource.entities.add({
        polyline: {
          positions: [positionData[0], result.position],
          arcType: ArcType.NONE,
          width: 30.0,
          material: new PolylineGlowMaterialProperty({
            color: Color.DEEPSKYBLUE,
            glowPower: 0.05,
          }),
          depthFailMaterial: new PolylineGlowMaterialProperty({
            color: Color.DEEPSKYBLUE,
            glowPower: 0.05,
          }),
        },
      })
      dataSource.entities.add({
        polyline: {
          positions: [result.position, positionData[1]],
          arcType: ArcType.NONE,
          width: 3,
          material: new PolylineOutlineMaterialProperty({
            color: Color.RED,
            outlineWidth: 0,
          }),
          depthFailMaterial: new PolylineOutlineMaterialProperty({
            color: Color.RED.withAlpha(0.5),
            outlineWidth: 0,
          }),
        },
      })
    } else {
      dataSource.entities.add({
        polyline: {
          positions: positionData,
          arcType: ArcType.NONE,
          width: 30.0,
          material: new PolylineGlowMaterialProperty({
            color: Color.DEEPSKYBLUE,
            glowPower: 0.05,
          }),
          depthFailMaterial: new PolylineGlowMaterialProperty({
            color: Color.DEEPSKYBLUE,
            glowPower: 0.05,
          }),
        },
      })
    }
  }

  // function TooltipComponent() {
  //   return <div className="backdrop" ref={tooltipRef}></div>
  // }

  const toggleLosMenu = () => {
    handleLosActive()
    if (losRef.current.style.display === 'flex') {
      losRef.current.style.display = 'none'
    } else {
      losRef.current.style.display = 'flex'
    }
  }
  if (losRef.current && !activeMenu) {
    losRef.current.style.display = 'none'
  }

  return (
    <>
      <div
        className={activeMenu ? 'los_container activeMenu' : 'los_container'}
      >
        {/* <div className="line-btn-container"> */}
        <Button
          type="button"
          // label="Line of Sight"
          onClick={toggleLosMenu}
          className="line-btn"
          title="Line of Sight"
        >
          <i className="fa  fa-lines-leaning"></i>
        </Button>
        {/* </div> */}
        <div
          ref={losRef}
          className="los-menu"
          style={{ display: 'none', color: 'black' }}
        >
          <div
            className="m-1"
            title="Add Line of Sight "
            onClick={addLineOfSight}
          >
            <i className="fa fa-lines-leaning" aria-hidden="true"></i>
          </div>
          <div
            className="m-1"
            title="Clear Measurements"
            onClick={clearLineOfSight}
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      {tooltip ? (
        <div className="tootip-backdrop" ref={tooltipRef}></div>
      ) : null}
    </>
  )
}

export default LineOfSight
