import React from 'react'
import AlertDataTable from '../alertdatatable/AlertDataTable'
import './AlertHeader.css'
import {
  searchtable,
  Viewstream,
  Apps,
  Menu,
  Add,
} from '../../../../assests/images'
function AlertHeader({ dataCount }) {
  return (
    <div className=" d-flex  flex-row w-100">
      <div className="AlertHeader-row ">
        <div className="AlertHeader-sty AlertHeader-row-child  mt-2">Alert</div>
        <div className="AlertHeader-row-child  AlertHeader-st">
          {dataCount} Count
        </div>
      </div>
      <div className=" AlertHeader-sparation-row ">
        <img className="AlertHedeader-row-child-space" src={searchtable} />
      </div>
      <div className="AlertHeader-row-chil">
        <img className="mt-4 AlertHeader-hov " src={Viewstream} />
        <img
          className="mt-4  AlertHeader-hov ml-1 AlertHeader-ma "
          src={Apps}
        />
        <img
          className="mt-4  AlertHeader-hov ml-1  AlertHeader-ma"
          src={Menu}
        />
        <img
          className="mt-4 AlertHeader-hov  ml-1  AlertHeader-ma  AlertHeader-radiu"
          src={Add}
        />
      </div>
    </div>
  )
}
export default AlertHeader
