import { configureStore } from '@reduxjs/toolkit'
import {
  extentReducer,
  geofenceCreatedReducer,
  GeofencePolyonReducer,
  geofenceStatusReducer,
  kmzReducer,
  loaderReducer,
  mapReducer,
  PlanGeomatryReducer,
  polygonCreatedReducer,
  polylineCreatedReducer,
  SaveCancelReducer,
  StoreGeometryReducer,
  symbolStatusButtonReducer,
  tooltipContentReducer,
  toolTipStatusReducer,
  WeatherPictureReducer,
} from './shared/reducer/reducer'

export const store = configureStore({
  reducer: {
    mapViewer: mapReducer.reducer,

    kmzFileData: kmzReducer.reducer,

    points: extentReducer.reducer,

    appLoader: loaderReducer.reducer,

    polygonCreated: polygonCreatedReducer.reducer,
    storeData: StoreGeometryReducer.reducer,
    polylineCreated: polylineCreatedReducer.reducer,
    planeGeometry: PlanGeomatryReducer.reducer,
    saveCancelStatus: SaveCancelReducer.reducer,
    symbolStatus: symbolStatusButtonReducer.reducer,
    weatherPicture: WeatherPictureReducer.reducer,

    toolTipStatus: toolTipStatusReducer.reducer,
    tooltipContent: tooltipContentReducer.reducer,

    geofenceCreated: geofenceCreatedReducer.reducer,
    geofenceStatus: geofenceStatusReducer.reducer,
    geofenceGeojson: GeofencePolyonReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
