import {
  ArcGisMapServerImageryProvider,
  OpenStreetMapImageryProvider,
} from 'cesium'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../hooks/AppHooks'
const MapLayers = () => {
  const selectedBasemap = useAppSelector((state) => state.mapViewer.basemap)
  const mapState = useAppSelector((state) => state.mapViewer)
  const [osmProvider]: any = useState(
    new OpenStreetMapImageryProvider({
      url: 'https://a.tile.openstreetmap.org/',
    })
  )
  const [imageryBasemap]: any = useState(
    new ArcGisMapServerImageryProvider({
      url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
      // enablePickFeatures: false,
    })
  )
  const [lightGrayBasemap]: any = useState(
    new ArcGisMapServerImageryProvider({
      url: 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer',
      // enablePickFeatures: false,
    })
  )
  const [darkGrayBasemap]: any = useState(
    new ArcGisMapServerImageryProvider({
      url: 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer',
      // enablePickFeatures: false,
    })
  )
  useEffect(() => {
    if (mapState.viewer) {
      addUpdatedBasemapToViewer(selectedBasemap)
      // if (selectedBasemap == 'satellite') {
      //   addUpdatedBasemapToViewer(selectedBasemap)
      // } else if (selectedBasemap == 'osm') {
      //   addUpdatedBasemapToViewer(selectedBasemap)
      // }
    }
  }, [mapState.viewer, selectedBasemap])
  const [counter, setCounter] = useState(0)
  const addUpdatedBasemapToViewer = (basemap) => {
    mapState.viewer.imageryLayers._layers.forEach((layer) => {
      if (
        (layer._imageryProvider.properties &&
          layer._imageryProvider.properties.name == 'osm') ||
        layer._imageryProvider.properties.name == 'lightgray' ||
        layer._imageryProvider.properties.name == 'darkgray'
      ) {
        mapState.viewer.imageryLayers.remove(layer)
      }
      if (
        layer._imageryProvider.properties &&
        layer._imageryProvider.properties.name == 'satellite' &&
        counter != 0
      ) {
        mapState.viewer.imageryLayers.remove(layer)
      }
      setCounter(1)
    })

    if (basemap == 'satellite') {
      imageryBasemap.properties = { name: 'satellite' }
      mapState.viewer.imageryLayers.addImageryProvider(imageryBasemap)
    } else if (basemap == 'osm') {
      osmProvider.properties = { name: 'osm' }
      mapState.viewer.imageryLayers.addImageryProvider(osmProvider)
    } else if (basemap == 'lightgray') {
      lightGrayBasemap.properties = { name: 'lightgray' }
      mapState.viewer.imageryLayers.addImageryProvider(lightGrayBasemap)
    } else if (basemap == 'darkgray') {
      darkGrayBasemap.properties = { name: 'darkgray' }
      mapState.viewer.imageryLayers.addImageryProvider(darkGrayBasemap)
    }
  }
  return <></>
}

export default MapLayers
