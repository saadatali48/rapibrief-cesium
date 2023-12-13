import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import AlertHeader from '../alertheader/AlertHeader'
import Environment from '../../../constants/AppConstants'
export default function Primetable() {
  const [val, setVal] = useState<any>([])
  const [selectedProducts1, setSelectedProducts1] = useState(null)
  useEffect(() => {
    const socket = new WebSocket(
      `${Environment.ALERT_SOCKET}/air/geofence/traffic/`
    )
    socket.onopen = () => {}
    socket.onmessage = (event) => {
      const socketoutput = JSON.parse(event.data)[0]
      setVal((prev) => [socketoutput, ...prev])
    }
    return () => {
      socket.close()
    }
  }, [])

  const dataLength = val.length

  return (
    <div className="DataTable">
      <div>
        <AlertHeader dataCount={dataLength} />{' '}
      </div>
      <DataTable
        value={val.map((element) => {
          let newEl = { ...element }
          newEl.callsign =
            newEl.callsign + 'Breached geofence priotity   ' + newEl.priority
          return newEl
        })}
        responsiveLayout="scroll"
        paginator
        rows={8}
        selection={selectedProducts1}
        onSelectionChange={(e) => setSelectedProducts1(e.value)}
      >
        <Column selectionMode="multiple"></Column>
        <Column field="callsign" header="Title" sortable></Column>
        <Column field="Dispatch to" header="Dispatch to" sortable></Column>
        <Column field="timestamp" header="Dated" sortable></Column>
        <Column field="Tags" header="Tags" sortable></Column>
        <Column field="Users" header="Users" sortable></Column>
        <Column field="Area" header="Area" sortable></Column>
      </DataTable>
    </div>
  )
}
