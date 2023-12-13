import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../../../hooks/AppHooks'
import { ScreenSpaceEventHandler, defined, ScreenSpaceEventType } from 'cesium'
import './SymbolHandler.css'
const SymbolHandler = () => {
  const mapState = useAppSelector((state) => state.mapViewer)
  const toolTipRefs = useRef(null)
  const [tooltip, setTooltip] = useState(false)
  const [handler, setHandler] = useState(null)

  useEffect(() => {
    if (mapState.viewer) {
      setHandler(new ScreenSpaceEventHandler(mapState.viewer.scene.canvas))
    }
  }, [mapState.viewer])
  useEffect(() => {
    if (handler) {
      handler.setInputAction(function (event) {
        var pickedObject = mapState.viewer?.scene.pick(event.endPosition)

        if (defined(pickedObject) && pickedObject?.id?._type == 'symbols') {
          const attributes = JSON.parse(
            pickedObject.id.properties.attribute.getValue()
          )

          mapState?.viewer?.container.appendChild(toolTipRefs.current)
          let tooltipContent = `<table>
                <tr>
                <td>Coding Scheme</td>
                <td>${attributes.CodingScheme}</td> 
                </tr>
                <tr>
                  <td>Affiliation</td>
                  <td>${attributes.affiliation}</td> 
                </tr>
                 <tr>
                  <td>BattleDimention</td>
                  <td>${attributes.BattleDimension}</td> 
                </tr>
                <tr>
                  <td>Status</td>
                  <td>${attributes.status}</td> 
                </tr>
                <tr>
                  <td>functionID</td>
                  <td>${attributes.functionId}</td> 
                </tr>
   
              </table>`

          toolTipRefs.current.style.display = 'block'
          toolTipRefs.current.style.bottom = `${
            mapState.viewer?.canvas.clientHeight - event.endPosition.y + 5
          }px`
          toolTipRefs.current.style.left = `${event.endPosition.x + 140}px`

          toolTipRefs.current.innerHTML = tooltipContent
        } else {
          if (
            toolTipRefs.current &&
            toolTipRefs?.current?.style?.display != 'none'
          ) {
            toolTipRefs.current.style.display = 'none'
          }
        }
      }, ScreenSpaceEventType.MOUSE_MOVE)
    }
  }, [handler])

  return (
    <>
      <div className="backdropTooltip" ref={toolTipRefs}></div>
    </>
  )
}

export default SymbolHandler
