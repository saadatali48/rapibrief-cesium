import { Cartographic, Math as cesiumMath } from 'cesium'
import CesiumNavigation from 'cesium-navigation-es6'
import React, { useEffect } from 'react'
import { useAppSelector } from '../../../../hooks/AppHooks'
import { MapNavigationControlsOptionInterface } from '../../../models/sharedModels'

function MapControls() {
  const mapState = useAppSelector((state) => state.mapViewer)

  useEffect(() => {
    if (mapState.viewer != null) {
      const options: MapNavigationControlsOptionInterface = {
        defaultResetView: new Cartographic(
          cesiumMath.toRadians(mapState.defaultView.longitude),
          cesiumMath.toRadians(mapState.defaultView.latitude),
          mapState.defaultView.height
        ),
        // orientation: {
        //   heading: cesiumMath.toRadians(0),
        //   pitch: cesiumMath.toRadians(0),
        //   roll: cesiumMath.toRadians(0),
        // },
        duration: 4,
        enableCompass: true,
        enableZoomControls: true,
        enableDistanceLegend: true,
        enableCompassOuterRing: true,
        resetTooltip: 'Reset View',
        zoomInTooltip: 'Zoom in',
        zoomOutTooltip: 'Zoom out',
      }

      new CesiumNavigation(mapState.viewer, options)
    }
  }, [mapState.viewer])

  return <></>
}

export default MapControls
