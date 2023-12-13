/* Tool for measuring Area, Distance */

/* Requirement */

import Measure from './measurement'
import './MeasureTool.css'
import dragElement from '../DragElement/DragElement'
import areaImg from '../../../../assets/Images/measure_tool/measure_area.svg'
import distanceImg from '../../../../assets/Images/measure_tool/measure_line.svg'
import triangleImg from '../../../../assets/Images/measure_tool/measure_triangle.svg'
import clearImg from '../../../../assets/Images/measure_tool/clean.svg'

const MeasurementToolbox = (viewer) => {
  let measure = new Measure(viewer)

  let container = document.createElement('div')
  container.id = 'mt-container'
  let titlediv = document.createElement('div')
  titlediv.id = 'mt-title'
  let titlecontent = document.createElement('div')
  titlecontent.id = 'mt-titlecontent'
  titlecontent.innerHTML = 'Measure'
  let crossdiv = document.createElement('div')
  crossdiv.id = 'mt-cross'
  crossdiv.innerHTML = '&times;'
  let toolsdiv = document.createElement('div')
  toolsdiv.id = 'mt-tools'
  let areadiv = document.createElement('div')
  areadiv.id = 'mt-area'
  areadiv.addEventListener('click', function (event) {
    measure.drawAreaMeasureGraphics({
      clampToGround: true,
      //   callback: (value) => {
      //     console.log(value / 20.9 + " Marla");
      //   },
    })
  })
  areadiv.title = 'Measure Area'
  areadiv.className = 'toolbtn'
  areadiv.innerHTML = `<img src=${areaImg} style='display: block'>`
  let distancediv = document.createElement('div')
  distancediv.id = 'mt-distance'
  distancediv.addEventListener('click', function (event) {
    measure.drawLineMeasureGraphics({
      clampToGround: true,
      callback: () => {},
    })
  })
  distancediv.className = 'toolbtn'
  distancediv.title = 'Measure Distance'
  distancediv.innerHTML = `<img src=${distanceImg} style='display: block'>`
  let triangledistdiv = document.createElement('div')
  triangledistdiv.id = 'mt-traingledist'

  triangledistdiv.addEventListener('click', function (event) {
    measure.drawTrianglesMeasureGraphics({
      clampToGround: true,
      callback: () => {},
    })
  })
  triangledistdiv.className = 'toolbtn'
  triangledistdiv.title = 'Measure Triangle Distance'
  triangledistdiv.innerHTML = `<img src=${triangleImg} style='display: block'>`
  let cleardiv = document.createElement('div')
  cleardiv.id = 'mt-clear'
  cleardiv.addEventListener('click', function (event) {
    measure._drawLayer.entities.removeAll()
  })
  cleardiv.className = 'toolbtn'
  cleardiv.title = 'Clear Measure'
  cleardiv.innerHTML = `<img src=${clearImg} style='display: block'>`

  document.body.appendChild(container)
  container.appendChild(titlediv)
  titlediv.appendChild(titlecontent)
  titlediv.appendChild(crossdiv)
  container.appendChild(toolsdiv)
  toolsdiv.appendChild(areadiv)
  toolsdiv.appendChild(distancediv)
  toolsdiv.appendChild(triangledistdiv)
  toolsdiv.appendChild(cleardiv)
  dragElement(container)
}

export default MeasurementToolbox
