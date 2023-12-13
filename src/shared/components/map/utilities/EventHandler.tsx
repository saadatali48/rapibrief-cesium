import React, { useEffect, useState, useMemo } from 'react'
import { useAppSelector } from '../../../../hooks/AppHooks'
import { ScreenSpaceEventHandler, defined, ScreenSpaceEventType } from 'cesium'
import Popover from '../../popupcomponent/popup'
import PopupDetail from '../../../../pages/livemode/components/popupdetail/PopupDetail'
import {
  getLogisticPopupData,
  getPlanePopupData,
  getVesselPopupData,
} from '../../../services/sharedServices'
const EventHandler = () => {
  const mapState = useAppSelector((state) => state.mapViewer)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedDevice, setSelectedDevice] = useState(false)
  const [selectedPlane, setSelectedPlan] = useState(null)
  const [selectedEntityType, setSelectedEntityType] = useState(null)
  const [header, setheader] = useState('')

  //plane Selection
  var handler = new ScreenSpaceEventHandler(mapState.viewer?.canvas)
  handler.setInputAction(function (click) {
    var pickedObject = mapState.viewer?.scene.pick(click.position)
    if (defined(pickedObject)) {
      if (pickedObject?.detail?.model?.entityType?.type == 'plane') {
        let id = pickedObject?.id
        setSelectedId(id)
        setSelectedEntityType('plane')
        setheader('Aircraft Details')
      } else if (pickedObject?.detail?.model?.entityType?.type == 'ship') {
        let id = pickedObject?.id
        setSelectedId(id)
        setheader('Ships Details')
        setSelectedEntityType('ship')
      } else if (pickedObject?.id?.type == 'vehicle') {
        let id = pickedObject?.id?._id
        setSelectedId(id)
        setheader('Vehicle Details')
        setSelectedEntityType('vehicle')
      } else if (pickedObject?.id?.type == 'satellite') {
        const satProperties = pickedObject.id.satProperties
        setSelectedId(satProperties)
        setheader('Satilite Details')
        setSelectedEntityType('satilite')
      }
    }
  }, ScreenSpaceEventType.LEFT_UP)
  useMemo(() => {
    if (selectedId != null && selectedId != '') {
      if (selectedEntityType == 'plane') {
        getPlanePopupData(selectedId).then((res: any) => {
          setSelectedPlan(res[0])
          setSelectedDevice(true)
        })
      } else if (selectedEntityType == 'ship') {
        getVesselPopupData(selectedId).then((res: any) => {
          setSelectedPlan(res[0])
          setSelectedDevice(true)
        })
      } else if (selectedEntityType == 'vehicle') {
        getLogisticPopupData(selectedId).then((res: any) => {
          setSelectedPlan(res[0])
          setSelectedDevice(true)
        })
      }else if (selectedEntityType == 'satilite'){
        setSelectedPlan(selectedId)
        setSelectedDevice(true)
      }
    }
    ;() => {
      setSelectedId(null)
      handler.destroy()
    }
  }, [selectedId])
  const closePopupDetail = () => {
    setSelectedDevice(false)
    setSelectedId(null)
  }

  return (
    <>
      {selectedDevice ? (
        <Popover
          ClosePopup={closePopupDetail}
          showModal={selectedDevice ? true : false}
          hasHeader={true}
          right={3}
          top={7}
          header={header}
        >
          <PopupDetail
            informationData={selectedPlane}
            dataType={selectedEntityType}
          />
        </Popover>
      ) : (
        ''
      )}
    </>
  )
}

export default EventHandler
