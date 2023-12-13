import { ScreenSpaceEventType } from 'cesium'
import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../../../hooks/AppHooks'
import './MapToolTip.css'
const MapToolTip = () => {
  const mapState = useAppSelector((state) => state.mapViewer)
  const toolTipStatus = useAppSelector((state) => state.toolTipStatus.status)
  const tooltipContent = useAppSelector(
    (state) => state.tooltipContent.tooltipContent
  )
  const [tooltip, setTooltip] = useState(false)
  const tooltipRefs = useRef(null)

  useEffect(() => {
    if (toolTipStatus) {
      setTooltip(true)
      mapState?.viewer?.screenSpaceEventHandler.setInputAction(
        function onMouseMove(movement) {
          mapState?.viewer?.container.appendChild(tooltipRefs.current)
          tooltipRefs.current.style.display = 'block'
          tooltipRefs.current.style.bottom = `${
            mapState.viewer?.canvas.clientHeight - movement.endPosition.y + 5
          }px`
          tooltipRefs.current.style.left = `${movement.endPosition.x + 150}px`

          tooltipRefs.current.innerHTML = tooltipContent
        },
        ScreenSpaceEventType.MOUSE_MOVE
      )
    } else {
      mapState?.viewer?.screenSpaceEventHandler?.removeInputAction(
        ScreenSpaceEventType.MOUSE_MOVE
      )
      setTooltip(false)
    }
  }, [toolTipStatus, tooltipContent])

  return (
    <div>
      {tooltip ? (
        <div className="backdropss" ref={tooltipRefs}></div>
      ) : (
        <div style={{ display: 'none' }} ref={tooltipRefs}></div>
      )}
    </div>
  )
}
export default MapToolTip
