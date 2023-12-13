import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  ExtentInterface,
  GeofenceCreatedInterface,
  GeofencePolyonInterface,
  geofenceStatusInterface,
  KmzFileInterface,
  LoaderInterface,
  MapInterface,
  PlanGeomatryInterface,
  PolygonCreatedInterface,
  PolylineCreatedInterface,
  saveCancelButtonsInterface,
  SidebarReducerInterface,
  StoreGeometryInterface,
  symbolStatusButtonInterface,
  tooltipContentInterface,
  toolTipStatusInterface,
  WeatherInterface,
} from '../models/sharedModels'

// interface MapInterface {
//   viewer: any
// }

const mapInitialState: MapInterface = {
  viewer: null,
  defaultView: {
    longitude: 73.0721196430036,
    latitude: 33.70087373035139,
    height: 100000,
  },
  shapeDrawer: null,
  basemap: 'satellite',
  mapMode: '3D',
}

export const mapReducer = createSlice({
  name: 'mapReducer',
  initialState: mapInitialState,
  reducers: {
    setMapViewer: (state, action: PayloadAction<any>) => {
      state.viewer = action.payload
    },
    setShapeDrawer: (state, action: PayloadAction<any>) => {
      state.shapeDrawer = action.payload
    },
    setBaseMap: (state, action: PayloadAction<any>) => {
      state.basemap = action.payload
    },
    setMapMode: (state, action: PayloadAction<any>) => {
      state.mapMode = action.payload
    },
  },
})

export const {
  setMapViewer,
  setShapeDrawer,
  setBaseMap,
  setMapMode,
} = mapReducer.actions

const sidebarInitialState: SidebarReducerInterface = {
  sidebarData: {
    type: '',
    key: '',
    id: '',
    icon: '',
    label: '',
    selectable: false,

    children: [],
  },
}

const kmzInitialState: KmzFileInterface = {
  kmzData: {
    url: '',
    name: '',
    id: 0,
    status: false,
    altitude: 0,
    lat: 0,
    long: 0,
    distanceCoverage: 0,
    device_group_category: false,
  },
}

export const sidebarReducer = createSlice({
  name: 'sidebarReducer',
  initialState: sidebarInitialState,
  reducers: {
    setSidebarData: (state, action: PayloadAction<any>) => {
      state.sidebarData = action.payload
    },
  },
})

export const { setSidebarData } = sidebarReducer.actions

export const kmzReducer = createSlice({
  name: 'kmzReducer',
  initialState: kmzInitialState,
  reducers: {
    showKMZFile: (state, action: PayloadAction<any>) => {
      state.kmzData = action.payload
    },
  },
})

export const { showKMZFile } = kmzReducer.actions

const ExtentInitialState: ExtentInterface = {
  points: [],
}

export const extentReducer = createSlice({
  name: 'extentReducer',
  initialState: ExtentInitialState,
  reducers: {
    setMapExtent: (state, action: PayloadAction<any>) => {
      state.points = action.payload
    },
  },
})

export const { setMapExtent } = extentReducer.actions

const LoaderInitialState: LoaderInterface = {
  loaderStatus: false,
}

export const loaderReducer = createSlice({
  name: 'loaderReducer',
  initialState: LoaderInitialState,
  reducers: {
    setLoader: (state, action: PayloadAction<any>) => {
      state.loaderStatus = action.payload
    },
  },
})

export const { setLoader } = loaderReducer.actions

const PolygonCreatedInitialState: PolygonCreatedInterface = {
  polygonCreated: null,
}

export const polygonCreatedReducer = createSlice({
  name: 'polygonCreatedReducer',
  initialState: PolygonCreatedInitialState,
  reducers: {
    operationPolygonCreated: (state, action: PayloadAction<any>) => {
      state.polygonCreated = action.payload
    },
  },
})

export const { operationPolygonCreated } = polygonCreatedReducer.actions

const PolylineCreatedInitialState: PolylineCreatedInterface = {
  polylineCreated: null,
}

export const polylineCreatedReducer = createSlice({
  name: 'polylineCreatedReducer',
  initialState: PolylineCreatedInitialState,
  reducers: {
    operationPolylineCreated: (state, action: PayloadAction<any>) => {
      state.polylineCreated = action.payload
    },
  },
})

export const { operationPolylineCreated } = polylineCreatedReducer.actions

