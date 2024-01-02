import React, { useEffect } from 'react'
import {
  ArcGisMapServerImageryProvider,
  SceneMode,
  SkyAtmosphere,
  Viewer,
  Cesium3DTileset,
  IonResource,
  Cartesian3,
  ImageryLayer,
  createWorldTerrain,
} from 'cesium'
import './Map.css'
import CesiumDrawer from '../../lib/cesiumDraw'
import { useAppDispatch, useAppSelector } from '../../../hooks/AppHooks'
import { setLoader, setMapViewer, setShapeDrawer } from '../../reducer/reducer'

import MapControls from './map-controls/MapControls'

import MapLayers from './map-layers/MapLayers'
import Loader from '../Loader'
import SymbolHandler from './utilities/SymbolHandler'
const MapComponent = () => {
  const mapState = useAppSelector((state) => state.mapViewer)
  const appLoader = useAppSelector((state) => state.appLoader.loaderStatus)

  const dispatch = useAppDispatch()

  const imageryBasemap: any = new ArcGisMapServerImageryProvider({
    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
    enablePickFeatures: true,
  })

  useEffect(() => {
    if (!mapState.viewer) {
      const v = new Viewer('cesiumContainer', {
        imageryProvider: imageryBasemap,
        terrainProvider: createWorldTerrain(),
        animation: true,
        geocoder: true,
        baseLayerPicker: false,
        timeline: true,
        fullscreenButton: false,
        homeButton: false,
        scene3DOnly: true,
        sceneMode: SceneMode.SCENE3D,
        navigationHelpButton: false,
        skyAtmosphere: new SkyAtmosphere(),
        infoBox: false,
        selectionIndicator: false,
      })
      imageryBasemap.properties = { name: 'satellite' }
      v.scene.primitives.add(
        new Cesium3DTileset({
          url: IonResource.fromAssetId(69380),
          projectTo2D: true,
        })
      )
      v.scene.globe.tileLoadProgressEvent.addEventListener(
        (queuedTileCount) => {
          if (v.scene.globe.tilesLoaded) {
            dispatch(setLoader(false))
            console.log('Remove Loader')
          }
        }
      )
      v.scene.globe.depthTestAgainstTerrain = false
      v.scene.globe.enableLighting = false
      const drawer = new CesiumDrawer(v, {})
      dispatch(setMapViewer(v))
      dispatch(setShapeDrawer(drawer))
    }
  }, [mapState.viewer])

  useEffect(() => {
    dispatch(setLoader(true))

    return () => {
      dispatch(setMapViewer(null))
    }
  }, [])
  useEffect(() => {
    if (mapState.viewer && mapState.defaultView) {
      destination: mapState?.viewer?.camera?.flyTo({
        destination: Cartesian3.fromDegrees(
          mapState.defaultView.longitude,
          mapState.defaultView.latitude,
          mapState.defaultView.height
        ),
      })
    }
  }, [mapState.viewer, mapState.defaultView])

  return (
    <>
      {appLoader ? <Loader text="Getting everything ready…" /> : ''}

      <div id="cesiumContainer"></div>
      <MapControls />
      <SymbolHandler />
      <MapLayers />
    </>
  )
}

export default MapComponent
