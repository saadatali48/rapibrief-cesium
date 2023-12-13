import React from 'react'
import './Spinner.css'
export default function Spinner(props) {
  return (
    <div className='Spinner-Loader'>
<div className="spinner-border" role="status">
  <span className="sr-only">Loading...</span>
</div>
<span className='Spinner-title'>{props.title}</span>
    </div>
  )
}