var StoreGeometryInitialState: StoreGeometryInterface = {
  storeData: {
    id: 0,
    data: null,
    geometryType: '',
  },
}
export var StoreGeometryReducer = createSlice({
  name: 'StoreGeometryReducer',
  initialState: StoreGeometryInitialState,
  reducers: {
    storeGeometry: (state, action: PayloadAction<any>) => {
      state.storeData = action.payload
      // return { ...state, storeData: action.payload }
    },
  },
})

export var { storeGeometry } = StoreGeometryReducer.actions

const PlanGeomatryInitialState: PlanGeomatryInterface = {
  areaData: null,
  boundaryData: null,
}
export const PlanGeomatryReducer = createSlice({
  name: 'PlanGeomatryReducer',
  initialState: PlanGeomatryInitialState,
  reducers: {
    storeArea: (state, action: PayloadAction<any>) => {
      state.areaData = action.payload
    },
    storeBoundry: (state, action: PayloadAction<any>) => {
      state.boundaryData = action.payload
    },
  },
})

export const { storeArea, storeBoundry } = PlanGeomatryReducer.actions

const SaveCancelInitialState: saveCancelButtonsInterface = {
  status: false,
}
export const SaveCancelReducer = createSlice({
  name: 'SaveCancelReducer',
  initialState: SaveCancelInitialState,
  reducers: {
    setButtonStatus: (state, action: PayloadAction<any>) => {
      state.status = action.payload
    },
  },
})

export const { setButtonStatus } = SaveCancelReducer.actions

const symbolStatusButtonInitialState: symbolStatusButtonInterface = {
  status: false,
}
export const symbolStatusButtonReducer = createSlice({
  name: 'SaveCancelReducer',
  initialState: symbolStatusButtonInitialState,
  reducers: {
    setSymbolStatus: (state, action: PayloadAction<any>) => {
      state.status = action.payload
    },
  },
})

export const { setSymbolStatus } = symbolStatusButtonReducer.actions
const WeatherPictureInitialState: WeatherInterface = {
  name: '',
  status: false,
  url: '',
}

export const WeatherPictureReducer = createSlice({
  name: 'weatherReducer',
  initialState: WeatherPictureInitialState,
  reducers: {
    setWeatherStatus: (state, action: PayloadAction<any>) => {
      const { name, status, url } = action.payload
      state.name = name
      state.status = status
      state.url = url
    },
  },
})
export const { setWeatherStatus } = WeatherPictureReducer.actions

//tooltipstatus
const toolTipStatusInitialState: toolTipStatusInterface = {
  status: false,
}
export const toolTipStatusReducer = createSlice({
  name: 'toolTipStatusReducer',
  initialState: toolTipStatusInitialState,
  reducers: {
    setToolTipStatus: (state, action: PayloadAction<any>) => {
      state.status = action.payload
    },
  },
})

export const { setToolTipStatus } = toolTipStatusReducer.actions

const tooltipContentInitialState: tooltipContentInterface = {
  tooltipContent: null,
}
export const tooltipContentReducer = createSlice({
  name: 'tooltipContentReducer',
  initialState: tooltipContentInitialState,
  reducers: {
    setToolTipContent: (state, action: PayloadAction<any>) => {
      state.tooltipContent = action.payload
    },
  },
})

export const { setToolTipContent } = tooltipContentReducer.actions

const GeofenceCreatedInitialState: GeofenceCreatedInterface = {
  geofenceCreated: null,
}

export const geofenceCreatedReducer = createSlice({
  name: 'geofenceCreatedReducer',
  initialState: GeofenceCreatedInitialState,
  reducers: {
    setGeofenceCreated: (state, action: PayloadAction<any>) => {
      state.geofenceCreated = action.payload
    },
  },
})

export const { setGeofenceCreated } = geofenceCreatedReducer.actions

const geofenceStatusInitialState: geofenceStatusInterface = {
  status: false,
}
export const geofenceStatusReducer = createSlice({
  name: 'geofenceStatusReducer',
  initialState: geofenceStatusInitialState,
  reducers: {
    setGeofenceStatus: (state, action: PayloadAction<any>) => {
      state.status = action.payload
    },
  },
})

export const { setGeofenceStatus } = geofenceStatusReducer.actions

const GeofencePolyonInitialState: GeofencePolyonInterface = {
  geofenceGeojson: null,
}

export const GeofencePolyonReducer = createSlice({
  name: 'GeofencePolyonReducer',
  initialState: GeofencePolyonInitialState,
  reducers: {
    setGeofence: (state, action: PayloadAction<any>) => {
      state.geofenceGeojson = action.payload
    },
  },
})

export const { setGeofence } = GeofencePolyonReducer.actions
