import React, { useState, useRef, useEffect } from 'react'
import './Alert.css'
import Spinner from './../../spinner/Spinner'
import Environment from '../../constants/AppConstants'
const Alert = () => {
  const [showalert, setshowalert] = useState(false)
  const [socketValue, setSocketValue] = useState([])
  const [alertlist] = useState([])

  const togglechange = () => {
    setshowalert(!showalert)
  }
  const ws = useRef(null)
  useEffect(() => {
    const socket = new WebSocket(
      `${Environment.ALERT_SOCKET}/air/geofence/traffic/`
    )
    socket.onopen = () => {}
    socket.onclose = () => {}
    socket.onmessage = (event) => {
      let socketoutput = JSON.parse(event.data)
      setSocketValue(socketoutput)
      if (alertlist.length >= 1000) {
        alertlist.pop()
        alertlist.unshift(socketoutput)
      } else {
        alertlist.unshift(socketoutput)
      }
    }
    ws.current = socket
    return () => {
      socket.close()
    }
  }, [])

  const dataLength = alertlist.length
  const monthNames = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  let dateObj = new Date()
  let month = monthNames[dateObj.getUTCMonth()]
  let day = dateObj.getUTCDate()
  let year = dateObj.getUTCFullYear()
  const newDate = month + ' ' + day + ',' + year
  const dataLenght = alertlist.length
  return (
    <div>
      <button className="custom-button my-2 px-2 py-1 " onClick={togglechange}>
        {dataLength} New Alerts
        {' ' + newDate}
      </button>
      {showalert ? (
        <>
          <div className="triangle"></div>
          <div className="navbarAlertpopover">
            {!dataLenght ? (
              <div className="alert-spinner">
                <Spinner title="Alert Loading" />
              </div>
            ) : (
              <div>
                {alertlist?.map((items: any) => {
                  return items.map((item: any, i: any) => {
                    return (
                      <div className="alertsdisplay">
                        <div className="dot"></div>
                        <p className="m-0">
                          {item?.callsign} Breached geofence priority:{' '}
                          {item?.priority}
                          <br></br>
                          <span className="Alert-timestap">
                            {item?.timestamp}
                          </span>
                        </p>
                      </div>
                    )
                  })
                })}
              </div>
            )}
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default Alert
