import {
  Viewer,
  CustomDataSource,
  Cartesian3,
  Ellipsoid,
  Math as CesiumMath,
  Cartographic,
  Cesium3DTileFeature,
  Cesium3DTileset,
  Model,
  EllipsoidTerrainProvider,
  EllipsoidGeodesic,
  ScreenSpaceEventHandler,
  Color,
  ScreenSpaceEventType,
  CallbackProperty,
  HorizontalOrigin,
  VerticalOrigin,
  Cartesian2,
  PolygonHierarchy,
  Entity,
} from 'cesium'

class Measure {
  constructor(viewer, options = {}) {
    if (viewer && viewer instanceof Viewer) {
      this._drawLayer = new CustomDataSource('measureLayer')

      viewer && viewer.dataSources.add(this._drawLayer)

      this._basePath = options.basePath || ''

      this._viewer = viewer
    }
  }
  /***
   * 坐标转换 84转笛卡尔
   *
   * @param {Object} {lng,lat,alt} 地理坐标
   *
   * @return {Object} Cartesian3 三维位置坐标
   */
  transformWGS84ToCartesian(position, alt) {
    if (this._viewer) {
      return position
        ? Cartesian3.fromDegrees(
            position.lng || position.lon,
            position.lat,
            (position.alt = alt || position.alt),
            Ellipsoid.WGS84
          )
        : Cartesian3.ZERO
    }
  }
  /***
   * 坐标数组转换 笛卡尔转84
   *
   * @param {Array} WSG84Arr {lng,lat,alt} 地理坐标数组
   * @param {Number} alt 拔高
   * @return {Array} Cartesian3 三维位置坐标数组
   */
  transformWGS84ArrayToCartesianArray(WSG84Arr, alt) {
    if (this._viewer && WSG84Arr) {
      var $this = this
      return WSG84Arr
        ? WSG84Arr.map(function (item) {
            return $this.transformWGS84ToCartesian(item, alt)
          })
        : []
    }
  }
  /***
   * 坐标转换 笛卡尔转84
   *
   * @param {Object} Cartesian3 三维位置坐标
   *
   * @return {Object} {lng,lat,alt} 地理坐标
   */
  transformCartesianToWGS84(cartesian) {
    if (this._viewer && cartesian) {
      var ellipsoid = Ellipsoid.WGS84
      var cartographic = ellipsoid.cartesianToCartographic(cartesian)
      return {
        lng: CesiumMath.toDegrees(cartographic.longitude),
        lat: CesiumMath.toDegrees(cartographic.latitude),
        alt: cartographic.height,
      }
    }
  }
  /***
   * 坐标数组转换 笛卡尔转86
   *
   * @param {Array} cartesianArr 三维位置坐标数组
   *
   * @return {Array} {lng,lat,alt} 地理坐标数组
   */
  transformCartesianArrayToWGS84Array(cartesianArr) {
    if (this._viewer) {
      var $this = this
      return cartesianArr
        ? cartesianArr.map(function (item) {
            return $this.transformCartesianToWGS84(item)
          })
        : []
    }
  }
  /**
   * 84坐标转弧度坐标
   * @param {Object} position wgs84
   * @return {Object} Cartographic 弧度坐标
   *
   */
  transformWGS84ToCartographic(position) {
    return position
      ? Cartographic.fromDegrees(
          position.lng || position.lon,
          position.lat,
          position.alt
        )
      : Cartographic.ZERO
  }
  /**
   * 拾取位置点
   *
   * @param {Object} px 屏幕坐标
   *
   * @return {Object} Cartesian3 三维坐标
   */
  getCatesian3FromPX(px) {
    if (this._viewer && px) {
      var picks = this._viewer.scene.drillPick(px)
      var cartesian = null
      var isOn3dtiles = false,
        isOnTerrain = false
      // drillPick
      for (let i in picks) {
        let pick = picks[i]

        if (
          (pick && pick.primitive instanceof Cesium3DTileFeature) ||
          (pick && pick.primitive instanceof Cesium3DTileset) ||
          (pick && pick.primitive instanceof Model)
        ) {
          //模型上拾取
          isOn3dtiles = true
        }
        // 3dtilset
        if (isOn3dtiles) {
          this._viewer.scene.pick(px) // pick
          cartesian = this._viewer.scene.pickPosition(px)
          if (cartesian) {
            let cartographic = Cartographic.fromCartesian(cartesian)
            if (cartographic.height < 0) cartographic.height = 0
            let lon = CesiumMath.toDegrees(cartographic.longitude),
              lat = CesiumMath.toDegrees(cartographic.latitude),
              height = cartographic.height
            cartesian = this.transformWGS84ToCartesian({
              lng: lon,
              lat: lat,
              alt: height,
            })
          }
        }
      }
      // 地形
      let boolTerrain =
        this._viewer.terrainProvider instanceof EllipsoidTerrainProvider
      // Terrain
      if (!isOn3dtiles && !boolTerrain) {
        var ray = this._viewer.scene.camera.getPickRay(px)
        if (!ray) return null
        cartesian = this._viewer.scene.globe.pick(ray, this._viewer.scene)
        isOnTerrain = true
      }
      // 地球
      if (!isOn3dtiles && !isOnTerrain && boolTerrain) {
        cartesian = this._viewer.scene.camera.pickEllipsoid(
          px,
          this._viewer.scene.globe.ellipsoid
        )
      }
      if (cartesian) {
        let position = this.transformCartesianToWGS84(cartesian)
        if (position.alt < 0) {
          cartesian = this.transformWGS84ToCartesian(position, 0.1)
        }
        return cartesian
      }
      return false
    }
  }
  /**
   * 获取84坐标的距离
   * @param {*} positions
   */
  getPositionDistance(positions) {
    let distance = 0
    for (let i = 0; i < positions.length - 1; i++) {
      let point1cartographic = this.transformWGS84ToCartographic(positions[i])
      let point2cartographic = this.transformWGS84ToCartographic(
        positions[i + 1]
      )
      let geodesic = new EllipsoidGeodesic()
      geodesic.setEndPoints(point1cartographic, point2cartographic)
      let s = geodesic.surfaceDistance
      s = Math.sqrt(
        Math.pow(s, 2) +
          Math.pow(point2cartographic.height - point1cartographic.height, 2)
      )
      distance = distance + s
    }
    return distance.toFixed(3)
  }
  /**
   * 计算一组坐标组成多边形的面积
   * @param {*} positions
   */
  getPositionsArea(positions) {
    let result = 0
    if (positions) {
      let h = 0
      let ellipsoid = Ellipsoid.WGS84
      positions.push(positions[0])
      for (let i = 1; i < positions.length; i++) {
        let oel = ellipsoid.cartographicToCartesian(
          this.transformWGS84ToCartographic(positions[i - 1])
        )
        let el = ellipsoid.cartographicToCartesian(
          this.transformWGS84ToCartographic(positions[i])
        )
        h += oel.x * el.y - el.x * oel.y
      }
      result = Math.abs(h).toFixed(2)
    }
    return result
  }
  /**
   * 测距
   * @param {*} options
   */
  drawLineMeasureGraphics(options = {}) {
    if (this._viewer && options) {
      var positions = [],
        _lineEntity = new Entity(),
        $this = this,
        lineObj,
        _handlers = new ScreenSpaceEventHandler(this._viewer.scene.canvas)
      // left
      _handlers.setInputAction(function (movement) {
        var cartesian = $this.getCatesian3FromPX(movement.position)
        if (cartesian && cartesian.x) {
          if (positions.length == 0) {
            positions.push(cartesian.clone())
          }
          // 添加量测信息点
          _addInfoPoint(cartesian)
          positions.push(cartesian)
        }
      }, ScreenSpaceEventType.LEFT_CLICK)

      _handlers.setInputAction(function (movement) {
        var cartesian = $this.getCatesian3FromPX(movement.endPosition)
        if (positions.length >= 2) {
          if (cartesian && cartesian.x) {
            positions.pop()
            positions.push(cartesian)
          }
        }
      }, ScreenSpaceEventType.MOUSE_MOVE)
      // right
      _handlers.setInputAction(function (movement) {
        _handlers.destroy()
        _handlers = null

        let cartesian = $this.getCatesian3FromPX(movement.position)
        _addInfoPoint(cartesian)

        if (typeof options.callback === 'function') {
          options.callback(
            $this.transformCartesianArrayToWGS84Array(positions),
            lineObj
          )
        }
      }, ScreenSpaceEventType.RIGHT_CLICK)

      _lineEntity.polyline = {
        width: options.width || 5,
        material: options.material || Color.BLUE.withAlpha(0.8),
        clampToGround: options.clampToGround || false,
      }
      _lineEntity.polyline.positions = new CallbackProperty(function () {
        return positions
      }, false)

      lineObj = this._drawLayer.entities.add(_lineEntity)

      //添加坐标点
      function _addInfoPoint(position) {
        var _labelEntity = new Entity()
        _labelEntity.position = position
        _labelEntity.point = {
          pixelSize: 10,
          outlineColor: Color.BLUE,
          outlineWidth: 5,
        }
        _labelEntity.label = {
          text:
            String(
              parseFloat(
                $this.getPositionDistance(
                  $this.transformCartesianArrayToWGS84Array(positions)
                ) /
                  1000000 /
                  0.001
              ).toFixed(4)
            ) + ' KM',
          show: true,
          showBackground: true,
          font: '14px monospace',
          horizontalOrigin: HorizontalOrigin.LEFT,
          verticalOrigin: VerticalOrigin.BOTTOM,
          pixelOffset: new Cartesian2(-20, -80),
        }
        // _labelEntity.label = {
        //   text:
        //     (
        //       $this.getPositionDistance(
        //         $this.transformCartesianArrayToWGS84Array(positions)
        //       ) /
        //       1000 /
        //       0.001
        //     ).toFixed(4) + ' Meter',
        //   show: true,
        //   showBackground: true,
        //   font: '14px monospace',
        //   horizontalOrigin: HorizontalOrigin.LEFT,
        //   verticalOrigin: VerticalOrigin.BOTTOM,
        //   pixelOffset: new Cartesian2(-20, -80),
        // }
        $this._drawLayer.entities.add(_labelEntity)
      }
    }
  }
  /**
   * 测面积
   * @param {*} options
   */
  drawAreaMeasureGraphics(options = {}) {
    let AreainSqm = null
    if (this._viewer && options) {
      var positions = [],
        polygon = new PolygonHierarchy(),
        _polygonEntity = new Entity(),
        $this = this,
        polyObj = null,
        _label = '',
        _handler = new ScreenSpaceEventHandler(this._viewer.scene.canvas)
      // left
      _handler.setInputAction(function (movement) {
        var cartesian = $this.getCatesian3FromPX(movement.position)
        if (cartesian && cartesian.x) {
          if (positions.length == 0) {
            polygon.positions.push(cartesian.clone())
            positions.push(cartesian.clone())
          }
          positions.push(cartesian.clone())
          polygon.positions.push(cartesian.clone())

          if (!polyObj) create()
        }
      }, ScreenSpaceEventType.LEFT_CLICK)
      // mouse
      _handler.setInputAction(function (movement) {
        var cartesian = $this.getCatesian3FromPX(movement.endPosition)
        // var cartesian = $this._viewer.scene.camera.pickEllipsoid(movement.endPosition, $this._viewer.scene.globe.ellipsoid);
        if (positions.length >= 2) {
          if (cartesian && cartesian.x) {
            positions.pop()
            positions.push(cartesian)
            polygon.positions.pop()
            polygon.positions.push(cartesian)
          }
        }
      }, ScreenSpaceEventType.MOUSE_MOVE)

      // right
      _handler.setInputAction(function (movement) {
        let cartesian = $this.getCatesian3FromPX(movement.endPosition)

        _handler.destroy()

        positions.push(positions[0])

        // 添加信息点
        AreainSqm = _addInfoPoint(positions[0])
        if (typeof options.callback === 'function') {
          options.callback(AreainSqm)
        }
      }, ScreenSpaceEventType.RIGHT_CLICK)

      function create() {
        _polygonEntity.polyline = {
          width: 3,
          material: Color.BLUE.withAlpha(0.8),
          clampToGround: options.clampToGround || false,
        }

        _polygonEntity.polyline.positions = new CallbackProperty(function () {
          return positions
        }, false)

        _polygonEntity.polygon = {
          hierarchy: new CallbackProperty(function () {
            return polygon
          }, false),

          material: Color.WHITE.withAlpha(0.1),
          clampToGround: options.clampToGround || false,
        }

        polyObj = $this._drawLayer.entities.add(_polygonEntity)
      }

      function _addInfoPoint(position) {
        var _labelEntity = new Entity()
        _labelEntity.position = position
        _labelEntity.point = {
          pixelSize: 10,
          outlineColor: Color.BLUE,
          outlineWidth: 5,
        }
        _labelEntity.label = {
          text:
            (
              $this.getPositionsArea(
                $this.transformCartesianArrayToWGS84Array(positions)
              ) / 1000000.0
            ).toFixed(4) + 'Square kilometers',
          show: true,
          showBackground: true,
          font: '14px monospace',
          horizontalOrigin: HorizontalOrigin.LEFT,
          verticalOrigin: VerticalOrigin.BOTTOM,
          pixelOffset: new Cartesian2(-20, -50),
        }
        /*   _labelEntity.label = {
          text:
            (
              $this.getPositionsArea(
                $this.transformCartesianArrayToWGS84Array(positions)
              ) /
              1000000.0 /
              9.2903e-8 /
              225
            ).toFixed(2) + " Marla",
          show: true,
          showBackground: true,
          font: "14px monospace",
          horizontalOrigin: HorizontalOrigin.LEFT,
          verticalOrigin: VerticalOrigin.BOTTOM,
          pixelOffset: new Cartesian2(-20, -50),
        }; */
        $this._drawLayer.entities.add(_labelEntity)
        var areainKmSq = $this.getPositionsArea(
          $this.transformCartesianArrayToWGS84Array(positions)
        )
        return areainKmSq
      }
    }
  }
  /**
   * 画三角量测
   * @param {*} options
   */
  drawTrianglesMeasureGraphics(options = {}) {
    options.style = options.style || {
      width: 3,
      material: Color.BLUE.withAlpha(0.5),
    }
    if (this._viewer && options) {
      var _trianglesEntity = new Entity(),
        _tempLineEntity = new Entity(),
        _tempLineEntity2 = new Entity(),
        _positions = [],
        _tempPoints = [],
        _tempPoints2 = [],
        $this = this,
        _handler = new ScreenSpaceEventHandler(this._viewer.scene.canvas)
      // height
      function _getHeading(startPosition, endPosition) {
        if (!startPosition && !endPosition) return 0
        if (Cartesian3.equals(startPosition, endPosition)) return 0
        let cartographic = Cartographic.fromCartesian(startPosition)
        let cartographic2 = Cartographic.fromCartesian(endPosition)
        return (cartographic2.height - cartographic.height).toFixed(2)
      }
      // 偏移点
      function _computesHorizontalLine(positions) {
        let cartographic = Cartographic.fromCartesian(positions[0])
        let cartographic2 = Cartographic.fromCartesian(positions[1])
        return Cartesian3.fromDegrees(
          CesiumMath.toDegrees(cartographic.longitude),
          CesiumMath.toDegrees(cartographic.latitude),
          cartographic2.height
        )
      }
      // left
      _handler.setInputAction(function (movement) {
        var position = $this.getCatesian3FromPX(movement.position)
        if (!position && !position.z) return false
        if (_positions.length == 0) {
          _positions.push(position.clone())
          _positions.push(position.clone())
          _tempPoints.push(position.clone())
          _tempPoints.push(position.clone())
        } else {
          _handler.destroy()
          if (typeof options.callback === 'function') {
            options.callback({
              e: _trianglesEntity,
              e2: _tempLineEntity,
              e3: _tempLineEntity2,
            })
          }
        }
      }, ScreenSpaceEventType.LEFT_CLICK)
      // mouse
      _handler.setInputAction(function (movement) {
        var position = $this.getCatesian3FromPX(movement.endPosition)
        if (position && _positions.length > 0) {
          //straight line
          _positions.pop()
          _positions.push(position.clone())
          let horizontalPosition = _computesHorizontalLine(_positions)
          //height
          _tempPoints.pop()
          _tempPoints.push(horizontalPosition.clone())
          //水平线
          _tempPoints2.pop(), _tempPoints2.pop()
          _tempPoints2.push(position.clone())
          _tempPoints2.push(horizontalPosition.clone())
        }
      }, ScreenSpaceEventType.MOUSE_MOVE)

      // create entity
      //straight line
      _trianglesEntity.polyline = {
        positions: new CallbackProperty(function () {
          return _positions
        }, false),
        ...options.style,
      }
      _trianglesEntity.position = new CallbackProperty(function () {
        return _positions[0]
      }, false)
      _trianglesEntity.point = {
        pixelSize: 5,
        outlineColor: Color.BLUE,
        outlineWidth: 5,
      }
      _trianglesEntity.label = {
        text: new CallbackProperty(function () {
          return (
            'straight line:' +
            $this.getPositionDistance(
              $this.transformCartesianArrayToWGS84Array(_positions)
            ) +
            'm'
          )
        }, false),
        show: true,
        showBackground: true,
        font: '14px monospace',
        horizontalOrigin: HorizontalOrigin.LEFT,
        verticalOrigin: VerticalOrigin.BOTTOM,
        pixelOffset: new Cartesian2(50, -100),
      }
      //height
      _tempLineEntity.polyline = {
        positions: new CallbackProperty(function () {
          return _tempPoints
        }, false),
        ...options.style,
      }
      _tempLineEntity.position = new CallbackProperty(function () {
        return _tempPoints2[1]
      }, false)
      _tempLineEntity.point = {
        pixelSize: 5,
        outlineColor: Color.BLUE,
        outlineWidth: 5,
      }
      _tempLineEntity.label = {
        text: new CallbackProperty(function () {
          return 'height:' + _getHeading(_tempPoints[0], _tempPoints[1]) + 'm'
        }, false),
        show: true,
        showBackground: true,
        font: '14px monospace',
        horizontalOrigin: HorizontalOrigin.LEFT,
        verticalOrigin: VerticalOrigin.BOTTOM,
        pixelOffset: new Cartesian2(-20, 100),
      }
      //水平
      _tempLineEntity2.polyline = {
        positions: new CallbackProperty(function () {
          return _tempPoints2
        }, false),
        ...options.style,
      }
      _tempLineEntity2.position = new CallbackProperty(function () {
        return _positions[1]
      }, false)
      _tempLineEntity2.point = {
        pixelSize: 5,
        outlineColor: Color.BLUE,
        outlineWidth: 5,
      }
      _tempLineEntity2.label = {
        text: new CallbackProperty(function () {
          return (
            'Horizontal distance:' +
            $this.getPositionDistance(
              $this.transformCartesianArrayToWGS84Array(_tempPoints2)
            ) +
            'm'
          )
        }, false),
        show: true,
        showBackground: true,
        font: '14px monospace',
        horizontalOrigin: HorizontalOrigin.LEFT,
        verticalOrigin: VerticalOrigin.BOTTOM,
        pixelOffset: new Cartesian2(-150, -20),
      }
      this._drawLayer.entities.add(_tempLineEntity2)
      this._drawLayer.entities.add(_tempLineEntity)
      this._drawLayer.entities.add(_trianglesEntity)
    }
  }
}

export default Measure
