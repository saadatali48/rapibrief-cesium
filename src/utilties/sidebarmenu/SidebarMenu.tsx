import React from 'react'
import {
  LayersIcon,
  layesSelected,
  favouriteICon,
  favouriteselected,
  backwardIcon,
  backwardselected,
  messageIcon,
  messageselected,
  ReplayIcon,
  Replayselected,
  AltertIcon,
  Alertselected,
  ReportIcon,
  Reportselected,
  SettingIcon,
  Settingselected,
  simulation,
  simulationselected,
  propagation,
  propagationselected,
  operationicon,
  operationselected,
  geoFenceSimple,
  geoFenceSelected,
  printIcon,
} from '../../assests/images'
import SimulationView from '../../pages/planningmode/components/simulation/devicesimulation/Simulation'
import Picture from '../../pages/livemode/components/pictures/index'
import Operations from '../../pages/planningmode/components/operations'
import OperationsOption from '../../pages/planningmode/components/operations/operationoptions/OperationOptions'
import GeoFence from '../../pages/planningmode/components/geofence'
import AlertDataSource from '../../components/alertdatasource/AlertDataSource'
import Communication from '../../components/communication/Communication'
import PlaybackSideBarPicture from '../../pages/playbackmode/components/PlaybackSideBarPicture'
import Report from '../../pages/livemode/components/report/Report'

export const SidebarData = [
  {
    title: 'Pictures',
    icon: LayersIcon,
    selectedIcon: layesSelected,
    name: 'Layers',
    active: false,
    cName: 'layer',
    MainClass: 'MainLayer',
    ActionComponent: <Picture />,
  },
  {
    title: 'Favourite',
    icon: favouriteICon,
    selectedIcon: favouriteselected,
    name: 'Favourite',
    active: false,
    cName: 'fav',
    MainClass: 'MainLayer',
  },
  {
    title: 'Replay',
    icon: ReplayIcon,
    selectedIcon: Replayselected,
    name: 'Replay',
    active: false,
    cName: 'layer',
    MainClass: 'MainLayer',
  },
  {
    title: 'Backward',
    icon: backwardIcon,
    selectedIcon: backwardselected,
    name: 'backward',
    active: false,
    cName: 'backward',
    MainClass: 'MainLayer',
  },
  {
    title: 'COMMUNICATION',
    icon: messageIcon,
    selectedIcon: messageselected,
    name: 'communication',
    active: false,
    cName: 'communication',
    MainClass: 'MainLayer',
    ActionComponent: <Communication />,
  },
  {
    icon: AltertIcon,
    selectedIcon: Alertselected,
    name: 'Alert',
    active: false,
    cName: 'alertings',
    ActionComponent: <AlertDataSource />,
  },
  {
    title: 'Report',
    icon: ReportIcon,
    selectedIcon: Reportselected,
    name: 'Report',
    active: false,
    cName: 'report',
    MainClass: 'MainLayer',
    ActionComponent: <Report />,
  },
  {
    title: 'Print',
    icon: printIcon,
    selectedIcon: printIcon,
    name: 'Print',
    active: false,
    cName: 'print',
    MainClass: 'MainLayer',
  },
]

export const PlanSideBarMenu: any = [
  {
    title: 'ToolSetting',
    icon: SettingIcon,
    selectedIcon: Settingselected,
    name: 'Settings',
    active: false,
    cName: 'setting',
    MainClass: 'MainLayer',
  },
  {
    title: 'Operation',
    icon: operationicon,
    name: 'operations',
    selectedIcon: operationselected,
    active: false,
    cName: 'operations',
    MainClass: '',
    ActionComponent: <Operations />,
    ActionComponentSecond: <OperationsOption />,
  },
  {
    title: 'Geofencing',
    icon: geoFenceSimple,
    name: 'geofence',
    selectedIcon: geoFenceSelected,
    active: false,
    cName: 'operations',
    MainClass: '',
    ActionComponent: <GeoFence />,
  },
  {
    title: 'Simulation',
    icon: simulation,
    selectedIcon: simulationselected,
    name: 'threed',
    active: false,
    cName: 'threed',
    MainClass: 'MainLayer',
    ActionComponent: <SimulationView />,
  },
  {
    title: 'Propagation',
    icon: propagation,
    selectedIcon: propagationselected,
    name: 'propagation',
    active: false,
    cName: 'propagation',
    MainClass: '',
  },
]

export const PlaybackSidebarMenu = [
  {
    title: 'PICTURES',
    icon: LayersIcon,
    selectedIcon: layesSelected,
    name: 'Layers',
    active: false,
    cName: 'layer',
    MainClass: 'PlanLayer',
    ActionComponent:<PlaybackSideBarPicture />
  },
]
