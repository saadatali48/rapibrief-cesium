import React from 'react'
import './AlertFilter.css'
import { Plusicon } from '../../../../assests/images'
function AlertFilter() {
  return (
    <div className="d-flex flex-row">
      <div className="d-flex w-100 mt-4 ">
        {' '}
        <div className=" Alert-al AlertFilter-plusico">
          {' '}
          <img src={Plusicon} />Filter{' '}
        </div>
      </div>
    </div>
  )
}

export default AlertFilter
