export interface MapInterface {
  viewer: any
  defaultView: any
  shapeDrawer: any
  basemap: string
  mapMode: string
}

interface SidebarGrandChild {
  type: string
  key: string
  id: string
  icon?: string
  label: string
  children: []
  children_ids: []
  showAir?: boolean
  showShip?: boolean
  showLogistic?: boolean
  showSatellite?: boolean
  showEM?: boolean
  showWind?: boolean
  showPrecipitation?: boolean
  showSurfacePressure?: boolean
  showAirTemperature?: boolean
  url?: string
  tUGTOW?: boolean
}

interface SidebarChild {
  type: string
  key: string
  id: string
  icon?: string
  label: string
  children: SidebarGrandChild[]
  children_ids: []
  showAir?: boolean
  showShip?: boolean
  showLogistic?: boolean
  showSatellite?: boolean
  showEM?: boolean
  showWind?: boolean
  showPrecipitation?: boolean
  showSurfacePressure?: boolean
  showAirTemperature?: boolean
  url?: string
  tUGTOW?: boolean
}
export interface SidebarInterface {
  // sidebarData: SidebarContent
  type: string
  key: string
  id: string
  icon?: string
  label: string
  selectable: boolean
  status?: string

  children: SidebarChild[]
  children_ids: []
}
interface SidebarReducerContent {
  type: string
  key: string
  id: string
  icon: string
  label: string
  selectable: boolean

  children: SidebarChild[]
}
export interface SidebarReducerInterface {
  sidebarData: SidebarReducerContent
}

export interface KmzFileInterface {
  kmzData: {
    url: string
    name: string
    id: number
    status: boolean
    altitude: number
    lat: number
    long: number
    distanceCoverage: number
    device_group_category: boolean
  }
}

export interface ExtentInterface {
  points: any
}
export interface MapNavigationControlsOptionInterface {
  defaultResetView: any
  orientation: {}
  duration: number
  enableCompass: boolean
  enableZoomControls: boolean
  enableDistanceLegend: boolean
  enableCompassOuterRing: boolean
  resetTooltip: string
  zoomInTooltip: string
  zoomOutTooltip: string
}

export interface LoaderInterface {
  loaderStatus: boolean
}

export interface PolygonCreatedInterface {
  polygonCreated: null
}

interface geoAttributes {
  name?: ''
}
interface geoStyleProperties {
  fillColor?: string
  stroke?: string
}
interface geoProperties {
  attribute?: geoAttributes
  style_properties?: geoStyleProperties
}
interface geojson {
  type?: 'string'
  properties?: geoProperties
  geometry?: any
}
export interface StoreGeometryInterface {
  storeData: any
}
export interface PolylineCreatedInterface {
  polylineCreated: null
}
export interface PlanGeomatryInterface {
  areaData: null
  boundaryData: null
}

export interface saveCancelButtonsInterface {
  status: boolean
}
export interface symbolStatusButtonInterface {
  status: boolean
}
export interface WeatherInterface {
  name: string
  status: boolean
  url: string
}

export interface toolTipStatusInterface {
  status: boolean
}

export interface tooltipContentInterface {
  tooltipContent: string
}

export interface GeofenceCreatedInterface {
  geofenceCreated: null
}

export interface geofenceStatusInterface {
  status: boolean
}
export interface GeofencePolyonInterface {
  geofenceGeojson: null
}
