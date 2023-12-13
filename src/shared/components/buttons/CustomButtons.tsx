import React from 'react'
import './CustomButtons.css'
import PropTypes from 'prop-types'

function CustomButton({ btnClass, text, handler, type }) {
  return (
    <div className="checkBoxStyle">
      <button type={type} className={`${btnClass}`} onClick={handler}>
        {text}
      </button>
    </div>
  )
}

CustomButton.propTypes = {
  text: PropTypes.string,
  btnClass: PropTypes.string,
  handler: PropTypes.func,
  type: PropTypes.string,
}

export default CustomButton
