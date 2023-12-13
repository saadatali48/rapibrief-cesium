import React from 'react'
import { Loading } from '../../assests/images'
import './Loader.css'
// import loaderImage from '../../assests/images/loaderBackground.png'

const Loader = (props: any) => {
  return (
    <div className="video-loading">
      <div className="app-loading  d-flex flex-column">
        <img
          src={Loading}
          alt="Getting everything ready…"
          width="250"
          height="250"
        />
        <span className="text-white">{props.text}</span>
      </div>
    </div>
  )
}
export default Loader
