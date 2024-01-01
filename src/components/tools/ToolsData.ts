import {
  aircrafts1,
  aircrafts2,
  aircrafts3,
  drawPolygon,
  drawRectangle,
  lineDraw,
  locationGlobe,
  locationPoi,
  locationTarget,
  maritime1,
  maritime2,
  martime3,
  millitaryVehicles1,
  millitaryVehicles2,
  millitaryVehicles3,
  others3,
  others1,
  others2,
  soldiers1,
  soldiers2,
  soldiers3,
} from '../../assests/images'
export const ToolsData = [
  {
    groupName: 'Tools',
    groupId: 1,
    children: [
      { id: 1, title: 'Tools', icon: lineDraw },
      // { id: 2, title: 'Tools', icon: drawRectangle },
      { id: 3, title: 'Tools', icon: drawPolygon },

      { id: 5, title: 'Tools', icon: locationPoi },
    ],
  },
  /*  {
    groupName: 'Locations',
    groupId: 2,
    children: [
      // { id: 4, title: 'Tools', icon: locationTarget },
      // { id: 5, title: 'Tools', icon: locationPoi },
      // { id: 6, title: 'Tools', icon: locationGlobe },
    ],
  }, */
  /*  {
    groupName: 'Soldiers',
    groupId: 3,
    children: [
      { id: 7, title: 'Tools', icon: soldiers1 },
      { id: 8, title: 'Tools', icon: soldiers2 },
      { id: 9, title: 'Tools', icon: soldiers3 },
    ],
  }, */
  {
    groupName: 'Aircrafts',
    groupId: 4,
    children: [
      { id: 10, title: 'Tools', icon: aircrafts1 },
      { id: 11, title: 'Tools', icon: aircrafts2 },
      { id: 12, title: 'Tools', icon: aircrafts3 },
    ],
  },
  {
    groupName: 'Land Assets',
    groupId: 5,
    children: [
      { id: 13, title: 'Tools', icon: millitaryVehicles1 },
      { id: 14, title: 'Tools', icon: millitaryVehicles2 },
      { id: 7, title: 'Tools', icon: soldiers1 },
      // { id: 15, title: 'Tools', icon: millitaryVehicles3 },
    ],
  },
  {
    groupName: 'Maritime Vessels',
    groupId: 6,
    children: [
      { id: 16, title: 'Ship', icon: maritime1 },
      { id: 17, title: 'Tools', icon: maritime2 },
      { id: 18, title: 'Tools', icon: martime3 },
    ],
  },
  {
    groupName: 'Other',
    groupId: 7,
    children: [
      { id: 19, title: 'Missile', icon: others1 },
      // { id: 20, title: 'Tools', icon: others2 },
      { id: 4, title: 'Tools', icon: locationTarget },
      { id: 21, title: 'Tools', icon: others3 },
    ],
  },
]
