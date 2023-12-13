
import Interceptor from '../../utilties/Interceptor'
export const getSideBarData=() => {
 
  return Interceptor.get('/sidebar/')
    
}

export const getPlanePopupData=(id:any)=>{
  return Interceptor.get(`/air/traffic/?callsign=${id}`)
}

export const getLogisticPopupData=(id:any)=>{
  return Interceptor.get(`logistic/traffic?vehicle_id=${id}`)
}
export const getVesselPopupData=(id:any)=>{
  return Interceptor.get(`/vessel/traffic/?mmsi=${id}`)
}