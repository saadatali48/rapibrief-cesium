import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/AppHooks'
import { setPlanDetails } from '../../../../pages/planningmode/reducer/reducer'
import './SidebarDetail.css'

const SidebarDetail = (props: any) => {
  const [sidebarcomp, setsidebarcomp] = useState<any>([props.showdetail])
  const [showPlanDetails, setShowPlanDetails] = useState<any>(false)
  const [selectedPicture, setSelectedPicture] = useState<any>({})
  const planDetails = useAppSelector((state) => state.planDetails.planDetails)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (Object.keys(planDetails)?.length > 0 && planDetails?.id !== 0) {
      setShowPlanDetails(true)
    } else {
      setShowPlanDetails(false)
    }
  }, [planDetails])

  useEffect(() => {
    if (sidebarcomp?.length > 0) {
      setSelectedPicture(sidebarcomp[0])
    }
  }, [sidebarcomp])
  const closePlan = () => {
    dispatch(
      setPlanDetails({
        area: '',
        code: '',
        data: '',
        file: '',
        id: 0,
        line: '',
        name: '',
        symbols: '',
        thumbnail: '',
        type: '',
      })
    )
    setShowPlanDetails(false)
  }

  return (
    <div
      className={
        selectedPicture?.name == 'Alert'
          ? 'alertDesign bg-white border-1'
          : 'bg-white border-1 sidebarDetail'
      }
    >
      {sidebarcomp?.map((items: any, i: any) => (
        <ul key={i}>
          <li className="sidebardetailheader">
            {(showPlanDetails && items?.title == 'Operation') ||
            items?.title == 'OPERATION' ? (
              <>
                <i
                  className="p-tree-toggler-icon pi pi-fw pi-chevron-left toggle-inbox"
                  onClick={closePlan}
                ></i>
                {planDetails?.name}
              </>
            ) : (
              items?.title
            )}{' '}
          </li>
          <li className="for-uppercase">
            {' '}
            {(showPlanDetails && items?.title == 'Operation') ||
            items?.title == 'OPERATION'
              ? items?.ActionComponentSecond
              : items?.ActionComponent}
          </li>
        </ul>
      ))}
    </div>
  )
}
export default SidebarDetail
