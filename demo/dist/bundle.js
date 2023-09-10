/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../dist/adapter/adapter.js":
/*!**********************************!*\
  !*** ../dist/adapter/adapter.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Adapter": () => (/* binding */ Adapter)
/* harmony export */ });
/**
 * 数据适配基类
 */
class Adapter {
    /**
      * 构造函数
      * @param {GeometryType} type - 矢量数据类型
      */
    constructor(type) {
        this._type = type;
    }
    /**
     * 获取矢量数据类型
     */
    get type() {
        return this._type;
    }
}


/***/ }),

/***/ "../dist/adapter/geojson-adapter.js":
/*!******************************************!*\
  !*** ../dist/adapter/geojson-adapter.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GeoJSONAdapter": () => (/* binding */ GeoJSONAdapter)
/* harmony export */ });
/* harmony import */ var _common_latlng__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/latlng */ "../dist/common/latlng.js");
/* harmony import */ var _feature_feature__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../feature/feature */ "../dist/feature/feature.js");
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../geometry/geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _geometry_multiple_point__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../geometry/multiple-point */ "../dist/geometry/multiple-point.js");
/* harmony import */ var _geometry_multiple_polygon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../geometry/multiple-polygon */ "../dist/geometry/multiple-polygon.js");
/* harmony import */ var _geometry_multiple_polyline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../geometry/multiple-polyline */ "../dist/geometry/multiple-polyline.js");
/* harmony import */ var _geometry_point__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../geometry/point */ "../dist/geometry/point.js");
/* harmony import */ var _geometry_polygon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../geometry/polygon */ "../dist/geometry/polygon.js");
/* harmony import */ var _geometry_polyline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../geometry/polyline */ "../dist/geometry/polyline.js");
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./adapter */ "../dist/adapter/adapter.js");










/**
 * GeoJSON数据适配基类
 */
class GeoJSONAdapter extends _adapter__WEBPACK_IMPORTED_MODULE_9__.Adapter {
    /**
      * 构造函数
      * @param {GeometryType} type - 矢量数据类型
      * @param {string} url - 数据文件地址
      */
    constructor(type, url) {
        super(type);
        this._url = url;
    }
    /**
     * 获取矢量数据
     * @return {Promise<Feature[]>} 返回Promise
     */
    async fetch() {
        const response = await fetch(this._url);
        const data = await response.json();
        const features = [];
        Array.isArray(data.features) && data.features.forEach(item => {
            switch (item.geometry.type) {
                case "Point":
                    if (this._type == _geometry_geometry__WEBPACK_IMPORTED_MODULE_2__.GeometryType.Point) {
                        //TODO: each feature has one type that is ridiculous, cause geojson is a featurecollection, not a featurelayer.
                        // this._type = GeometryType.Point;
                        const point = new _geometry_point__WEBPACK_IMPORTED_MODULE_6__.Point(new _common_latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(item.geometry.coordinates[1], item.geometry.coordinates[0]));
                        features.push(new _feature_feature__WEBPACK_IMPORTED_MODULE_1__.Feature(point, item.properties));
                    }
                    break;
                case "LineString":
                    if (this._type = _geometry_geometry__WEBPACK_IMPORTED_MODULE_2__.GeometryType.Polyline) {
                        const polyline = new _geometry_polyline__WEBPACK_IMPORTED_MODULE_8__.Polyline(item.geometry.coordinates.map(latlng => {
                            return new _common_latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(latlng[1], latlng[0]);
                        }));
                        features.push(new _feature_feature__WEBPACK_IMPORTED_MODULE_1__.Feature(polyline, item.properties));
                    }
                    break;
                case "Polygon":
                    if (this._type = _geometry_geometry__WEBPACK_IMPORTED_MODULE_2__.GeometryType.Polygon) {
                        const polygon = new _geometry_polygon__WEBPACK_IMPORTED_MODULE_7__.Polygon(item.geometry.coordinates.map(ring => {
                            return ring.map(latlng => {
                                return new _common_latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(latlng[1], latlng[0]);
                            });
                        }));
                        features.push(new _feature_feature__WEBPACK_IMPORTED_MODULE_1__.Feature(polygon, item.properties));
                    }
                    break;
                case "MultiPoint":
                    if (this._type == _geometry_geometry__WEBPACK_IMPORTED_MODULE_2__.GeometryType.Point) {
                        const multipoint = new _geometry_multiple_point__WEBPACK_IMPORTED_MODULE_3__.MultiplePoint(item.geometry.coordinates.map(latlng => {
                            return new _common_latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(latlng[1], latlng[0]);
                        }));
                        features.push(new _feature_feature__WEBPACK_IMPORTED_MODULE_1__.Feature(multipoint, item.properties));
                    }
                    break;
                case "MultiLineString":
                    if (this._type = _geometry_geometry__WEBPACK_IMPORTED_MODULE_2__.GeometryType.Polyline) {
                        const multipolyline = new _geometry_multiple_polyline__WEBPACK_IMPORTED_MODULE_5__.MultiplePolyline(item.geometry.coordinates.map(polyline => {
                            return polyline.map(latlng => {
                                return new _common_latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(latlng[1], latlng[0]);
                            });
                        }));
                        features.push(new _feature_feature__WEBPACK_IMPORTED_MODULE_1__.Feature(multipolyline, item.properties));
                    }
                    break;
                case "MultiPolygon":
                    if (this._type = _geometry_geometry__WEBPACK_IMPORTED_MODULE_2__.GeometryType.Polygon) {
                        const multipolygon = new _geometry_multiple_polygon__WEBPACK_IMPORTED_MODULE_4__.MultiplePolygon(item.geometry.coordinates.map(polygon => {
                            return polygon.map(ring => {
                                return ring.map(latlng => {
                                    return new _common_latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(latlng[1], latlng[0]);
                                });
                            });
                        }));
                        features.push(new _feature_feature__WEBPACK_IMPORTED_MODULE_1__.Feature(multipolygon, item.properties));
                    }
                    break;
            }
        });
        return features;
    }
}


/***/ }),

/***/ "../dist/analysis/heat/heat.js":
/*!*************************************!*\
  !*** ../dist/analysis/heat/heat.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Heat": () => (/* binding */ Heat)
/* harmony export */ });
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../geometry/geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _raster_raster__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../raster/raster */ "../dist/raster/raster.js");


/*
 * 热力图
 * https://juejin.im/post/6844903709244129293
 */
class Heat extends _raster_raster__WEBPACK_IMPORTED_MODULE_1__.Raster {
    /**
     * 构造函数
     */
    constructor() {
        super(0, 0, 0, 0);
        /**
         * 热力半径
         */
        this.radius = 40; //px
        /**
         * 渐变色
         */
        this.gradient = [
            { step: 0.3, color: "blue" },
            { step: 0.5, color: "lime" },
            { step: 0.7, color: "yellow" },
            { step: 1, color: "red" }
        ];
        /*
        * 蜂窝显示
        */
        this.honey = false;
        /*
        * 蜂窝边长
        */
        this.honeySide = 10;
    }
    /*
    * 动态栅格（实时渲染）
    */
    get dynamic() {
        return true;
    }
    /**
     * 数据值最小值
     */
    get min() {
        return this._min;
    }
    /**
     * 数据值最小值
     */
    set min(value) {
        this._min = value;
    }
    /**
     * 数据值最大值
     */
    get max() {
        return this._max;
    }
    /**
     * 数据值最大值
     */
    set max(value) {
        this._max = value;
    }
    /**
     * 数据投影
     */
    project() {
        if (!this._crs)
            return;
        let feature = this._featureClass.first;
        while (feature) {
            feature.geometry.crs = this._crs;
            feature = feature.next;
        }
    }
    /**
     * 数据变换
     * @param {ScreenXY} origin - 窗口坐标原点
     * @param {number} zoom - 当前缩放级别
     */
    transform(origin, zoom) {
        let feature = this._featureClass.first;
        while (feature) {
            feature.geometry.transform(origin, zoom);
            feature = feature.next;
        }
    }
    /**
     * 初始化
     * @param {FeatureClass} featureClass - 点要素类
     * @param {Field} field - 值字段
     */
    generate(featureClass, field) {
        if (featureClass.type != _geometry_geometry__WEBPACK_IMPORTED_MODULE_0__.GeometryType.Point)
            return;
        this._featureClass = featureClass;
        this._field = field;
        const values = featureClass.features.map(feature => feature.properties[field.name]);
        this._min = this._min || Math.min(...values), this._max = this._max || Math.max(...values);
        //初始化色带，256个颜色，1个像素代表1个颜色
        this._ramp = document.createElement("canvas");
        const ramp = this._ramp.getContext('2d');
        this._ramp.width = 256;
        this._ramp.height = 1;
        const grd = ramp.createLinearGradient(0, 0, this._ramp.width, this._ramp.height);
        this.gradient.forEach(item => {
            grd.addColorStop(item.step, item.color);
        });
        ramp.fillStyle = grd;
        ramp.fillRect(0, 0, this._ramp.width, this._ramp.height);
    }
    /**
     * 绘制栅格
     * @remarks
     * 遍历图形集合进行绘制
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     */
    draw(ctx) {
        if (!this._featureClass || !this._field)
            return;
        //绘制alpha通道图，类似灰度图
        const canvas = document.createElement("canvas");
        canvas.width = ctx.canvas.width;
        canvas.height = ctx.canvas.height;
        canvas.style.width = ctx.canvas.style.width;
        canvas.style.height = ctx.canvas.style.height;
        canvas.style.transform = ctx.canvas.style.transform;
        const gray = canvas.getContext("2d");
        // const gray = this.honey ? canvas.getContext("2d") : ctx;  
        const matrix = ctx.getTransform();
        gray.setTransform(matrix.a, 0, 0, matrix.d, matrix.e, matrix.f);
        // const gray = ctx;
        //遍历要素集合，根据字段值画alpha通道图
        this._featureClass.features.forEach((feature) => {
            const value = feature.properties[this._field.name];
            if (value != undefined) {
                const alpha = (value - this._min) / (this._max - this._min);
                const point = feature.geometry;
                const screenX = point.screenXY.x;
                const screenY = point.screenXY.y;
                gray.save();
                gray.lineWidth = 0;
                const radgrad = gray.createRadialGradient(screenX, screenY, 0, screenX, screenY, this.radius);
                radgrad.addColorStop(0, "rgba(0, 0, 0, 1)");
                radgrad.addColorStop(1, "rgba(0, 0, 0, 0)");
                gray.fillStyle = radgrad;
                gray.globalAlpha = alpha;
                gray.beginPath(); //Start path
                gray.arc(screenX, screenY, this.radius, 0, Math.PI * 2, true);
                gray.fill();
                gray.restore();
            }
        });
        //根据alpha值找到色带中对应颜色
        const colorData = this._ramp.getContext("2d").getImageData(0, 0, 256, 1).data;
        const imgData = gray.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        if (this.honey) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.strokeStyle = "#ffffff88";
            ctx.lineWidth = 1;
            // let count = 0;
            let flag = 0; //奇偶标志
            for (let y = 0; y <= canvas.height; y = Math.floor(y + this.honeySide * 1.732 / 2)) {
                for (let x = 0 + flag * (3 / 2 * this.honeySide); x <= canvas.width; x = x + 3 * this.honeySide) {
                    const index = (y * canvas.width + x) * 4;
                    const alpha = data[index + 3];
                    //const pixelData = gray.getImageData(x, y, 1, 1);
                    //const pixel = pixelData.data;
                    //const alpha = pixel[3];
                    if (alpha != 0) {
                        ctx.fillStyle = "rgba(" + colorData[4 * alpha] + "," + colorData[4 * alpha + 1] + "," + colorData[4 * alpha + 2] + "," + alpha / 255 + ")";
                        //ctx.fillStyle ="rgba(255,0,0,0.5)";
                        ctx.beginPath();
                        ctx.moveTo(x - this.honeySide, y);
                        ctx.lineTo(x - 1 / 2 * this.honeySide, Math.floor(y - this.honeySide * 1.732 / 2));
                        ctx.lineTo(x + 1 / 2 * this.honeySide, Math.floor(y - this.honeySide * 1.732 / 2));
                        ctx.lineTo(x + this.honeySide, y);
                        ctx.lineTo(x + 1 / 2 * this.honeySide, Math.floor(y + this.honeySide * 1.732 / 2));
                        ctx.lineTo(x - 1 / 2 * this.honeySide, Math.floor(y + this.honeySide * 1.732 / 2));
                        ctx.lineTo(x - this.honeySide, y);
                        ctx.closePath();
                        ctx.fill();
                        ctx.stroke();
                        // count += 1;
                    }
                }
                flag = flag === 0 ? 1 : 0;
            }
            // console.log("honey", count);
            ctx.restore();
        }
        else {
            for (let i = 0; i < data.length; i++) {
                const value = data[i];
                //只有alpha是有值，R，G，B待设置
                if (value > 0) {
                    //alpha值，对应colorData数组下标
                    data[i - 3] = colorData[4 * value]; //R
                    data[i - 2] = colorData[4 * value + 1]; //G
                    data[i - 1] = colorData[4 * value + 2]; //B
                }
            }
            ctx.save();
            // ctx.setTransform(1,0,0,1,0,0);
            ctx.putImageData(imgData, 0, 0);
            ctx.restore();
        }
    }
}


/***/ }),

/***/ "../dist/analysis/interpolation/idw.js":
/*!*********************************************!*\
  !*** ../dist/analysis/interpolation/idw.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IDW": () => (/* binding */ IDW)
/* harmony export */ });
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../geometry/geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _raster_raster__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../raster/raster */ "../dist/raster/raster.js");


/*
 * 反距离加权法（Inverse Distance Weighted）插值
 */
class IDW extends _raster_raster__WEBPACK_IMPORTED_MODULE_1__.Raster {
    /**
     * 构造函数
     */
    constructor() {
        super(0, 0, 0, 0);
        /**
         * 分辨率
         */
        this.resolution = 10; //
        /**
         * 渐变色
         */
        //["#006837", "#1a9850", "#66bd63", "#a6d96a", "#d9ef8b", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d73027", "#a50026"]
        this.gradient = [
            { step: 0, color: "#006837" },
            { step: 0.1, color: "#1a9850" },
            { step: 0.2, color: "#66bd63" },
            { step: 0.3, color: "#a6d96a" },
            { step: 0.4, color: "#d9ef8b" },
            { step: 0.5, color: "#ffffbf" },
            { step: 0.6, color: "#fee08b" },
            { step: 0.7, color: "#fdae61" },
            { step: 0.8, color: "#f46d43" },
            { step: 0.9, color: "#d73027" },
            { step: 1, color: "#a50026" }
        ];
        /**
         * 反距离函数
         */
        this.decay = (distance) => {
            return 1 / Math.pow(distance, 3);
        };
        /*
        * 蜂窝显示
        */
        this.honey = false;
        /*
        * 蜂窝边长
        */
        this.honeySide = 10;
        /*
        * 蜂窝颜色
        */
        this.honeyColor = "#ffffff88";
    }
    /*
    * 动态栅格（实时渲染）
    */
    get dynamic() {
        return true;
    }
    /**
     * 数据值最小值
     */
    get min() {
        return this._min;
    }
    /**
     * 数据值最小值
     */
    set min(value) {
        this._min = value;
    }
    /**
     * 数据值最大值
     */
    get max() {
        return this._max;
    }
    /**
     * 数据值最大值
     */
    set max(value) {
        this._max = value;
    }
    /**
     * 数据投影
     */
    project() {
        if (!this._crs)
            return;
        let feature = this._featureClass.first;
        while (feature) {
            feature.geometry.crs = this._crs;
            feature = feature.next;
        }
    }
    /**
     * 数据变换
     * @param {ScreenXY} origin - 窗口坐标原点
     * @param {number} zoom - 当前缩放级别
     */
    transform(origin, zoom) {
        let feature = this._featureClass.first;
        while (feature) {
            feature.geometry.transform(origin, zoom);
            feature = feature.next;
        }
    }
    /**
     * 初始化
     * @param {FeatureClass} featureClass - 点要素类
     * @param {Field} field - 值字段
     */
    generate(featureClass, field) {
        if (featureClass.type != _geometry_geometry__WEBPACK_IMPORTED_MODULE_0__.GeometryType.Point)
            return;
        this._featureClass = featureClass;
        this._field = field;
        const values = featureClass.features.map(feature => feature.properties[field.name]);
        this._min = this._min || Math.min(...values), this._max = this._max || Math.max(...values);
        //初始化色带，256个颜色，1个像素代表1个颜色
        this._ramp = document.createElement("canvas");
        const ramp = this._ramp.getContext('2d');
        this._ramp.width = 256;
        this._ramp.height = 1;
        const grd = ramp.createLinearGradient(0, 0, this._ramp.width, this._ramp.height);
        this.gradient.forEach(item => {
            grd.addColorStop(item.step, item.color);
        });
        ramp.fillStyle = grd;
        ramp.fillRect(0, 0, this._ramp.width, this._ramp.height);
    }
    /**
     * 绘制栅格
     * @remarks
     * 遍历图形集合进行绘制
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     */
    draw(ctx) {
        if (!this._featureClass || !this._field)
            return;
        const valueData = [];
        // const canvas = document.createElement("canvas");
        // canvas.width = ctx.canvas.width;
        // canvas.height = ctx.canvas.height;
        // canvas.style.width = ctx.canvas.style.width;
        // canvas.style.height = ctx.canvas.style.height;
        // canvas.style.transform = ctx.canvas.style.transform;
        // const gray = canvas.getContext("2d");
        // // const gray = this.honey ? canvas.getContext("2d") : ctx;  
        // const matrix = ctx.getTransform();
        // gray.setTransform(matrix.a, 0, 0, matrix.d, matrix.e, matrix.f);
        const matrix = ctx.getTransform();
        //抽稀
        /*const cluster = this._featureClass.features.reduce( (acc, cur) => {
            if (cur.geometry instanceof Point) {
                const point: Point = cur.geometry;
                const item: any = acc.find((item: any) => {
                    const distance = point.distance(item.geometry, CoordinateType.Screen, ctx, projection);
                    return distance <= 20;
                });
                if (!item) acc.push(cur);
                return acc;
            }
        }, []);*/
        //生成(x,y,value),
        //1.如x,y地理平面坐标，则可放到初始化代码中；
        //2.如x,y屏幕平面坐标，则放在此处，每次重绘重新坐标变换；
        this._featureClass.features.forEach((feature) => {
            const value = feature.properties[this._field.name];
            if (value != undefined) {
                const point = feature.geometry;
                // const screenX = point.screenXY.x;
                // const screenY = point.screenXY.y;
                const screenX = matrix.a * point.screenXY.x + matrix.e;
                const screenY = matrix.d * point.screenXY.y + matrix.f;
                valueData.push([screenX, screenY, (value - this._min) / (this._max - this._min)]);
            }
        });
        //根据alpha值找到色带中对应颜色
        const colorData = this._ramp.getContext("2d").getImageData(0, 0, 256, 1).data;
        //是否采用蜂窝网格渲染
        if (this.honey) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.strokeStyle = this.honeyColor;
            ctx.lineWidth = 1;
            let flag = 0; //奇偶标志
            //循环y轴
            for (let y = 0; y <= ctx.canvas.height; y = Math.floor(y + this.honeySide * 1.732 / 2)) {
                //循环x轴
                for (let x = 0 + flag * (3 / 2 * this.honeySide); x <= ctx.canvas.width; x = x + 3 * this.honeySide) {
                    //通过蜂窝网格中心点(x,y)，计算该点的反距离插值
                    let values = 0, weights = 0;
                    valueData.forEach(item => {
                        let distance = Math.sqrt((item[0] - x) * (item[0] - x) + (item[1] - y) * (item[1] - y));
                        distance = distance < 1 ? 1 : distance;
                        let weight = this.decay(distance);
                        values += weight * item[2];
                        weights += weight;
                    });
                    if (weights) {
                        //插值对比色带，找到填充色，填充整个网格
                        const alpha = Math.floor(values / weights * 255);
                        ctx.fillStyle = "rgba(" + colorData[4 * alpha] + "," + colorData[4 * alpha + 1] + "," + colorData[4 * alpha + 2] + "," + alpha / 255 + ")";
                        ctx.beginPath();
                        //绘制蜂窝网格
                        ctx.moveTo(x - this.honeySide, y);
                        ctx.lineTo(x - 1 / 2 * this.honeySide, Math.floor(y - this.honeySide * 1.732 / 2));
                        ctx.lineTo(x + 1 / 2 * this.honeySide, Math.floor(y - this.honeySide * 1.732 / 2));
                        ctx.lineTo(x + this.honeySide, y);
                        ctx.lineTo(x + 1 / 2 * this.honeySide, Math.floor(y + this.honeySide * 1.732 / 2));
                        ctx.lineTo(x - 1 / 2 * this.honeySide, Math.floor(y + this.honeySide * 1.732 / 2));
                        ctx.lineTo(x - this.honeySide, y);
                        ctx.closePath();
                        ctx.fill();
                        ctx.stroke();
                    }
                }
                //奇偶行换位
                flag = flag === 0 ? 1 : 0;
            }
            ctx.restore();
        }
        else {
            const canvas = document.createElement("canvas");
            canvas.width = ctx.canvas.width / this.resolution;
            canvas.height = ctx.canvas.height / this.resolution;
            // canvas.width = ctx.canvas.width;
            // canvas.height = ctx.canvas.height;
            // canvas.style.width = ctx.canvas.style.width;
            // canvas.style.height = ctx.canvas.style.height;
            // canvas.style.transform = ctx.canvas.style.transform;
            const gray = canvas.getContext("2d");
            gray.setTransform(matrix.a, 0, 0, matrix.d, matrix.e, matrix.f);
            const imgData = gray.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;
            for (let i = 0; i < data.length; i = i + 4) {
                const screenY = i / (4 * canvas.width) * this.resolution, screenX = i / 4 % canvas.width * this.resolution;
                // const screenY = i / (4 * canvas.width), screenX = i / 4 % canvas.width;
                let values = 0, weights = 0;
                //加权
                valueData.forEach(item => {
                    let distance = Math.sqrt((item[0] - screenX) * (item[0] - screenX) + (item[1] - screenY) * (item[1] - screenY));
                    distance = distance < 1 ? 1 : distance;
                    let weight = this.decay(distance);
                    values += weight * item[2];
                    weights += weight;
                });
                //像素RGB赋值，赋值方式参考热力图
                if (weights) {
                    const alpha = Math.floor(values / weights * 255);
                    data[i] = colorData[4 * alpha]; //R
                    data[i + 1] = colorData[4 * alpha + 1]; //G
                    data[i + 2] = colorData[4 * alpha + 2]; //B
                    data[i + 3] = alpha;
                }
            }
            gray.putImageData(imgData, 0, 0);
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.drawImage(canvas, 0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.restore();
            // ctx.save();
            // ctx.putImageData(imgData, 0, 0);
            // ctx.restore();
        }
    }
}


/***/ }),

/***/ "../dist/analysis/interpolation/kriging.js":
/*!*************************************************!*\
  !*** ../dist/analysis/interpolation/kriging.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Kriging": () => (/* binding */ Kriging)
/* harmony export */ });
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/screen-bounds */ "../dist/common/screen-bounds.js");
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../geometry/geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _raster_raster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../raster/raster */ "../dist/raster/raster.js");



/*
 * 克里金插值
 * http://oeo4b.github.io/#documentation
 * https://rawgit.com/oeo4b/kriging.js/master/kriging.js
 */
class Kriging extends _raster_raster__WEBPACK_IMPORTED_MODULE_2__.Raster {
    /**
     * 构造函数
     * @param {number} xmin - 经度左值
     * @param {number} ymin - 纬度下值
     * @param {number} xmax - 经度右值
     * @param {number} ymax - 纬度上值
     * @param {number} width - 栅格宽度
     * @param {number} height - 栅格高度
     * @param {number} cellsize - 栅格大小
     */
    constructor(xmin, ymin, xmax, ymax, width = 1000, height = 1000, cellsize = 4) {
        super(xmin, ymin, xmax, ymax, width, height);
        /*
         * 渲染颜色
         */
        this.colors = ["#006837", "#1a9850", "#66bd63", "#a6d96a", "#d9ef8b", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d73027", "#a50026"];
        /*
         * 插值算法
         */
        this.model = "exponential";
        /*
         * 精度 分辨率 1 block = 4 px
         */
        this.cellSize = 4;
        this.cellSize = cellsize;
    }
    // Matrix algebra
    _kriging_matrix_diag(c, n) {
        let i, Z = Array(n * n).fill(0);
        for (i = 0; i < n; i++)
            Z[i * n + i] = c;
        return Z;
    }
    ;
    _kriging_matrix_transpose(X, n, m) {
        let i, j, Z = Array(m * n);
        for (i = 0; i < n; i++)
            for (j = 0; j < m; j++)
                Z[j * n + i] = X[i * m + j];
        return Z;
    }
    ;
    _kriging_matrix_scale(X, c, n, m) {
        let i, j;
        for (i = 0; i < n; i++)
            for (j = 0; j < m; j++)
                X[i * m + j] *= c;
    }
    ;
    _kriging_matrix_add(X, Y, n, m) {
        let i, j, Z = Array(n * m);
        for (i = 0; i < n; i++)
            for (j = 0; j < m; j++)
                Z[i * m + j] = X[i * m + j] + Y[i * m + j];
        return Z;
    }
    ;
    // Naive matrix multiplication
    _kriging_matrix_multiply(X, Y, n, m, p) {
        let i, j, k, Z = Array(n * p);
        for (i = 0; i < n; i++) {
            for (j = 0; j < p; j++) {
                Z[i * p + j] = 0;
                for (k = 0; k < m; k++)
                    Z[i * p + j] += X[i * m + k] * Y[k * p + j];
            }
        }
        return Z;
    }
    ;
    // Cholesky decomposition
    _kriging_matrix_chol(X, n) {
        let i, j, k, sum, p = Array(n);
        for (i = 0; i < n; i++)
            p[i] = X[i * n + i];
        for (i = 0; i < n; i++) {
            for (j = 0; j < i; j++)
                p[i] -= X[i * n + j] * X[i * n + j];
            if (p[i] <= 0)
                return false;
            p[i] = Math.sqrt(p[i]);
            for (j = i + 1; j < n; j++) {
                for (k = 0; k < i; k++)
                    X[j * n + i] -= X[j * n + k] * X[i * n + k];
                X[j * n + i] /= p[i];
            }
        }
        for (i = 0; i < n; i++)
            X[i * n + i] = p[i];
        return true;
    }
    ;
    // Inversion of cholesky decomposition
    _kriging_matrix_chol2inv(X, n) {
        let i, j, k, sum;
        for (i = 0; i < n; i++) {
            X[i * n + i] = 1 / X[i * n + i];
            for (j = i + 1; j < n; j++) {
                sum = 0;
                for (k = i; k < j; k++)
                    sum -= X[j * n + k] * X[k * n + i];
                X[j * n + i] = sum / X[j * n + j];
            }
        }
        for (i = 0; i < n; i++)
            for (j = i + 1; j < n; j++)
                X[i * n + j] = 0;
        for (i = 0; i < n; i++) {
            X[i * n + i] *= X[i * n + i];
            for (k = i + 1; k < n; k++)
                X[i * n + i] += X[k * n + i] * X[k * n + i];
            for (j = i + 1; j < n; j++)
                for (k = j; k < n; k++)
                    X[i * n + j] += X[k * n + i] * X[k * n + j];
        }
        for (i = 0; i < n; i++)
            for (j = 0; j < i; j++)
                X[i * n + j] = X[j * n + i];
    }
    ;
    // Inversion via gauss-jordan elimination
    _kriging_matrix_solve(X, n) {
        let m = n;
        let b = Array(n * n);
        let indxc = Array(n);
        let indxr = Array(n);
        let ipiv = Array(n);
        let i, icol, irow, j, k, l, ll;
        let big, dum, pivinv, temp;
        for (i = 0; i < n; i++)
            for (j = 0; j < n; j++) {
                if (i == j)
                    b[i * n + j] = 1;
                else
                    b[i * n + j] = 0;
            }
        for (j = 0; j < n; j++)
            ipiv[j] = 0;
        for (i = 0; i < n; i++) {
            big = 0;
            for (j = 0; j < n; j++) {
                if (ipiv[j] != 1) {
                    for (k = 0; k < n; k++) {
                        if (ipiv[k] == 0) {
                            if (Math.abs(X[j * n + k]) >= big) {
                                big = Math.abs(X[j * n + k]);
                                irow = j;
                                icol = k;
                            }
                        }
                    }
                }
            }
            ++(ipiv[icol]);
            if (irow != icol) {
                for (l = 0; l < n; l++) {
                    temp = X[irow * n + l];
                    X[irow * n + l] = X[icol * n + l];
                    X[icol * n + l] = temp;
                }
                for (l = 0; l < m; l++) {
                    temp = b[irow * n + l];
                    b[irow * n + l] = b[icol * n + l];
                    b[icol * n + l] = temp;
                }
            }
            indxr[i] = irow;
            indxc[i] = icol;
            if (X[icol * n + icol] == 0)
                return false; // Singular
            pivinv = 1 / X[icol * n + icol];
            X[icol * n + icol] = 1;
            for (l = 0; l < n; l++)
                X[icol * n + l] *= pivinv;
            for (l = 0; l < m; l++)
                b[icol * n + l] *= pivinv;
            for (ll = 0; ll < n; ll++) {
                if (ll != icol) {
                    dum = X[ll * n + icol];
                    X[ll * n + icol] = 0;
                    for (l = 0; l < n; l++)
                        X[ll * n + l] -= X[icol * n + l] * dum;
                    for (l = 0; l < m; l++)
                        b[ll * n + l] -= b[icol * n + l] * dum;
                }
            }
        }
        for (l = (n - 1); l >= 0; l--)
            if (indxr[l] != indxc[l]) {
                for (k = 0; k < n; k++) {
                    temp = X[k * n + indxr[l]];
                    X[k * n + indxr[l]] = X[k * n + indxc[l]];
                    X[k * n + indxc[l]] = temp;
                }
            }
        return true;
    }
    // Variogram models
    _kriging_variogram_gaussian(h, nugget, range, sill, A) {
        return nugget + ((sill - nugget) / range) *
            (1.0 - Math.exp(-(1.0 / A) * Math.pow(h / range, 2)));
    }
    ;
    _kriging_variogram_exponential(h, nugget, range, sill, A) {
        return nugget + ((sill - nugget) / range) *
            (1.0 - Math.exp(-(1.0 / A) * (h / range)));
    }
    ;
    _kriging_variogram_spherical(h, nugget, range, sill, A) {
        if (h > range)
            return nugget + (sill - nugget) / range;
        return nugget + ((sill - nugget) / range) *
            (1.5 * (h / range) - 0.5 * Math.pow(h / range, 3));
    }
    ;
    // Train using gaussian processes with bayesian priors
    train(t, x, y, model, sigma2, alpha) {
        let variogram = {
            t: t,
            x: x,
            y: y,
            nugget: 0.0,
            range: 0.0,
            sill: 0.0,
            A: 1 / 3,
            n: 0,
            model: null,
            K: null,
            M: null
        };
        switch (model) {
            case "gaussian":
                variogram.model = this._kriging_variogram_gaussian;
                break;
            case "exponential":
                variogram.model = this._kriging_variogram_exponential;
                break;
            case "spherical":
                variogram.model = this._kriging_variogram_spherical;
                break;
        }
        ;
        // Lag distance/semivariance
        let i, j, k, l, n = t.length;
        let distance = Array((n * n - n) / 2);
        for (i = 0, k = 0; i < n; i++)
            for (j = 0; j < i; j++, k++) {
                distance[k] = Array(2);
                distance[k][0] = Math.pow(Math.pow(x[i] - x[j], 2) +
                    Math.pow(y[i] - y[j], 2), 0.5);
                distance[k][1] = Math.abs(t[i] - t[j]);
            }
        distance.sort((a, b) => { return a[0] - b[0]; });
        variogram.range = distance[(n * n - n) / 2 - 1][0];
        // Bin lag distance
        let lags = ((n * n - n) / 2) > 30 ? 30 : (n * n - n) / 2;
        let tolerance = variogram.range / lags;
        let lag = Array(lags).fill(0);
        let semi = Array(lags).fill(0);
        if (lags < 30) {
            for (l = 0; l < lags; l++) {
                lag[l] = distance[l][0];
                semi[l] = distance[l][1];
            }
        }
        else {
            for (i = 0, j = 0, k = 0, l = 0; i < lags && j < ((n * n - n) / 2); i++, k = 0) {
                while (distance[j][0] <= ((i + 1) * tolerance)) {
                    lag[l] += distance[j][0];
                    semi[l] += distance[j][1];
                    j++;
                    k++;
                    if (j >= ((n * n - n) / 2))
                        break;
                }
                if (k > 0) {
                    lag[l] /= k;
                    semi[l] /= k;
                    l++;
                }
            }
            if (l < 2)
                return variogram; // Error: Not enough points
        }
        // Feature transformation
        n = l;
        variogram.range = lag[n - 1] - lag[0];
        let X = Array(2 * n).fill(1);
        let Y = Array(n);
        let A = variogram.A;
        for (i = 0; i < n; i++) {
            switch (model) {
                case "gaussian":
                    X[i * 2 + 1] = 1.0 - Math.exp(-(1.0 / A) * Math.pow(lag[i] / variogram.range, 2));
                    break;
                case "exponential":
                    X[i * 2 + 1] = 1.0 - Math.exp(-(1.0 / A) * lag[i] / variogram.range);
                    break;
                case "spherical":
                    X[i * 2 + 1] = 1.5 * (lag[i] / variogram.range) -
                        0.5 * Math.pow(lag[i] / variogram.range, 3);
                    break;
            }
            ;
            Y[i] = semi[i];
        }
        // Least squares
        let Xt = this._kriging_matrix_transpose(X, n, 2);
        let Z = this._kriging_matrix_multiply(Xt, X, 2, n, 2);
        Z = this._kriging_matrix_add(Z, this._kriging_matrix_diag(1 / alpha, 2), 2, 2);
        let cloneZ = Z.slice(0);
        if (this._kriging_matrix_chol(Z, 2))
            this._kriging_matrix_chol2inv(Z, 2);
        else {
            this._kriging_matrix_solve(cloneZ, 2);
            Z = cloneZ;
        }
        let W = this._kriging_matrix_multiply(this._kriging_matrix_multiply(Z, Xt, 2, 2, n), Y, 2, n, 1);
        // Variogram parameters
        variogram.nugget = W[0];
        variogram.sill = W[1] * variogram.range + variogram.nugget;
        variogram.n = x.length;
        // Gram matrix with prior
        n = x.length;
        let K = Array(n * n);
        for (i = 0; i < n; i++) {
            for (j = 0; j < i; j++) {
                K[i * n + j] = variogram.model(Math.pow(Math.pow(x[i] - x[j], 2) +
                    Math.pow(y[i] - y[j], 2), 0.5), variogram.nugget, variogram.range, variogram.sill, variogram.A);
                K[j * n + i] = K[i * n + j];
            }
            K[i * n + i] = variogram.model(0, variogram.nugget, variogram.range, variogram.sill, variogram.A);
        }
        // Inverse penalized Gram matrix projected to target vector
        let C = this._kriging_matrix_add(K, this._kriging_matrix_diag(sigma2, n), n, n);
        let cloneC = C.slice(0);
        if (this._kriging_matrix_chol(C, n))
            this._kriging_matrix_chol2inv(C, n);
        else {
            this._kriging_matrix_solve(cloneC, n);
            C = cloneC;
        }
        // Copy unprojected inverted matrix as K
        let K2 = C.slice(0);
        let M = this._kriging_matrix_multiply(C, t, n, n, 1);
        variogram.K = K2;
        variogram.M = M;
        return variogram;
    }
    ;
    // Model prediction
    predict(x, y, variogram) {
        var i, k = Array(variogram.n);
        for (i = 0; i < variogram.n; i++)
            k[i] = variogram.model(Math.pow(Math.pow(x - variogram.x[i], 2) +
                Math.pow(y - variogram.y[i], 2), 0.5), variogram.nugget, variogram.range, variogram.sill, variogram.A);
        return this._kriging_matrix_multiply(k, variogram.M, 1, variogram.n, 1)[0];
    }
    ;
    variance(x, y, variogram) {
        var i, k = Array(variogram.n);
        for (i = 0; i < variogram.n; i++)
            k[i] = variogram.model(Math.pow(Math.pow(x - variogram.x[i], 2) +
                Math.pow(y - variogram.y[i], 2), 0.5), variogram.nugget, variogram.range, variogram.sill, variogram.A);
        return variogram.model(0, variogram.nugget, variogram.range, variogram.sill, variogram.A) +
            this._kriging_matrix_multiply(this._kriging_matrix_multiply(k, variogram.K, 1, variogram.n, variogram.n), k, 1, variogram.n, 1)[0];
    }
    ;
    // Gridded matrices or contour paths
    grid(polygons, variogram, width) {
        var i, j, k, n = polygons.length;
        if (n == 0)
            return;
        // Boundaries of polygons space
        var xlim = [polygons[0][0][0], polygons[0][0][0]];
        var ylim = [polygons[0][0][1], polygons[0][0][1]];
        for (i = 0; i < n; i++) // Polygons
            for (j = 0; j < polygons[i].length; j++) { // Vertices
                if (polygons[i][j][0] < xlim[0])
                    xlim[0] = polygons[i][j][0];
                if (polygons[i][j][0] > xlim[1])
                    xlim[1] = polygons[i][j][0];
                if (polygons[i][j][1] < ylim[0])
                    ylim[0] = polygons[i][j][1];
                if (polygons[i][j][1] > ylim[1])
                    ylim[1] = polygons[i][j][1];
            }
        // Alloc for O(n^2) space
        var xtarget, ytarget;
        var a = Array(2), b = Array(2);
        var lxlim = Array(2); // Local dimensions
        var lylim = Array(2); // Local dimensions
        var x = Math.ceil((xlim[1] - xlim[0]) / width);
        var y = Math.ceil((ylim[1] - ylim[0]) / width);
        var A = Array(x + 1);
        const _pip = (array, x, y) => {
            let i, j, c = false;
            for (i = 0, j = array.length - 1; i < array.length; j = i++) {
                if (((array[i][1] > y) != (array[j][1] > y)) &&
                    (x < (array[j][0] - array[i][0]) * (y - array[i][1]) / (array[j][1] - array[i][1]) + array[i][0])) {
                    c = !c;
                }
            }
            return c;
        };
        for (i = 0; i <= x; i++)
            A[i] = Array(y + 1);
        for (i = 0; i < n; i++) {
            // Range for polygons[i]
            lxlim[0] = polygons[i][0][0];
            lxlim[1] = lxlim[0];
            lylim[0] = polygons[i][0][1];
            lylim[1] = lylim[0];
            for (j = 1; j < polygons[i].length; j++) { // Vertices
                if (polygons[i][j][0] < lxlim[0])
                    lxlim[0] = polygons[i][j][0];
                if (polygons[i][j][0] > lxlim[1])
                    lxlim[1] = polygons[i][j][0];
                if (polygons[i][j][1] < lylim[0])
                    lylim[0] = polygons[i][j][1];
                if (polygons[i][j][1] > lylim[1])
                    lylim[1] = polygons[i][j][1];
            }
            // Loop through polygon subspace
            a[0] = Math.floor(((lxlim[0] - ((lxlim[0] - xlim[0]) % width)) - xlim[0]) / width);
            a[1] = Math.ceil(((lxlim[1] - ((lxlim[1] - xlim[1]) % width)) - xlim[0]) / width);
            b[0] = Math.floor(((lylim[0] - ((lylim[0] - ylim[0]) % width)) - ylim[0]) / width);
            b[1] = Math.ceil(((lylim[1] - ((lylim[1] - ylim[1]) % width)) - ylim[0]) / width);
            for (j = a[0]; j <= a[1]; j++)
                for (k = b[0]; k <= b[1]; k++) {
                    xtarget = xlim[0] + j * width;
                    ytarget = ylim[0] + k * width;
                    if (_pip(polygons[i], xtarget, ytarget))
                        A[j][k] = this.predict(xtarget, ytarget, variogram);
                }
        }
        return {
            A: A,
            xlim: xlim,
            ylim: ylim,
            zlim: [Math.min(...variogram.t), Math.max(...variogram.t)],
            width: width
        };
    }
    ;
    contour(value, polygons, variogram) {
    }
    ;
    plot(grid, xlim, ylim, colors) {
        // Clear screen
        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Starting boundaries
        var range = [xlim[1] - xlim[0], ylim[1] - ylim[0], grid.zlim[1] - grid.zlim[0]];
        var i, j, x, y, z;
        var n = grid.A.length;
        var m = grid.A[0].length;
        var wx = Math.ceil(grid.width * this.canvas.width / (xlim[1] - xlim[0]));
        var wy = Math.ceil(grid.width * this.canvas.height / (ylim[1] - ylim[0]));
        for (i = 0; i < n; i++) {
            for (j = 0; j < m; j++) {
                if (grid.A[i][j] == undefined)
                    continue;
                x = this.canvas.width * (i * grid.width + grid.xlim[0] - xlim[0]) / range[0];
                y = this.canvas.height * (1 - (j * grid.width + grid.ylim[0] - ylim[0]) / range[1]);
                z = (grid.A[i][j] - grid.zlim[0]) / range[2];
                if (z < 0.0)
                    z = 0.0;
                if (z > 1.0)
                    z = 1.0;
                ctx.fillStyle = colors[Math.floor((colors.length - 1) * z)];
                ctx.fillRect(Math.round(x - wx / 2), Math.round(y - wy / 2), wx, wy);
            }
        }
    }
    ;
    /**
     * 数据投影
     */
    project() {
        if (!this._crs)
            return;
        const plane1 = this._crs.projection.project(this.bounds.getSouthWest());
        const plane2 = this._crs.projection.project(this.bounds.getNorthEast());
        this._planeBounds = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__.ScreenBounds(plane1, plane2);
    }
    /**
     * 数据变换
     * @param {ScreenXY} origin - 窗口坐标原点
     * @param {number} zoom - 当前缩放级别
     */
    transform(origin, zoom) {
        if (!this._crs && !this._planeBounds)
            return;
        const screen1 = this._crs.planeXYToScreenXY(this._planeBounds.getBottomLeft(), zoom).round(false).subtract(origin);
        const screen2 = this._crs.planeXYToScreenXY(this._planeBounds.getTopRight(), zoom).round(false).subtract(origin);
        this._screenBounds = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__.ScreenBounds(screen1, screen2);
    }
    /**
     * 生成插值
     * @param {FeatureClass} featureClass - 插值点要素类
     * @param {Field} field - 插值字段
     */
    generate(featureClass, field) {
        if (featureClass.type != _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__.GeometryType.Point)
            return;
        const values = featureClass.features.map(feature => feature.properties[field.name]);
        const lngs = featureClass.features.map(feature => feature.geometry.latlng.lng);
        const lats = featureClass.features.map(feature => feature.geometry.latlng.lat);
        const variogram = this.train(values, lngs, lats, this.model, 0, 100);
        const bounds = this.bounds;
        const boundary = [[[bounds.getWest(), bounds.getSouth()], [bounds.getWest(), bounds.getNorth()], [bounds.getEast(), bounds.getNorth()], [bounds.getEast(), bounds.getSouth()]]];
        const grid = this.grid(boundary, variogram, (bounds.getNorth() - bounds.getSouth()) / (this.canvas.height / this.cellSize));
        this.plot(grid, [bounds.getWest(), bounds.getEast()], [bounds.getSouth(), bounds.getNorth()], this.colors);
    }
    /**
     * 绘制栅格
     * @remarks
     * 遍历图形集合进行绘制
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     */
    draw(ctx) {
        if (!this._screenBounds)
            return;
        // ctx.save();
        let screenXMin = this._screenBounds.min.x;
        let screenYMin = this._screenBounds.min.y;
        let screenXMax = this._screenBounds.max.x;
        let screenYMax = this._screenBounds.max.y;
        //this.resample(this.canvas, this.canvas.width, this.canvas.height, false);
        ctx.drawImage(this.canvas, screenXMin, screenYMin, screenXMax - screenXMin, screenYMax - screenYMin);
        // ctx.restore();
    }
}


/***/ }),

/***/ "../dist/animation/animation.js":
/*!**************************************!*\
  !*** ../dist/animation/animation.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Animation": () => (/* binding */ Animation)
/* harmony export */ });
/**
 * 动画效果基类
 * @remarks
 * 动画两种实现方式：
 * 1.针对单个图形要素，实现动画，使用时，逻辑较清晰；
 * 2.针对整个图层，类似Symbol，使用时，可能存在效率问题；
 * 目前暂实现1，针对2，目前保留部分已注释的代码，便于日后参考。
 */
class Animation {
}


/***/ }),

/***/ "../dist/animation/line-animation.js":
/*!*******************************************!*\
  !*** ../dist/animation/line-animation.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LineAnimation": () => (/* binding */ LineAnimation)
/* harmony export */ });
/**
 * 线默认动画效果类
 * @remarks
 * 类似航线效果
 */
class LineAnimation extends Animation {
    /**
     * 构造函数
     * @param {Polyline} geometry - 线
     */
    constructor(geometry) {
        super();
        this._percent = 0;
        /**
         * 线宽
         */
        this.lineWidth = 2;
        /**
         * 起始色
         */
        this.startColor = "#ff0000";
        /**
         * 终止色
         */
        this.endColor = "#ffff00";
        /**
         * 二次贝塞尔曲线控制点与线段夹角
         */
        this.angle = Math.PI / 4;
        this._polyline = geometry;
    }
    /**
     * 数据投影
     * @param {CRS} crs - 坐标系
     */
    project(crs) {
        this._polyline.crs = crs;
    }
    /**
     * 数据变换
     * @param {ScreenXY} origin - 窗口坐标原点
     * @param {number} zoom - 当前缩放级别
     */
    transform(origin, zoom) {
        this._polyline.transform(origin, zoom);
        //TODO: polyline, not line; but now just line
        const start = this._polyline._screenXYs[0];
        const end = this._polyline._screenXYs[1];
        this._start = [start.x, start.y];
        this._end = [end.x, end.y];
        const k = (this._end[1] - this._start[1]) / (this._end[0] - this._start[0]);
        const d = Math.sqrt((this._end[1] - this._start[1]) * (this._end[1] - this._start[1]) + (this._end[0] - this._start[0]) * (this._end[0] - this._start[0]));
        const s = d / 2 / Math.cos(this.angle);
        //const a = (Math.atan(k) < 0 ? (Math.PI +  Math.atan(k)) : Math.atan(k)) - this.angle;
        //this._control = this._start[0] >= this._end[0] ? [this._start[0] + s * Math.cos(a), this._start[1] + s * Math.sin(a)] : [this._end[0] + s * Math.cos(a), this._end[1] + s * Math.sin(a)];
        const a = Math.atan(k) - this.angle;
        if (Math.atan(k) < 0) {
            if (this._end[0] > this._start[0]) {
                this._control = [this._start[0] + s * Math.cos(a), this._start[1] + s * Math.sin(a)];
            }
            else {
                this._control = [this._end[0] + s * Math.cos(a), this._end[1] + s * Math.sin(a)];
            }
        }
        else {
            if (this._end[0] > this._start[0]) {
                this._control = [this._start[0] + s * Math.cos(a), this._start[1] + s * Math.sin(a)];
            }
            else {
                this._control = [this._end[0] + s * Math.cos(a), this._end[1] + s * Math.sin(a)];
            }
        }
        this._percent = 0;
    }
    /**
     * 动画效果
     * @remarks
     * 通过Animator中requestAnimationFrame循环调用，因此注意优化代码，保持帧数
     * @param {number} elapsed - 已逝去的时间，毫秒
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     */
    animate(elapsed, ctx) {
        ctx.save();
        ctx.lineWidth = this.lineWidth;
        //keep size
        //地理坐标 转回 屏幕坐标
        // ctx.setTransform(1,0,0,1,0,0);
        const lineGradient = ctx.createLinearGradient(this._start[0], this._start[1], this._end[0], this._end[1]);
        lineGradient.addColorStop(0, this.startColor);
        lineGradient.addColorStop(1, this.endColor);
        ctx.strokeStyle = lineGradient; //设置线条样式
        this._drawCurvePath(ctx, this._start, this._control, this._end, this._percent);
        this._percent += 0.8; //控制动画速度
        if (this._percent >= 100) { //没有画完接着调用,画完的话重置进度
            this._percent = 0;
        }
        ctx.restore();
    }
    _drawCurvePath(ctx, start, point, end, percent) {
        ctx.beginPath();
        ctx.moveTo(start[0], start[1]);
        for (let t = 0; t <= percent / 100; t += 0.005) {
            let x = this._quadraticBezier(start[0], point[0], end[0], t);
            let y = this._quadraticBezier(start[1], point[1], end[1], t);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
    _quadraticBezier(p0, p1, p2, t) {
        let k = 1 - t;
        return k * k * p0 + 2 * (1 - t) * t * p1 + t * t * p2; // 二次贝赛尔曲线方程
    }
}


/***/ }),

/***/ "../dist/animation/point-animation.js":
/*!********************************************!*\
  !*** ../dist/animation/point-animation.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PointAnimation": () => (/* binding */ PointAnimation)
/* harmony export */ });
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation */ "../dist/animation/animation.js");

/**
 * 点默认动画效果类
 * @remarks
 * 类似flashing效果，从中心点向外光环扩散效果
 */
class PointAnimation extends _animation__WEBPACK_IMPORTED_MODULE_0__.Animation {
    //radius: number = this.limit / this.ring;
    /**
     * 构造函数
     * @param {Point} geometry - 点
     */
    constructor(geometry) {
        super();
        /**
         * 边宽
         */
        this.lineWidth = 3;
        /**
         * 颜色
         */
        this.color = "#ff0000";
        /**
         * 扩散速度
         */
        this.velocity = 10; //  px/s
        /**
         * 扩散的最大半径
         */
        this.limit = 30;
        /**
         * 扩散的光圈数
         */
        this.ring = 3;
        this._point = geometry;
    }
    /**
     * 数据投影
     * @param {CRS} crs - 坐标系
     */
    project(crs) {
        this._point.crs = crs;
        /*ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        //keep size
        //地理坐标 转回 屏幕坐标
        ctx.setTransform(1,0,0,1,0,0);
        ctx.beginPath(); //Start path
        ctx.arc(this._screenX, this._screenY, this.limit / this.ring, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.restore();*/
    }
    /**
     * 数据变换
     * @param {ScreenXY} origin - 窗口坐标原点
     * @param {number} zoom - 当前缩放级别
     */
    transform(origin, zoom) {
        this._point.transform(origin, zoom);
    }
    /**
     * 动画效果
     * @remarks
     * 通过Animator中requestAnimationFrame循环调用，因此注意优化代码，保持帧数
     * @param {number} elapsed - 已逝去的时间，毫秒
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     */
    animate(elapsed, ctx) {
        const screenXY = this._point.screenXY;
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        //keep size
        //地理坐标 转回 屏幕坐标
        // ctx.setTransform(1,0,0,1,0,0);
        /*ctx.arc(this._screenX, this._screenY, this.limit / this.ring, 0, Math.PI * 2, true);
        ctx.fill();*/
        for (let i = 0; i < this.ring; i++) {
            ctx.beginPath(); //Start path
            ctx.arc(screenXY.x, screenXY.y, (elapsed / 1000 * this.velocity + i * this.limit / this.ring) % this.limit, 0, Math.PI * 2, true);
            //ctx.arc(this._screenX, this._screenY, this.limit / this.ring + ((elapsed/1000 + (this.limit - this.limit / this.ring) / this.velocity * (i/(this.ring - 1))) * this.velocity) % this.limit, 0, Math.PI * 2, true);
            ctx.stroke();
        }
        ctx.restore();
    }
}


/***/ }),

/***/ "../dist/base/base-object.js":
/*!***********************************!*\
  !*** ../dist/base/base-object.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseObject": () => (/* binding */ BaseObject)
/* harmony export */ });
/**
 * 所有类的基类
 */
class BaseObject {
}


/***/ }),

/***/ "../dist/base/draggable-object.js":
/*!****************************************!*\
  !*** ../dist/base/draggable-object.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DraggableOptions": () => (/* binding */ DraggableOptions),
/* harmony export */   "DraggableObject": () => (/* binding */ DraggableObject)
/* harmony export */ });
/* harmony import */ var _util_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/browser */ "../dist/util/browser.js");
/* harmony import */ var _util_dom_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/dom-event */ "../dist/util/dom-event.js");
/* harmony import */ var _util_dom_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/dom-util */ "../dist/util/dom-util.js");
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/util */ "../dist/util/util.js");
/* harmony import */ var _evented_object__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./evented-object */ "../dist/base/evented-object.js");
/* harmony import */ var _common_screen_xy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/screen-xy */ "../dist/common/screen-xy.js");
/* harmony import */ var _options_object__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./options-object */ "../dist/base/options-object.js");







/*
 * @class Draggable
 * @aka L.Draggable
 * @inherits Evented
 *
 * A class for making DOM elements draggable (including touch support).
 * Used internally for map and marker dragging. Only works for elements
 * that were positioned with [`L.DomUtil.setPosition`](#domutil-setposition).
 *
 * @example
 * ```js
 * var draggable = new L.Draggable(elementToDrag);
 * draggable.enable();
 * ```
 */
const START = _util_browser__WEBPACK_IMPORTED_MODULE_0__.touch ? 'touchstart mousedown' : 'mousedown';
const END = {
    mousedown: 'mouseup',
    touchstart: 'touchend',
    pointerdown: 'touchend',
    MSPointerDown: 'touchend'
};
const MOVE = {
    mousedown: 'mousemove',
    touchstart: 'touchmove',
    pointerdown: 'touchmove',
    MSPointerDown: 'touchmove'
};
/**
 * 可拖拽选项
 */
class DraggableOptions extends _options_object__WEBPACK_IMPORTED_MODULE_6__.OptionsObject {
    constructor() {
        super(...arguments);
        // @section
        // @aka Draggable options
        // @option clickTolerance: Number = 3
        // The max number of pixels a user can shift the mouse pointer during a click
        // for it to be considered a valid click (as opposed to a mouse drag).
        this.clickTolerance = 3;
        this.preventOutline = false;
    }
}
/**
 * 可拖拽类
 */
class DraggableObject extends _evented_object__WEBPACK_IMPORTED_MODULE_4__.EventedObject {
    // @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
    // Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
    constructor(element, dragStartTarget, options) {
        super();
        this.options = new DraggableOptions();
        this.options.assign(options);
        this._element = element;
        this._dragStartTarget = dragStartTarget || element;
    }
    // @method enable()
    // Enables the dragging ability
    enable() {
        if (this._enabled) {
            return;
        }
        _util_dom_event__WEBPACK_IMPORTED_MODULE_1__.on(this._dragStartTarget, START, this._onDown, this);
        this._enabled = true;
    }
    // @method disable()
    // Disables the dragging ability
    disable() {
        if (!this._enabled) {
            return;
        }
        // If we're currently dragging this draggable,
        // disabling it counts as first ending the drag.
        if (DraggableObject._dragging === this) {
            this.finishDrag();
        }
        _util_dom_event__WEBPACK_IMPORTED_MODULE_1__.off(this._dragStartTarget, START, this._onDown, this);
        this._enabled = false;
        this._moved = false;
    }
    _onDown(e) {
        // Ignore simulated events, since we handle both touch and
        // mouse explicitly; otherwise we risk getting duplicates of
        // touch events, see #4315.
        // Also ignore the event if disabled; this happens in IE11
        // under some circumstances, see #3666.
        if (e._simulated || !this._enabled) {
            return;
        }
        this._moved = false;
        if (_util_dom_util__WEBPACK_IMPORTED_MODULE_2__.hasClass(this._element, 'leaflet-zoom-anim')) {
            return;
        }
        if (DraggableObject._dragging || e.shiftKey || ((e.which !== 1) && (e.button !== 1) && !e.touches)) {
            return;
        }
        DraggableObject._dragging = this; // Prevent dragging multiple objects at once.
        if (this._moving) {
            return;
        }
        // @event down: Event
        // Fired when a drag is about to start.
        this.fire('down');
        var first = e.touches ? e.touches[0] : e, sizedParent = _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.getSizedParentNode(this._element);
        this._startPoint = new _common_screen_xy__WEBPACK_IMPORTED_MODULE_5__.ScreenXY(first.clientX, first.clientY);
        // Cache the scale, so that we can continuously compensate for it during drag (_onMove).
        this._parentScale = _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.getScale(sizedParent);
        _util_dom_event__WEBPACK_IMPORTED_MODULE_1__.on(document, MOVE[e.type], this._onMove, this);
        _util_dom_event__WEBPACK_IMPORTED_MODULE_1__.on(document, END[e.type], this._onUp, this);
    }
    _onMove(e) {
        // Ignore simulated events, since we handle both touch and
        // mouse explicitly; otherwise we risk getting duplicates of
        // touch events, see #4315.
        // Also ignore the event if disabled; this happens in IE11
        // under some circumstances, see #3666.
        if (e._simulated || !this._enabled) {
            return;
        }
        if (e.touches && e.touches.length > 1) {
            this._moved = true;
            return;
        }
        var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e), offset = new _common_screen_xy__WEBPACK_IMPORTED_MODULE_5__.ScreenXY(first.clientX, first.clientY).subtract(this._startPoint);
        if (!offset.x && !offset.y) {
            return;
        }
        if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) {
            return;
        }
        // We assume that the parent container's position, border and scale do not change for the duration of the drag.
        // Therefore there is no need to account for the position and border (they are eliminated by the subtraction)
        // and we can use the cached value for the scale.
        offset.x /= this._parentScale.x;
        offset.y /= this._parentScale.y;
        _util_dom_event__WEBPACK_IMPORTED_MODULE_1__.preventDefault(e);
        if (!this._moved) {
            // @event dragstart: Event
            // Fired when a drag starts
            this.fire('dragstart');
            this._moved = true;
            this._startPos = _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.getPosition(this._element).subtract(offset);
            _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.addClass(document.body, 'leaflet-dragging');
            this._lastTarget = e.target || e.srcElement;
            // IE and Edge do not give the <use> element, so fetch it
            // if necessary
            // if (window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance) {
            // 	this._lastTarget = this._lastTarget.correspondingUseElement;
            // }
            _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.addClass(this._lastTarget, 'leaflet-drag-target');
        }
        this._newPos = this._startPos.add(offset);
        this._moving = true;
        _util_util__WEBPACK_IMPORTED_MODULE_3__.cancelAnimFrame(this._animRequest);
        this._lastEvent = e;
        this._animRequest = _util_util__WEBPACK_IMPORTED_MODULE_3__.requestAnimFrame(this._updatePosition, this, true);
    }
    _updatePosition() {
        var e = { originalEvent: this._lastEvent };
        // @event predrag: Event
        // Fired continuously during dragging *before* each corresponding
        // update of the element's position.
        this.fire('predrag', e);
        _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.setPosition(this._element, this._newPos);
        // @event drag: Event
        // Fired continuously during dragging.
        this.fire('drag', e);
    }
    _onUp(e) {
        // Ignore simulated events, since we handle both touch and
        // mouse explicitly; otherwise we risk getting duplicates of
        // touch events, see #4315.
        // Also ignore the event if disabled; this happens in IE11
        // under some circumstances, see #3666.
        if (e._simulated || !this._enabled) {
            return;
        }
        this.finishDrag();
    }
    finishDrag() {
        _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.removeClass(document.body, 'leaflet-dragging');
        if (this._lastTarget) {
            _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.removeClass(this._lastTarget, 'leaflet-drag-target');
            this._lastTarget = null;
        }
        for (var i in MOVE) {
            _util_dom_event__WEBPACK_IMPORTED_MODULE_1__.off(document, MOVE[i], this._onMove, this);
            _util_dom_event__WEBPACK_IMPORTED_MODULE_1__.off(document, END[i], this._onUp, this);
        }
        if (this._moved && this._moving) {
            // ensure drag is not fired after dragend
            _util_util__WEBPACK_IMPORTED_MODULE_3__.cancelAnimFrame(this._animRequest);
            // @event dragend: DragEndEvent
            // Fired when the drag ends.
            this.fire('dragend', {
                distance: this._newPos.distanceTo(this._startPos)
            });
        }
        this._moving = false;
        DraggableObject._dragging = null;
    }
}


/***/ }),

/***/ "../dist/base/evented-object.js":
/*!**************************************!*\
  !*** ../dist/base/evented-object.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventedObject": () => (/* binding */ EventedObject)
/* harmony export */ });
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ "../dist/util/util.js");
/* harmony import */ var _id_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./id-object */ "../dist/base/id-object.js");


/**
 * 可激发及监听事件基类
 */
class EventedObject extends _id_object__WEBPACK_IMPORTED_MODULE_1__.IDObject {
    constructor() {
        super();
        this._events = {};
        this._eventParents = {};
        this._firingCount = 0;
    }
    /* @method on(type: String, fn: Function, context?: Object): this
       * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
       *
       * @alternative
       * @method on(eventMap: Object): this
       * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
       */
    on(types, fn, context) {
        // types can be a map of types/handlers
        if (typeof types === 'object') {
            for (let type in types) {
                // we don't process space-separated events here for performance;
                // it's a hot path since Layer uses the on(obj) syntax
                this._on(type, types[type], fn);
            }
        }
        else {
            // types can be a string of space-separated words
            types = _util_util__WEBPACK_IMPORTED_MODULE_0__.splitWords(types);
            for (let i = 0, len = types.length; i < len; i++) {
                this._on(types[i], fn, context);
            }
        }
        return this;
    }
    /* @method off(type: String, fn?: Function, context?: Object): this
     * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
     *
     * @alternative
     * @method off(eventMap: Object): this
     * Removes a set of type/listener pairs.
     *
     * @alternative
     * @method off: this
     * Removes all listeners to all events on the object. This includes implicitly attached events.
     */
    off(types, fn, context) {
        if (!types) {
            // clear all listeners if called without arguments
            this._events = {};
        }
        else if (typeof types === 'object') {
            for (let type in types) {
                this._off(type, types[type], fn);
            }
        }
        else {
            types = _util_util__WEBPACK_IMPORTED_MODULE_0__.splitWords(types);
            for (let i = 0, len = types.length; i < len; i++) {
                this._off(types[i], fn, context);
            }
        }
        return this;
    }
    // attach listener (without syntactic sugar now)
    _on(type, fn, context) {
        this._events = this._events || {};
        /* get/init listeners for type */
        let typeListeners = this._events[type];
        if (!typeListeners) {
            typeListeners = [];
            this._events[type] = typeListeners;
        }
        if (context === this) {
            // Less memory footprint.
            context = undefined;
        }
        let newListener = { fn: fn, ctx: context }, listeners = typeListeners;
        // check if fn already there
        for (let i = 0, len = listeners.length; i < len; i++) {
            if (listeners[i].fn === fn && listeners[i].ctx === context) {
                return;
            }
        }
        listeners.push(newListener);
    }
    _off(type, fn, context) {
        let listeners, i, len;
        if (!this._events) {
            return;
        }
        listeners = this._events[type];
        if (!listeners) {
            return;
        }
        if (!fn) {
            // Set all removed listeners to noop so they are not called if remove happens in fire
            for (i = 0, len = listeners.length; i < len; i++) {
                listeners[i].fn = _util_util__WEBPACK_IMPORTED_MODULE_0__.falseFn;
            }
            // clear all listeners for a type if function isn't specified
            delete this._events[type];
            return;
        }
        if (context === this) {
            context = undefined;
        }
        if (listeners) {
            // find fn and remove it
            for (i = 0, len = listeners.length; i < len; i++) {
                var l = listeners[i];
                if (l.ctx !== context) {
                    continue;
                }
                if (l.fn === fn) {
                    // set the removed listener to noop so that's not called if remove happens in fire
                    l.fn = _util_util__WEBPACK_IMPORTED_MODULE_0__.falseFn;
                    if (this._firingCount) {
                        /* copy array in case events are being fired */
                        this._events[type] = listeners = listeners.slice();
                    }
                    listeners.splice(i, 1);
                    return;
                }
            }
        }
    }
    // @method fire(type: String, data?: Object, propagate?: Boolean): this
    // Fires an event of the specified type. You can optionally provide a data
    // object — the first argument of the listener function will contain its
    // properties. The event can optionally be propagated to event parents.
    fire(type, data, propagate) {
        if (!this.listens(type, propagate)) {
            return this;
        }
        const event = Object.assign({}, data, {
            type: type,
            target: this,
            sourceTarget: data && data.sourceTarget || this
        });
        if (this._events) {
            let listeners = this._events[type];
            if (listeners) {
                this._firingCount = (this._firingCount + 1) || 1;
                for (let i = 0, len = listeners.length; i < len; i++) {
                    let l = listeners[i];
                    l.fn.call(l.ctx || this, event);
                }
                this._firingCount--;
            }
        }
        if (propagate) {
            // propagate the event to parents (set with addEventParent)
            this._propagateEvent(event);
        }
        return this;
    }
    // @method listens(type: String): Boolean
    // Returns `true` if a particular event type has any listeners attached to it.
    listens(type, propagate) {
        var listeners = this._events && this._events[type];
        if (listeners && listeners.length) {
            return true;
        }
        if (propagate) {
            // also check parents for listeners if event propagates
            for (var id in this._eventParents) {
                if (this._eventParents[id].listens(type, propagate)) {
                    return true;
                }
            }
        }
        return false;
    }
    // @method once(…): this
    // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
    once(types, fn, context) {
        if (typeof types === 'object') {
            for (var type in types) {
                this.once(type, types[type], fn);
            }
            return this;
        }
        const handler = () => {
            this
                .off(types, fn, context)
                .off(types, handler, context);
        };
        // add a listener that's executed once and removed after that
        return this
            .on(types, fn, context)
            .on(types, handler, context);
    }
    // @method addEventParent(obj: Evented): this
    // Adds an event parent - an `Evented` that will receive propagated events
    addEventParent(obj) {
        this._eventParents = this._eventParents || {};
        this._eventParents[obj.id] = obj;
        return this;
    }
    // @method removeEventParent(obj: Evented): this
    // Removes an event parent, so it will stop receiving propagated events
    removeEventParent(obj) {
        if (this._eventParents) {
            delete this._eventParents[obj.id];
        }
        return this;
    }
    _propagateEvent(e) {
        for (var id in this._eventParents) {
            this._eventParents[id].fire(e.type, Object.assign({
                layer: e.target,
                propagatedFrom: e.target
            }, e), true);
        }
    }
    // @method addEventListener(…): this
    // Alias to [`on(…)`](#evented-on)
    addEventListener(types, fn, context) {
        this.on(types, fn, context);
    }
    // @method removeEventListener(…): this
    // Alias to [`off(…)`](#evented-off)
    removeEventListener(types, fn, context) {
        this.off(types, fn, context);
    }
    // @method clearAllEventListeners(…): this
    // Alias to [`off()`](#evented-off)
    clearAllEventListeners(types, fn, context) {
        this.off(types, fn, context);
    }
    // @method addOneTimeEventListener(…): this
    // Alias to [`once(…)`](#evented-once)
    addOneTimeEventListener(types, fn, context) {
        this.once(types, fn, context);
    }
    // @method fireEvent(…): this
    // Alias to [`fire(…)`](#evented-fire)
    fireEvent(type, data, propagate) {
        this.fire(type, data, propagate);
    }
    // @method hasEventListeners(…): Boolean
    // Alias to [`listens(…)`](#evented-listens)
    hasEventListeners(type, propagate) {
        this.listens(type, propagate);
    }
}


/***/ }),

/***/ "../dist/base/handler-object.js":
/*!**************************************!*\
  !*** ../dist/base/handler-object.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HandlerObject": () => (/* binding */ HandlerObject)
/* harmony export */ });
/* harmony import */ var _id_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id-object */ "../dist/base/id-object.js");

/**
 * 可处理Map事件基类
 */
class HandlerObject extends _id_object__WEBPACK_IMPORTED_MODULE_0__.IDObject {
    // @section There is static function which can be called without instantiating L.Handler:
    // @function addTo(map: Map, name: String): this
    // Adds a new Handler to the given map with the given name.
    // static addTo(map: Map, name: string) {
    //   map.addHandler(name, this);
    //   return this;
    // }
    constructor(map) {
        super();
        this._enabled = false;
        this._map = map;
    }
    // @method enable(): this
    // Enables the handler
    enable() {
        if (this._enabled) {
            return this;
        }
        this._enabled = true;
        this.addHooks();
        return this;
    }
    // @method disable(): this
    // Disables the handler
    disable() {
        if (!this._enabled) {
            return this;
        }
        this._enabled = false;
        this.removeHooks();
        return this;
    }
    // @method enabled(): Boolean
    // Returns `true` if the handler is enabled
    enabled() {
        return !!this._enabled;
    }
    // @section Extension methods
    // Classes inheriting from `Handler` must implement the two following methods:
    // @method addHooks()
    // Called when the handler is enabled, should add event hooks.
    // @method removeHooks()
    // Called when the handler is disabled, should remove the event hooks added previously.
    addHooks() {
    }
    removeHooks() {
    }
}


/***/ }),

/***/ "../dist/base/id-object.js":
/*!*********************************!*\
  !*** ../dist/base/id-object.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IDObject": () => (/* binding */ IDObject)
/* harmony export */ });
/* harmony import */ var _base_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-object */ "../dist/base/base-object.js");

/**
 * 带ID实体基类
 */
class IDObject extends _base_object__WEBPACK_IMPORTED_MODULE_0__.BaseObject {
    /**
      * 构造函数
      */
    constructor() {
        super();
        this._create();
    }
    /**
    * ID
    */
    get id() {
        return this._id;
    }
    _create() {
        // const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        // this._id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        //     return (Math.random() * 16 | 0).toString(16);
        // }).toLowerCase();
        IDObject.MAX_ID += 1;
        this._id = IDObject.MAX_ID;
    }
    /**
      * 输出字符串
      */
    toString() {
        return this._id.toString();
    }
}
/**
* 最大ID（类变量）
*/
IDObject.MAX_ID = 0;


/***/ }),

/***/ "../dist/base/options-object.js":
/*!**************************************!*\
  !*** ../dist/base/options-object.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OptionsObject": () => (/* binding */ OptionsObject)
/* harmony export */ });
/* harmony import */ var _base_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-object */ "../dist/base/base-object.js");

/**
 * 实体配置选项基类
 */
class OptionsObject extends _base_object__WEBPACK_IMPORTED_MODULE_0__.BaseObject {
    /**
      * 构造函数
      */
    constructor() {
        super();
    }
    /**
      * 赋值函数
      */
    assign(options) {
        if (options !== undefined) {
            for (let key in options) {
                if (this.hasOwnProperty(key)) {
                    this[key] = options[key];
                }
            }
        }
    }
}


/***/ }),

/***/ "../dist/common/bounds.js":
/*!********************************!*\
  !*** ../dist/common/bounds.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XYBounds": () => (/* binding */ XYBounds)
/* harmony export */ });
/* harmony import */ var _xy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./xy */ "../dist/common/xy.js");

/**
 * 坐标范围
 * @remark Represents a rectangular area in plane or pixel coordinates.
 */
class XYBounds {
    /**
     * 构造函数
     * @param {XY | XY[]} a - 坐标或坐标数组
     * @param {XY} b - 坐标
     */
    constructor(a, b) {
        let points;
        if (a instanceof _xy__WEBPACK_IMPORTED_MODULE_0__.XY && b instanceof _xy__WEBPACK_IMPORTED_MODULE_0__.XY) {
            points = [a, b];
        }
        else if (Array.isArray(a)) {
            points = a;
        }
        else if (typeof a === 'undefined' && typeof b === 'undefined') {
            points = [];
        }
        else {
            throw new Error('Bounds constructor has an invalid argument.');
        }
        for (var i = 0, len = points.length; i < len; i++) {
            this.extend(points[i]);
        }
    }
    // @method extend(point: Point): this
    // Extends the bounds to contain the given point.
    /**
   * 扩展坐标范围
   * @param {XY | XYBounds} obj - 坐标或坐标范围
   * @return {LatLngBounds} 返回坐标范围
   */
    extend(obj) {
        // @property min: Point
        // The top left corner of the rectangle.
        // @property max: Point
        // The bottom right corner of the rectangle.
        if (obj instanceof _xy__WEBPACK_IMPORTED_MODULE_0__.XY) {
            if (!this.min && !this.max) {
                this.min = obj.clone();
                this.max = obj.clone();
            }
            else {
                this.min.x = Math.min(obj.x, this.min.x);
                this.max.x = Math.max(obj.x, this.max.x);
                this.min.y = Math.min(obj.y, this.min.y);
                this.max.y = Math.max(obj.y, this.max.y);
            }
        }
        else if (obj instanceof XYBounds) {
            if (!this.min && !this.max) {
                this.min = obj.min.clone();
                this.max = obj.max.clone();
            }
            else {
                this.min.x = Math.min(obj.min.x, this.min.x);
                this.max.x = Math.max(obj.max.x, this.max.x);
                this.min.y = Math.min(obj.min.y, this.min.y);
                this.max.y = Math.max(obj.max.y, this.max.y);
            }
        }
        return this;
    }
    // @method getTopLeft(): Point
    // Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
    /**
   * 获取左上角
   * @return {XY} 返回左上角XY
   */
    getTopLeft() {
        return this.min; // left, top
    }
    // @method getBottomRight(): Point
    // Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
    /**
   * 获取右下角
   * @return {XY} 返回右下角XY
   */
    getBottomRight() {
        return this.max; // right, bottom
    }
    // @method getSize(): Point
    // Returns the size of the given bounds
    /**
     * 获取范围大小XY
     * @return {XY} 返回范围大小XY
     */
    getSize() {
        return this.max.subtract(this.min);
    }
    // @method contains(otherBounds: Bounds): Boolean
    // Returns `true` if the rectangle contains the given one.
    // @alternative
    // @method contains(point: Point): Boolean
    // Returns `true` if the rectangle contains the given point.
    /**
     * 判断是否包含坐标或坐标范围
     * @param {XYBounds | XY} obj - 坐标或坐标范围
     * @return {boolean} 返回是否包含
     */
    contains(obj) {
        let min, max;
        if (obj instanceof XYBounds) {
            min = obj.min;
            max = obj.max;
        }
        else {
            min = max = obj;
        }
        return (min.x >= this.min.x) &&
            (max.x <= this.max.x) &&
            (min.y >= this.min.y) &&
            (max.y <= this.max.y);
    }
    // @method intersects(otherBounds: Bounds): Boolean
    // Returns `true` if the rectangle intersects the given bounds. Two bounds
    // intersect if they have at least one point in common.
    /**
     * 判断是否与另一经纬度范围有交叉
     * @param {LatLngBounds} obj - 经纬度范围
     * @return {boolean} 返回是否交叉
     */
    intersects(bounds) {
        let min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xIntersects = (max2.x >= min.x) && (min2.x <= max.x), yIntersects = (max2.y >= min.y) && (min2.y <= max.y);
        return xIntersects && yIntersects;
    }
    // @method overlaps(otherBounds: Bounds): Boolean
    // Returns `true` if the rectangle overlaps the given bounds. Two bounds
    // overlap if their intersection is an area.
    /**
     * 判断是否与另一坐标范围有叠盖
     * @param {XYBounds} obj - 经纬度范围
     * @return {boolean} 返回是否叠盖
     */
    overlaps(bounds) {
        let min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xOverlaps = (max2.x > min.x) && (min2.x < max.x), yOverlaps = (max2.y > min.y) && (min2.y < max.y);
        return xOverlaps && yOverlaps;
    }
    /**
     * 判断坐标范围是否有效
     * @return {boolean} 返回是否有效
     */
    isValid() {
        return !!(this.min && this.max);
    }
}


/***/ }),

/***/ "../dist/common/latlng-bounds.js":
/*!***************************************!*\
  !*** ../dist/common/latlng-bounds.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LatLngBounds": () => (/* binding */ LatLngBounds)
/* harmony export */ });
/* harmony import */ var _latlng__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./latlng */ "../dist/common/latlng.js");

/**
 * 经纬度坐标范围
 * @remark Represents a rectangular geographical area on a map.
 */
class LatLngBounds {
    /**
     * 构造函数
     * @param {LatLng | LatLng[]} a - 经纬度或经纬度数组
     * @param {LatLng} b - 经纬度
     */
    constructor(a, b) {
        let latlngs;
        if (a instanceof _latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng && b instanceof _latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng) {
            latlngs = [a, b];
        }
        else if (Array.isArray(a)) {
            latlngs = a;
        }
        else if (typeof a === 'undefined' && typeof b === 'undefined') {
            latlngs = [];
        }
        else {
            throw new Error('LatLngBounds constructor has an invalid argument.');
        }
        for (var i = 0, len = latlngs.length; i < len; i++) {
            this.extend(latlngs[i]);
        }
    }
    // @method extend(latlng: LatLng): this
    // Extend the bounds to contain the given point
    // @alternative
    // @method extend(otherBounds: LatLngBounds): this
    // Extend the bounds to contain the given bounds
    /**
     * 扩展经纬度范围
     * @param {LatLng | LatLngBounds} obj - 经纬度或经纬度范围
     * @return {LatLngBounds} 返回经纬度范围
     */
    extend(obj) {
        let sw = this._southWest, ne = this._northEast, sw2, ne2;
        if (obj instanceof _latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng) {
            sw2 = obj;
            ne2 = obj;
        }
        else {
            sw2 = obj._southWest;
            ne2 = obj._northEast;
            if (!sw2 || !ne2) {
                return this;
            }
        }
        if (!sw && !ne) {
            this._southWest = new _latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(sw2.lat, sw2.lng);
            this._northEast = new _latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(ne2.lat, ne2.lng);
        }
        else {
            sw.lat = Math.min(sw2.lat, sw.lat);
            sw.lng = Math.min(sw2.lng, sw.lng);
            ne.lat = Math.max(ne2.lat, ne.lat);
            ne.lng = Math.max(ne2.lng, ne.lng);
        }
        return this;
    }
    // @method pad(bufferRatio: Number): LatLngBounds
    // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
    // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
    // Negative values will retract the bounds.
    /**
   * 缓冲经纬度范围
   * @param {number} bufferRatio - 缓冲比例
   * @return {LatLngBounds} 返回经纬度范围
   */
    pad(bufferRatio) {
        let sw = this._southWest, ne = this._northEast, heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio, widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;
        return new LatLngBounds(new _latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer), new _latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
    }
    // @method getCenter(): LatLng
    // Returns the center point of the bounds.
    /**
     * 中心点经纬度
     * @remark Returns the center point of the bounds.
     * @return {LatLng} 返回经纬度
     */
    getCenter() {
        return new _latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2);
    }
    // @method getSouthWest(): LatLng
    // Returns the south-west point of the bounds.
    /**
     * 西南角经纬度
     * @remark Returns the south-west point of the bounds.
     * @return {LatLng} 返回经纬度
     */
    getSouthWest() {
        return this._southWest;
    }
    // @method getNorthEast(): LatLng
    // Returns the north-east point of the bounds.
    /**
     * 东北角经纬度
     * @remark Returns the north-east point of the bounds.
     * @return {LatLng} 返回经纬度
     */
    getNorthEast() {
        return this._northEast;
    }
    // @method getNorthWest(): LatLng
    // Returns the north-west point of the bounds.
    /**
     * 西北角经纬度
     * @remark Returns the north-west point of the bounds.
     * @return {LatLng} 返回经纬度
     */
    getNorthWest() {
        return new _latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(this.getNorth(), this.getWest());
    }
    // @method getSouthEast(): LatLng
    // Returns the south-east point of the bounds.
    /**
     * 东南角经纬度
     * @remark Returns the south-east point of the bounds.
     * @return {LatLng} 返回经纬度
     */
    getSouthEast() {
        return new _latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(this.getSouth(), this.getEast());
    }
    // @method getWest(): Number
    // Returns the west longitude of the bounds
    /**
     * 西边经度
     * @remark Returns the west longitude of the bounds
     * @return {number} 返回经度
     */
    getWest() {
        return this._southWest.lng;
    }
    // @method getSouth(): Number
    // Returns the south latitude of the bounds
    /**
     * 南边纬度
     * @remark Returns the south latitude of the bounds
     * @return {number} 返回纬度
     */
    getSouth() {
        return this._southWest.lat;
    }
    // @method getEast(): Number
    // Returns the east longitude of the bounds
    /**
     * 东边经度
     * @remark Returns the east longitude of the bounds
     * @return {number} 返回经度
     */
    getEast() {
        return this._northEast.lng;
    }
    // @method getNorth(): Number
    // Returns the north latitude of the bounds
    /**
     * 北边纬度
     * @remark Returns the north latitude of the bounds
     * @return {number} 返回纬度
     */
    getNorth() {
        return this._northEast.lat;
    }
    // @method contains(otherBounds: LatLngBounds): Boolean
    // Returns `true` if the rectangle contains the given one.
    // @alternative
    // @method contains (latlng: LatLng): Boolean
    // Returns `true` if the rectangle contains the given point.
    /**
     * 判断是否包含经纬度或经纬度范围
     * @param {LatLng | LatLngBounds} obj - 经纬度或经纬度范围
     * @return {boolean} 返回是否包含
     */
    contains(obj) {
        let sw = this._southWest, ne = this._northEast, sw2, ne2;
        if (obj instanceof LatLngBounds) {
            sw2 = obj.getSouthWest();
            ne2 = obj.getNorthEast();
        }
        else {
            sw2 = ne2 = obj;
        }
        return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
            (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
    }
    // @method intersects(otherBounds: LatLngBounds): Boolean
    // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
    /**
   * 判断是否与另一经纬度范围有交叉
   * @param {LatLngBounds} obj - 经纬度范围
   * @return {boolean} 返回是否交叉
   */
    intersects(bounds) {
        let sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat), lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);
        return latIntersects && lngIntersects;
    }
    // @method overlaps(otherBounds: LatLngBounds): Boolean
    // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
    /**
   * 判断是否与另一经纬度范围有叠盖
   * @param {LatLngBounds} obj - 经纬度范围
   * @return {boolean} 返回是否叠盖
   */
    overlaps(bounds) {
        const sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latOverlaps = (ne2.lat > sw.lat) && (sw2.lat < ne.lat), lngOverlaps = (ne2.lng > sw.lng) && (sw2.lng < ne.lng);
        return latOverlaps && lngOverlaps;
    }
    // @method toBBoxString(): String
    // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
    /**
   * 输出字符串
   * @return {string} 返回字符串
   */
    toString() {
        return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
    }
    // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
    // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
    /**
   * 判断经纬度范围是否相等（在一定容差内）
   * @param {LatLngBounds} bounds - 经纬度范围
   * @param {number} maxMargin - 容差
   * @return {boolean} 返回是否相等
   */
    equals(bounds, maxMargin = 1.0E-9) {
        if (!bounds) {
            return false;
        }
        return this._southWest.equals(bounds.getSouthWest(), maxMargin) &&
            this._northEast.equals(bounds.getNorthEast(), maxMargin);
    }
    // @method isValid(): Boolean
    // Returns `true` if the bounds are properly initialized.
    /**
     * 判断经纬度范围是否有效
     * @return {boolean} 返回是否有效
     */
    isValid() {
        return !!(this._southWest && this._northEast);
    }
}


/***/ }),

/***/ "../dist/common/latlng.js":
/*!********************************!*\
  !*** ../dist/common/latlng.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LatLng": () => (/* binding */ LatLng)
/* harmony export */ });
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ "../dist/util/util.js");
/* harmony import */ var _crs_crs_earth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../crs/crs-earth */ "../dist/crs/crs-earth.js");
/* harmony import */ var _latlng_bounds__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./latlng-bounds */ "../dist/common/latlng-bounds.js");



/**
 * 经纬度坐标
 */
class LatLng {
    /**
      * 构造函数
      * @param {number} lat - 纬度
      * @param {number} lng - 经度
      * @param {number} alt - 海拔
      */
    constructor(lat = 0, lng = 0, alt = 0) {
        // @property lat: Number
        // Latitude in degrees
        this.lat = lat;
        // @property lng: Number
        // Longitude in degrees
        this.lng = lng;
        // @property alt: Number
        // Altitude in meters (optional)
        this.alt = alt;
    }
    // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
    // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
    /**
   * 判断坐标是否相等（在一定容差内）
   * @param {LatLng} obj - 经纬度
   * @param {number} maxMargin - 容差
   * @return {boolean} 返回是否相等
   */
    equals(obj, maxMargin = 1.0E-9) {
        if (!obj) {
            return false;
        }
        const margin = Math.max(Math.abs(this.lat - obj.lat), Math.abs(this.lng - obj.lng));
        return margin <= maxMargin;
    }
    // @method toString(): String
    // Returns a string representation of the point (for debugging purposes).
    /**
     * 输出字符串
     * @param {number} precision - 保留精度
     * @return {string} 返回字符串
     */
    toString(precision = 6) {
        return 'LatLng(' +
            _util_util__WEBPACK_IMPORTED_MODULE_0__.formatNum(this.lat, precision) + ', ' +
            _util_util__WEBPACK_IMPORTED_MODULE_0__.formatNum(this.lng, precision) + ')';
    }
    /**
     * 输出GeoJSON格式
     * @param {number} precision - 保留精度
     * @return {Object} 返回GeoJSON格式
     */
    toGeoJSON(precision = 6) {
        return [_util_util__WEBPACK_IMPORTED_MODULE_0__.formatNum(this.lng, precision), _util_util__WEBPACK_IMPORTED_MODULE_0__.formatNum(this.lat, precision)];
    }
    // @method distanceTo(otherLatLng: LatLng): Number
    // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
    /**
   * 计算与另一点间球面距离
   * @param {LatLng} other - 另一点经纬度
   * @return {number} 返回距离
   */
    distanceTo(other) {
        return new _crs_crs_earth__WEBPACK_IMPORTED_MODULE_1__.Earth().distance(this, other);
    }
    // @method wrap(): LatLng
    // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
    /**
   * 根据取值范围返回经纬度
   * @return {LatLng} 返回取值范围内的经纬度
   */
    wrap() {
        return new _crs_crs_earth__WEBPACK_IMPORTED_MODULE_1__.Earth().wrapLatLng(this);
    }
    // @method toBounds(sizeInMeters: Number): LatLngBounds
    // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
    /**
   * 根据实地距离返回经纬度范围
   * @param {number} sizeInMeters - 实地距离（米）
   * @return {LatLng} 返回经纬度范围
   */
    toLatLngBounds(sizeInMeters) {
        var latAccuracy = 180 * sizeInMeters / 40075017, lngAccuracy = latAccuracy / Math.cos((Math.PI / 180) * this.lat);
        return new _latlng_bounds__WEBPACK_IMPORTED_MODULE_2__.LatLngBounds(new LatLng(this.lat - latAccuracy, this.lng - lngAccuracy), new LatLng(this.lat + latAccuracy, this.lng + lngAccuracy));
    }
    /**
     * 克隆经纬度
     * @return {LatLng} 返回经纬度
     */
    clone() {
        return new LatLng(this.lat, this.lng, this.alt);
    }
}


/***/ }),

/***/ "../dist/common/plane-bounds.js":
/*!**************************************!*\
  !*** ../dist/common/plane-bounds.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaneBounds": () => (/* binding */ PlaneBounds)
/* harmony export */ });
/* harmony import */ var _bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bounds */ "../dist/common/bounds.js");
/* harmony import */ var _plane_xy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plane-xy */ "../dist/common/plane-xy.js");


/**
 * 平面坐标范围
 * @remark Represents a rectangular area in plane coordinates.
 */
class PlaneBounds extends _bounds__WEBPACK_IMPORTED_MODULE_0__.XYBounds {
    /**
     * 构造函数
     * @param {PlaneXY | PlaneXY[]} a - 平面坐标或平面坐标数组
     * @param {PlaneXY} b - 平面坐标
     */
    constructor(a, b) {
        super(a, b);
    }
    // @method getCenter(round?: Boolean): Point
    // Returns the center point of the bounds.
    /**
     * 获取中心点
     * @param {boolean} round - 是否取整
     * @return {PlaneXY} 返回中心点
     */
    getCenter(round = false) {
        const x = round ? Math.round((this.min.x + this.max.x) / 2) : (this.min.x + this.max.x) / 2;
        const y = round ? Math.round((this.min.y + this.max.y) / 2) : (this.min.y + this.max.y) / 2;
        return new _plane_xy__WEBPACK_IMPORTED_MODULE_1__.PlaneXY(x, y);
    }
    // @method getBottomLeft(): Point
    // Returns the bottom-left point of the bounds.
    /**
   * 获取左下角
   * @return {PlaneXY} 返回左下角
   */
    getBottomLeft() {
        return new _plane_xy__WEBPACK_IMPORTED_MODULE_1__.PlaneXY(this.min.x, this.max.y);
    }
    // @method getTopRight(): Point
    // Returns the top-right point of the bounds.
    /**
     * 获取右上角
     * @return {PlaneXY} 返回右上角
     */
    getTopRight() {
        return new _plane_xy__WEBPACK_IMPORTED_MODULE_1__.PlaneXY(this.max.x, this.min.y);
    }
}


/***/ }),

/***/ "../dist/common/plane-xy.js":
/*!**********************************!*\
  !*** ../dist/common/plane-xy.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaneXY": () => (/* binding */ PlaneXY)
/* harmony export */ });
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ "../dist/util/util.js");
/* harmony import */ var _xy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xy */ "../dist/common/xy.js");


/**
 * 平面坐标
 */
class PlaneXY extends _xy__WEBPACK_IMPORTED_MODULE_1__.XY {
    /**
      * 构造函数
      * @param {number} x - X
      * @param {number} y - Y
      */
    constructor(x = 0, y = 0) {
        super(x, y);
    }
    // @method clone(): Point
    // Returns a copy of the current point.
    /**
     * 克隆坐标
     * @return {PlaneXY} 返回坐标
     */
    clone() {
        return new PlaneXY(this.x, this.y);
    }
    // @method distanceTo(otherPoint: Point): Number
    // Returns the cartesian distance between the current and the given points.
    /**
   * 计算与另一点间欧式距离
   * @param {PlaneXY} planeXY - 另一点坐标
   * @return {number} 返回距离
   */
    distanceTo(planeXY) {
        return super.distanceTo(planeXY);
    }
    // @method equals(otherPoint: Point): Boolean
    // Returns `true` if the given point has the same coordinates.
    /**
   * 判断坐标是否相等
   * @param {PlaneXY} obj - 坐标
   * @return {boolean} 返回是否相等
   */
    equals(planeXY) {
        return super.equals(planeXY);
    }
    // @method contains(otherPoint: Point): Boolean
    // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
    /**
   * 判断是否包含坐标
   * @param {PlaneXY} obj - 坐标
   * Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
   * @return {boolean} 返回是否包含
   */
    contains(planeXY) {
        return super.contains(planeXY);
    }
    // @method toString(): String
    // Returns a string representation of the point for debugging purposes.
    /**
   * 输出字符串
   * @param {number} precision - 保留精度
   * @return {string} 返回字符串
   */
    toString(precision = 3) {
        return 'PlaneXY(' +
            (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.formatNum)(this.x, precision) + ', ' +
            (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.formatNum)(this.y, precision) + ')';
    }
}


/***/ }),

/***/ "../dist/common/screen-bounds.js":
/*!***************************************!*\
  !*** ../dist/common/screen-bounds.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScreenBounds": () => (/* binding */ ScreenBounds)
/* harmony export */ });
/* harmony import */ var _bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bounds */ "../dist/common/bounds.js");
/* harmony import */ var _screen_xy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./screen-xy */ "../dist/common/screen-xy.js");


/**
 * 屏幕坐标范围
 * @remark Represents a rectangular area in pixel coordinates.
 */
class ScreenBounds extends _bounds__WEBPACK_IMPORTED_MODULE_0__.XYBounds {
    /**
     * 构造函数
     * @param {ScreenXY | ScreenXY[]} a - 屏幕坐标或屏幕坐标数组
     * @param {ScreenXY} b - 屏幕坐标
     */
    constructor(a, b) {
        super(a, b);
    }
    // @method getCenter(round?: Boolean): Point
    // Returns the center point of the bounds.
    /**
   * 获取中心点
   * @param {boolean} round - 是否取整
   * @return {ScreenXY} 返回中心点
   */
    getCenter(round = false) {
        const x = round ? Math.round((this.min.x + this.max.x) / 2) : (this.min.x + this.max.x) / 2;
        const y = round ? Math.round((this.min.y + this.max.y) / 2) : (this.min.y + this.max.y) / 2;
        return new _screen_xy__WEBPACK_IMPORTED_MODULE_1__.ScreenXY(x, y);
    }
    // @method getBottomLeft(): Point
    // Returns the bottom-left point of the bounds.
    /**
   * 获取左下角
   * @return {ScreenXY} 返回左下角
   */
    getBottomLeft() {
        return new _screen_xy__WEBPACK_IMPORTED_MODULE_1__.ScreenXY(this.min.x, this.max.y);
    }
    // @method getTopRight(): Point
    // Returns the top-right point of the bounds.
    /**
     * 获取右上角
     * @return {ScreenXY} 返回右上角
     */
    getTopRight() {
        return new _screen_xy__WEBPACK_IMPORTED_MODULE_1__.ScreenXY(this.max.x, this.min.y);
    }
    /**
     * 缓冲范围
     * @param {number} pixel - 缓冲像素
     */
    pad(pixel) {
        this.min.x -= pixel;
        this.min.y -= pixel;
        this.max.x += pixel;
        this.max.y += pixel;
    }
}


/***/ }),

/***/ "../dist/common/screen-xy.js":
/*!***********************************!*\
  !*** ../dist/common/screen-xy.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScreenXY": () => (/* binding */ ScreenXY)
/* harmony export */ });
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ "../dist/util/util.js");
/* harmony import */ var _xy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xy */ "../dist/common/xy.js");


/**
 * 屏幕坐标
 */
class ScreenXY extends _xy__WEBPACK_IMPORTED_MODULE_1__.XY {
    /**
      * 构造函数
      * @param {number} x - X
      * @param {number} y - Y
      */
    constructor(x = 0, y = 0) {
        super(x, y);
    }
    // @method clone(): Point
    // Returns a copy of the current point.
    /**
     * 克隆坐标
     * @return {ScreenXY} 返回坐标
     */
    clone() {
        return new ScreenXY(this.x, this.y);
    }
    // @method distanceTo(otherPoint: Point): Number
    // Returns the cartesian distance between the current and the given points.
    /**
   * 计算与另一点间欧式距离
   * @param {ScreenXY} screenXY - 另一点坐标
   * @return {number} 返回距离
   */
    distanceTo(screenXY) {
        return super.distanceTo(screenXY);
    }
    // @method equals(otherPoint: Point): Boolean
    // Returns `true` if the given point has the same coordinates.
    /**
   * 判断坐标是否相等
   * @param {ScreenXY} obj - 坐标
   * @return {boolean} 返回是否相等
   */
    equals(screenXY) {
        return super.equals(screenXY);
    }
    // @method contains(otherPoint: Point): Boolean
    // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
    /**
   * 判断是否包含坐标
   * @param {ScreenXY} obj - 坐标
   * Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
   * @return {boolean} 返回是否包含
   */
    contains(screenXY) {
        return super.contains(screenXY);
    }
    // @method toString(): String
    // Returns a string representation of the point for debugging purposes.
    /**
   * 输出字符串
   * @param {number} precision - 保留精度
   * @return {string} 返回字符串
   */
    toString(precision = 3) {
        return 'ScreenXY(' +
            (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.formatNum)(this.x, precision) + ', ' +
            (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.formatNum)(this.y, precision) + ')';
    }
}


/***/ }),

/***/ "../dist/common/xy.js":
/*!****************************!*\
  !*** ../dist/common/xy.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XY": () => (/* binding */ XY)
/* harmony export */ });
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ "../dist/util/util.js");

/**
 * 坐标
 */
class XY {
    /**
      * 构造函数
      * @param {number} x - X
      * @param {number} y - Y
      */
    constructor(x = 0, y = 0) {
        // @property x: Number; The `x` coordinate of the point
        this.x = x;
        // @property y: Number; The `y` coordinate of the point
        this.y = y;
    }
    // @method add(otherPoint: Point): Point
    // Returns the result of addition of the current and the given points.
    /**
   * 坐标相加
   * @param {XY} otherXY - 另一坐标
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
    add(otherXY, clone = true) {
        let source = this;
        // non-destructive, returns a new point
        if (clone) {
            source = this.clone();
        }
        source.x += otherXY.x;
        source.y += otherXY.y;
        return source;
    }
    // @method subtract(otherPoint: Point): Point
    // Returns the result of subtraction of the given point from the current.
    /**
   * 坐标相减
   * @param {XY} otherXY - 另一坐标
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
    subtract(otherXY, clone = true) {
        let source = this;
        // non-destructive, returns a new point
        if (clone) {
            source = this.clone();
        }
        source.x -= otherXY.x;
        source.y -= otherXY.y;
        return source;
    }
    // @method divideBy(num: Number): Point
    // Returns the result of division of the current point by the given number.
    /**
   * 坐标除以常数
   * @param {number} num - 常数
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
    divideBy(num, clone = true) {
        let source = this;
        // non-destructive, returns a new point
        if (clone) {
            source = this.clone();
        }
        source.x /= num;
        source.y /= num;
        return source;
    }
    // @method multiplyBy(num: Number): Point
    // Returns the result of multiplication of the current point by the given number.
    /**
   * 坐标乘以常数
   * @param {number} num - 常数
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
    multiplyBy(num, clone = true) {
        let source = this;
        // non-destructive, returns a new point
        if (clone) {
            source = this.clone();
        }
        source.x *= num;
        source.y *= num;
        return source;
    }
    // @method scaleBy(scale: Point): Point
    // Multiply each coordinate of the current point by each coordinate of
    // `scale`. In linear algebra terms, multiply the point by the
    // [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
    // defined by `scale`.
    /**
   * 坐标相乘
   * @param {XY} otherXY - 另一坐标
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
    scaleBy(otherXY, clone = true) {
        let source = this;
        // non-destructive, returns a new point
        if (clone) {
            source = this.clone();
        }
        source.x *= otherXY.x;
        source.y *= otherXY.y;
        return source;
    }
    // @method unscaleBy(scale: Point): Point
    // Inverse of `scaleBy`. Divide each coordinate of the current point by
    // each coordinate of `scale`.
    /**
   * 坐标相除
   * @param {XY} otherXY - 另一坐标
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
    unscaleBy(otherXY, clone = true) {
        let source = this;
        // non-destructive, returns a new point
        if (clone) {
            source = this.clone();
        }
        source.x /= otherXY.x;
        source.y /= otherXY.y;
        return source;
    }
    // @method round(): Point
    // Returns a copy of the current point with rounded coordinates.
    /**
   * 坐标取整（四舍五入）
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
    round(clone = true) {
        let source = this;
        // non-destructive, returns a new point
        if (clone) {
            source = this.clone();
        }
        source.x = Math.round(this.x);
        source.y = Math.round(this.y);
        return source;
    }
    // @method floor(): Point
    // Returns a copy of the current point with floored coordinates (rounded down).
    /**
   * 坐标向下取整
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
    floor(clone = true) {
        let source = this;
        // non-destructive, returns a new point
        if (clone) {
            source = this.clone();
        }
        source.x = Math.floor(this.x);
        source.y = Math.floor(this.y);
        return source;
    }
    // @method ceil(): Point
    // Returns a copy of the current point with ceiled coordinates (rounded up).
    /**
   * 坐标向上取整
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
    ceil(clone = true) {
        let source = this;
        // non-destructive, returns a new point
        if (clone) {
            source = this.clone();
        }
        source.x = Math.ceil(this.x);
        source.y = Math.ceil(this.y);
        return source;
    }
    // @method trunc(): Point
    // Returns a copy of the current point with truncated coordinates (rounded towards zero).
    /**
   * 坐标直接取整（将数字的小数部分去掉）
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
    trunc(clone = true) {
        let source = this;
        // non-destructive, returns a new point
        if (clone) {
            source = this.clone();
        }
        source.x = Math.trunc(this.x);
        source.y = Math.trunc(this.y);
        return source;
    }
    // @method distanceTo(otherPoint: Point): Number
    // Returns the cartesian distance between the current and the given points.
    /**
   * 计算与另一点间欧式距离
   * @param {XY} point - 另一点坐标
   * @return {number} 返回距离
   */
    distanceTo(point) {
        let x = point.x - this.x, y = point.y - this.y;
        return Math.sqrt(x * x + y * y);
    }
    // @method equals(otherPoint: Point): Boolean
    // Returns `true` if the given point has the same coordinates.
    /**
   * 判断坐标是否相等
   * @param {XY} obj - 坐标
   * @return {boolean} 返回是否相等
   */
    equals(point) {
        if (!point)
            return false;
        return point.x === this.x &&
            point.y === this.y;
    }
    // @method contains(otherPoint: Point): Boolean
    // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
    /**
   * 判断是否包含坐标
   * @remark Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
   * @param {XY} obj - 坐标
   * @return {boolean} 返回是否包含
   */
    contains(point) {
        return Math.abs(point.x) <= Math.abs(this.x) &&
            Math.abs(point.y) <= Math.abs(this.y);
    }
    // @method toString(): String
    // Returns a string representation of the point for debugging purposes.
    /**
   * 输出字符串
   * @param {number} precision - 保留精度
   * @return {string} 返回字符串
   */
    toString(precision = 3) {
        return 'XY(' +
            (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.formatNum)(this.x, precision) + ', ' +
            (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.formatNum)(this.y, precision) + ')';
    }
}


/***/ }),

/***/ "../dist/crs/crs-3857.js":
/*!*******************************!*\
  !*** ../dist/crs/crs-3857.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EPSG3857": () => (/* binding */ EPSG3857)
/* harmony export */ });
/* harmony import */ var _crs_earth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crs-earth */ "../dist/crs/crs-earth.js");
/* harmony import */ var _projection_projection_spherical_mercator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projection/projection-spherical-mercator */ "../dist/crs/projection/projection-spherical-mercator.js");
/* harmony import */ var _transformation_transformation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transformation/transformation */ "../dist/crs/transformation/transformation.js");



/*
 * @namespace CRS
 * @crs L.CRS.EPSG3857
 *
 * The most common CRS for online maps, used by almost all free and commercial
 * tile providers. Uses Spherical Mercator projection. Set in by default in
 * Map's `crs` option.
 */
class EPSG3857 extends _crs_earth__WEBPACK_IMPORTED_MODULE_0__.Earth {
    constructor() {
        super(...arguments);
        this.code = 'EPSG:3857';
        this.projection = new _projection_projection_spherical_mercator__WEBPACK_IMPORTED_MODULE_1__.SphericalMercator();
        this.transformation = new _transformation_transformation__WEBPACK_IMPORTED_MODULE_2__.Transformation((0.5 / (Math.PI * _projection_projection_spherical_mercator__WEBPACK_IMPORTED_MODULE_1__.SphericalMercator.R)), 0.5, (-0.5 / (Math.PI * _projection_projection_spherical_mercator__WEBPACK_IMPORTED_MODULE_1__.SphericalMercator.R)), 0.5);
    }
}


/***/ }),

/***/ "../dist/crs/crs-4326.js":
/*!*******************************!*\
  !*** ../dist/crs/crs-4326.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EPSG4326": () => (/* binding */ EPSG4326)
/* harmony export */ });
/* harmony import */ var _crs_earth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crs-earth */ "../dist/crs/crs-earth.js");
/* harmony import */ var _projection_projection_lonlat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projection/projection-lonlat */ "../dist/crs/projection/projection-lonlat.js");
/* harmony import */ var _transformation_transformation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transformation/transformation */ "../dist/crs/transformation/transformation.js");



/*
 * @namespace CRS
 * @crs L.CRS.EPSG4326
 *
 * A common CRS among GIS enthusiasts. Uses simple Equirectangular projection.
 *
 * Leaflet 1.0.x complies with the [TMS coordinate scheme for EPSG:4326](https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification#global-geodetic),
 * which is a breaking change from 0.7.x behaviour.  If you are using a `TileLayer`
 * with this CRS, ensure that there are two 256x256 pixel tiles covering the
 * whole earth at zoom level zero, and that the tile coordinate origin is (-180,+90),
 * or (-180,-90) for `TileLayer`s with [the `tms` option](#tilelayer-tms) set.
 */
class EPSG4326 extends _crs_earth__WEBPACK_IMPORTED_MODULE_0__.Earth {
    constructor() {
        super(...arguments);
        this.code = 'EPSG:4326';
        this.projection = new _projection_projection_lonlat__WEBPACK_IMPORTED_MODULE_1__.LonLat();
        this.transformation = new _transformation_transformation__WEBPACK_IMPORTED_MODULE_2__.Transformation(1 / 180, 1, -1 / 180, 0.5);
    }
}


/***/ }),

/***/ "../dist/crs/crs-earth.js":
/*!********************************!*\
  !*** ../dist/crs/crs-earth.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Earth": () => (/* binding */ Earth)
/* harmony export */ });
/* harmony import */ var _crs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crs */ "../dist/crs/crs.js");

/*
 * @namespace CRS
 * @crs L.CRS.Earth
 *
 * Serves as the base for CRS that are global such that they cover the earth.
 * Can only be used as the base for other CRS and cannot be used directly,
 * since it does not have a `code`, `projection` or `transformation`. `distance()` returns
 * meters.
 */
class Earth extends _crs__WEBPACK_IMPORTED_MODULE_0__.CRS {
    constructor() {
        super(...arguments);
        this.wrapLng = [-180, 180];
    }
    // distance between two geographical points using spherical law of cosines approximation
    distance(latlng1, latlng2) {
        var rad = Math.PI / 180, lat1 = latlng1.lat * rad, lat2 = latlng2.lat * rad, sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2), sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2), a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon, c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Earth.R * c;
    }
}
// Mean Earth Radius, as recommended for use by
// the International Union of Geodesy and Geophysics,
// see http://rosettacode.org/wiki/Haversine_formula
Earth.R = 6371000;


/***/ }),

/***/ "../dist/crs/crs.js":
/*!**************************!*\
  !*** ../dist/crs/crs.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CRS": () => (/* binding */ CRS)
/* harmony export */ });
/* harmony import */ var _common_latlng__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/latlng */ "../dist/common/latlng.js");
/* harmony import */ var _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/latlng-bounds */ "../dist/common/latlng-bounds.js");
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/util */ "../dist/util/util.js");
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/screen-bounds */ "../dist/common/screen-bounds.js");




/*
 * @namespace CRS
 * @crs L.CRS.Base
 * Object that defines coordinate reference systems for projecting
 * geographical points into pixel (screen) coordinates and back (and to
 * coordinates in other units for [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services). See
 * [spatial reference system](http://en.wikipedia.org/wiki/Coordinate_reference_system).
 *
 * Leaflet defines the most usual CRSs by default. If you want to use a
 * CRS not defined by default, take a look at the
 * [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) plugin.
 *
 * Note that the CRS instances do not inherit from Leaflet's `Class` object,
 * and can't be instantiated. Also, new classes can't inherit from them,
 * and methods can't be added to them with the `include` function.
 */
class CRS {
    constructor() {
        // @property infinite: Boolean
        // If true, the coordinate space will be unbounded (infinite in both axes)
        this.infinite = false;
    }
    // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
    // Projects geographical coordinates into pixel coordinates for a given zoom.
    latLngToScreenXY(latlng, zoom) {
        const planeXY = this.projection.project(latlng), scale = this.scale(zoom);
        return this.transformation.transform(planeXY, scale);
    }
    // @method pointToLatLng(point: Point, zoom: Number): LatLng
    // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
    // zoom into geographical coordinates.
    screenXYToLatLng(screenXY, zoom) {
        const scale = this.scale(zoom), planeXY = this.transformation.untransform(screenXY, scale);
        return this.projection.unproject(planeXY);
    }
    planeXYToScreenXY(planeXY, zoom) {
        const scale = this.scale(zoom);
        return this.transformation.transform(planeXY, scale);
    }
    screenXYToPlaneXY(screenXY, zoom) {
        const scale = this.scale(zoom);
        return this.transformation.untransform(screenXY, scale);
    }
    // @method project(latlng: LatLng): Point
    // Projects geographical coordinates into coordinates in units accepted for
    // this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
    project(latlng) {
        return this.projection.project(latlng);
    }
    // @method unproject(point: Point): LatLng
    // Given a projected coordinate returns the corresponding LatLng.
    // The inverse of `project`.
    unproject(planeXY) {
        return this.projection.unproject(planeXY);
    }
    // @method scale(zoom: Number): Number
    // Returns the scale used when transforming projected coordinates into
    // pixel coordinates for a particular zoom. For example, it returns
    // `256 * 2^zoom` for Mercator-based CRS.
    scale(zoom) {
        return 256 * Math.pow(2, zoom);
    }
    // @method zoom(scale: Number): Number
    // Inverse of `scale()`, returns the zoom level corresponding to a scale
    // factor of `scale`.
    zoom(scale) {
        return Math.log(scale / 256) / Math.LN2;
    }
    // @method getProjectedBounds(zoom: Number): Bounds
    // Returns the projection's bounds scaled and transformed for the provided `zoom`.
    getScreenBounds(zoom) {
        // if (this.infinite) { return null; }
        var b = this.projection.bounds, s = this.scale(zoom), min = this.transformation.transform(b.min, s), max = this.transformation.transform(b.max, s);
        return new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_3__.ScreenBounds(min, max);
    }
    // @method distance(latlng1: LatLng, latlng2: LatLng): Number
    // Returns the distance between two geographical coordinates.
    // @method wrapLatLng(latlng: LatLng): LatLng
    // Returns a `LatLng` where lat and lng has been wrapped according to the
    // CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
    wrapLatLng(latlng) {
        var lng = this.wrapLng ? _util_util__WEBPACK_IMPORTED_MODULE_2__.wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng, lat = this.wrapLat ? _util_util__WEBPACK_IMPORTED_MODULE_2__.wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat, alt = latlng.alt;
        return new _common_latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(lat, lng, alt);
    }
    // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
    // Returns a `LatLngBounds` with the same size as the given one, ensuring
    // that its center is within the CRS's bounds.
    // Only accepts actual `L.LatLngBounds` instances, not arrays.
    wrapLatLngBounds(bounds) {
        var center = bounds.getCenter(), newCenter = this.wrapLatLng(center), latShift = center.lat - newCenter.lat, lngShift = center.lng - newCenter.lng;
        if (latShift === 0 && lngShift === 0) {
            return bounds;
        }
        var sw = bounds.getSouthWest(), ne = bounds.getNorthEast(), newSw = new _common_latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(sw.lat - latShift, sw.lng - lngShift), newNe = new _common_latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(ne.lat - latShift, ne.lng - lngShift);
        return new _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_1__.LatLngBounds(newSw, newNe);
    }
}
;


/***/ }),

/***/ "../dist/crs/projection/projection-lonlat.js":
/*!***************************************************!*\
  !*** ../dist/crs/projection/projection-lonlat.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LonLat": () => (/* binding */ LonLat)
/* harmony export */ });
/* harmony import */ var _projection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projection */ "../dist/crs/projection/projection.js");
/* harmony import */ var _common_plane_bounds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/plane-bounds */ "../dist/common/plane-bounds.js");
/* harmony import */ var _common_plane_xy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/plane-xy */ "../dist/common/plane-xy.js");
/* harmony import */ var _common_latlng__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/latlng */ "../dist/common/latlng.js");




/*
 * @namespace Projection
 * @section
 * Leaflet comes with a set of already defined Projections out of the box:
 *
 * @projection L.Projection.LonLat
 *
 * Equirectangular, or Plate Carree projection — the most simple projection,
 * mostly used by GIS enthusiasts. Directly maps `x` as longitude, and `y` as
 * latitude. Also suitable for flat worlds, e.g. game maps. Used by the
 * `EPSG:4326` and `Simple` CRS.
 */
class LonLat extends _projection__WEBPACK_IMPORTED_MODULE_0__.Projection {
    constructor() {
        super(...arguments);
        this.bounds = new _common_plane_bounds__WEBPACK_IMPORTED_MODULE_1__.PlaneBounds(new _common_plane_xy__WEBPACK_IMPORTED_MODULE_2__.PlaneXY(-180, -90), new _common_plane_xy__WEBPACK_IMPORTED_MODULE_2__.PlaneXY(180, 90));
    }
    project(latlng) {
        return new _common_plane_xy__WEBPACK_IMPORTED_MODULE_2__.PlaneXY(latlng.lng, latlng.lat);
    }
    unproject(xy) {
        return new _common_latlng__WEBPACK_IMPORTED_MODULE_3__.LatLng(xy.y, xy.x);
    }
}


/***/ }),

/***/ "../dist/crs/projection/projection-mercator.js":
/*!*****************************************************!*\
  !*** ../dist/crs/projection/projection-mercator.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Mercator": () => (/* binding */ Mercator)
/* harmony export */ });
/* harmony import */ var _common_latlng__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/latlng */ "../dist/common/latlng.js");
/* harmony import */ var _common_plane_bounds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/plane-bounds */ "../dist/common/plane-bounds.js");
/* harmony import */ var _common_plane_xy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/plane-xy */ "../dist/common/plane-xy.js");
/* harmony import */ var _projection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projection */ "../dist/crs/projection/projection.js");




/*
 * @namespace Projection
 * @projection L.Projection.Mercator
 *
 * Elliptical Mercator projection — more complex than Spherical Mercator. Assumes that Earth is an ellipsoid. Used by the EPSG:3395 CRS.
 */
class Mercator extends _projection__WEBPACK_IMPORTED_MODULE_3__.Projection {
    constructor() {
        super(...arguments);
        this.bounds = new _common_plane_bounds__WEBPACK_IMPORTED_MODULE_1__.PlaneBounds(new _common_plane_xy__WEBPACK_IMPORTED_MODULE_2__.PlaneXY(-20037508.34279, -15496570.73972), new _common_plane_xy__WEBPACK_IMPORTED_MODULE_2__.PlaneXY(20037508.34279, 18764656.23138));
    }
    project(latlng) {
        var d = Math.PI / 180, r = Mercator.R, y = latlng.lat * d, tmp = Mercator.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), con = e * Math.sin(y);
        var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
        y = -r * Math.log(Math.max(ts, 1E-10));
        return new _common_plane_xy__WEBPACK_IMPORTED_MODULE_2__.PlaneXY(latlng.lng * d * r, y);
    }
    unproject(xy) {
        var d = 180 / Math.PI, r = Mercator.R, tmp = Mercator.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), ts = Math.exp(-xy.y / r), phi = Math.PI / 2 - 2 * Math.atan(ts);
        for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
            con = e * Math.sin(phi);
            con = Math.pow((1 - con) / (1 + con), e / 2);
            dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
            phi += dphi;
        }
        return new _common_latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(phi * d, xy.x * d / r);
    }
}
Mercator.R = 6378137;
Mercator.R_MINOR = 6356752.314245179;
;


/***/ }),

/***/ "../dist/crs/projection/projection-spherical-mercator.js":
/*!***************************************************************!*\
  !*** ../dist/crs/projection/projection-spherical-mercator.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SphericalMercator": () => (/* binding */ SphericalMercator)
/* harmony export */ });
/* harmony import */ var _common_plane_bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/plane-bounds */ "../dist/common/plane-bounds.js");
/* harmony import */ var _common_plane_xy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/plane-xy */ "../dist/common/plane-xy.js");
/* harmony import */ var _common_latlng__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/latlng */ "../dist/common/latlng.js");
/* harmony import */ var _projection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projection */ "../dist/crs/projection/projection.js");




/*
 * @namespace Projection
 * @projection L.Projection.SphericalMercator
 *
 * Spherical Mercator projection — the most common projection for online maps,
 * used by almost all free and commercial tile providers. Assumes that Earth is
 * a sphere. Used by the `EPSG:3857` CRS.
 */
class SphericalMercator extends _projection__WEBPACK_IMPORTED_MODULE_3__.Projection {
    constructor() {
        super(...arguments);
        this.bounds = new _common_plane_bounds__WEBPACK_IMPORTED_MODULE_0__.PlaneBounds(new _common_plane_xy__WEBPACK_IMPORTED_MODULE_1__.PlaneXY(-SphericalMercator.R * Math.PI, -SphericalMercator.R * Math.PI), new _common_plane_xy__WEBPACK_IMPORTED_MODULE_1__.PlaneXY(SphericalMercator.R * Math.PI, SphericalMercator.R * Math.PI));
    }
    project(latlng) {
        let d = Math.PI / 180, max = SphericalMercator.MAX_LATITUDE, lat = Math.max(Math.min(max, latlng.lat), -max), sin = Math.sin(lat * d);
        return new _common_plane_xy__WEBPACK_IMPORTED_MODULE_1__.PlaneXY(SphericalMercator.R * latlng.lng * d, SphericalMercator.R * Math.log((1 + sin) / (1 - sin)) / 2);
    }
    unproject(xy) {
        var d = 180 / Math.PI;
        return new _common_latlng__WEBPACK_IMPORTED_MODULE_2__.LatLng((2 * Math.atan(Math.exp(xy.y / SphericalMercator.R)) - (Math.PI / 2)) * d, xy.x * d / SphericalMercator.R);
    }
}
SphericalMercator.R = 6378137;
SphericalMercator.MAX_LATITUDE = 85.0511287798;


/***/ }),

/***/ "../dist/crs/projection/projection.js":
/*!********************************************!*\
  !*** ../dist/crs/projection/projection.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Projection": () => (/* binding */ Projection)
/* harmony export */ });
class Projection {
}


/***/ }),

/***/ "../dist/crs/transformation/transformation.js":
/*!****************************************************!*\
  !*** ../dist/crs/transformation/transformation.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Transformation": () => (/* binding */ Transformation)
/* harmony export */ });
/* harmony import */ var _common_plane_xy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/plane-xy */ "../dist/common/plane-xy.js");
/* harmony import */ var _common_screen_xy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/screen-xy */ "../dist/common/screen-xy.js");


/*
 * @class Transformation
 * @aka L.Transformation
 *
 * Represents an affine transformation: a set of coefficients `a`, `b`, `c`, `d`
 * for transforming a point of a form `(x, y)` into `(a*x + b, c*y + d)` and doing
 * the reverse. Used by Leaflet in its projections code.
 *
 * @example
 *
 * ```js
 * var transformation = L.transformation(2, 5, -1, 10),
 * 	p = L.point(1, 2),
 * 	p2 = transformation.transform(p), //  L.point(7, 8)
 * 	p3 = transformation.untransform(p2); //  L.point(1, 2)
 * ```
 */
// factory new L.Transformation(a: Number, b: Number, c: Number, d: Number)
// Creates a `Transformation` object with the given coefficients.
class Transformation {
    constructor(a, b, c, d) {
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
    }
    // @method transform(point: Point, scale?: Number): Point
    // Returns a transformed point, optionally multiplied by the given scale.
    // Only accepts actual `L.Point` instances, not arrays.
    transform(planeXY, scale = 1) {
        return new _common_screen_xy__WEBPACK_IMPORTED_MODULE_1__.ScreenXY(scale * (this._a * planeXY.x + this._b), scale * (this._c * planeXY.y + this._d));
    }
    // @method untransform(point: Point, scale?: Number): Point
    // Returns the reverse transformation of the given point, optionally divided
    // by the given scale. Only accepts actual `L.Point` instances, not arrays.
    untransform(screenXY, scale = 1) {
        return new _common_plane_xy__WEBPACK_IMPORTED_MODULE_0__.PlaneXY((screenXY.x / scale - this._b) / this._a, (screenXY.y / scale - this._d) / this._c);
    }
}


/***/ }),

/***/ "../dist/feature/feature-class.js":
/*!****************************************!*\
  !*** ../dist/feature/feature-class.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FeatureClass": () => (/* binding */ FeatureClass)
/* harmony export */ });
/**
 * 要素类（要素集合）
 * @remarks
 * TODO: a lot of things to be done
 * 可设置CRS代表数据源坐标系，FeatureLayer对应Map显示坐标系，可内置数据转换
 */
class FeatureClass {
    /**
     * 构造函数
     * @param {GeometryType} type - 空间数据类型：点/线/面
     */
    constructor(type) {
        /**
         * 属性字段集合
         */
        this._fields = [];
        /**
         * 矢量要素集合
         */
        this._features = {}; //Map<string, Graphic>
        this._type = type;
    }
    /**
     * 遍历集合的初始要素
     */
    get first() {
        return this._first;
    }
    /**
     * 遍历集合的结尾要素
     */
    get last() {
        return this._last;
    }
    /**
     * 空间数据类型：点/线/面
     */
    get type() {
        return this._type;
    }
    /**
     * 要素集合
     */
    get features() {
        return Object.values(this._features);
    }
    /**
     * 属性字段集合
     */
    get fields() {
        return this._fields;
    }
    /**
     * 根据ID获取矢量要素
     * @param {string} id - 空间矢量要素ID
     */
    getFeature(id) {
        return this._features[id];
    }
    /**
     * 添加要素
     * @param {Feature} feature - 空间矢量要素
     */
    addFeature(feature, last = true) {
        this._features[feature.id] = feature;
        if (!this._first) {
            this._first = feature;
            this._last = feature;
        }
        else {
            if (!last) {
                this._first.prev = feature;
                feature.next = this._first;
                this._first = feature;
            }
            else {
                this._last.next = feature;
                feature.prev = this._last;
                this._last = feature;
            }
        }
    }
    /**
     * 删除要素
     * @param {Feature} feature - 空间矢量要素
     */
    removeFeature(feature) {
        if (this._first == feature) {
            this._first = feature.next;
        }
        if (this._last == feature) {
            this._last = feature.prev;
        }
        if (feature.prev) {
            feature.prev.next = feature.next;
        }
        if (feature.next) {
            feature.next.prev = feature.prev;
        }
        feature.prev = null;
        feature.next = null;
        delete this._features[feature.id];
    }
    /**
     * 清空要素集合
     */
    clearFeatures() {
        this._features = {};
    }
    /**
     * 添加字段
     * @param {Field} field - 字段
     */
    addField(field) {
        this._fields.push(field);
    }
    /**
     * 删除字段
     * @param {Field} field - 字段
     */
    removeField(field) {
        const index = this._fields.findIndex(item => item === field);
        index != -1 && this._fields.splice(index, 1);
    }
    /**
     * 清空字段集合
     */
    clearFields() {
        this._fields = [];
    }
    /**
     * 加载矢量数据
     * @param {Adapter} adapter - 数据适配器
     */
    async load(adapter) {
        if (this._type == adapter.type) {
            const features = await adapter.fetch();
            features.forEach(feature => {
                this.addFeature(feature);
            });
        }
    }
}


/***/ }),

/***/ "../dist/feature/feature.js":
/*!**********************************!*\
  !*** ../dist/feature/feature.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Feature": () => (/* binding */ Feature)
/* harmony export */ });
/* harmony import */ var _base_evented_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/evented-object */ "../dist/base/evented-object.js");
/* harmony import */ var _text_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../text/text */ "../dist/text/text.js");


class Feature extends _base_evented_object__WEBPACK_IMPORTED_MODULE_0__.EventedObject {
    /**
      * 构造函数
      * @param {Geometry} geometry - 空间图形
      * @param {Object} properties - 属性信息
      */
    constructor(geometry, properties) {
        super();
        /**
         * 属性信息
         */
        this._properties = {};
        /**
         * 是否可见
         */
        this.visible = true;
        /**
         * 前一要素
         * @remarks
         * 用于FeatureClass要素链表
         */
        this.prev = null;
        /**
         * 后一要素
         * @remarks
         * 用于FeatureClass要素链表
         */
        this.next = null;
        this._geometry = geometry;
        this._properties = properties;
    }
    /**
     * 空间图形
     */
    get geometry() {
        return this._geometry;
    }
    /**
     * 属性信息
     */
    get properties() {
        return this._properties;
    }
    /**
      * 绘制点
      * @param {CanvasRenderingContext2D} ctx - 绘图上下文
      * @param {Symbol} symbol - 渲染符号
      */
    draw(ctx, symbol) {
        this._geometry.draw(ctx, symbol);
    }
    /**
      * 标注要素
      * @remarks 调用空间坐标信息进行标注绘制
      * @param {CanvasRenderingContext2D} ctx - 绘图上下文
      * @param {Field} field - 标注字段
      * @param {Text} text - 标注符号
      */
    label(ctx, field, text = new _text_text__WEBPACK_IMPORTED_MODULE_1__.Text()) {
        if (this.visible)
            this._geometry.label(ctx, this._properties[field.name], this.text || text);
    }
}


/***/ }),

/***/ "../dist/feature/field.js":
/*!********************************!*\
  !*** ../dist/feature/field.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FieldType": () => (/* binding */ FieldType),
/* harmony export */   "Field": () => (/* binding */ Field)
/* harmony export */ });
/**
 * 字段类型
 */
var FieldType;
(function (FieldType) {
    /**
     * 字符串
     */
    FieldType[FieldType["String"] = 1] = "String";
    /**
     * 数值型
     */
    FieldType[FieldType["Number"] = 2] = "Number";
})(FieldType || (FieldType = {}));
/**
 * 字段
 * @remarks
 * TODO: a lot of things to be done
 */
class Field {
    /**
     * 构造函数
     * @param {string} name - 字段名称
     * @param {FieldType} type - 字段类型
     */
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}


/***/ }),

/***/ "../dist/geometry/geometry.js":
/*!************************************!*\
  !*** ../dist/geometry/geometry.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CoordinateType": () => (/* binding */ CoordinateType),
/* harmony export */   "GeometryType": () => (/* binding */ GeometryType),
/* harmony export */   "Geometry": () => (/* binding */ Geometry)
/* harmony export */ });
/* harmony import */ var _text_text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../text/text */ "../dist/text/text.js");

/**
 * 坐标类型
 * @enum {number}
 */
var CoordinateType;
(function (CoordinateType) {
    //经纬度坐标
    CoordinateType[CoordinateType["Latlng"] = 1] = "Latlng";
    //地理平面坐标
    CoordinateType[CoordinateType["Plane"] = 2] = "Plane";
    //屏幕平面坐标
    CoordinateType[CoordinateType["Screen"] = 3] = "Screen";
})(CoordinateType || (CoordinateType = {}));
/**
 * 图形类型
 * @enum {number}
 */
var GeometryType;
(function (GeometryType) {
    //点
    GeometryType[GeometryType["Point"] = 1] = "Point";
    //线
    GeometryType[GeometryType["Polyline"] = 2] = "Polyline";
    //面
    GeometryType[GeometryType["Polygon"] = 3] = "Polygon";
    // MultiplePoint = 4,
    // MultiplePolyline = 5,
    // MultiplePolygon = 6
})(GeometryType || (GeometryType = {}));
/**
 * 图形基类
 */
class Geometry {
    get type() {
        return this._type;
    }
    /**
     * 包络矩形
     * @remarks
     * 注意bound的坐标类型：一般为地理平面坐标，即投影后坐标
     */
    get latlngBounds() {
        return this._latlngBounds;
    }
    get planeBounds() {
        return this._planeBounds;
    }
    get screenBounds() {
        return this._screenBounds;
    }
    set crs(value) {
        this._crs = value;
        this.project();
    }
    /**
     * 图形包络矩形与可见视图范围是否包含或相交
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @return {boolean} 是否在可视范围内
     */
    // intersect(projection: Projection = new WebMercator(), extent: Bound = projection.bound): boolean {
    //     if (!this._projected) this.project(projection);
    //     return extent.intersect(this._bound);
    // }
    /**
     * 获取图形中心点虚函数
     * @param {CoordinateType} type - 坐标类型
     * @param {Projection} projection - 坐标投影转换
     * @return {number[]} 中心点坐标
     */
    getCenter(type = CoordinateType.Latlng) {
        if (type === CoordinateType.Plane) {
            return this._planeBounds.getCenter();
        }
        else if (type === CoordinateType.Screen) {
            return this._screenBounds.getCenter();
        }
        else {
            return this._latlngBounds.getCenter();
        }
    }
    // getCenter(type: CoordinateType = CoordinateType.Latlng, projection: Projection = new WebMercator()) {};
    /**
     * 获取图形包络矩形
     * 针对新建图形，还未进行投影的情况
     * @param {Projection} projection - 坐标投影转换
     * @return {number[]} 包络矩形
     */
    // getBound(projection: Projection = new WebMercator()) {
    //     if (!this._projected) this.project(projection);
    //     return this._bound;
    // };
    /**
     * 获取两个图形间距离
     * @remarks
     * 当前为两图形中心点间的直线距离
     * 多用于聚合判断
     * @param {Geometry} geometry - 另一图形
     * @param {CoordinateType} type - 坐标类型
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @return {number} 距离
     */
    distance(geometry, type = CoordinateType.Screen) {
        if (type == CoordinateType.Screen || type == CoordinateType.Plane) {
            const center = this.getCenter(type);
            const center2 = geometry.getCenter(type);
            return Math.sqrt((center2.x - center.x) * (center2.x - center.x) + (center2.y - center.y) * (center2.y - center.y));
        }
        else {
            // const center: L = this.getCenter(type) as XY;
            // const center2: XY = geometry.getCenter(type) as XY;
            // return Math.sqrt((center2.x-center.x) * (center2.x-center.x) + (center2.y-center.y) * (center2.y-center.y));
        }
    }
    /**
       * 标注绘制
       * @remarks
       * 标注文本支持多行，/r/n换行
       * @param {string} text - 标注文本
       * @param {CanvasRenderingContext2D} ctx - 绘图上下文
       * @param {Projection} projection - 坐标投影转换
       * @param {SimpleTextSymbol} symbol - 标注符号
       */
    label(ctx, value, symbol = new _text_text__WEBPACK_IMPORTED_MODULE_0__.Text()) {
        if (value == null || value == undefined || value === "")
            return;
        // ctx.save();
        ctx.strokeStyle = symbol.strokeStyle;
        ctx.fillStyle = symbol.fillStyle;
        ctx.lineWidth = symbol.lineWidth;
        ctx.lineJoin = "round";
        ctx.font = symbol.fontSize + "px/1 " + symbol.fontFamily + " " + symbol.fontWeight;
        const center = this.getCenter(CoordinateType.Screen);
        const array = value.toString().split("/r/n");
        let widths = array.map(str => ctx.measureText(str).width + symbol.padding * 2);
        let width = Math.max(...widths);
        let height = symbol.fontSize * array.length + symbol.padding * 2 + symbol.padding * (array.length - 1);
        const screenX = center.x;
        const screenY = center.y;
        let totalX, totalY;
        switch (symbol.placement) {
            case "TOP":
                totalX = -width / 2;
                totalY = -symbol.pointSymbolHeight / 2 - height;
                break;
            case "BOTTOM":
                totalX = -width / 2;
                totalY = symbol.pointSymbolHeight / 2;
                break;
            case "RIGHT":
                totalX = symbol.pointSymbolWidth / 2;
                totalY = -height / 2;
                break;
            case "LEFT":
                totalX = -symbol.pointSymbolWidth / 2 - width;
                totalY = -height / 2;
                break;
        }
        ctx.strokeRect(screenX + totalX, screenY + totalY, width, height);
        ctx.fillRect(screenX + totalX, screenY + totalY, width, height);
        ctx.textBaseline = "top";
        ctx.fillStyle = symbol.fontColor;
        array.forEach((str, index) => {
            ctx.fillText(str, screenX + totalX + symbol.padding + (width - widths[index]) / 2, screenY + totalY + symbol.padding + index * (symbol.fontSize + symbol.padding));
        });
        // ctx.restore();
    }
}


/***/ }),

/***/ "../dist/geometry/multiple-point.js":
/*!******************************************!*\
  !*** ../dist/geometry/multiple-point.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultiplePoint": () => (/* binding */ MultiplePoint)
/* harmony export */ });
/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/screen-bounds */ "../dist/common/screen-bounds.js");
/* harmony import */ var _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/latlng-bounds */ "../dist/common/latlng-bounds.js");
/* harmony import */ var _common_plane_bounds__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/plane-bounds */ "../dist/common/plane-bounds.js");





/*
 * @class Point
 * @aka L.Point
 *
 * Represents a point with `x` and `y` coordinates in pixels.
 *
 * @example
 *
 * ```js
 * var point = L.point(200, 300);
 * ```
 *
 * All Leaflet methods and options that accept `Point` objects also accept them in a simple Array form (unless noted otherwise), so these lines are equivalent:
 *
 * ```js
 * map.panBy([200, 300]);
 * map.panBy(L.point(200, 300));
 * ```
 *
 * Note that `Point` does not inherit from Leaflet's `Class` object,
 * which means new classes can't inherit from it, and new methods
 * can't be added to it with the `include` function.
 */
class MultiplePoint extends _geometry__WEBPACK_IMPORTED_MODULE_0__.Geometry {
    // _order: any;
    constructor(latlngs) {
        super();
        this._type = _geometry__WEBPACK_IMPORTED_MODULE_0__.GeometryType.Point;
        this._setLatLngs(latlngs);
    }
    // @method getLatLngs(): LatLng[]
    // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
    getLatLngs() {
        return this._latlngs;
    }
    _setLatLngs(latlngs) {
        this._latlngBounds = new _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_3__.LatLngBounds();
        this._latlngs = [];
        for (let i = 0, len = latlngs.length; i < len; i++) {
            this._latlngBounds.extend(latlngs[i]);
            this._latlngs.push(latlngs[i]);
        }
    }
    // @method setLatLngs(latlngs: LatLng[]): this
    // Replaces all the points in the polyline with the given array of geographical points.
    setLatLngs(latlngs) {
        this._setLatLngs(latlngs);
        // return this.redraw();
    }
    project() {
        if (!this._crs)
            return;
        this._planeBounds = new _common_plane_bounds__WEBPACK_IMPORTED_MODULE_4__.PlaneBounds();
        this._planeXYs = [];
        for (let i = 0, len = this._latlngs.length; i < len; i++) {
            const planeXY = this._crs.projection.project(this._latlngs[i]);
            this._planeBounds.extend(planeXY);
            this._planeXYs.push(planeXY);
        }
    }
    transform(origin, zoom, symbol) {
        if (!this._crs && !this._planeXYs)
            return;
        this._screenXYs = this._planeXYs.map(planeXY => {
            return this._crs.planeXYToScreenXY(planeXY, zoom).round(false).subtract(origin);
        });
        this._screenBounds = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_2__.ScreenBounds();
        this._screenBoundsArray = [];
        this._screenXYs.forEach(screenXY => {
            this._screenBounds.extend(symbol.getScreenBounds(screenXY));
            this._screenBoundsArray.push(symbol.getScreenBounds(screenXY));
        });
    }
    getCenter(type = _geometry__WEBPACK_IMPORTED_MODULE_0__.CoordinateType.Latlng) {
        if (type === _geometry__WEBPACK_IMPORTED_MODULE_0__.CoordinateType.Plane) {
            return this._planeXYs[0];
        }
        else if (type === _geometry__WEBPACK_IMPORTED_MODULE_0__.CoordinateType.Screen) {
            return this._screenXYs[0];
        }
        else {
            return this._latlngs[0];
        }
    }
    toGeoJSON(precision = 6) {
        const coords = [];
        for (let i = 0, len = this._latlngs.length; i < len; i++) {
            coords.push(this._latlngs[i].toGeoJSON(precision));
        }
        return {
            type: "MultiPoint",
            coordinates: coords
        };
    }
    /**
     * 绘制点
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {Symbol} symbol - 渲染符号
     */
    draw(ctx, symbol) {
        if (!this._crs)
            return;
        // this._screenXY = this._crs.planeXYToScreenXY(this._planeXY, zoom).round(false).subtract(origin);
        symbol = symbol || new _symbol_symbol__WEBPACK_IMPORTED_MODULE_1__.SimplePointSymbol();
        // this._screenBounds = symbol.getScreenBounds(this._screenXY);
        this._screenXYs.forEach(screenXY => {
            symbol.draw(ctx, screenXY);
        });
    }
    contains(screenXY) {
        return Array.isArray(this._screenBoundsArray) && this._screenBoundsArray.some(screenBounds => {
            this._screenBounds.contains(screenXY);
        });
    }
}


/***/ }),

/***/ "../dist/geometry/multiple-polygon.js":
/*!********************************************!*\
  !*** ../dist/geometry/multiple-polygon.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultiplePolygon": () => (/* binding */ MultiplePolygon)
/* harmony export */ });
/* harmony import */ var _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/latlng-bounds */ "../dist/common/latlng-bounds.js");
/* harmony import */ var _common_plane_bounds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/plane-bounds */ "../dist/common/plane-bounds.js");
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/screen-bounds */ "../dist/common/screen-bounds.js");
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./geometry */ "../dist/geometry/geometry.js");





/**
 * 面
 * @remarks
 * 数据结构：[ring[point[x,y]]]：such as [[[1,1],[2,2],[1,2]], [[1.5,1.5],[1.9,1.9],[1.5,1.9]]]
 */
class MultiplePolygon extends _geometry__WEBPACK_IMPORTED_MODULE_4__.Geometry {
    constructor(latlngs) {
        super();
        this._type = _geometry__WEBPACK_IMPORTED_MODULE_4__.GeometryType.Polygon;
        this._setLatLngs(latlngs);
    }
    getLatLngs() {
        return this._latlngs;
    }
    _setLatLngs(latlngs) {
        this._latlngBounds = new _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_0__.LatLngBounds();
        this._latlngs = [];
        latlngs.forEach(polygon => {
            const latLngPolygon = [];
            polygon.forEach(ring => {
                const latLngRing = [];
                ring.forEach(latlng => {
                    this._latlngBounds.extend(latlng);
                    latLngRing.push(latlng);
                });
                latLngPolygon.push(latLngRing);
            });
            this._latlngs.push(latLngPolygon);
        });
    }
    // @method setLatLngs(latlngs: LatLng[]): this
    // Replaces all the points in the polyline with the given array of geographical points.
    setLatLngs(latlngs) {
        this._setLatLngs(latlngs);
        // return this.redraw();
    }
    /**
     * 投影变换
     * @param {Projection} projection - 坐标投影转换
     */
    project() {
        if (!this._crs)
            return;
        this._planeBounds = new _common_plane_bounds__WEBPACK_IMPORTED_MODULE_1__.PlaneBounds();
        this._planeXYs = [];
        this._latlngs.forEach(polygon => {
            const planePolygon = [];
            polygon.forEach(ring => {
                const planeRing = [];
                ring.forEach(latlng => {
                    const planeXY = this._crs.projection.project(latlng);
                    this._planeBounds.extend(planeXY);
                    planeRing.push(planeXY);
                });
                planePolygon.push(planeRing);
            });
            this._planeXYs.push(planePolygon);
        });
    }
    transform(origin, zoom, symbol) {
        if (!this._crs && !this._planeXYs)
            return;
        this._screenXYs = this._planeXYs.map(polygon => {
            return polygon.map(ring => {
                return ring.map(planeXY => {
                    return this._crs.planeXYToScreenXY(planeXY, zoom).round(false).subtract(origin);
                });
            });
        });
        this._screenBounds = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_2__.ScreenBounds();
        this._screenXYs.forEach(polygon => {
            this._screenBounds.extend(symbol.getScreenBounds(polygon));
        });
    }
    /**
     * 输出GeoJSON格式字符串
     */
    toGeoJSON(precision = 6) {
        const coords = [];
        this._latlngs.forEach(polygon => {
            const outPolygon = [];
            polygon.forEach(ring => {
                const outRing = [];
                ring.forEach(latlng => {
                    this._latlngBounds.extend(latlng);
                    outRing.push(latlng.toGeoJSON(precision));
                });
                outPolygon.push(outRing);
            });
            coords.push(outPolygon);
        });
        return {
            type: "MultiPolygon",
            coordinates: coords
        };
    }
    /**
     * 绘制面
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {Symbol} symbol - 渲染符号
     */
    draw(ctx, symbol) {
        if (!this._crs)
            return;
        // this._screenXYs = this._planeXYs.map(planeXY => {
        // 	return this._crs.planeXYToScreenXY(planeXY, zoom).round(false).subtract(origin);
        // })
        symbol = symbol || new _symbol_symbol__WEBPACK_IMPORTED_MODULE_3__.SimpleFillSymbol();
        // this._screenBounds = symbol.getScreenBounds(this._screenXYs);
        this._screenXYs.forEach(polygon => {
            symbol.draw(ctx, polygon);
        });
    }
    contains(screenXY) {
        let inside = false, ring, p1, p2, i, j, k, len, len2;
        if (!this._screenBounds || !this._screenBounds.contains(screenXY)) {
            return false;
        }
        // ray casting algorithm for detecting if point is in polygon
        return this._screenXYs.some(polygon => {
            for (i = 0, len = polygon.length; i < len; i++) {
                ring = polygon[i];
                for (j = 0, len2 = ring.length, k = len2 - 1; j < len2; k = j++) {
                    p1 = ring[j];
                    p2 = ring[k];
                    if (((p1.y > screenXY.y) !== (p2.y > screenXY.y)) && (screenXY.x < (p2.x - p1.x) * (screenXY.y - p1.y) / (p2.y - p1.y) + p1.x)) {
                        inside = !inside;
                    }
                }
            }
            return inside;
        });
    }
}


/***/ }),

/***/ "../dist/geometry/multiple-polyline.js":
/*!*********************************************!*\
  !*** ../dist/geometry/multiple-polyline.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultiplePolyline": () => (/* binding */ MultiplePolyline)
/* harmony export */ });
/* harmony import */ var _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/latlng-bounds */ "../dist/common/latlng-bounds.js");
/* harmony import */ var _common_plane_bounds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/plane-bounds */ "../dist/common/plane-bounds.js");
/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _util_line_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/line-util */ "../dist/util/line-util.js");
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/screen-bounds */ "../dist/common/screen-bounds.js");






/*
 * @class Polyline
 * @aka L.Polyline
 * @inherits Path
 *
 * A class for drawing polyline overlays on a map. Extends `Path`.
 *
 * @example
 *
 * ```js
 * // create a red polyline from an array of LatLng points
 * var latlngs = [
 * 	[45.51, -122.68],
 * 	[37.77, -122.43],
 * 	[34.04, -118.2]
 * ];
 *
 * var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
 *
 * // zoom the map to the polyline
 * map.fitBounds(polyline.getBounds());
 * ```
 *
 * You can also pass a multi-dimensional array to represent a `MultiPolyline` shape:
 *
 * ```js
 * // create a red polyline from an array of arrays of LatLng points
 * var latlngs = [
 * 	[[45.51, -122.68],
 * 	 [37.77, -122.43],
 * 	 [34.04, -118.2]],
 * 	[[40.78, -73.91],
 * 	 [41.83, -87.62],
 * 	 [32.76, -96.72]]
 * ];
 * ```
 */
class MultiplePolyline extends _geometry__WEBPACK_IMPORTED_MODULE_2__.Geometry {
    constructor(latlngs) {
        super();
        this._type = _geometry__WEBPACK_IMPORTED_MODULE_2__.GeometryType.Polyline;
        this._setLatLngs(latlngs);
    }
    // @method getLatLngs(): LatLng[]
    // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
    getLatLngs() {
        return this._latlngs;
    }
    _setLatLngs(latlngs) {
        this._latlngBounds = new _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_0__.LatLngBounds();
        this._latlngs = [];
        latlngs.forEach(polyline => {
            const latLngPolyline = [];
            polyline.forEach(latlng => {
                this._latlngBounds.extend(latlng);
                latLngPolyline.push(latlng);
            });
            this._latlngs.push(latLngPolyline);
        });
    }
    // @method setLatLngs(latlngs: LatLng[]): this
    // Replaces all the points in the polyline with the given array of geographical points.
    setLatLngs(latlngs) {
        this._setLatLngs(latlngs);
        // return this.redraw();
    }
    // @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
    // Adds a given point to the polyline. By default, adds to the first ring of
    // the polyline in case of a multi-polyline, but can be overridden by passing
    // a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
    // addLatLng(latlng: LatLng, latlngs?: LatLng[]) {
    // 	latlngs = latlngs || this._defaultShape();
    // addLatLng(latlng: LatLng) {
    // 	// const latlngs = this._defaultShape();
    // 	this._latlngs.push(latlng);
    // 	this._latlngBounds.extend(latlng);
    // 	// return this.redraw();
    // }
    // @method getCenter(): LatLng
    // Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the polyline.
    // getCenter() {
    // 	return this._latlngBounds.getCenter();
    // }
    project() {
        if (!this._crs)
            return;
        this._planeBounds = new _common_plane_bounds__WEBPACK_IMPORTED_MODULE_1__.PlaneBounds();
        this._planeXYs = [];
        this._latlngs.forEach(polyline => {
            const planePolyline = [];
            polyline.forEach(latlng => {
                const planeXY = this._crs.projection.project(latlng);
                this._planeBounds.extend(planeXY);
                planePolyline.push(planeXY);
            });
            this._planeXYs.push(planePolyline);
        });
    }
    transform(origin, zoom, symbol) {
        if (!this._crs && !this._planeXYs)
            return;
        this._screenXYs = this._planeXYs.map(polyline => {
            return polyline.map(planeXY => {
                return this._crs.planeXYToScreenXY(planeXY, zoom).round(false).subtract(origin);
            });
        });
        this._screenBounds = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_5__.ScreenBounds();
        this._screenXYs.forEach(polyline => {
            this._screenBounds.extend(symbol.getScreenBounds(polyline));
        });
    }
    draw(ctx, symbol) {
        if (!this._crs)
            return;
        // this._screenXYs = this._planeXYs.map(planeXY => {
        // 	return this._crs.planeXYToScreenXY(planeXY, zoom).round(false).subtract(origin);
        // })
        symbol = symbol || new _symbol_symbol__WEBPACK_IMPORTED_MODULE_3__.SimpleLineSymbol();
        // this._screenBounds = symbol.getScreenBounds(this._screenXYs);
        this._screenXYs.forEach(polyline => {
            symbol.draw(ctx, polyline);
        });
    }
    toGeoJSON(precision = 6) {
        const coords = [];
        this._latlngs.forEach(polyline => {
            const outPolyline = [];
            polyline.forEach(latlng => {
                this._latlngBounds.extend(latlng);
                outPolyline.push(latlng.toGeoJSON(precision));
            });
            coords.push(outPolyline);
        });
        return {
            type: "MultiLineString",
            coordinates: coords
        };
    }
    contains(screenXY) {
        let i, len, w = 5;
        if (!this._screenBounds || !this._screenBounds.contains(screenXY)) {
            return false;
        }
        // hit detection for polylines
        return this._screenXYs.some(polyline => {
            for (i = 0, len = polyline.length; i < len - 1; i++) {
                if (_util_line_util__WEBPACK_IMPORTED_MODULE_4__.pointToSegmentDistance(screenXY, polyline[i], polyline[i + 1]) <= w) {
                    return true;
                }
            }
        });
    }
}


/***/ }),

/***/ "../dist/geometry/point.js":
/*!*********************************!*\
  !*** ../dist/geometry/point.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Point": () => (/* binding */ Point)
/* harmony export */ });
/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/screen-bounds */ "../dist/common/screen-bounds.js");



/*
 * @class Point
 * @aka L.Point
 *
 * Represents a point with `x` and `y` coordinates in pixels.
 *
 * @example
 *
 * ```js
 * var point = L.point(200, 300);
 * ```
 *
 * All Leaflet methods and options that accept `Point` objects also accept them in a simple Array form (unless noted otherwise), so these lines are equivalent:
 *
 * ```js
 * map.panBy([200, 300]);
 * map.panBy(L.point(200, 300));
 * ```
 *
 * Note that `Point` does not inherit from Leaflet's `Class` object,
 * which means new classes can't inherit from it, and new methods
 * can't be added to it with the `include` function.
 */
class Point extends _geometry__WEBPACK_IMPORTED_MODULE_0__.Geometry {
    // _order: any;
    constructor(latlng) {
        super();
        this._type = _geometry__WEBPACK_IMPORTED_MODULE_0__.GeometryType.Point;
        this._latlng = latlng;
    }
    get latlng() {
        return this._latlng;
    }
    get screenXY() {
        return this._screenXY;
    }
    project() {
        if (!this._crs)
            return;
        this._planeXY = this._crs.projection.project(this._latlng);
        this._planeBounds = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_2__.ScreenBounds();
        this._planeBounds.extend(this._planeXY);
    }
    transform(origin, zoom, symbol) {
        if (!this._crs && !this._planeXY)
            return;
        this._screenXY = this._crs.planeXYToScreenXY(this._planeXY, zoom).round(false).subtract(origin);
        symbol = symbol || new _symbol_symbol__WEBPACK_IMPORTED_MODULE_1__.SimplePointSymbol();
        this._screenBounds = symbol.getScreenBounds(this._screenXY);
    }
    getCenter(type = _geometry__WEBPACK_IMPORTED_MODULE_0__.CoordinateType.Latlng) {
        if (type === _geometry__WEBPACK_IMPORTED_MODULE_0__.CoordinateType.Plane) {
            return this._planeXY;
        }
        else if (type === _geometry__WEBPACK_IMPORTED_MODULE_0__.CoordinateType.Screen) {
            return this._screenXY;
        }
        else {
            return this._latlng;
        }
    }
    toGeoJSON(precision = 6) {
        return {
            type: "Point",
            coordinates: this._latlng.toGeoJSON(precision)
        };
    }
    /**
     * 绘制点
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {Symbol} symbol - 渲染符号
     */
    draw(ctx, symbol) {
        if (!this._crs)
            return;
        // this._screenXY = this._crs.planeXYToScreenXY(this._planeXY, zoom).round(false).subtract(origin);
        symbol = symbol || new _symbol_symbol__WEBPACK_IMPORTED_MODULE_1__.SimplePointSymbol();
        // this._screenBounds = symbol.getScreenBounds(this._screenXY);
        symbol.draw(ctx, this._screenXY);
    }
    contains(screenXY) {
        return this._screenBounds && this._screenBounds.contains(screenXY);
    }
}


/***/ }),

/***/ "../dist/geometry/polygon.js":
/*!***********************************!*\
  !*** ../dist/geometry/polygon.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Polygon": () => (/* binding */ Polygon)
/* harmony export */ });
/* harmony import */ var _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/latlng-bounds */ "../dist/common/latlng-bounds.js");
/* harmony import */ var _common_plane_bounds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/plane-bounds */ "../dist/common/plane-bounds.js");
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./geometry */ "../dist/geometry/geometry.js");




/**
 * 面
 * @remarks
 * 数据结构：[ring[point[x,y]]]：such as [[[1,1],[2,2],[1,2]], [[1.5,1.5],[1.9,1.9],[1.5,1.9]]]
 */
class Polygon extends _geometry__WEBPACK_IMPORTED_MODULE_3__.Geometry {
    constructor(latlngs) {
        super();
        this._type = _geometry__WEBPACK_IMPORTED_MODULE_3__.GeometryType.Polygon;
        this._setLatLngs(latlngs);
    }
    getLatLngs() {
        return this._latlngs;
    }
    _setLatLngs(latlngs) {
        this._latlngBounds = new _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_0__.LatLngBounds();
        this._latlngs = [];
        latlngs.forEach(ring => {
            const latLngRing = [];
            ring.forEach(latlng => {
                this._latlngBounds.extend(latlng);
                latLngRing.push(latlng);
            });
            this._latlngs.push(latLngRing);
        });
    }
    // @method setLatLngs(latlngs: LatLng[]): this
    // Replaces all the points in the polyline with the given array of geographical points.
    setLatLngs(latlngs) {
        this._setLatLngs(latlngs);
        // return this.redraw();
    }
    /**
     * 投影变换
     * @param {Projection} projection - 坐标投影转换
     */
    project() {
        if (!this._crs)
            return;
        this._planeBounds = new _common_plane_bounds__WEBPACK_IMPORTED_MODULE_1__.PlaneBounds();
        this._planeXYs = [];
        this._latlngs.forEach(ring => {
            const planeRing = [];
            ring.forEach(latlng => {
                const planeXY = this._crs.projection.project(latlng);
                this._planeBounds.extend(planeXY);
                planeRing.push(planeXY);
            });
            this._planeXYs.push(planeRing);
        });
    }
    transform(origin, zoom, symbol) {
        if (!this._crs && !this._planeXYs)
            return;
        this._screenXYs = this._planeXYs.map(ring => {
            return ring.map(planeXY => {
                return this._crs.planeXYToScreenXY(planeXY, zoom).round(false).subtract(origin);
            });
        });
        this._screenBounds = symbol.getScreenBounds(this._screenXYs);
    }
    /**
     * 输出GeoJSON格式字符串
     */
    toGeoJSON(precision = 6) {
        const coords = [];
        this._latlngs.forEach(ring => {
            const outRing = [];
            ring.forEach(latlng => {
                this._latlngBounds.extend(latlng);
                outRing.push(latlng.toGeoJSON(precision));
            });
            coords.push(outRing);
        });
        return {
            type: "Polygon",
            coordinates: coords
        };
    }
    /**
     * 绘制面
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {Symbol} symbol - 渲染符号
     */
    draw(ctx, symbol) {
        if (!this._crs)
            return;
        // this._screenXYs = this._planeXYs.map(planeXY => {
        // 	return this._crs.planeXYToScreenXY(planeXY, zoom).round(false).subtract(origin);
        // })
        symbol = symbol || new _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__.SimpleFillSymbol();
        // this._screenBounds = symbol.getScreenBounds(this._screenXYs);
        symbol.draw(ctx, this._screenXYs);
    }
    contains(screenXY) {
        let inside = false, ring, p1, p2, i, j, k, len, len2;
        if (!this._screenBounds || !this._screenBounds.contains(screenXY)) {
            return false;
        }
        // ray casting algorithm for detecting if point is in polygon
        for (i = 0, len = this._screenXYs.length; i < len; i++) {
            ring = this._screenXYs[i];
            for (j = 0, len2 = ring.length, k = len2 - 1; j < len2; k = j++) {
                p1 = ring[j];
                p2 = ring[k];
                if (((p1.y > screenXY.y) !== (p2.y > screenXY.y)) && (screenXY.x < (p2.x - p1.x) * (screenXY.y - p1.y) / (p2.y - p1.y) + p1.x)) {
                    inside = !inside;
                }
            }
        }
        return inside;
    }
}


/***/ }),

/***/ "../dist/geometry/polyline.js":
/*!************************************!*\
  !*** ../dist/geometry/polyline.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Polyline": () => (/* binding */ Polyline)
/* harmony export */ });
/* harmony import */ var _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/latlng-bounds */ "../dist/common/latlng-bounds.js");
/* harmony import */ var _common_plane_bounds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/plane-bounds */ "../dist/common/plane-bounds.js");
/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _util_line_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/line-util */ "../dist/util/line-util.js");





/*
 * @class Polyline
 * @aka L.Polyline
 * @inherits Path
 *
 * A class for drawing polyline overlays on a map. Extends `Path`.
 *
 * @example
 *
 * ```js
 * // create a red polyline from an array of LatLng points
 * var latlngs = [
 * 	[45.51, -122.68],
 * 	[37.77, -122.43],
 * 	[34.04, -118.2]
 * ];
 *
 * var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
 *
 * // zoom the map to the polyline
 * map.fitBounds(polyline.getBounds());
 * ```
 *
 * You can also pass a multi-dimensional array to represent a `MultiPolyline` shape:
 *
 * ```js
 * // create a red polyline from an array of arrays of LatLng points
 * var latlngs = [
 * 	[[45.51, -122.68],
 * 	 [37.77, -122.43],
 * 	 [34.04, -118.2]],
 * 	[[40.78, -73.91],
 * 	 [41.83, -87.62],
 * 	 [32.76, -96.72]]
 * ];
 * ```
 */
class Polyline extends _geometry__WEBPACK_IMPORTED_MODULE_2__.Geometry {
    constructor(latlngs) {
        super();
        this._type = _geometry__WEBPACK_IMPORTED_MODULE_2__.GeometryType.Polyline;
        this._setLatLngs(latlngs);
    }
    // @method getLatLngs(): LatLng[]
    // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
    getLatLngs() {
        return this._latlngs;
    }
    _setLatLngs(latlngs) {
        this._latlngBounds = new _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_0__.LatLngBounds();
        this._latlngs = [];
        for (let i = 0, len = latlngs.length; i < len; i++) {
            this._latlngBounds.extend(latlngs[i]);
            this._latlngs.push(latlngs[i]);
        }
    }
    // @method setLatLngs(latlngs: LatLng[]): this
    // Replaces all the points in the polyline with the given array of geographical points.
    setLatLngs(latlngs) {
        this._setLatLngs(latlngs);
        // return this.redraw();
    }
    // @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
    // Adds a given point to the polyline. By default, adds to the first ring of
    // the polyline in case of a multi-polyline, but can be overridden by passing
    // a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
    // addLatLng(latlng: LatLng, latlngs?: LatLng[]) {
    // 	latlngs = latlngs || this._defaultShape();
    // addLatLng(latlng: LatLng) {
    // 	// const latlngs = this._defaultShape();
    // 	this._latlngs.push(latlng);
    // 	this._latlngBounds.extend(latlng);
    // 	// return this.redraw();
    // }
    // @method getCenter(): LatLng
    // Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the polyline.
    // getCenter() {
    // 	return this._latlngBounds.getCenter();
    // }
    project() {
        if (!this._crs)
            return;
        this._planeBounds = new _common_plane_bounds__WEBPACK_IMPORTED_MODULE_1__.PlaneBounds();
        this._planeXYs = [];
        for (let i = 0, len = this._latlngs.length; i < len; i++) {
            const planeXY = this._crs.projection.project(this._latlngs[i]);
            this._planeBounds.extend(planeXY);
            this._planeXYs.push(planeXY);
        }
    }
    transform(origin, zoom, symbol) {
        if (!this._crs && !this._planeXYs)
            return;
        this._screenXYs = this._planeXYs.map(planeXY => {
            return this._crs.planeXYToScreenXY(planeXY, zoom).round(false).subtract(origin);
        });
        symbol = symbol || new _symbol_symbol__WEBPACK_IMPORTED_MODULE_3__.SimpleLineSymbol();
        this._screenBounds = symbol.getScreenBounds(this._screenXYs);
    }
    draw(ctx, symbol) {
        if (!this._crs)
            return;
        // this._screenXYs = this._planeXYs.map(planeXY => {
        // 	return this._crs.planeXYToScreenXY(planeXY, zoom).round(false).subtract(origin);
        // })
        symbol = symbol || new _symbol_symbol__WEBPACK_IMPORTED_MODULE_3__.SimpleLineSymbol();
        // this._screenBounds = symbol.getScreenBounds(this._screenXYs);
        symbol.draw(ctx, this._screenXYs);
    }
    toGeoJSON(precision = 6) {
        const coords = [];
        for (let i = 0, len = this._latlngs.length; i < len; i++) {
            coords.push(this._latlngs[i].toGeoJSON(precision));
        }
        return {
            type: "LineString",
            coordinates: coords
        };
    }
    contains(screenXY) {
        let i, len, w = 5;
        if (!this._screenBounds || !this._screenBounds.contains(screenXY)) {
            return false;
        }
        // hit detection for polylines
        for (i = 0, len = this._screenXYs.length; i < len - 1; i++) {
            if (_util_line_util__WEBPACK_IMPORTED_MODULE_4__.pointToSegmentDistance(screenXY, this._screenXYs[i], this._screenXYs[i + 1]) <= w) {
                return true;
            }
        }
        return false;
    }
}


/***/ }),

/***/ "../dist/graphic/graphic.js":
/*!**********************************!*\
  !*** ../dist/graphic/graphic.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Graphic": () => (/* binding */ Graphic)
/* harmony export */ });
/* harmony import */ var _base_evented_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/evented-object */ "../dist/base/evented-object.js");

class Graphic extends _base_evented_object__WEBPACK_IMPORTED_MODULE_0__.EventedObject {
    constructor(geometry, symbol) {
        super();
        this.prev = null;
        this.next = null;
        this._geometry = geometry;
        this._symbol = symbol;
    }
    get geometry() {
        return this._geometry;
    }
    get symbol() {
        return this._symbol;
    }
    transform(origin, zoom) {
        this._geometry.transform(origin, zoom, this._symbol);
    }
    /**
       * 绘制点
       * @param {CanvasRenderingContext2D} ctx - 绘图上下文
       * @param {Projection} projection - 坐标投影转换
       * @param {Bound} extent - 当前可视范围
       * @param {Symbol} symbol - 渲染符号
       */
    draw(ctx) {
        this._geometry.draw(ctx, this._symbol);
    }
}


/***/ }),

/***/ "../dist/grid/grid.js":
/*!****************************!*\
  !*** ../dist/grid/grid.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GridOptions": () => (/* binding */ GridOptions),
/* harmony export */   "Grid": () => (/* binding */ Grid)
/* harmony export */ });
/* harmony import */ var _util_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/browser */ "../dist/util/browser.js");
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/util */ "../dist/util/util.js");
/* harmony import */ var _util_dom_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/dom-util */ "../dist/util/dom-util.js");
/* harmony import */ var _base_evented_object__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base/evented-object */ "../dist/base/evented-object.js");
/* harmony import */ var _common_screen_xy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/screen-xy */ "../dist/common/screen-xy.js");
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/screen-bounds */ "../dist/common/screen-bounds.js");
/* harmony import */ var _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/latlng-bounds */ "../dist/common/latlng-bounds.js");
/* harmony import */ var _base_options_object__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../base/options-object */ "../dist/base/options-object.js");








/*
 * @class GridLayer
 * @inherits Layer
 * @aka L.GridLayer
 *
 * Generic class for handling a tiled grid of HTML elements. This is the base class for all tile layers and replaces `TileLayer.Canvas`.
 * GridLayer can be extended to create a tiled grid of HTML elements like `<canvas>`, `<img>` or `<div>`. GridLayer will handle creating and animating these DOM elements for you.
 *
 *
 * @section Synchronous usage
 * @example
 *
 * To create a custom layer, extend GridLayer and implement the `createTile()` method, which will be passed a `Point` object with the `x`, `y`, and `z` (zoom level) coordinates to draw your tile.
 *
 * ```js
 * var CanvasLayer = L.GridLayer.extend({
 *     createTile: function(coords){
 *         // create a <canvas> element for drawing
 *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
 *
 *         // setup tile width and height according to the options
 *         var size = this.getTileSize();
 *         tile.width = size.x;
 *         tile.height = size.y;
 *
 *         // get a canvas context and draw something on it using coords.x, coords.y and coords.z
 *         var ctx = tile.getContext('2d');
 *
 *         // return the tile so it can be rendered on screen
 *         return tile;
 *     }
 * });
 * ```
 *
 * @section Asynchronous usage
 * @example
 *
 * Tile creation can also be asynchronous, this is useful when using a third-party drawing library. Once the tile is finished drawing it can be passed to the `done()` callback.
 *
 * ```js
 * var CanvasLayer = L.GridLayer.extend({
 *     createTile: function(coords, done){
 *         var error;
 *
 *         // create a <canvas> element for drawing
 *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
 *
 *         // setup tile width and height according to the options
 *         var size = this.getTileSize();
 *         tile.width = size.x;
 *         tile.height = size.y;
 *
 *         // draw something asynchronously and pass the tile to the done() callback
 *         setTimeout(function() {
 *             done(error, tile);
 *         }, 1000);
 *
 *         return tile;
 *     }
 * });
 * ```
 *
 * @section
 */
class GridOptions extends _base_options_object__WEBPACK_IMPORTED_MODULE_7__.OptionsObject {
    constructor() {
        super(...arguments);
        // @option tileSize: Number|Point = 256
        // Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
        this.tileSize = 256;
        // @option opacity: Number = 1.0
        // Opacity of the tiles. Can be used in the `createTile()` function.
        this.opacity = 1;
        // @option updateWhenIdle: Boolean = (depends)
        // Load new tiles only when panning ends.
        // `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
        // `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
        // [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
        this.updateWhenIdle = _util_browser__WEBPACK_IMPORTED_MODULE_0__.mobile;
        // @option updateWhenZooming: Boolean = true
        // By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
        this.updateWhenZooming = true;
        // @option updateInterval: Number = 200
        // Tiles will not update more than once every `updateInterval` milliseconds when panning.
        this.updateInterval = 200;
        // @option zIndex: Number = 1
        // The explicit zIndex of the tile layer.
        this.zIndex = 1;
        // @option bounds: LatLngBounds = undefined
        // If set, tiles will only be loaded inside the set `LatLngBounds`.
        this.bounds = null;
        // @option minZoom: Number = 0
        // The minimum zoom level down to which this layer will be displayed (inclusive).
        this.minZoom = 0;
        // @option maxZoom: Number = undefined
        // The maximum zoom level up to which this layer will be displayed (inclusive).
        this.maxZoom = 18;
        // @option maxNativeZoom: Number = undefined
        // Maximum zoom number the tile source has available. If it is specified,
        // the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
        // from `maxNativeZoom` level and auto-scaled.
        this.maxNativeZoom = undefined;
        // @option minNativeZoom: Number = undefined
        // Minimum zoom number the tile source has available. If it is specified,
        // the tiles on all zoom levels lower than `minNativeZoom` will be loaded
        // from `minNativeZoom` level and auto-scaled.
        this.minNativeZoom = undefined;
        // @option noWrap: Boolean = false
        // Whether the layer is wrapped around the antimeridian. If `true`, the
        // GridLayer will only be displayed once at low zoom levels. Has no
        // effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
        // in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
        // tiles outside the CRS limits.
        this.noWrap = false;
        // @option pane: String = 'tilePane'
        // `Map pane` where the grid layer will be added.
        this.pane = 'tilePane';
        // @option className: String = ''
        // A custom class name to assign to the tile layer. Empty by default.
        this.className = '';
        // @option keepBuffer: Number = 2
        // When panning the map, keep this many rows and columns of tiles before unloading them.
        this.keepBuffer = 2;
        // @option zoomOffset: Number = 0
        // The zoom number used in tile URLs will be offset with this value.
        this.zoomOffset = 0;
    }
}
class Grid extends _base_evented_object__WEBPACK_IMPORTED_MODULE_3__.EventedObject {
    constructor(options) {
        super();
        this.options = new GridOptions();
        this._tiles = {};
        this._levels = {};
        this.options.assign(options);
    }
    addTo(map) {
        this._map = map;
        if (this._container) {
            return;
        }
        this._container = _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.create('div', 'leaflet-layer ' + (this.options.className || ''));
        if (this.options.opacity < 1) {
            this._updateOpacity();
        }
        this._map.getPane(this.options.pane).appendChild(this._container);
        this._levels = {};
        this._tiles = {};
        if (this._map.loaded)
            this._resetView(); // implicit _update() call
        this._map.on('viewprereset', this._invalidateAll, this);
        this._map.on('viewreset', this._resetView, this);
        this._map.on('zoom', this._resetView, this);
        this._map.on('zoomanim', this._animateZoom, this);
        this._map.on('moveend', this._onMoveEnd, this);
    }
    removeFrom(map) {
        this._map.off('viewprereset', this._invalidateAll, this);
        this._map.off('viewreset', this._resetView, this);
        this._map.off('zoom', this._resetView, this);
        this._map.off('zoomanim', this._animateZoom, this);
        this._map.off('moveend', this._onMoveEnd, this);
        this._removeAllTiles();
        _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.remove(this._container);
        // this._map._removeZoomLimit(this);
        this._container = null;
        this._tileZoom = undefined;
    }
    // onAdd: function () {
    // 	this._initContainer();
    // 	this._levels = {};
    // 	this._tiles = {};
    // 	this._resetView(); // implicit _update() call
    // },
    // beforeAdd: function (map) {
    // 	map._addZoomLimit(this);
    // },
    // onRemove: function (map) {
    // 	this._removeAllTiles();
    // 	DomUtil.remove(this._container);
    // 	map._removeZoomLimit(this);
    // 	this._container = null;
    // 	this._tileZoom = undefined;
    // },
    // @method getContainer: HTMLElement
    // Returns the HTML element that contains the tiles for this layer.
    getContainer() {
        return this._container;
    }
    // @method setOpacity(opacity: Number): this
    // Changes the [opacity](#gridlayer-opacity) of the grid layer.
    setOpacity(opacity) {
        this.options.opacity = opacity;
        this._updateOpacity();
    }
    // @method isLoading: Boolean
    // Returns `true` if any tile in the grid layer has not finished loading.
    isLoading() {
        return this._loading;
    }
    // @method redraw: this
    // Causes the layer to clear all the tiles and request them again.
    redraw() {
        if (this._map) {
            this._removeAllTiles();
            this._update();
        }
    }
    // @section Extension methods
    // Layers extending `GridLayer` shall reimplement the following method.
    // @method createTile(coords: Object, done?: Function): HTMLElement
    // Called only internally, must be overridden by classes extending `GridLayer`.
    // Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
    // is specified, it must be called when the tile has finished loading and drawing.
    createTile(coords, done) {
        return document.createElement('div');
    }
    // @section
    // @method getTileSize: Point
    // Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
    getTileSize() {
        return new _common_screen_xy__WEBPACK_IMPORTED_MODULE_4__.ScreenXY(this.options.tileSize, this.options.tileSize);
    }
    _updateOpacity() {
        if (!this._map) {
            return;
        }
        // IE doesn't inherit filter opacity properly, so we're forced to set it on tiles
        if (_util_browser__WEBPACK_IMPORTED_MODULE_0__.ielt9) {
            return;
        }
        _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.setOpacity(this._container, this.options.opacity);
        let now = +new Date(), nextFrame = false, willPrune = false;
        for (let key in this._tiles) {
            let tile = this._tiles[key];
            if (!tile.current || !tile.loaded) {
                continue;
            }
            let fade = Math.min(1, (now - tile.loaded) / 200);
            _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.setOpacity(tile.el, fade);
            if (fade < 1) {
                nextFrame = true;
            }
            else {
                if (tile.active) {
                    willPrune = true;
                }
                else {
                    this._onOpaqueTile(tile);
                }
                tile.active = true;
            }
        }
        if (willPrune && !this._noPrune) {
            this._pruneTiles();
        }
        if (nextFrame) {
            _util_util__WEBPACK_IMPORTED_MODULE_1__.cancelAnimFrame(this._fadeFrame);
            this._fadeFrame = _util_util__WEBPACK_IMPORTED_MODULE_1__.requestAnimFrame(this._updateOpacity, this);
        }
    }
    _onOpaqueTile(tile) {
    }
    _updateLevels() {
        var zoom = this._tileZoom, maxZoom = this.options.maxZoom;
        if (zoom === undefined) {
            return undefined;
        }
        for (let z in this._levels) {
            // z = Number(z);
            if (this._levels[z].el.children.length || Number(z) == zoom) {
                this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom - Number(z));
                this._onUpdateLevel(z);
            }
            else {
                _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.remove(this._levels[z].el);
                this._removeTilesAtZoom(z);
                this._onRemoveLevel(z);
                delete this._levels[z];
            }
        }
        var level = this._levels[zoom], map = this._map;
        if (!level) {
            level = this._levels[zoom] = {};
            level.el = _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.create('div', 'leaflet-tile-container leaflet-zoom-animated', this._container);
            level.el.style.zIndex = maxZoom;
            level.origin = map.latLngToWorldPixel(map.worldPixelToLatLng(map.getPixelOrigin()), zoom).round();
            level.zoom = zoom;
            this._setZoomTransform(level, map.getCenter(), map.getZoom());
            // force the browser to consider the newly added element for transition
            // Util.falseFn(level.el.offsetWidth);
            this._onCreateLevel(level);
        }
        this._level = level;
        return level;
    }
    _onUpdateLevel(level) {
    }
    _onRemoveLevel(level) {
    }
    _onCreateLevel(level) {
    }
    _pruneTiles() {
        if (!this._map)
            return;
        let zoom = this._map.getZoom();
        if (zoom > this.options.maxZoom ||
            zoom < this.options.minZoom) {
            this._removeAllTiles();
            return;
        }
        for (let key in this._tiles) {
            let tile = this._tiles[key];
            tile.retain = tile.current;
        }
        for (let key in this._tiles) {
            let tile = this._tiles[key];
            if (tile.current && !tile.active) {
                let coords = tile.coords;
                if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
                    this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
                }
            }
        }
        for (let key in this._tiles) {
            if (!this._tiles[key].retain) {
                this._removeTile(key);
            }
        }
    }
    _removeTilesAtZoom(zoom) {
        for (var key in this._tiles) {
            if (this._tiles[key].coords.z !== zoom) {
                continue;
            }
            this._removeTile(key);
        }
    }
    _removeAllTiles() {
        for (var key in this._tiles) {
            this._removeTile(key);
        }
    }
    _invalidateAll() {
        for (var z in this._levels) {
            _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.remove(this._levels[z].el);
            this._onRemoveLevel(Number(z));
            delete this._levels[z];
        }
        this._removeAllTiles();
        this._tileZoom = undefined;
    }
    _retainParent(x, y, z, minZoom) {
        let x2 = Math.floor(x / 2), y2 = Math.floor(y / 2), z2 = z - 1;
        var key = this._tileCoordsToKey({ x: x2, y: y2, z: z2 }), tile = this._tiles[key];
        if (tile && tile.active) {
            tile.retain = true;
            return true;
        }
        else if (tile && tile.loaded) {
            tile.retain = true;
        }
        if (z2 > minZoom) {
            return this._retainParent(x2, y2, z2, minZoom);
        }
        return false;
    }
    _retainChildren(x, y, z, maxZoom) {
        for (let i = 2 * x; i < 2 * x + 2; i++) {
            for (let j = 2 * y; j < 2 * y + 2; j++) {
                let key = this._tileCoordsToKey({ x: i, y: j, z: z + 1 }), tile = this._tiles[key];
                if (tile && tile.active) {
                    tile.retain = true;
                    continue;
                }
                else if (tile && tile.loaded) {
                    tile.retain = true;
                }
                if (z + 1 < maxZoom) {
                    this._retainChildren(i, j, z + 1, maxZoom);
                }
            }
        }
    }
    _resetView(e) {
        const animating = e && (e.pinch || e.flyTo);
        this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
    }
    _animateZoom(e) {
        this._setView(e.center, e.zoom, true, e.noUpdate);
    }
    _clampZoom(zoom) {
        const options = this.options;
        if (undefined !== options.minNativeZoom && zoom < options.minNativeZoom) {
            return options.minNativeZoom;
        }
        if (undefined !== options.maxNativeZoom && options.maxNativeZoom < zoom) {
            return options.maxNativeZoom;
        }
        return zoom;
    }
    _abortLoading() {
    }
    _setView(center, zoom, noPrune, noUpdate) {
        var tileZoom = Math.round(zoom);
        if ((this.options.maxZoom !== undefined && tileZoom > this.options.maxZoom) ||
            (this.options.minZoom !== undefined && tileZoom < this.options.minZoom)) {
            tileZoom = undefined;
        }
        else {
            tileZoom = this._clampZoom(tileZoom);
        }
        var tileZoomChanged = this.options.updateWhenZooming && (tileZoom !== this._tileZoom);
        if (!noUpdate || tileZoomChanged) {
            this._tileZoom = tileZoom;
            if (this._abortLoading) {
                this._abortLoading();
            }
            this._updateLevels();
            this._resetGrid();
            if (tileZoom !== undefined) {
                this._update(center);
            }
            if (!noPrune) {
                this._pruneTiles();
            }
            // Flag to prevent _updateOpacity from pruning tiles during
            // a zoom anim or a pinch gesture
            this._noPrune = !!noPrune;
        }
        this._setZoomTransforms(center, zoom);
    }
    _setZoomTransforms(center, zoom) {
        for (let i in this._levels) {
            this._setZoomTransform(this._levels[i], center, zoom);
        }
    }
    _setZoomTransform(level, center, zoom) {
        let scale = this._map.getZoomScale(zoom, level.zoom), translate = level.origin.multiplyBy(scale)
            .subtract(this._map._getNewPixelOrigin(center, zoom)).round();
        if (_util_browser__WEBPACK_IMPORTED_MODULE_0__.any3d) {
            _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.setTransform(level.el, translate, scale);
        }
        else {
            _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.setPosition(level.el, translate);
        }
    }
    _resetGrid() {
        let crs = this._map.getCRS(), tileSize = this._tileSize = this.getTileSize(), tileZoom = this._tileZoom;
        const bounds = this._map.getPixelWorldBounds(this._tileZoom);
        if (bounds) {
            this._globalTileRange = this._pxBoundsToTileRange(bounds);
        }
    }
    _onMoveEnd() {
        if (!this._map || this._map._animatingZoom) {
            return;
        }
        this._update();
    }
    _getTiledPixelBounds(center) {
        let map = this._map, mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(), scale = map.getZoomScale(mapZoom, this._tileZoom), pixelCenter = map.latLngToWorldPixel(center, this._tileZoom).floor(), halfSize = map.getSize().divideBy(scale * 2);
        return new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_5__.ScreenBounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
    }
    // Private method to load tiles in the grid's active zoom level according to map bounds
    _update(center) {
        var map = this._map;
        if (!map) {
            return;
        }
        var zoom = this._clampZoom(map.getZoom());
        if (center === undefined) {
            center = map.getCenter();
        }
        if (this._tileZoom === undefined) {
            return;
        } // if out of minzoom/maxzoom
        var pixelBounds = this._getTiledPixelBounds(center), tileRange = this._pxBoundsToTileRange(pixelBounds), tileCenter = tileRange.getCenter(), queue = [], margin = this.options.keepBuffer, noPruneRange = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_5__.ScreenBounds(tileRange.getBottomLeft().subtract(new _common_screen_xy__WEBPACK_IMPORTED_MODULE_4__.ScreenXY(margin, -margin)), tileRange.getTopRight().add(new _common_screen_xy__WEBPACK_IMPORTED_MODULE_4__.ScreenXY(margin, -margin)));
        // Sanity check: panic if the tile range contains Infinity somewhere.
        if (!(isFinite(tileRange.min.x) &&
            isFinite(tileRange.min.y) &&
            isFinite(tileRange.max.x) &&
            isFinite(tileRange.max.y))) {
            throw new Error('Attempted to load an infinite number of tiles');
        }
        for (var key in this._tiles) {
            var c = this._tiles[key].coords;
            if (c.z !== this._tileZoom || !noPruneRange.contains(new _common_screen_xy__WEBPACK_IMPORTED_MODULE_4__.ScreenXY(c.x, c.y))) {
                this._tiles[key].current = false;
            }
        }
        // _update just loads more tiles. If the tile zoom level differs too much
        // from the map's, let _setView reset levels and prune old tiles.
        if (Math.abs(zoom - this._tileZoom) > 1) {
            this._setView(center, zoom);
            return;
        }
        // create a queue of coordinates to load tiles from
        for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
            for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
                const coords = { x: i, y: j, z: this._tileZoom };
                if (!this._isValidTile(coords)) {
                    continue;
                }
                var tile = this._tiles[this._tileCoordsToKey(coords)];
                if (tile) {
                    tile.current = true;
                }
                else {
                    queue.push(coords);
                }
            }
        }
        // sort tile queue to load tiles in order of their distance to center
        queue.sort(function (a, b) {
            return ((a.x - tileCenter.x) * (a.x - tileCenter.x) + (a.y - tileCenter.y) * (a.y - tileCenter.y))
                - ((b.x - tileCenter.x) * (b.x - tileCenter.x) + (b.y - tileCenter.y) * (b.y - tileCenter.y));
        });
        if (queue.length !== 0) {
            // if it's the first batch of tiles to load
            if (!this._loading) {
                this._loading = true;
                // @event loading: Event
                // Fired when the grid layer starts loading tiles.
                this.fire('loading');
            }
            // create DOM fragment to append tiles in one batch
            var fragment = document.createDocumentFragment();
            for (i = 0; i < queue.length; i++) {
                this._addTile(queue[i], fragment);
            }
            this._level.el.appendChild(fragment);
        }
    }
    _isValidTile(coords) {
        const crs = this._map.getCRS();
        if (!crs.infinite) {
            // don't load tile if it's out of bounds and not wrapped
            const bounds = this._globalTileRange;
            if ((coords.x < bounds.min.x || coords.x > bounds.max.x) ||
                (coords.y < bounds.min.y || coords.y > bounds.max.y)) {
                return false;
            }
        }
        if (!this.options.bounds) {
            return true;
        }
        // don't load tile if it doesn't intersect the bounds in options
        // bounds: LatLngBounds
        const tileBounds = this._tileCoordsToBounds(coords);
        return this.options.bounds.overlaps(tileBounds);
    }
    _keyToBounds(key) {
        return this._tileCoordsToBounds(this._keyToTileCoords(key));
    }
    _tileCoordsToNwSe(coords) {
        const map = this._map, tileSize = this.getTileSize(), nwPoint = new _common_screen_xy__WEBPACK_IMPORTED_MODULE_4__.ScreenXY(coords.x, coords.y).scaleBy(tileSize), sePoint = nwPoint.add(tileSize), nw = map.worldPixelToLatLng(nwPoint, coords.z), se = map.worldPixelToLatLng(sePoint, coords.z);
        return [nw, se];
    }
    // converts tile coordinates to its geographical bounds
    _tileCoordsToBounds(coords) {
        let bp = this._tileCoordsToNwSe(coords), bounds = new _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_6__.LatLngBounds(bp[0], bp[1]);
        if (!this.options.noWrap) {
            bounds = this._map.wrapLatLngBounds(bounds);
        }
        return bounds;
    }
    // converts tile coordinates to key for the tile cache
    _tileCoordsToKey(coords) {
        return coords.x + ':' + coords.y + ':' + coords.z;
    }
    // converts tile cache key to coordinates
    _keyToTileCoords(key) {
        let k = key.split(':');
        return { x: +k[0], y: +k[1], z: +k[2] };
    }
    _removeTile(key) {
        var tile = this._tiles[key];
        if (!tile) {
            return;
        }
        _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.remove(tile.el);
        delete this._tiles[key];
        // @event tileunload: TileEvent
        // Fired when a tile is removed (e.g. when a tile goes off the screen).
        this.fire('tileunload', {
            tile: tile.el,
            coords: this._keyToTileCoords(key)
        });
    }
    _initTile(tile) {
        _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.addClass(tile, 'leaflet-tile');
        const tileSize = this.getTileSize();
        tile.style.width = tileSize.x + 'px';
        tile.style.height = tileSize.y + 'px';
        tile.onselectstart = _util_util__WEBPACK_IMPORTED_MODULE_1__.falseFn;
        tile.onmousemove = _util_util__WEBPACK_IMPORTED_MODULE_1__.falseFn;
    }
    _addTile(coords, container) {
        let tilePos = this._getTilePos(coords), key = this._tileCoordsToKey(coords);
        let tile = this.createTile(coords, () => {
            this._tileReady(coords, null, tile);
        });
        this._initTile(tile);
        // if createTile is defined with a second argument ("done" callback),
        // we know that tile is async and will be ready later; otherwise
        if (this.createTile.length < 2) {
            // mark tile as ready, but delay one frame for opacity animation to happen
            _util_util__WEBPACK_IMPORTED_MODULE_1__.requestAnimFrame(() => {
                this._tileReady(coords, null, tile);
            });
        }
        _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.setPosition(tile, tilePos);
        // save tile in cache
        this._tiles[key] = {
            el: tile,
            coords: coords,
            current: true
        };
        container.appendChild(tile);
        // @event tileloadstart: TileEvent
        // Fired when a tile is requested and starts loading.
        this.fire('tileloadstart', {
            tile: tile,
            coords: coords
        });
    }
    _tileReady(coords, err, tile) {
        if (err) {
            // @event tileerror: TileErrorEvent
            // Fired when there is an error loading a tile.
            this.fire('tileerror', {
                error: err,
                tile: tile,
                coords: coords
            });
        }
        let key = this._tileCoordsToKey(coords);
        tile = this._tiles[key];
        if (!tile) {
            return;
        }
        tile.loaded = +new Date();
        if (this._map._fadeAnimated) {
            _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.setOpacity(tile.el, 0);
            _util_util__WEBPACK_IMPORTED_MODULE_1__.cancelAnimFrame(this._fadeFrame);
            this._fadeFrame = _util_util__WEBPACK_IMPORTED_MODULE_1__.requestAnimFrame(this._updateOpacity, this);
        }
        else {
            tile.active = true;
            this._pruneTiles();
        }
        if (!err) {
            _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.addClass(tile.el, 'leaflet-tile-loaded');
            // @event tileload: TileEvent
            // Fired when a tile loads.
            this.fire('tileload', {
                tile: tile.el,
                coords: coords
            });
        }
        if (this._noTilesToLoad()) {
            this._loading = false;
            // @event load: Event
            // Fired when the grid layer loaded all visible tiles.
            this.fire('load');
            if (_util_browser__WEBPACK_IMPORTED_MODULE_0__.ielt9 || !this._map._fadeAnimated) {
                _util_util__WEBPACK_IMPORTED_MODULE_1__.requestAnimFrame(this._pruneTiles, this);
            }
            else {
                // Wait a bit more than 0.2 secs (the duration of the tile fade-in)
                // to trigger a pruning.
                setTimeout(() => {
                    this._pruneTiles();
                }, 250);
            }
        }
    }
    _getTilePos(coords) {
        return new _common_screen_xy__WEBPACK_IMPORTED_MODULE_4__.ScreenXY(coords.x, coords.y).scaleBy(this.getTileSize()).subtract(this._level.origin);
    }
    _pxBoundsToTileRange(bounds) {
        var tileSize = this.getTileSize();
        return new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_5__.ScreenBounds(bounds.min.unscaleBy(tileSize).floor(), bounds.max.unscaleBy(tileSize).ceil().subtract(new _common_screen_xy__WEBPACK_IMPORTED_MODULE_4__.ScreenXY(1, 1)));
    }
    _noTilesToLoad() {
        for (var key in this._tiles) {
            if (!this._tiles[key].loaded) {
                return false;
            }
        }
        return true;
    }
}


/***/ }),

/***/ "../dist/grid/tile.js":
/*!****************************!*\
  !*** ../dist/grid/tile.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TileOptions": () => (/* binding */ TileOptions),
/* harmony export */   "Tile": () => (/* binding */ Tile)
/* harmony export */ });
/* harmony import */ var _util_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/browser */ "../dist/util/browser.js");
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/util */ "../dist/util/util.js");
/* harmony import */ var _util_dom_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/dom-event */ "../dist/util/dom-event.js");
/* harmony import */ var _util_dom_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/dom-util */ "../dist/util/dom-util.js");
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./grid */ "../dist/grid/grid.js");





/*
 * @class TileLayer
 * @inherits GridLayer
 * @aka L.TileLayer
 * Used to load and display tile layers on the map. Note that most tile servers require attribution, which you can set under `Layer`. Extends `GridLayer`.
 *
 * @example
 *
 * ```js
 * L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
 * ```
 *
 * @section URL template
 * @example
 *
 * A string of the following form:
 *
 * ```
 * 'http://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'
 * ```
 *
 * `{s}` means one of the available subdomains (used sequentially to help with browser parallel requests per domain limitation; subdomain values are specified in options; `a`, `b` or `c` by default, can be omitted), `{z}` — zoom level, `{x}` and `{y}` — tile coordinates. `{r}` can be used to add "&commat;2x" to the URL to load retina tiles.
 *
 * You can use custom keys in the template, which will be [evaluated](#util-template) from TileLayer options, like this:
 *
 * ```
 * L.tileLayer('http://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png', {foo: 'bar'});
 * ```
 */
class TileOptions extends _grid__WEBPACK_IMPORTED_MODULE_4__.GridOptions {
    constructor() {
        super(...arguments);
        // @option subdomains: String|String[] = 'abc'
        // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
        this.subdomains = ['a', 'b', 'c'];
        // @option errorTileUrl: String = ''
        // URL to the tile image to show in place of the tile that failed to load.
        this.errorTileUrl = '';
        // @option zoomOffset: Number = 0
        // The zoom number used in tile URLs will be offset with this value.
        this.zoomOffset = 0;
        // @option tms: Boolean = false
        // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
        this.tms = false;
        // @option zoomReverse: Boolean = false
        // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
        this.zoomReverse = false;
        // @option detectRetina: Boolean = false
        // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
        this.detectRetina = false;
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the tiles.
        // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        this.crossOrigin = false;
    }
}
class Tile extends _grid__WEBPACK_IMPORTED_MODULE_4__.Grid {
    constructor(url, options) {
        super();
        this.options = new TileOptions();
        this._url = url;
        this.options.assign(options);
    }
    // @method setUrl(url: String, noRedraw?: Boolean): this
    // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
    // If the URL does not change, the layer will not be redrawn unless
    // the noRedraw parameter is set to false.
    setUrl(url, noRedraw) {
        if (this._url === url && noRedraw === undefined) {
            noRedraw = true;
        }
        this._url = url;
        if (!noRedraw) {
            this.redraw();
        }
        return this;
    }
    // @method createTile(coords: Object, done?: Function): HTMLElement
    // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
    // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
    // callback is called when the tile has been loaded.
    createTile(coords, done) {
        var tile = document.createElement('img');
        _util_dom_event__WEBPACK_IMPORTED_MODULE_2__.on(tile, 'load', () => {
            this._tileOnLoad(done, tile);
        });
        _util_dom_event__WEBPACK_IMPORTED_MODULE_2__.on(tile, 'error', () => {
            this._tileOnError(done, tile);
        });
        if (this.options.crossOrigin || this.options.crossOrigin === '') {
            tile.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
        }
        /*
         Alt tag is set to empty string to keep screen readers from reading URL and for compliance reasons
         http://www.w3.org/TR/WCAG20-TECHS/H67
        */
        tile.alt = '';
        /*
         Set role="presentation" to force screen readers to ignore this
         https://www.w3.org/TR/wai-aria/roles#textalternativecomputation
        */
        tile.setAttribute('role', 'presentation');
        tile.src = this.getTileUrl(coords);
        return tile;
    }
    // @section Extension methods
    // @uninheritable
    // Layers extending `TileLayer` might reimplement the following method.
    // @method getTileUrl(coords: Object): String
    // Called only internally, returns the URL for a tile given its coordinates.
    // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
    getTileUrl(coords) {
        const data = {
            r: _util_browser__WEBPACK_IMPORTED_MODULE_0__.retina ? '@2x' : '',
            s: this._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: this._getZoomForUrl()
        };
        if (this._map && !this._map.getCRS().infinite) {
            const invertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) {
                data['y'] = invertedY;
            }
            data['-y'] = invertedY;
        }
        return _util_util__WEBPACK_IMPORTED_MODULE_1__.template(this._url, data);
    }
    _tileOnLoad(done, tile) {
        // For https://github.com/Leaflet/Leaflet/issues/3332
        if (_util_browser__WEBPACK_IMPORTED_MODULE_0__.ielt9) {
            setTimeout(() => {
                done(null, tile);
            }, 0);
        }
        else {
            done(null, tile);
        }
    }
    _tileOnError(done, tile, e) {
        var errorUrl = this.options.errorTileUrl;
        if (errorUrl && tile.getAttribute('src') !== errorUrl) {
            tile.src = errorUrl;
        }
        done(e, tile);
    }
    _onTileRemove(e) {
        e.tile.onload = null;
    }
    _getZoomForUrl() {
        var zoom = this._tileZoom, maxZoom = this.options.maxZoom, zoomReverse = this.options.zoomReverse, zoomOffset = this.options.zoomOffset;
        if (zoomReverse) {
            zoom = maxZoom - zoom;
        }
        return zoom + zoomOffset;
    }
    _getSubdomain(tilePoint) {
        var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
        return this.options.subdomains[index];
    }
    // stops loading all tiles in the background layer
    _abortLoading() {
        var i, tile;
        for (i in this._tiles) {
            if (this._tiles[i].coords.z !== this._tileZoom) {
                tile = this._tiles[i].el;
                tile.onload = _util_util__WEBPACK_IMPORTED_MODULE_1__.falseFn;
                tile.onerror = _util_util__WEBPACK_IMPORTED_MODULE_1__.falseFn;
                if (!tile.complete) {
                    tile.src = _util_util__WEBPACK_IMPORTED_MODULE_1__.emptyImageUrl;
                    _util_dom_util__WEBPACK_IMPORTED_MODULE_3__.remove(tile);
                    delete this._tiles[i];
                }
            }
        }
    }
    _removeTile(key) {
        var tile = this._tiles[key];
        if (!tile) {
            return;
        }
        // Cancels any pending http requests associated with the tile
        // unless we're on Android's stock browser,
        // see https://github.com/Leaflet/Leaflet/issues/137
        if (!_util_browser__WEBPACK_IMPORTED_MODULE_0__.androidStock) {
            tile.el.setAttribute('src', _util_util__WEBPACK_IMPORTED_MODULE_1__.emptyImageUrl);
        }
        return super._removeTile(key);
    }
    _tileReady(coords, err, tile) {
        if (!this._map || (tile && tile.getAttribute('src') === _util_util__WEBPACK_IMPORTED_MODULE_1__.emptyImageUrl)) {
            return;
        }
        return super._tileReady(coords, err, tile);
    }
}


/***/ }),

/***/ "../dist/index.js":
/*!************************!*\
  !*** ../dist/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cancelAnimFrame": () => (/* reexport safe */ _util_util__WEBPACK_IMPORTED_MODULE_0__.cancelAnimFrame),
/* harmony export */   "cancelFn": () => (/* reexport safe */ _util_util__WEBPACK_IMPORTED_MODULE_0__.cancelFn),
/* harmony export */   "emptyImageUrl": () => (/* reexport safe */ _util_util__WEBPACK_IMPORTED_MODULE_0__.emptyImageUrl),
/* harmony export */   "falseFn": () => (/* reexport safe */ _util_util__WEBPACK_IMPORTED_MODULE_0__.falseFn),
/* harmony export */   "formatNum": () => (/* reexport safe */ _util_util__WEBPACK_IMPORTED_MODULE_0__.formatNum),
/* harmony export */   "lastId": () => (/* reexport safe */ _util_util__WEBPACK_IMPORTED_MODULE_0__.lastId),
/* harmony export */   "requestAnimFrame": () => (/* reexport safe */ _util_util__WEBPACK_IMPORTED_MODULE_0__.requestAnimFrame),
/* harmony export */   "requestFn": () => (/* reexport safe */ _util_util__WEBPACK_IMPORTED_MODULE_0__.requestFn),
/* harmony export */   "splitWords": () => (/* reexport safe */ _util_util__WEBPACK_IMPORTED_MODULE_0__.splitWords),
/* harmony export */   "stamp": () => (/* reexport safe */ _util_util__WEBPACK_IMPORTED_MODULE_0__.stamp),
/* harmony export */   "template": () => (/* reexport safe */ _util_util__WEBPACK_IMPORTED_MODULE_0__.template),
/* harmony export */   "trim": () => (/* reexport safe */ _util_util__WEBPACK_IMPORTED_MODULE_0__.trim),
/* harmony export */   "wrapNum": () => (/* reexport safe */ _util_util__WEBPACK_IMPORTED_MODULE_0__.wrapNum),
/* harmony export */   "android": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.android),
/* harmony export */   "android23": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.android23),
/* harmony export */   "androidStock": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.androidStock),
/* harmony export */   "any3d": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.any3d),
/* harmony export */   "canvas": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.canvas),
/* harmony export */   "chrome": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.chrome),
/* harmony export */   "edge": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.edge),
/* harmony export */   "gecko": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.gecko),
/* harmony export */   "gecko3d": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.gecko3d),
/* harmony export */   "ie": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.ie),
/* harmony export */   "ie3d": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.ie3d),
/* harmony export */   "ielt9": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.ielt9),
/* harmony export */   "mobile": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.mobile),
/* harmony export */   "mobileGecko": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.mobileGecko),
/* harmony export */   "mobileOpera": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.mobileOpera),
/* harmony export */   "mobileWebkit": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.mobileWebkit),
/* harmony export */   "mobileWebkit3d": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.mobileWebkit3d),
/* harmony export */   "msPointer": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.msPointer),
/* harmony export */   "opera": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.opera),
/* harmony export */   "opera12": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.opera12),
/* harmony export */   "passiveEvents": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.passiveEvents),
/* harmony export */   "phantom": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.phantom),
/* harmony export */   "pointer": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.pointer),
/* harmony export */   "retina": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.retina),
/* harmony export */   "safari": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.safari),
/* harmony export */   "touch": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.touch),
/* harmony export */   "webkit": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.webkit),
/* harmony export */   "webkit3d": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.webkit3d),
/* harmony export */   "win": () => (/* reexport safe */ _util_browser__WEBPACK_IMPORTED_MODULE_1__.win),
/* harmony export */   "TRANSFORM": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.TRANSFORM),
/* harmony export */   "TRANSITION": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.TRANSITION),
/* harmony export */   "TRANSITION_END": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.TRANSITION_END),
/* harmony export */   "addClass": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.addClass),
/* harmony export */   "create": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.create),
/* harmony export */   "empty": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.empty),
/* harmony export */   "get": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.get),
/* harmony export */   "getClass": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.getClass),
/* harmony export */   "getPosition": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.getPosition),
/* harmony export */   "getScale": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.getScale),
/* harmony export */   "getSizedParentNode": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.getSizedParentNode),
/* harmony export */   "getStyle": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.getStyle),
/* harmony export */   "hasClass": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.hasClass),
/* harmony export */   "remove": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.remove),
/* harmony export */   "removeClass": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.removeClass),
/* harmony export */   "setClass": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.setClass),
/* harmony export */   "setOpacity": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.setOpacity),
/* harmony export */   "setPosition": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.setPosition),
/* harmony export */   "setTransform": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.setTransform),
/* harmony export */   "testProp": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.testProp),
/* harmony export */   "toBack": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.toBack),
/* harmony export */   "toFront": () => (/* reexport safe */ _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.toFront),
/* harmony export */   "addListener": () => (/* reexport safe */ _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.addListener),
/* harmony export */   "disableClickPropagation": () => (/* reexport safe */ _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.disableClickPropagation),
/* harmony export */   "disableScrollPropagation": () => (/* reexport safe */ _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.disableScrollPropagation),
/* harmony export */   "fakeStop": () => (/* reexport safe */ _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.fakeStop),
/* harmony export */   "getMousePosition": () => (/* reexport safe */ _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.getMousePosition),
/* harmony export */   "getWheelDelta": () => (/* reexport safe */ _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.getWheelDelta),
/* harmony export */   "isExternalTarget": () => (/* reexport safe */ _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.isExternalTarget),
/* harmony export */   "off": () => (/* reexport safe */ _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.off),
/* harmony export */   "on": () => (/* reexport safe */ _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.on),
/* harmony export */   "preventDefault": () => (/* reexport safe */ _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.preventDefault),
/* harmony export */   "removeListener": () => (/* reexport safe */ _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.removeListener),
/* harmony export */   "skipped": () => (/* reexport safe */ _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.skipped),
/* harmony export */   "stop": () => (/* reexport safe */ _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.stop),
/* harmony export */   "stopPropagation": () => (/* reexport safe */ _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.stopPropagation),
/* harmony export */   "BaseObject": () => (/* reexport safe */ _base_base_object__WEBPACK_IMPORTED_MODULE_4__.BaseObject),
/* harmony export */   "IDObject": () => (/* reexport safe */ _base_id_object__WEBPACK_IMPORTED_MODULE_5__.IDObject),
/* harmony export */   "OptionsObject": () => (/* reexport safe */ _base_options_object__WEBPACK_IMPORTED_MODULE_6__.OptionsObject),
/* harmony export */   "EventedObject": () => (/* reexport safe */ _base_evented_object__WEBPACK_IMPORTED_MODULE_7__.EventedObject),
/* harmony export */   "HandlerObject": () => (/* reexport safe */ _base_handler_object__WEBPACK_IMPORTED_MODULE_8__.HandlerObject),
/* harmony export */   "DraggableObject": () => (/* reexport safe */ _base_draggable_object__WEBPACK_IMPORTED_MODULE_9__.DraggableObject),
/* harmony export */   "DraggableOptions": () => (/* reexport safe */ _base_draggable_object__WEBPACK_IMPORTED_MODULE_9__.DraggableOptions),
/* harmony export */   "LatLng": () => (/* reexport safe */ _common_latlng__WEBPACK_IMPORTED_MODULE_10__.LatLng),
/* harmony export */   "LatLngBounds": () => (/* reexport safe */ _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_11__.LatLngBounds),
/* harmony export */   "XYBounds": () => (/* reexport safe */ _common_bounds__WEBPACK_IMPORTED_MODULE_12__.XYBounds),
/* harmony export */   "XY": () => (/* reexport safe */ _common_xy__WEBPACK_IMPORTED_MODULE_13__.XY),
/* harmony export */   "PlaneXY": () => (/* reexport safe */ _common_plane_xy__WEBPACK_IMPORTED_MODULE_14__.PlaneXY),
/* harmony export */   "ScreenXY": () => (/* reexport safe */ _common_screen_xy__WEBPACK_IMPORTED_MODULE_15__.ScreenXY),
/* harmony export */   "PlaneBounds": () => (/* reexport safe */ _common_plane_bounds__WEBPACK_IMPORTED_MODULE_16__.PlaneBounds),
/* harmony export */   "ScreenBounds": () => (/* reexport safe */ _common_screen_bounds__WEBPACK_IMPORTED_MODULE_17__.ScreenBounds),
/* harmony export */   "CRS": () => (/* reexport safe */ _crs_crs__WEBPACK_IMPORTED_MODULE_18__.CRS),
/* harmony export */   "Earth": () => (/* reexport safe */ _crs_crs_earth__WEBPACK_IMPORTED_MODULE_19__.Earth),
/* harmony export */   "EPSG4326": () => (/* reexport safe */ _crs_crs_4326__WEBPACK_IMPORTED_MODULE_20__.EPSG4326),
/* harmony export */   "EPSG3857": () => (/* reexport safe */ _crs_crs_3857__WEBPACK_IMPORTED_MODULE_21__.EPSG3857),
/* harmony export */   "Projection": () => (/* reexport safe */ _crs_projection_projection__WEBPACK_IMPORTED_MODULE_22__.Projection),
/* harmony export */   "LonLat": () => (/* reexport safe */ _crs_projection_projection_lonlat__WEBPACK_IMPORTED_MODULE_23__.LonLat),
/* harmony export */   "Mercator": () => (/* reexport safe */ _crs_projection_projection_mercator__WEBPACK_IMPORTED_MODULE_24__.Mercator),
/* harmony export */   "SphericalMercator": () => (/* reexport safe */ _crs_projection_projection_spherical_mercator__WEBPACK_IMPORTED_MODULE_25__.SphericalMercator),
/* harmony export */   "Transformation": () => (/* reexport safe */ _crs_transformation_transformation__WEBPACK_IMPORTED_MODULE_26__.Transformation),
/* harmony export */   "CoordinateType": () => (/* reexport safe */ _geometry_geometry__WEBPACK_IMPORTED_MODULE_27__.CoordinateType),
/* harmony export */   "Geometry": () => (/* reexport safe */ _geometry_geometry__WEBPACK_IMPORTED_MODULE_27__.Geometry),
/* harmony export */   "GeometryType": () => (/* reexport safe */ _geometry_geometry__WEBPACK_IMPORTED_MODULE_27__.GeometryType),
/* harmony export */   "Point": () => (/* reexport safe */ _geometry_point__WEBPACK_IMPORTED_MODULE_28__.Point),
/* harmony export */   "Polyline": () => (/* reexport safe */ _geometry_polyline__WEBPACK_IMPORTED_MODULE_29__.Polyline),
/* harmony export */   "Polygon": () => (/* reexport safe */ _geometry_polygon__WEBPACK_IMPORTED_MODULE_30__.Polygon),
/* harmony export */   "MultiplePoint": () => (/* reexport safe */ _geometry_multiple_point__WEBPACK_IMPORTED_MODULE_31__.MultiplePoint),
/* harmony export */   "MultiplePolyline": () => (/* reexport safe */ _geometry_multiple_polyline__WEBPACK_IMPORTED_MODULE_32__.MultiplePolyline),
/* harmony export */   "MultiplePolygon": () => (/* reexport safe */ _geometry_multiple_polygon__WEBPACK_IMPORTED_MODULE_33__.MultiplePolygon),
/* harmony export */   "Graphic": () => (/* reexport safe */ _graphic_graphic__WEBPACK_IMPORTED_MODULE_34__.Graphic),
/* harmony export */   "Layer": () => (/* reexport safe */ _layer_layer__WEBPACK_IMPORTED_MODULE_35__.Layer),
/* harmony export */   "GraphicLayer": () => (/* reexport safe */ _layer_graphic_layer__WEBPACK_IMPORTED_MODULE_36__.GraphicLayer),
/* harmony export */   "FeatureLayer": () => (/* reexport safe */ _layer_feature_layer__WEBPACK_IMPORTED_MODULE_37__.FeatureLayer),
/* harmony export */   "RasterLayer": () => (/* reexport safe */ _layer_raster_layer__WEBPACK_IMPORTED_MODULE_38__.RasterLayer),
/* harmony export */   "FillSymbol": () => (/* reexport safe */ _symbol_symbol__WEBPACK_IMPORTED_MODULE_39__.FillSymbol),
/* harmony export */   "LineSymbol": () => (/* reexport safe */ _symbol_symbol__WEBPACK_IMPORTED_MODULE_39__.LineSymbol),
/* harmony export */   "PointSymbol": () => (/* reexport safe */ _symbol_symbol__WEBPACK_IMPORTED_MODULE_39__.PointSymbol),
/* harmony export */   "SimpleFillSymbol": () => (/* reexport safe */ _symbol_symbol__WEBPACK_IMPORTED_MODULE_39__.SimpleFillSymbol),
/* harmony export */   "SimpleLineSymbol": () => (/* reexport safe */ _symbol_symbol__WEBPACK_IMPORTED_MODULE_39__.SimpleLineSymbol),
/* harmony export */   "SimpleMarkerSymbol": () => (/* reexport safe */ _symbol_symbol__WEBPACK_IMPORTED_MODULE_39__.SimpleMarkerSymbol),
/* harmony export */   "SimplePointSymbol": () => (/* reexport safe */ _symbol_symbol__WEBPACK_IMPORTED_MODULE_39__.SimplePointSymbol),
/* harmony export */   "Symbol": () => (/* reexport safe */ _symbol_symbol__WEBPACK_IMPORTED_MODULE_39__.Symbol),
/* harmony export */   "ClusterSymbol": () => (/* reexport safe */ _symbol_cluster_symbol__WEBPACK_IMPORTED_MODULE_40__.ClusterSymbol),
/* harmony export */   "LetterSymbol": () => (/* reexport safe */ _symbol_letter_symbol__WEBPACK_IMPORTED_MODULE_41__.LetterSymbol),
/* harmony export */   "ShapeSymbol": () => (/* reexport safe */ _symbol_shape_symbol__WEBPACK_IMPORTED_MODULE_42__.ShapeSymbol),
/* harmony export */   "AlternateLineSymbol": () => (/* reexport safe */ _symbol_alternate_line_symbol__WEBPACK_IMPORTED_MODULE_43__.AlternateLineSymbol),
/* harmony export */   "ArrowSymbol": () => (/* reexport safe */ _symbol_arrow_symbol__WEBPACK_IMPORTED_MODULE_44__.ArrowSymbol),
/* harmony export */   "AnimatePointSymbol": () => (/* reexport safe */ _symbol_animate_symbol__WEBPACK_IMPORTED_MODULE_45__.AnimatePointSymbol),
/* harmony export */   "SimpleAnimatePointSymbol": () => (/* reexport safe */ _symbol_animate_symbol__WEBPACK_IMPORTED_MODULE_45__.SimpleAnimatePointSymbol),
/* harmony export */   "LinePatternFillSymbol": () => (/* reexport safe */ _symbol_pattern_fill_symbol__WEBPACK_IMPORTED_MODULE_46__.LinePatternFillSymbol),
/* harmony export */   "PatternFillSymbol": () => (/* reexport safe */ _symbol_pattern_fill_symbol__WEBPACK_IMPORTED_MODULE_46__.PatternFillSymbol),
/* harmony export */   "Field": () => (/* reexport safe */ _feature_field__WEBPACK_IMPORTED_MODULE_47__.Field),
/* harmony export */   "FieldType": () => (/* reexport safe */ _feature_field__WEBPACK_IMPORTED_MODULE_47__.FieldType),
/* harmony export */   "Feature": () => (/* reexport safe */ _feature_feature__WEBPACK_IMPORTED_MODULE_48__.Feature),
/* harmony export */   "FeatureClass": () => (/* reexport safe */ _feature_feature_class__WEBPACK_IMPORTED_MODULE_49__.FeatureClass),
/* harmony export */   "Adapter": () => (/* reexport safe */ _adapter_adapter__WEBPACK_IMPORTED_MODULE_50__.Adapter),
/* harmony export */   "GeoJSONAdapter": () => (/* reexport safe */ _adapter_geojson_adapter__WEBPACK_IMPORTED_MODULE_51__.GeoJSONAdapter),
/* harmony export */   "Renderer": () => (/* reexport safe */ _renderer_renderer__WEBPACK_IMPORTED_MODULE_52__.Renderer),
/* harmony export */   "SimpleRenderer": () => (/* reexport safe */ _renderer_simple_renderer__WEBPACK_IMPORTED_MODULE_53__.SimpleRenderer),
/* harmony export */   "DotRenderer": () => (/* reexport safe */ _renderer_dot_renderer__WEBPACK_IMPORTED_MODULE_54__.DotRenderer),
/* harmony export */   "CategoryRenderer": () => (/* reexport safe */ _renderer_category_renderer__WEBPACK_IMPORTED_MODULE_55__.CategoryRenderer),
/* harmony export */   "CategoryRendererItem": () => (/* reexport safe */ _renderer_category_renderer__WEBPACK_IMPORTED_MODULE_55__.CategoryRendererItem),
/* harmony export */   "ClassRenderer": () => (/* reexport safe */ _renderer_class_renderer__WEBPACK_IMPORTED_MODULE_56__.ClassRenderer),
/* harmony export */   "ClassRendererItem": () => (/* reexport safe */ _renderer_class_renderer__WEBPACK_IMPORTED_MODULE_56__.ClassRendererItem),
/* harmony export */   "ClusterRenderer": () => (/* reexport safe */ _renderer_cluster_renderer__WEBPACK_IMPORTED_MODULE_57__.ClusterRenderer),
/* harmony export */   "Text": () => (/* reexport safe */ _text_text__WEBPACK_IMPORTED_MODULE_58__.Text),
/* harmony export */   "Collision": () => (/* reexport safe */ _label_collision__WEBPACK_IMPORTED_MODULE_59__.Collision),
/* harmony export */   "NullCollision": () => (/* reexport safe */ _label_collision__WEBPACK_IMPORTED_MODULE_59__.NullCollision),
/* harmony export */   "SimpleCollision": () => (/* reexport safe */ _label_collision__WEBPACK_IMPORTED_MODULE_59__.SimpleCollision),
/* harmony export */   "Label": () => (/* reexport safe */ _label_label__WEBPACK_IMPORTED_MODULE_60__.Label),
/* harmony export */   "Grid": () => (/* reexport safe */ _grid_grid__WEBPACK_IMPORTED_MODULE_61__.Grid),
/* harmony export */   "GridOptions": () => (/* reexport safe */ _grid_grid__WEBPACK_IMPORTED_MODULE_61__.GridOptions),
/* harmony export */   "Tile": () => (/* reexport safe */ _grid_tile__WEBPACK_IMPORTED_MODULE_62__.Tile),
/* harmony export */   "TileOptions": () => (/* reexport safe */ _grid_tile__WEBPACK_IMPORTED_MODULE_62__.TileOptions),
/* harmony export */   "Raster": () => (/* reexport safe */ _raster_raster__WEBPACK_IMPORTED_MODULE_63__.Raster),
/* harmony export */   "Kriging": () => (/* reexport safe */ _analysis_interpolation_kriging__WEBPACK_IMPORTED_MODULE_64__.Kriging),
/* harmony export */   "IDW": () => (/* reexport safe */ _analysis_interpolation_idw__WEBPACK_IMPORTED_MODULE_65__.IDW),
/* harmony export */   "Heat": () => (/* reexport safe */ _analysis_heat_heat__WEBPACK_IMPORTED_MODULE_66__.Heat),
/* harmony export */   "Animation": () => (/* reexport safe */ _animation_animation__WEBPACK_IMPORTED_MODULE_67__.Animation),
/* harmony export */   "PointAnimation": () => (/* reexport safe */ _animation_point_animation__WEBPACK_IMPORTED_MODULE_68__.PointAnimation),
/* harmony export */   "LineAnimation": () => (/* reexport safe */ _animation_line_animation__WEBPACK_IMPORTED_MODULE_69__.LineAnimation),
/* harmony export */   "Canvas": () => (/* reexport safe */ _map_canvas_canvas__WEBPACK_IMPORTED_MODULE_70__.Canvas),
/* harmony export */   "CanvasOptions": () => (/* reexport safe */ _map_canvas_canvas__WEBPACK_IMPORTED_MODULE_70__.CanvasOptions),
/* harmony export */   "Viewer": () => (/* reexport safe */ _map_canvas_viewer__WEBPACK_IMPORTED_MODULE_71__.Viewer),
/* harmony export */   "ViewerOptions": () => (/* reexport safe */ _map_canvas_viewer__WEBPACK_IMPORTED_MODULE_71__.ViewerOptions),
/* harmony export */   "Animater": () => (/* reexport safe */ _map_canvas_animater__WEBPACK_IMPORTED_MODULE_72__.Animater),
/* harmony export */   "AnimaterOptions": () => (/* reexport safe */ _map_canvas_animater__WEBPACK_IMPORTED_MODULE_72__.AnimaterOptions),
/* harmony export */   "Map": () => (/* reexport safe */ _map_map__WEBPACK_IMPORTED_MODULE_73__.Map),
/* harmony export */   "MapOptions": () => (/* reexport safe */ _map_map__WEBPACK_IMPORTED_MODULE_73__.MapOptions),
/* harmony export */   "PosAnimation": () => (/* reexport safe */ _map_position_animation__WEBPACK_IMPORTED_MODULE_74__.PosAnimation),
/* harmony export */   "DragHandler": () => (/* reexport safe */ _map_handler_map_drag__WEBPACK_IMPORTED_MODULE_75__.DragHandler),
/* harmony export */   "ScrollWheelZoomHandler": () => (/* reexport safe */ _map_handler_map_scrollwheelzoom__WEBPACK_IMPORTED_MODULE_76__.ScrollWheelZoomHandler),
/* harmony export */   "DoubleClickZoomHandler": () => (/* reexport safe */ _map_handler_map_doubleclickzoom__WEBPACK_IMPORTED_MODULE_77__.DoubleClickZoomHandler)
/* harmony export */ });
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/util */ "../dist/util/util.js");
/* harmony import */ var _util_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/browser */ "../dist/util/browser.js");
/* harmony import */ var _util_dom_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/dom-util */ "../dist/util/dom-util.js");
/* harmony import */ var _util_dom_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/dom-event */ "../dist/util/dom-event.js");
/* harmony import */ var _base_base_object__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base/base-object */ "../dist/base/base-object.js");
/* harmony import */ var _base_id_object__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base/id-object */ "../dist/base/id-object.js");
/* harmony import */ var _base_options_object__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./base/options-object */ "../dist/base/options-object.js");
/* harmony import */ var _base_evented_object__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./base/evented-object */ "../dist/base/evented-object.js");
/* harmony import */ var _base_handler_object__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./base/handler-object */ "../dist/base/handler-object.js");
/* harmony import */ var _base_draggable_object__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./base/draggable-object */ "../dist/base/draggable-object.js");
/* harmony import */ var _common_latlng__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./common/latlng */ "../dist/common/latlng.js");
/* harmony import */ var _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./common/latlng-bounds */ "../dist/common/latlng-bounds.js");
/* harmony import */ var _common_bounds__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./common/bounds */ "../dist/common/bounds.js");
/* harmony import */ var _common_xy__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./common/xy */ "../dist/common/xy.js");
/* harmony import */ var _common_plane_xy__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./common/plane-xy */ "../dist/common/plane-xy.js");
/* harmony import */ var _common_screen_xy__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./common/screen-xy */ "../dist/common/screen-xy.js");
/* harmony import */ var _common_plane_bounds__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./common/plane-bounds */ "../dist/common/plane-bounds.js");
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./common/screen-bounds */ "../dist/common/screen-bounds.js");
/* harmony import */ var _crs_crs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./crs/crs */ "../dist/crs/crs.js");
/* harmony import */ var _crs_crs_earth__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./crs/crs-earth */ "../dist/crs/crs-earth.js");
/* harmony import */ var _crs_crs_4326__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./crs/crs-4326 */ "../dist/crs/crs-4326.js");
/* harmony import */ var _crs_crs_3857__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./crs/crs-3857 */ "../dist/crs/crs-3857.js");
/* harmony import */ var _crs_projection_projection__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./crs/projection/projection */ "../dist/crs/projection/projection.js");
/* harmony import */ var _crs_projection_projection_lonlat__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./crs/projection/projection-lonlat */ "../dist/crs/projection/projection-lonlat.js");
/* harmony import */ var _crs_projection_projection_mercator__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./crs/projection/projection-mercator */ "../dist/crs/projection/projection-mercator.js");
/* harmony import */ var _crs_projection_projection_spherical_mercator__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./crs/projection/projection-spherical-mercator */ "../dist/crs/projection/projection-spherical-mercator.js");
/* harmony import */ var _crs_transformation_transformation__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./crs/transformation/transformation */ "../dist/crs/transformation/transformation.js");
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./geometry/geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _geometry_point__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./geometry/point */ "../dist/geometry/point.js");
/* harmony import */ var _geometry_polyline__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./geometry/polyline */ "../dist/geometry/polyline.js");
/* harmony import */ var _geometry_polygon__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./geometry/polygon */ "../dist/geometry/polygon.js");
/* harmony import */ var _geometry_multiple_point__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./geometry/multiple-point */ "../dist/geometry/multiple-point.js");
/* harmony import */ var _geometry_multiple_polyline__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./geometry/multiple-polyline */ "../dist/geometry/multiple-polyline.js");
/* harmony import */ var _geometry_multiple_polygon__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./geometry/multiple-polygon */ "../dist/geometry/multiple-polygon.js");
/* harmony import */ var _graphic_graphic__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./graphic/graphic */ "../dist/graphic/graphic.js");
/* harmony import */ var _layer_layer__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./layer/layer */ "../dist/layer/layer.js");
/* harmony import */ var _layer_graphic_layer__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./layer/graphic-layer */ "../dist/layer/graphic-layer.js");
/* harmony import */ var _layer_feature_layer__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./layer/feature-layer */ "../dist/layer/feature-layer.js");
/* harmony import */ var _layer_raster_layer__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./layer/raster-layer */ "../dist/layer/raster-layer.js");
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _symbol_cluster_symbol__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./symbol/cluster-symbol */ "../dist/symbol/cluster-symbol.js");
/* harmony import */ var _symbol_letter_symbol__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./symbol/letter-symbol */ "../dist/symbol/letter-symbol.js");
/* harmony import */ var _symbol_shape_symbol__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./symbol/shape-symbol */ "../dist/symbol/shape-symbol.js");
/* harmony import */ var _symbol_alternate_line_symbol__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./symbol/alternate-line-symbol */ "../dist/symbol/alternate-line-symbol.js");
/* harmony import */ var _symbol_arrow_symbol__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./symbol/arrow-symbol */ "../dist/symbol/arrow-symbol.js");
/* harmony import */ var _symbol_animate_symbol__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./symbol/animate-symbol */ "../dist/symbol/animate-symbol.js");
/* harmony import */ var _symbol_pattern_fill_symbol__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./symbol/pattern-fill-symbol */ "../dist/symbol/pattern-fill-symbol.js");
/* harmony import */ var _feature_field__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./feature/field */ "../dist/feature/field.js");
/* harmony import */ var _feature_feature__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./feature/feature */ "../dist/feature/feature.js");
/* harmony import */ var _feature_feature_class__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./feature/feature-class */ "../dist/feature/feature-class.js");
/* harmony import */ var _adapter_adapter__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./adapter/adapter */ "../dist/adapter/adapter.js");
/* harmony import */ var _adapter_geojson_adapter__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./adapter/geojson-adapter */ "../dist/adapter/geojson-adapter.js");
/* harmony import */ var _renderer_renderer__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./renderer/renderer */ "../dist/renderer/renderer.js");
/* harmony import */ var _renderer_simple_renderer__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./renderer/simple-renderer */ "../dist/renderer/simple-renderer.js");
/* harmony import */ var _renderer_dot_renderer__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./renderer/dot-renderer */ "../dist/renderer/dot-renderer.js");
/* harmony import */ var _renderer_category_renderer__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./renderer/category-renderer */ "../dist/renderer/category-renderer.js");
/* harmony import */ var _renderer_class_renderer__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./renderer/class-renderer */ "../dist/renderer/class-renderer.js");
/* harmony import */ var _renderer_cluster_renderer__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./renderer/cluster-renderer */ "../dist/renderer/cluster-renderer.js");
/* harmony import */ var _text_text__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./text/text */ "../dist/text/text.js");
/* harmony import */ var _label_collision__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./label/collision */ "../dist/label/collision.js");
/* harmony import */ var _label_label__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./label/label */ "../dist/label/label.js");
/* harmony import */ var _grid_grid__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./grid/grid */ "../dist/grid/grid.js");
/* harmony import */ var _grid_tile__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./grid/tile */ "../dist/grid/tile.js");
/* harmony import */ var _raster_raster__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./raster/raster */ "../dist/raster/raster.js");
/* harmony import */ var _analysis_interpolation_kriging__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./analysis/interpolation/kriging */ "../dist/analysis/interpolation/kriging.js");
/* harmony import */ var _analysis_interpolation_idw__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./analysis/interpolation/idw */ "../dist/analysis/interpolation/idw.js");
/* harmony import */ var _analysis_heat_heat__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./analysis/heat/heat */ "../dist/analysis/heat/heat.js");
/* harmony import */ var _animation_animation__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./animation/animation */ "../dist/animation/animation.js");
/* harmony import */ var _animation_point_animation__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./animation/point-animation */ "../dist/animation/point-animation.js");
/* harmony import */ var _animation_line_animation__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./animation/line-animation */ "../dist/animation/line-animation.js");
/* harmony import */ var _map_canvas_canvas__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./map/canvas/canvas */ "../dist/map/canvas/canvas.js");
/* harmony import */ var _map_canvas_viewer__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./map/canvas/viewer */ "../dist/map/canvas/viewer.js");
/* harmony import */ var _map_canvas_animater__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./map/canvas/animater */ "../dist/map/canvas/animater.js");
/* harmony import */ var _map_map__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./map/map */ "../dist/map/map.js");
/* harmony import */ var _map_position_animation__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./map/position-animation */ "../dist/map/position-animation.js");
/* harmony import */ var _map_handler_map_drag__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./map/handler/map-drag */ "../dist/map/handler/map-drag.js");
/* harmony import */ var _map_handler_map_scrollwheelzoom__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./map/handler/map-scrollwheelzoom */ "../dist/map/handler/map-scrollwheelzoom.js");
/* harmony import */ var _map_handler_map_doubleclickzoom__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./map/handler/map-doubleclickzoom */ "../dist/map/handler/map-doubleclickzoom.js");
















































































/***/ }),

/***/ "../dist/label/collision.js":
/*!**********************************!*\
  !*** ../dist/label/collision.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Collision": () => (/* binding */ Collision),
/* harmony export */   "NullCollision": () => (/* binding */ NullCollision),
/* harmony export */   "SimpleCollision": () => (/* binding */ SimpleCollision)
/* harmony export */ });
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../geometry/geometry */ "../dist/geometry/geometry.js");

/**
 * 冲突检测基类
 */
class Collision {
    /**
     * 冲突检测
     * @param {Feature[]} features - 准备绘制标注的要素集合
     * @param {Field} field - 标注字段
     * @param {SimpleTextSymbol} symbol - 标注文本符号
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @return {Feature[]} 返回可绘制标注的要素集合
     */
    test(ctx, features, field, text) { return []; }
}
/**
 * 无检测机制
 */
class NullCollision {
    /**
     * 冲突检测
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Feature[]} features - 准备绘制标注的要素集合
     * @param {Field} field - 标注字段
     * @param {Text} text - 标注文本符号
     * @return {Feature[]} 返回可绘制标注的要素集合
     */
    test(ctx, features, field, text) {
        //没有任何检测逻辑，直接原样返回
        return features;
    }
}
/**
 * 简单碰撞冲突
 * @remarks
 * 类似聚合，距离判断，速度快
 */
class SimpleCollision {
    constructor() {
        /**
         * 检测距离
         * @remarks
         * 单位 pixel
         */
        this.distance = 50;
    }
    /**
     * 冲突检测
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Feature[]} features - 准备绘制标注的要素集合
     * @param {Field} field - 标注字段
     * @param {Text} text - 标注文本符号
     * @return {Feature[]} 返回可绘制标注的要素集合
     */
    test(ctx, features, field, text) {
        //根据距离聚合
        return features.reduce((acc, cur) => {
            const item = acc.find((item) => {
                const distance = cur.geometry.distance(item.geometry, _geometry_geometry__WEBPACK_IMPORTED_MODULE_0__.CoordinateType.Screen);
                return distance <= this.distance;
            });
            if (!item)
                acc.push(cur);
            return acc;
        }, []); // [feature]
    }
}
// /**
//  * 叠盖碰撞冲突
//  * @remarks
//  * 试算标注宽高，并和已通过检测的标注，进行边界的交叉判断，速度慢
//  */
// export class CoverCollision {
//     /**
//      * 已通过检测的标注的边界集合
//      */
//     private _bounds: Bound[] = [];
//     /**
//      * 判断边界碰撞时的buffer
//      * @remarks
//      * buffer越小，标注越密，单位：pixel
//      */
//     public buffer: number = 10;
//     /**
//      * 冲突检测
//      * @param {Feature[]} features - 准备绘制标注的要素集合
//      * @param {Field} field - 标注字段
//      * @param {SimpleTextSymbol} symbol - 标注文本符号
//      * @param {CanvasRenderingContext2D} ctx - 绘图上下文
//      * @param {Projection} projection - 坐标投影转换
//      * @return {Feature[]} 返回可绘制标注的要素集合
//      */
//     test(ctx: CanvasRenderingContext2D, features: Feature[], field: Field, symbol: SimpleTextSymbol, projection: Projection = new WebMercator()): Feature[] {
//         if (!field || !symbol) return [];
//         this._bounds = [];
//         const measure = (feature, symbol) => {
//             const bound = feature.geometry.measure(feature.properties[field.name], ctx, projection, symbol);
//             bound.buffer(this.buffer);
//             if (bound) {
//                 const item = this._bounds.find( item => item.intersect(bound) );
//                 if (!item) {
//                     return bound;
//                 }
//             }
//             return null;
//         };
//         const replace = (feature, symbol, count) => {
//             const symbol2 = new SimpleTextSymbol();
//             symbol2.copy(symbol);
//             symbol2.replacement();
//             const bound = measure(feature, symbol2);
//             if (bound) {
//                 return [bound, symbol2];
//             } else {
//                 if (count == 0) {
//                     return [null, null];
//                 } else {
//                     count -= 1;
//                     return replace(feature, symbol2, count);
//                 }
//             }
//         };
//         //根据标注宽高的量算，得到标注的size，并和已通过检测的标注，进行边界的交叉判断，来决定是否可绘制该要素的标注
//         return features.reduce( (acc, cur) => {
//             cur.text = null;
//             let bound = measure(cur, symbol);
//             if (bound) {
//                 acc.push(cur);
//                 this._bounds.push(bound);
//             } else {
//                 if (symbol.auto) {
//                     const [bound, symbol2] = replace(cur, symbol, 3);    //一共4个方向，再测试剩余3个方向
//                     if (bound) {
//                         cur.text = symbol2;
//                         acc.push(cur);
//                         this._bounds.push(bound);
//                     }
//                 }
//             }
//             return acc;
//         }, []); // [feature]
//     }
// }


/***/ }),

/***/ "../dist/label/label.js":
/*!******************************!*\
  !*** ../dist/label/label.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Label": () => (/* binding */ Label)
/* harmony export */ });
/* harmony import */ var _text_text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../text/text */ "../dist/text/text.js");
/* harmony import */ var _collision__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collision */ "../dist/label/collision.js");


/**
 * 图层标注设置
 */
class Label {
    constructor() {
        /**
         * 标注符号
         * @remarks
         * 参考Renderer和Feature中的相关重要说明
         */
        this.text = new _text_text__WEBPACK_IMPORTED_MODULE_0__.Text();
        /**
         * 标注冲突解决方式
         */
        this.collision = new _collision__WEBPACK_IMPORTED_MODULE_1__.SimpleCollision();
    }
    /**
     * 绘制图层标注
     * @param {Feature[]} features - 准备绘制标注的要素集合
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     */
    draw(ctx, features) {
        //通过冲突检测，得到要绘制的要素集合
        const remain = this.collision.test(ctx, features, this.field, this.text);
        //遍历绘制要素标注
        remain.forEach((feature) => {
            feature.label(ctx, this.field, this.text);
        });
    }
}


/***/ }),

/***/ "../dist/layer/feature-layer.js":
/*!**************************************!*\
  !*** ../dist/layer/feature-layer.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FeatureLayer": () => (/* binding */ FeatureLayer)
/* harmony export */ });
/* harmony import */ var _renderer_simple_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../renderer/simple-renderer */ "../dist/renderer/simple-renderer.js");
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layer */ "../dist/layer/layer.js");


class FeatureLayer extends _layer__WEBPACK_IMPORTED_MODULE_1__.Layer {
    constructor() {
        super(...arguments);
        /**
         * 图层渲染方式
         */
        this._renderer = new _renderer_simple_renderer__WEBPACK_IMPORTED_MODULE_0__.SimpleRenderer();
        /**
         * 是否显示标注
         */
        this.labeled = false;
    }
    /**
     * 获取矢量要素类（数据源）
     */
    get featureClass() {
        return this._featureClass;
    }
    /**
     * 设置矢量要素类（数据源）
     */
    set featureClass(value) {
        this._featureClass = value;
    }
    /**
     * 获取图层标注
     */
    get label() {
        return this._label;
    }
    /**
     * 设置图层标注
     */
    set label(value) {
        this._label = value;
    }
    /**
     * 获取图层渲染方式
     */
    get renderer() {
        return this._renderer;
    }
    /**
     * 设置图层渲染方式
     */
    set renderer(value) {
        this._renderer = value;
    }
    /**
     * 设置图层显示坐标系
     */
    set crs(value) {
        this._crs = value;
        let feature = this._featureClass.first;
        while (feature) {
            feature.geometry.crs = value;
            feature = feature.next;
        }
    }
    transform(origin, zoom) {
        let feature = this._featureClass.first;
        while (feature) {
            feature.geometry.transform(origin, zoom, this._renderer.getSymbol(feature));
            feature = feature.next;
        }
    }
    /**
     * 绘制图层
     * @remarks
     * 遍历图形集合进行绘制
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {number} zoom - 当前缩放级别
     */
    draw(ctx, zoom, redrawBounds) {
        if (!this.visible || this.minZoom >= zoom || this.maxZoom <= zoom)
            return;
        // before draw
        this._renderer.init(redrawBounds);
        let feature = this._featureClass.first;
        // let count = 0;
        const features = [];
        while (feature) {
            if (!redrawBounds || (feature.geometry && feature.geometry.screenBounds && feature.geometry.screenBounds.intersects(redrawBounds))) {
                const symbol = this._renderer.getSymbol(feature);
                if (symbol) {
                    feature.draw(ctx, symbol);
                    features.push(feature);
                }
                // count += 1;
            }
            feature = feature.next;
        }
        // console.log(count);
        if (this.labeled) {
            this.label.draw(ctx, features);
        }
    }
    query(screenXY, zoom, bounds) {
        if (!this.visible || this.minZoom >= zoom || this.maxZoom <= zoom)
            return [];
        let feature = this._featureClass.first;
        const features = [];
        while (feature) {
            if (feature.geometry && feature.geometry.screenBounds && feature.geometry.screenBounds.intersects(bounds)) {
                if (feature.geometry.contains(screenXY)) {
                    features.push(feature);
                }
            }
            feature = feature.next;
        }
        return features;
    }
    on(types, fn, context) {
        let feature = this._featureClass.first;
        while (feature) {
            feature.on(types, fn, context);
            feature = feature.next;
        }
        return this;
    }
}


/***/ }),

/***/ "../dist/layer/graphic-layer.js":
/*!**************************************!*\
  !*** ../dist/layer/graphic-layer.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GraphicLayer": () => (/* binding */ GraphicLayer)
/* harmony export */ });
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layer */ "../dist/layer/layer.js");

class GraphicLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__.Layer {
    constructor() {
        super();
        this._graphics = {}; //Map<string, Graphic>
    }
    set crs(value) {
        this._crs = value;
        let graphic = this._first;
        while (graphic) {
            graphic.geometry.crs = value;
            graphic = graphic.next;
        }
    }
    addGraphic(graphic, last = true) {
        this._graphics[graphic.id] = graphic;
        graphic.geometry.crs = this._crs;
        if (!this._first) {
            this._first = graphic;
            this._last = graphic;
        }
        else {
            if (!last) {
                this._first.prev = graphic;
                graphic.next = this._first;
                this._first = graphic;
            }
            else {
                this._last.next = graphic;
                graphic.prev = this._last;
                this._last = graphic;
            }
        }
    }
    removeGraphic(graphic) {
        if (this._first == graphic) {
            this._first = graphic.next;
        }
        if (this._last == graphic) {
            this._last = graphic.prev;
        }
        if (graphic.prev) {
            graphic.prev.next = graphic.next;
        }
        if (graphic.next) {
            graphic.next.prev = graphic.prev;
        }
        graphic.prev = null;
        graphic.next = null;
        delete this._graphics[graphic.id];
    }
    clearGraphics() {
        this._first = null;
        this._last = null;
        this._graphics = {};
    }
    transform(origin, zoom) {
        let graphic = this._first;
        while (graphic) {
            graphic.transform(origin, zoom);
            graphic = graphic.next;
        }
    }
    draw(ctx, zoom, redrawBounds) {
        if (!this.visible || this.minZoom >= zoom || this.maxZoom <= zoom)
            return;
        let graphic = this._first;
        // let count = 0;
        while (graphic) {
            if (!redrawBounds || (graphic.geometry && graphic.geometry.screenBounds && graphic.geometry.screenBounds.intersects(redrawBounds))) {
                graphic.draw(ctx);
                // count += 1;
            }
            graphic = graphic.next;
        }
        // console.log("count:", count);
    }
    query(screenXY, zoom, bounds) {
        if (!this.visible || this.minZoom >= zoom || this.maxZoom <= zoom)
            return [];
        let graphic = this._first;
        const graphics = [];
        while (graphic) {
            if (graphic.geometry && graphic.geometry.screenBounds && graphic.geometry.screenBounds.intersects(bounds)) {
                if (graphic.geometry.contains(screenXY)) {
                    graphics.push(graphic);
                }
            }
            graphic = graphic.next;
        }
        return graphics;
    }
    on(types, fn, context) {
        let graphic = this._first;
        while (graphic) {
            graphic.on(types, fn, context);
            graphic = graphic.next;
        }
        return this;
    }
}


/***/ }),

/***/ "../dist/layer/layer.js":
/*!******************************!*\
  !*** ../dist/layer/layer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Layer": () => (/* binding */ Layer)
/* harmony export */ });
/* harmony import */ var _base_evented_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/evented-object */ "../dist/base/evented-object.js");

/**
 * 图层基类
 */
class Layer extends _base_evented_object__WEBPACK_IMPORTED_MODULE_0__.EventedObject {
    /**
     * 创建图层
     */
    constructor() {
        super();
        /**
         * 图层可见设置
         */
        this._visible = true;
        /**
         * 图层可见缩放级别
         */
        this._zoom = [1, 20];
        /**
         * 图层可交互设置
         */
        this._interactive = true;
        /**
         * 图层顺序（z-index）
         * @remarks
         * TODO: marker的异步加载，会影响绘制顺序
         */
        this._index = 0; //z-index
    }
    /**
     * 图层是否可见
     */
    get visible() {
        return this._visible;
    }
    /**
     * 图层可见设置
     */
    set visible(value) {
        this._visible = value;
    }
    /**
       * 图层可见缩放级别设置
       */
    get minZoom() {
        return this._zoom[0];
    }
    get maxZoom() {
        return this._zoom[1];
    }
    set minZoom(value) {
        this._zoom[0] = value;
    }
    set maxZoom(value) {
        this._zoom[1] = value;
    }
    set zoom(value) {
        this._zoom = value;
    }
    /**
     * 图层是否可交互
     */
    get interactive() {
        return this._interactive;
    }
    /**
     * 图层可交互设置
     */
    set interactive(value) {
        this._interactive = value;
    }
    /**
     * 图层顺序
     */
    get index() {
        return this._index;
    }
    /**
     * 图层顺序设置
     */
    set index(value) {
        this._index = value;
    }
}


/***/ }),

/***/ "../dist/layer/raster-layer.js":
/*!*************************************!*\
  !*** ../dist/layer/raster-layer.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RasterLayer": () => (/* binding */ RasterLayer)
/* harmony export */ });
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layer */ "../dist/layer/layer.js");

/**
 * 栅格图层
 */
class RasterLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__.Layer {
    constructor() {
        super(...arguments);
        /**
         * 图层可交互设置
         */
        this._interactive = false;
    }
    get raster() {
        return this._raster;
    }
    set raster(value) {
        this._raster = value;
    }
    set crs(value) {
        this._crs = value;
        if (this._raster) {
            this._raster.crs = value;
        }
    }
    transform(origin, zoom) {
        if (this._raster) {
            this._raster.transform(origin, zoom);
        }
    }
    /**
     * 绘制图层
     * @remarks
     * 遍历图形集合进行绘制
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {number} zoom - 当前缩放级别
     */
    draw(ctx, zoom, redrawBounds) {
        if (!this.visible || this.minZoom >= zoom || this.maxZoom <= zoom)
            return;
        if (!this.raster.screenBounds || this.raster.screenBounds.intersects(redrawBounds)) {
            this.raster && this.raster.draw(ctx);
        }
    }
}


/***/ }),

/***/ "../dist/map/canvas/animater.js":
/*!**************************************!*\
  !*** ../dist/map/canvas/animater.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnimaterOptions": () => (/* binding */ AnimaterOptions),
/* harmony export */   "Animater": () => (/* binding */ Animater)
/* harmony export */ });
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ "../dist/map/canvas/canvas.js");

class AnimaterOptions extends _canvas__WEBPACK_IMPORTED_MODULE_0__.CanvasOptions {
    constructor() {
        super(...arguments);
        this.pane = 'animatePane';
    }
}
class Animater extends _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas {
    constructor(map, options) {
        super(map, options);
        this.options = new AnimaterOptions();
        this._animations = [];
    }
    _onZoomEnd() {
        super._onZoomEnd();
        this._animations.forEach(animation => {
            animation.transform(this._origin, this._zoom);
        });
    }
    addAnimation(animation) {
        animation.transform(this._origin, this._zoom);
        this._animations.push(animation);
    }
    // removeAnimation(animation: Animation) {
    //   const index = this._animations.findIndex(item => item.id == animation.id);
    //   this._animations.splice(index, 1);
    //   this._updateGeometry();
    // }
    // clearGraphicLayers() {
    //   this._graphicLayers = [];
    //   this._updateGeometry();
    // }
    _draw() {
        if (this._ctx) {
            let bounds = this._redrawBounds;
            this._ctx.save();
            if (bounds) {
                var size = bounds.getSize();
                this._ctx.beginPath();
                this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
                this._ctx.clip();
            }
            this._drawing = true;
            // console.time("draw");
            this._frame && window.cancelAnimationFrame(this._frame);
            this._start = undefined;
            //this上下文绑定
            this._animate = this._animate.bind(this);
            //动画循环
            this._frame = window.requestAnimationFrame(this._animate);
            // console.timeEnd("draw");
            this._drawing = false;
            this._ctx.restore(); // Restore state before clipping.
        }
    }
    /**
       * 动画循环
       * @param {number} timestamp - 时间戳
       */
    _animate(timestamp) {
        if (this._start === undefined) {
            this._start = timestamp;
        }
        //计算逝去时间，毫秒
        const elapsed = timestamp - this._start;
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._container.width, this._container.height);
        this._ctx.restore();
        //遍历所以动画效果，执行动画
        this._animations.forEach(animation => {
            animation.animate(elapsed, this._ctx);
        });
        //循环，下一帧
        this._frame = window.requestAnimationFrame(this._animate);
    }
}


/***/ }),

/***/ "../dist/map/canvas/canvas.js":
/*!************************************!*\
  !*** ../dist/map/canvas/canvas.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasOptions": () => (/* binding */ CanvasOptions),
/* harmony export */   "Canvas": () => (/* binding */ Canvas)
/* harmony export */ });
/* harmony import */ var _util_dom_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/dom-util */ "../dist/util/dom-util.js");
/* harmony import */ var _util_dom_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/dom-event */ "../dist/util/dom-event.js");
/* harmony import */ var _util_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/browser */ "../dist/util/browser.js");
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/util */ "../dist/util/util.js");
/* harmony import */ var _base_evented_object__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../base/evented-object */ "../dist/base/evented-object.js");
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/screen-bounds */ "../dist/common/screen-bounds.js");
/* harmony import */ var _base_options_object__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../base/options-object */ "../dist/base/options-object.js");







/*
 * @class Canvas
 * @inherits Renderer
 * @aka L.Canvas
 *
 * Allows vector layers to be displayed with [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
 * Inherits `Renderer`.
 *
 * Due to [technical limitations](http://caniuse.com/#search=canvas), Canvas is not
 * available in all web browsers, notably IE8, and overlapping geometries might
 * not display properly in some edge cases.
 *
 * @example
 *
 * Use Canvas by default for all paths in the map:
 *
 * ```js
 * var map = L.map('map', {
 * 	renderer: L.canvas()
 * });
 * ```
 *
 * Use a Canvas renderer with extra padding for specific vector geometries:
 *
 * ```js
 * var map = L.map('map');
 * var myRenderer = L.canvas({ padding: 0.5 });
 * var line = L.polyline( coordinates, { renderer: myRenderer } );
 * var circle = L.circle( center, { renderer: myRenderer } );
 * ```
 */
class CanvasOptions extends _base_options_object__WEBPACK_IMPORTED_MODULE_6__.OptionsObject {
    constructor() {
        super(...arguments);
        this.pane = 'overlayPane';
        // @option padding: Number = 0.1
        // How much to extend the clip area around the map view (relative to its size)
        // e.g. 0.1 would be 10% of map view in each direction
        this.padding = 0.1;
        // @option tolerance: Number = 0
        // How much to extend click tolerance round a path/object on the map
        this.tolerance = 0;
    }
}
class Canvas extends _base_evented_object__WEBPACK_IMPORTED_MODULE_4__.EventedObject {
    constructor(map, options) {
        super();
        this.options = new CanvasOptions();
        this._map = map;
        this.options.assign(options);
    }
    init() {
        const container = this._container = document.createElement('canvas');
        this._ctx = container.getContext('2d');
        if (this._container) {
            this._map.getPane(this.options.pane).appendChild(this._container);
            // this._update();
            // this.on('update', this._updateGeometry, this);
            _util_dom_util__WEBPACK_IMPORTED_MODULE_0__.addClass(this._container, 'leaflet-zoom-animated');
        }
        this._map.on('viewreset', this._reset, this);
        this._map.on('zoom', this._onZoom, this);
        this._map.on('zoomanim', this._onAnimZoom, this);
        this._map.on('moveend', this._updateCanvas, this);
        this._map.on('zoomend', this._onZoomEnd, this);
    }
    destroy() {
        this._map.off('viewreset', this._reset, this);
        this._map.off('zoom', this._onZoom, this);
        this._map.off('zoomanim', this._onAnimZoom, this);
        this._map.off('moveend', this._updateCanvas, this);
        this._map.off('zoomend', this._onZoomEnd, this);
        if (this._redrawRequest) {
            _util_util__WEBPACK_IMPORTED_MODULE_3__.cancelAnimFrame(this._redrawRequest);
        }
        delete this._ctx;
        if (this._container) {
            // this.off('update', this._updateGeometry, this);
            _util_dom_util__WEBPACK_IMPORTED_MODULE_0__.remove(this._container);
            _util_dom_event__WEBPACK_IMPORTED_MODULE_1__.off(this._container);
            delete this._container;
        }
    }
    _onZoomEnd() {
        this._zoom = this._map.getZoom();
        this._origin = this._map.getPixelOrigin();
    }
    _onAnimZoom(ev) {
        this._updateTransform(ev.center, ev.zoom);
    }
    _onZoom() {
        this._updateTransform(this._map.getCenter(), this._map.getZoom());
    }
    _updateTransform(center, zoom) {
        if (!this._container)
            return;
        let scale = this._map.getZoomScale(zoom, this._zoom), position = _util_dom_util__WEBPACK_IMPORTED_MODULE_0__.getPosition(this._container), viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding), currentCenterPoint = this._map.latLngToWorldPixel(this._center || this._map.getCenter(), zoom), destCenterPoint = this._map.latLngToWorldPixel(center, zoom), centerOffset = destCenterPoint.subtract(currentCenterPoint), topLeftOffset = viewHalf.multiplyBy(-scale).add(position).add(viewHalf).subtract(centerOffset);
        if (_util_browser__WEBPACK_IMPORTED_MODULE_2__.any3d) {
            _util_dom_util__WEBPACK_IMPORTED_MODULE_0__.setTransform(this._container, topLeftOffset, scale);
        }
        else {
            _util_dom_util__WEBPACK_IMPORTED_MODULE_0__.setPosition(this._container, topLeftOffset);
        }
    }
    // update geometry
    _updateGeometry() {
        this._redrawBounds = null;
        this._redraw();
    }
    // update center/zoom/bounds/position
    _updateCanvas() {
        if (this._map._animatingZoom && this._bounds) {
            return;
        }
        // Update pixel bounds of renderer container (for positioning/sizing/clipping later)
        // Subclasses are responsible of firing the 'update' event.
        const p = this.options.padding, size = this._map.getSize(), min = this._map.containerPixelToCanvasPixel(size.multiplyBy(-p)).round();
        this._bounds = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_5__.ScreenBounds(min, min.add(size.multiplyBy(1 + p * 2)).round());
        this._center = this._map.getCenter();
        this._zoom = this._map.getZoom();
        this._origin = this._map.getPixelOrigin();
        const b = this._bounds, container = this._container, bsize = b.getSize(), m = _util_browser__WEBPACK_IMPORTED_MODULE_2__.retina ? 2 : 1;
        if (container) {
            _util_dom_util__WEBPACK_IMPORTED_MODULE_0__.setPosition(container, b.min);
            // set canvas size (also clearing it); use double size on retina
            container.width = m * bsize.x;
            container.height = m * bsize.y;
            container.style.width = bsize.x + 'px';
            container.style.height = bsize.y + 'px';
        }
        if (this._ctx) {
            if (_util_browser__WEBPACK_IMPORTED_MODULE_2__.retina) {
                this._ctx.scale(2, 2);
            }
            // translate so we use the same path coordinates after canvas element moves
            this._ctx.translate(-b.min.x, -b.min.y);
        }
        // Tell paths to redraw themselves
        this._updateGeometry();
        this.fire('update');
    }
    _reset() {
        // this._update();
        this._updateTransform(this._center, this._zoom);
        this._updateGeometry();
    }
    _requestRedraw(geometry) {
        if (!this._map) {
            return;
        }
        this._extendRedrawBounds(geometry);
        this._redrawRequest = this._redrawRequest || _util_util__WEBPACK_IMPORTED_MODULE_3__.requestAnimFrame(this._redraw, this);
    }
    _extendRedrawBounds(geometry) {
        if (geometry.screenBounds) {
            // var padding = (layer.options.weight || 0) + 1;
            this._redrawBounds = this._redrawBounds || new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_5__.ScreenBounds();
            // this._redrawBounds.extend(layer.screenBounds.min.subtract(new ScreenXY(padding, padding)));
            // this._redrawBounds.extend(layer.screenBounds.max.add(new ScreenXY(padding, padding)));
            this._redrawBounds.extend(geometry.screenBounds.min);
            this._redrawBounds.extend(geometry.screenBounds.max);
        }
    }
    _redraw() {
        this._redrawRequest = null;
        if (this._redrawBounds) {
            this._redrawBounds.min.floor(false);
            this._redrawBounds.max.ceil(false);
        }
        this._clear(); // clear layers in redraw bounds
        this._draw(); // draw layers
        this._redrawBounds = null;
    }
    _clear() {
        if (this._ctx) {
            const bounds = this._redrawBounds;
            if (bounds) {
                const size = bounds.getSize();
                this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
            }
            else {
                if (this._container) {
                    this._ctx.save();
                    this._ctx.setTransform(1, 0, 0, 1, 0, 0);
                    this._ctx.clearRect(0, 0, this._container.width, this._container.height);
                    this._ctx.restore();
                }
            }
        }
    }
    _draw() {
        if (this._ctx) {
            let bounds = this._redrawBounds;
            this._ctx.save();
            if (bounds) {
                var size = bounds.getSize();
                this._ctx.beginPath();
                this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
                this._ctx.clip();
            }
            this._drawing = true;
            // console.time("draw");
            // console.timeEnd("draw");
            this._drawing = false;
            this._ctx.restore(); // Restore state before clipping.
        }
    }
}


/***/ }),

/***/ "../dist/map/canvas/viewer.js":
/*!************************************!*\
  !*** ../dist/map/canvas/viewer.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewerOptions": () => (/* binding */ ViewerOptions),
/* harmony export */   "Viewer": () => (/* binding */ Viewer)
/* harmony export */ });
/* harmony import */ var _util_dom_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/dom-util */ "../dist/util/dom-util.js");
/* harmony import */ var _util_dom_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/dom-event */ "../dist/util/dom-event.js");
/* harmony import */ var _layer_graphic_layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../layer/graphic-layer */ "../dist/layer/graphic-layer.js");
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./canvas */ "../dist/map/canvas/canvas.js");




class ViewerOptions extends _canvas__WEBPACK_IMPORTED_MODULE_3__.CanvasOptions {
    constructor() {
        super(...arguments);
        this.pane = 'overlayPane';
    }
}
class Viewer extends _canvas__WEBPACK_IMPORTED_MODULE_3__.Canvas {
    constructor(map, options) {
        super(map, options);
        this.options = new ViewerOptions();
        this._graphicLayer = new _layer_graphic_layer__WEBPACK_IMPORTED_MODULE_2__.GraphicLayer();
        this._graphicLayer.crs = map.getCRS();
        this._graphicLayers = [];
        this._featureLayers = [];
        this._rasterLayers = [];
        // this.options.assign(options);
    }
    init() {
        super.init();
        if (this._container) {
            _util_dom_event__WEBPACK_IMPORTED_MODULE_1__.on(this._container, 'mousemove', this._onMouseMove, this);
            _util_dom_event__WEBPACK_IMPORTED_MODULE_1__.on(this._container, 'click dblclick mousedown mouseup contextmenu', this._onClick, this);
            _util_dom_event__WEBPACK_IMPORTED_MODULE_1__.on(this._container, 'mouseout', this._handleMouseOut, this);
        }
    }
    destroy() {
        if (this._container) {
            _util_dom_event__WEBPACK_IMPORTED_MODULE_1__.off(this._container);
        }
        super.destroy();
    }
    _onZoomEnd() {
        super._onZoomEnd();
        this._graphicLayer.transform(this._origin, this._zoom);
        this._graphicLayers.forEach(layer => {
            layer.transform(this._origin, this._zoom);
        });
        this._featureLayers.forEach(layer => {
            layer.transform(this._origin, this._zoom);
        });
        this._rasterLayers.forEach(layer => {
            layer.transform(this._origin, this._zoom);
        });
    }
    addGraphic(graphic) {
        this._graphicLayer.addGraphic(graphic);
        if (this._origin) {
            graphic.transform(this._origin, this._zoom);
            this._requestRedraw(graphic.geometry);
        }
    }
    removeGraphic(graphic) {
        this._graphicLayer.removeGraphic(graphic);
        this._requestRedraw(graphic.geometry);
    }
    clearGraphics() {
        this._graphicLayer.clearGraphics();
        this._updateGeometry();
    }
    addGraphicLayer(graphicLayer) {
        this._graphicLayers.push(graphicLayer);
        if (this._origin) {
            graphicLayer.transform(this._origin, this._zoom);
            this._updateGeometry();
        }
    }
    removeGraphicLayer(graphicLayer) {
        const index = this._graphicLayers.findIndex(layer => layer.id == graphicLayer.id);
        if (index != -1) {
            this._graphicLayers.splice(index, 1);
            this._updateGeometry();
        }
    }
    clearGraphicLayers() {
        if (this._graphicLayers.length > 0) {
            this._graphicLayers = [];
            this._updateGeometry();
        }
    }
    addFeatureLayer(featureLayer) {
        this._featureLayers.push(featureLayer);
        if (this._origin) {
            featureLayer.transform(this._origin, this._zoom);
            this._updateGeometry();
        }
    }
    removeFeatureLayer(featureLayer) {
        const index = this._featureLayers.findIndex(layer => layer.id == featureLayer.id);
        if (index != -1) {
            this._featureLayers.splice(index, 1);
            this._updateGeometry();
        }
    }
    clearFeatureLayers() {
        if (this._featureLayers.length > 0) {
            this._featureLayers = [];
            this._updateGeometry();
        }
    }
    addRasterLayer(rasterLayer) {
        this._rasterLayers.push(rasterLayer);
        if (this._origin) {
            rasterLayer.transform(this._origin, this._zoom);
            this._updateGeometry();
        }
    }
    removeRasterLayer(rasterLayer) {
        const index = this._rasterLayers.findIndex(layer => layer.id == rasterLayer.id);
        if (index != -1) {
            this._rasterLayers.splice(index, 1);
            this._updateGeometry();
        }
    }
    clearRasterLayers() {
        if (this._rasterLayers.length > 0) {
            this._rasterLayers = [];
            this._updateGeometry();
        }
    }
    _draw() {
        if (this._ctx) {
            let bounds = this._redrawBounds;
            this._ctx.save();
            if (bounds) {
                var size = bounds.getSize();
                this._ctx.beginPath();
                this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
                this._ctx.clip();
            }
            this._drawing = true;
            // console.time("draw");
            this._rasterLayers.forEach(layer => {
                layer.draw(this._ctx, this._zoom, bounds || this._bounds);
            });
            this._featureLayers.forEach(layer => {
                layer.draw(this._ctx, this._zoom, bounds || this._bounds);
            });
            this._graphicLayers.forEach(layer => {
                layer.draw(this._ctx, this._zoom, bounds || this._bounds);
            });
            this._graphicLayer.draw(this._ctx, this._zoom, bounds || this._bounds);
            // console.timeEnd("draw");
            this._drawing = false;
            this._ctx.restore(); // Restore state before clipping.
        }
    }
    // Canvas obviously doesn't have mouse events for individual drawn objects,
    // so we emulate that by calculating what's under the mouse on mousemove/click manually
    _onClick(e) {
        let screenXY = this._map.mouseEventToCanvasPixel(e);
        // spatial query graphic && feature
        let elements = this._graphicLayer.query(screenXY, this._zoom, this._bounds);
        this._graphicLayers.forEach(layer => {
            elements = elements.concat(layer.query(screenXY, this._zoom, this._bounds));
        });
        this._featureLayers.forEach(layer => {
            elements = elements.concat(layer.query(screenXY, this._zoom, this._bounds));
        });
        if (elements.length > 0) {
            _util_dom_event__WEBPACK_IMPORTED_MODULE_1__.fakeStop(e);
            this._fireEvent(elements, e);
        }
    }
    _onMouseMove(e) {
        if (!this._map || !this._map.dragging || this._map.dragging.moving() || this._map._animatingZoom) {
            return;
        }
        const point = this._map.mouseEventToCanvasPixel(e);
        this._handleMouseHover(e, point);
    }
    _handleMouseOut(e) {
        if (this._hoveredElement) {
            // if we're leaving, fire mouseout
            _util_dom_util__WEBPACK_IMPORTED_MODULE_0__.removeClass(this._container, 'leaflet-interactive');
            this._fireEvent([this._hoveredElement], e, 'mouseout');
            this._hoveredElement = null;
            this._mouseHoverThrottled = false;
        }
    }
    _handleMouseHover(e, screenXY) {
        if (this._mouseHoverThrottled) {
            return;
        }
        // spatial query graphic && feature
        let elements = this._graphicLayer.query(screenXY, this._zoom, this._bounds);
        this._graphicLayers.forEach(layer => {
            elements = elements.concat(layer.query(screenXY, this._zoom, this._bounds));
        });
        this._featureLayers.forEach(layer => {
            elements = elements.concat(layer.query(screenXY, this._zoom, this._bounds));
        });
        let candidateHoveredElement = elements.length > 0 ? elements[0] : null;
        if (candidateHoveredElement !== this._hoveredElement) {
            this._handleMouseOut(e);
            if (candidateHoveredElement) {
                _util_dom_util__WEBPACK_IMPORTED_MODULE_0__.addClass(this._container, 'leaflet-interactive'); // change cursor
                this._fireEvent([candidateHoveredElement], e, 'mouseover');
                this._hoveredElement = candidateHoveredElement;
            }
        }
        if (this._hoveredElement) {
            this._fireEvent([this._hoveredElement], e);
        }
        // throttle 
        this._mouseHoverThrottled = true;
        setTimeout(() => {
            this._mouseHoverThrottled = false;
        }, 32);
    }
    _fireEvent(layers, e, type) {
        this._map._fireDOMEvent(e, type || e.type, layers);
    }
}


/***/ }),

/***/ "../dist/map/handler/map-doubleclickzoom.js":
/*!**************************************************!*\
  !*** ../dist/map/handler/map-doubleclickzoom.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DoubleClickZoomHandler": () => (/* binding */ DoubleClickZoomHandler)
/* harmony export */ });
/* harmony import */ var _base_handler_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base/handler-object */ "../dist/base/handler-object.js");

/*
 * L.Handler.DoubleClickZoom is used to handle double-click zoom on the map, enabled by default.
 */
class DoubleClickZoomHandler extends _base_handler_object__WEBPACK_IMPORTED_MODULE_0__.HandlerObject {
    addHooks() {
        this._map.on('dblclick', this._onDoubleClick, this);
    }
    removeHooks() {
        this._map.off('dblclick', this._onDoubleClick, this);
    }
    _onDoubleClick(e) {
        var map = this._map, oldZoom = map.getZoom(), delta = map.options.zoomDelta, zoom = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;
        if (map.options.doubleClickZoom === 'center') {
            map.setZoom(zoom);
        }
        else {
            map.setZoomAround(e.containerPixel, zoom);
        }
    }
}


/***/ }),

/***/ "../dist/map/handler/map-drag.js":
/*!***************************************!*\
  !*** ../dist/map/handler/map-drag.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DragHandler": () => (/* binding */ DragHandler)
/* harmony export */ });
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/util */ "../dist/util/util.js");
/* harmony import */ var _util_dom_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/dom-util */ "../dist/util/dom-util.js");
/* harmony import */ var _base_handler_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../base/handler-object */ "../dist/base/handler-object.js");
/* harmony import */ var _base_draggable_object__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../base/draggable-object */ "../dist/base/draggable-object.js");
/* harmony import */ var _common_screen_xy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/screen-xy */ "../dist/common/screen-xy.js");
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/screen-bounds */ "../dist/common/screen-bounds.js");
/* harmony import */ var _common_latlng__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/latlng */ "../dist/common/latlng.js");







class DragHandler extends _base_handler_object__WEBPACK_IMPORTED_MODULE_2__.HandlerObject {
    addHooks() {
        if (!this._draggable) {
            var map = this._map;
            this._draggable = new _base_draggable_object__WEBPACK_IMPORTED_MODULE_3__.DraggableObject(map._mapPane, map._container);
            this._draggable.on({
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd
            }, this);
            this._draggable.on('predrag', this._onPreDragLimit, this);
            if (map.options.worldCopyJump) {
                this._draggable.on('predrag', this._onPreDragWrap, this);
                map.on('zoomend', this._onZoomEnd, this);
                map.whenReady(this._onZoomEnd, this);
            }
        }
        _util_dom_util__WEBPACK_IMPORTED_MODULE_1__.addClass(this._map._container, 'leaflet-grab leaflet-touch-drag');
        this._draggable.enable();
        this._positions = [];
        this._times = [];
    }
    removeHooks() {
        _util_dom_util__WEBPACK_IMPORTED_MODULE_1__.removeClass(this._map._container, 'leaflet-grab');
        _util_dom_util__WEBPACK_IMPORTED_MODULE_1__.removeClass(this._map._container, 'leaflet-touch-drag');
        this._draggable.disable();
    }
    moved() {
        return this._draggable && this._draggable._moved;
    }
    moving() {
        return this._draggable && this._draggable._moving;
    }
    _onDragStart() {
        var map = this._map;
        map._stop();
        if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
            var bounds = this._map.options.maxBounds;
            this._offsetLimit = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_5__.ScreenBounds(this._map.latLngToContainerPixel(bounds.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPixel(bounds.getSouthEast()).multiplyBy(-1)
                .add(this._map.getSize()));
            this._viscosity = Math.min(1.0, Math.max(0.0, this._map.options.maxBoundsViscosity));
        }
        else {
            this._offsetLimit = null;
        }
        map
            .fire('movestart')
            .fire('dragstart');
        if (map.options.inertia) {
            this._positions = [];
            this._times = [];
        }
    }
    _onDrag(e) {
        if (this._map.options.inertia) {
            var time = this._lastTime = +new Date(), pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;
            this._positions.push(pos);
            this._times.push(time);
            this._prunePositions(time);
        }
        this._map
            .fire('move', e)
            .fire('drag', e);
    }
    _prunePositions(time) {
        while (this._positions.length > 1 && time - this._times[0] > 50) {
            this._positions.shift();
            this._times.shift();
        }
    }
    _onZoomEnd() {
        var pxCenter = this._map.getSize().divideBy(2), pxWorldCenter = this._map.latLngToCanvasPixel(new _common_latlng__WEBPACK_IMPORTED_MODULE_6__.LatLng(0, 0));
        this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
        this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
    }
    _viscousLimit(value, threshold) {
        return value - (value - threshold) * this._viscosity;
    }
    _onPreDragLimit() {
        if (!this._viscosity || !this._offsetLimit) {
            return;
        }
        var offset = this._draggable._newPos.subtract(this._draggable._startPos);
        var limit = this._offsetLimit;
        if (offset.x < limit.min.x) {
            offset.x = this._viscousLimit(offset.x, limit.min.x);
        }
        if (offset.y < limit.min.y) {
            offset.y = this._viscousLimit(offset.y, limit.min.y);
        }
        if (offset.x > limit.max.x) {
            offset.x = this._viscousLimit(offset.x, limit.max.x);
        }
        if (offset.y > limit.max.y) {
            offset.y = this._viscousLimit(offset.y, limit.max.y);
        }
        this._draggable._newPos = this._draggable._startPos.add(offset);
    }
    _onPreDragWrap() {
        // TODO refactor to be able to adjust map pane position after zoom
        var worldWidth = this._worldWidth, halfWidth = Math.round(worldWidth / 2), dx = this._initialWorldOffset, x = this._draggable._newPos.x, newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx, newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx, newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;
        this._draggable._absPos = this._draggable._newPos.clone();
        this._draggable._newPos.x = newX;
    }
    _onDragEnd(e) {
        var map = this._map, options = map.options, noInertia = !options.inertia || this._times.length < 2;
        map.fire('dragend', e);
        if (noInertia) {
            map.fire('moveend');
        }
        else {
            this._prunePositions(+new Date());
            var direction = this._lastPos.subtract(this._positions[0]), duration = (this._lastTime - this._times[0]) / 1000, ease = options.easeLinearity, speedVector = direction.multiplyBy(ease / duration), speed = speedVector.distanceTo(new _common_screen_xy__WEBPACK_IMPORTED_MODULE_4__.ScreenXY(0, 0)), limitedSpeed = Math.min(options.inertiaMaxSpeed, speed), limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed), decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease), offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();
            if (!offset.x && !offset.y) {
                map.fire('moveend');
            }
            else {
                offset = map._limitOffset(offset, map.options.maxBounds);
                _util_util__WEBPACK_IMPORTED_MODULE_0__.requestAnimFrame(function () {
                    map.panBy(offset, {
                        duration: decelerationDuration,
                        easeLinearity: ease,
                        noMoveStart: true,
                        animate: true
                    });
                });
            }
        }
    }
}
// @section Handlers
// @property dragging: Handler
// Map dragging handler (by both mouse and touch).
// Map.addInitHook('addHandler', 'dragging', Drag);


/***/ }),

/***/ "../dist/map/handler/map-scrollwheelzoom.js":
/*!**************************************************!*\
  !*** ../dist/map/handler/map-scrollwheelzoom.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrollWheelZoomHandler": () => (/* binding */ ScrollWheelZoomHandler)
/* harmony export */ });
/* harmony import */ var _util_dom_event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/dom-event */ "../dist/util/dom-event.js");
/* harmony import */ var _base_handler_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../base/handler-object */ "../dist/base/handler-object.js");


/*
 * L.Handler.ScrollWheelZoom is used by L.Map to enable mouse scroll wheel zoom on the map.
 */
// @namespace Map
// @section Interaction Options
// Map.mergeOptions({
// 	// @section Mouse wheel options
// 	// @option scrollWheelZoom: Boolean|String = true
// 	// Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
// 	// it will zoom to the center of the view regardless of where the mouse was.
// 	scrollWheelZoom: true,
// 	// @option wheelDebounceTime: Number = 40
// 	// Limits the rate at which a wheel can fire (in milliseconds). By default
// 	// user can't zoom via wheel more often than once per 40 ms.
// 	wheelDebounceTime: 40,
// 	// @option wheelPxPerZoomLevel: Number = 60
// 	// How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
// 	// mean a change of one full zoom level. Smaller values will make wheel-zooming
// 	// faster (and vice versa).
// 	wheelPxPerZoomLevel: 60
// });
class ScrollWheelZoomHandler extends _base_handler_object__WEBPACK_IMPORTED_MODULE_1__.HandlerObject {
    constructor() {
        super(...arguments);
        this._delta = 0;
    }
    addHooks() {
        _util_dom_event__WEBPACK_IMPORTED_MODULE_0__.on(this._map._container, 'wheel', this._onWheelScroll, this);
        this._delta = 0;
    }
    removeHooks() {
        _util_dom_event__WEBPACK_IMPORTED_MODULE_0__.off(this._map._container, 'wheel', this._onWheelScroll, this);
    }
    _onWheelScroll(e) {
        var delta = _util_dom_event__WEBPACK_IMPORTED_MODULE_0__.getWheelDelta(e);
        var debounce = this._map.options.wheelDebounceTime;
        this._delta += delta;
        this._lastMousePos = this._map.mouseEventToContainerPixel(e);
        if (!this._startTime) {
            this._startTime = +new Date();
        }
        var left = Math.max(debounce - (+new Date() - this._startTime), 0);
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            this._performZoom();
        }, left);
        _util_dom_event__WEBPACK_IMPORTED_MODULE_0__.stop(e);
    }
    _performZoom() {
        var map = this._map, zoom = map.getZoom(), snap = this._map.options.zoomSnap || 0;
        map._stop(); // stop panning and fly animations if any
        // map the delta with a sigmoid function to -4..4 range leaning on -1..1
        var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2, d4 = snap ? Math.ceil(d3 / snap) * snap : d3, delta = map._limitZoom(zoom + (this._delta > 0 ? d4 : -d4)) - zoom;
        this._delta = 0;
        this._startTime = null;
        if (!delta) {
            return;
        }
        if (map.options.scrollWheelZoom === 'center') {
            map.setZoom(zoom + delta);
        }
        else {
            map.setZoomAround(this._lastMousePos, zoom + delta);
        }
    }
}
// @section Handlers
// @property scrollWheelZoom: Handler
// Scroll wheel zoom handler.
// Map.addInitHook('addHandler', 'scrollWheelZoom', ScrollWheelZoom);


/***/ }),

/***/ "../dist/map/map.js":
/*!**************************!*\
  !*** ../dist/map/map.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapOptions": () => (/* binding */ MapOptions),
/* harmony export */   "Map": () => (/* binding */ Map)
/* harmony export */ });
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ "../dist/util/util.js");
/* harmony import */ var _util_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/browser */ "../dist/util/browser.js");
/* harmony import */ var _util_dom_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/dom-util */ "../dist/util/dom-util.js");
/* harmony import */ var _util_dom_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/dom-event */ "../dist/util/dom-event.js");
/* harmony import */ var _base_evented_object__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base/evented-object */ "../dist/base/evented-object.js");
/* harmony import */ var _common_latlng__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/latlng */ "../dist/common/latlng.js");
/* harmony import */ var _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/latlng-bounds */ "../dist/common/latlng-bounds.js");
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/screen-bounds */ "../dist/common/screen-bounds.js");
/* harmony import */ var _common_screen_xy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/screen-xy */ "../dist/common/screen-xy.js");
/* harmony import */ var _crs_crs_3857__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../crs/crs-3857 */ "../dist/crs/crs-3857.js");
/* harmony import */ var _position_animation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./position-animation */ "../dist/map/position-animation.js");
/* harmony import */ var _handler_map_drag__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./handler/map-drag */ "../dist/map/handler/map-drag.js");
/* harmony import */ var _handler_map_scrollwheelzoom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./handler/map-scrollwheelzoom */ "../dist/map/handler/map-scrollwheelzoom.js");
/* harmony import */ var _handler_map_doubleclickzoom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./handler/map-doubleclickzoom */ "../dist/map/handler/map-doubleclickzoom.js");
/* harmony import */ var _base_options_object__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../base/options-object */ "../dist/base/options-object.js");
/* harmony import */ var _canvas_viewer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./canvas/viewer */ "../dist/map/canvas/viewer.js");
/* harmony import */ var _canvas_animater__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./canvas/animater */ "../dist/map/canvas/animater.js");

















// import { Layer } from '../layer/layer';
/*
 * @class Map
 * @aka L.Map
 * @inherits Evented
 *
 * The central class of the API — it is used to create a map on a page and manipulate it.
 *
 * @example
 *
 * ```js
 * // initialize the map on the "map" div with a given center and zoom
 * var map = L.map('map', {
 * 	center: [51.505, -0.09],
 * 	zoom: 13
 * });
 * ```
 *
 */
class MapOptions extends _base_options_object__WEBPACK_IMPORTED_MODULE_14__.OptionsObject {
    constructor() {
        // @section Map State Options
        // @option crs: CRS = L.CRS.EPSG3857
        // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
        // sure what it means.
        // crs: Earth = new EPSG3857();
        super(...arguments);
        // @option center: LatLng = undefined
        // Initial geographic center of the map
        this.center = undefined;
        // @option zoom: Number = undefined
        // Initial map zoom level
        this.zoom = undefined;
        // @option minZoom: Number = *
        // Minimum zoom level of the map.
        // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
        // the lowest of their `minZoom` options will be used instead.
        this.minZoom = 1;
        // @option maxZoom: Number = *
        // Maximum zoom level of the map.
        // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
        // the highest of their `maxZoom` options will be used instead.
        this.maxZoom = 20;
        // @section Animation Options
        // @option zoomAnimation: Boolean = true
        // Whether the map zoom animation is enabled. By default it's enabled
        // in all browsers that support CSS3 Transitions except Android.
        this.zoomAnimation = true;
        // @option zoomAnimationThreshold: Number = 4
        // Won't animate zoom if the zoom difference exceeds this value.
        this.zoomAnimationThreshold = 4;
        // @option fadeAnimation: Boolean = true
        // Whether the tile fade animation is enabled. By default it's enabled
        // in all browsers that support CSS3 Transitions except Android.
        this.fadeAnimation = true;
        // @option markerZoomAnimation: Boolean = true
        // Whether markers animate their zoom with the zoom animation, if disabled
        // they will disappear for the length of the animation. By default it's
        // enabled in all browsers that support CSS3 Transitions except Android.
        this.markerZoomAnimation = true;
        // @option transform3DLimit: Number = 2^23
        // Defines the maximum size of a CSS translation transform. The default
        // value should not be changed unless a web browser positions layers in
        // the wrong place after doing a large `panBy`.
        this.transform3DLimit = 8388608; // Precision limit of a 32-bit float
        // @section Interaction Options
        // @option zoomSnap: Number = 1
        // Forces the map's zoom level to always be a multiple of this, particularly
        // right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
        // By default, the zoom level snaps to the nearest integer; lower values
        // (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
        // means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
        this.zoomSnap = 1;
        // @option zoomDelta: Number = 1
        // Controls how much the map's zoom level will change after a
        // [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
        // or `-` on the keyboard, or using the [zoom controls](#control-zoom).
        // Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
        this.zoomDelta = 1;
        // @option trackResize: Boolean = true
        // Whether the map automatically handles browser window resize to update itself.
        this.trackResize = true;
        // @section Mouse wheel options
        // @option scrollWheelZoom: Boolean|String = true
        // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
        // it will zoom to the center of the view regardless of where the mouse was.
        this.scrollWheelZoom = true;
        // @option wheelDebounceTime: Number = 40
        // Limits the rate at which a wheel can fire (in milliseconds). By default
        // user can't zoom via wheel more often than once per 40 ms.
        this.wheelDebounceTime = 40;
        // @option wheelPxPerZoomLevel: Number = 60
        // How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
        // mean a change of one full zoom level. Smaller values will make wheel-zooming
        // faster (and vice versa).
        this.wheelPxPerZoomLevel = 60;
        // @option dragging: Boolean = true
        // Whether the map be draggable with mouse/touch or not.
        this.dragging = true;
        // @section Panning Inertia Options
        // @option inertia: Boolean = *
        // If enabled, panning of the map will have an inertia effect where
        // the map builds momentum while dragging and continues moving in
        // the same direction for some time. Feels especially nice on touch
        // devices. Enabled by default unless running on old Android devices.
        this.inertia = !_util_browser__WEBPACK_IMPORTED_MODULE_1__.android23;
        // @option inertiaDeceleration: Number = 3000
        // The rate with which the inertial movement slows down, in pixels/second².
        this.inertiaDeceleration = 3400; // px/s^2
        // @option inertiaMaxSpeed: Number = Infinity
        // Max speed of the inertial movement, in pixels/second.
        this.inertiaMaxSpeed = Infinity; // px/s
        // @option easeLinearity: Number = 0.2
        this.easeLinearity = 0.2;
        // TODO refactor, move to CRS
        // @option worldCopyJump: Boolean = false
        // With this option enabled, the map tracks when you pan to another "copy"
        // of the world and seamlessly jumps to the original one so that all overlays
        // like markers and vector layers are still visible.
        this.worldCopyJump = false;
        // @option maxBoundsViscosity: Number = 0.0
        // If `maxBounds` is set, this option will control how solid the bounds
        // are when dragging the map around. The default value of `0.0` allows the
        // user to drag outside the bounds at normal speed, higher values will
        // slow down map dragging outside bounds, and `1.0` makes the bounds fully
        // solid, preventing the user from dragging outside the bounds.
        this.maxBounds = undefined;
        this.maxBoundsViscosity = 0.0;
        // @option doubleClickZoom: Boolean|String = true
        // Whether the map can be zoomed in by double clicking on it and
        // zoomed out by double clicking while holding shift. If passed
        // `'center'`, double-click zoom will zoom to the center of the
        //  view regardless of where the mouse was.
        this.doubleClickZoom = true;
    }
}
class Map extends _base_evented_object__WEBPACK_IMPORTED_MODULE_4__.EventedObject {
    constructor(id, options) {
        super();
        this.options = new MapOptions();
        this._loaded = false;
        // container size changed
        this._sizeChanged = true;
        this._panes = {};
        this._paneRenderers = {};
        // event target
        this._targets = {};
        this._layers = {};
        this._fadeAnimated = true;
        this._zoomAnimated = true;
        // handlers
        this._handlers = [];
        this._mouseEvents = ['click', 'dblclick', 'mouseover', 'mouseout', 'contextmenu'];
        this.options.assign(options);
        // Make sure to assign internal flags at the beginning,
        // to avoid inconsistent state in some edge cases.
        this._layers = {};
        this._initContainer(id);
        this._initLayout();
        // hack for https://github.com/Leaflet/Leaflet/issues/1980
        // this._onResize = Util.bind(this._onResize, this);
        this._initEvents();
        if (this.options.zoom !== undefined) {
            this._zoom = this._limitZoom(this.options.zoom);
        }
        this._crs = new _crs_crs_3857__WEBPACK_IMPORTED_MODULE_9__.EPSG3857();
        // this._canvas = new Canvas(this);
        // this._canvas.init();
        this._animater = new _canvas_animater__WEBPACK_IMPORTED_MODULE_16__.Animater(this);
        this._animater.init();
        this._viewer = new _canvas_viewer__WEBPACK_IMPORTED_MODULE_15__.Viewer(this);
        this._viewer.init();
        if (this.options.center && this.options.zoom !== undefined) {
            this.setView(this.options.center, this.options.zoom, { reset: true });
        }
        // don't animate on browsers without hardware-accelerated transitions or old Android/Opera
        this._zoomAnimated = _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.TRANSITION && _util_browser__WEBPACK_IMPORTED_MODULE_1__.any3d && !_util_browser__WEBPACK_IMPORTED_MODULE_1__.mobileOpera &&
            this.options.zoomAnimation;
        // zoom transitions run with the same duration for all layers, so if one of transitionend events
        // happens after starting zoom animation (propagating to the map pane), we know that it ended globally
        if (this._zoomAnimated) {
            this._createAnimProxy();
            _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.on(this._proxy, _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.TRANSITION_END, this._catchTransitionEnd, this);
        }
        if (this.options.dragging)
            this.addHandler('dragging', new _handler_map_drag__WEBPACK_IMPORTED_MODULE_11__.DragHandler(this));
        if (this.options.scrollWheelZoom)
            this.addHandler('scrollWheelZoom', new _handler_map_scrollwheelzoom__WEBPACK_IMPORTED_MODULE_12__.ScrollWheelZoomHandler(this));
        if (this.options.doubleClickZoom)
            this.addHandler('doubleClickZoom', new _handler_map_doubleclickzoom__WEBPACK_IMPORTED_MODULE_13__.DoubleClickZoomHandler(this));
    }
    get loaded() {
        return this._loaded;
    }
    // @section Methods for modifying map state
    // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
    // Sets the view of the map (geographical center and zoom) with the given
    // animation options.
    setView(center, zoom, options) {
        zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
        center = this._limitCenter(center, zoom, this.options.maxBounds);
        options = options || {};
        this._stop();
        if (this._loaded && !options.reset && options !== true) {
            if (options.animate !== undefined) {
                options.zoom = Object.assign({ animate: options.animate }, options.zoom);
                options.pan = Object.assign({ animate: options.animate, duration: options.duration }, options.pan);
            }
            // try animating pan or zoom
            const moved = (this._zoom !== zoom) ?
                this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
                this._tryAnimatedPan(center, options.pan);
            if (moved) {
                // prevent resize handler call, the view will refresh after animation anyway
                clearTimeout(this._sizeTimer);
                return this;
            }
        }
        // animation didn't start, just reset the map view
        this._resetView(center, zoom);
        return this;
    }
    // @method setZoom(zoom: Number, options?: Zoom/pan options): this
    // Sets the zoom of the map.
    setZoom(zoom, options) {
        if (!this._loaded) {
            this._zoom = zoom;
            return this;
        }
        return this.setView(this.getCenter(), zoom, { zoom: options });
    }
    // @method zoomIn(delta?: Number, options?: Zoom options): this
    // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
    zoomIn(delta, options) {
        delta = delta || (_util_browser__WEBPACK_IMPORTED_MODULE_1__.any3d ? this.options.zoomDelta : 1);
        return this.setZoom(this._zoom + delta, options);
    }
    // @method zoomOut(delta?: Number, options?: Zoom options): this
    // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
    zoomOut(delta, options) {
        delta = delta || (_util_browser__WEBPACK_IMPORTED_MODULE_1__.any3d ? this.options.zoomDelta : 1);
        return this.setZoom(this._zoom - delta, options);
    }
    // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
    // Zooms the map while keeping a specified geographical point on the map
    // stationary (e.g. used internally for scroll zoom and double-click zoom).
    // @alternative
    // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
    // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
    setZoomAround(specified, zoom, options) {
        var scale = this.getZoomScale(zoom), viewHalf = this.getSize().divideBy(2), containerPoint = specified instanceof _common_screen_xy__WEBPACK_IMPORTED_MODULE_8__.ScreenXY ? specified : this.latLngToContainerPixel(specified), centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale), newCenter = this.containerPixelToLatLng(viewHalf.add(centerOffset));
        return this.setView(newCenter, zoom, { zoom: options });
    }
    _getLatLngBoundsCenterZoom(bounds, options) {
        options = options || {};
        // bounds = bounds.getBounds ? bounds.getBounds() : bounds;
        // pixel
        const paddingTL = new _common_screen_xy__WEBPACK_IMPORTED_MODULE_8__.ScreenXY(options.padding || 0, options.padding || 0), paddingBR = new _common_screen_xy__WEBPACK_IMPORTED_MODULE_8__.ScreenXY(options.padding || 0, options.padding || 0);
        let zoom = this.getLatLngBoundsZoom(bounds, false, paddingTL.add(paddingBR));
        zoom = (typeof options.maxZoom === 'number') ? Math.min(options.maxZoom, zoom) : zoom;
        if (zoom === Infinity) {
            return {
                center: bounds.getCenter(),
                zoom: zoom
            };
        }
        const paddingOffset = paddingBR.subtract(paddingTL).divideBy(2), swPoint = this.latLngToWorldPixel(bounds.getSouthWest(), zoom), nePoint = this.latLngToWorldPixel(bounds.getNorthEast(), zoom), center = this.worldPixelToLatLng(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom);
        return {
            center: center,
            zoom: zoom
        };
    }
    // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
    // Sets a map view that contains the given geographical bounds with the
    // maximum zoom level possible.
    fitBounds(bounds, options) {
        const target = this._getLatLngBoundsCenterZoom(bounds, options);
        return this.setView(target.center, target.zoom, options);
    }
    // @method fitWorld(options?: fitBounds options): this
    // Sets a map view that mostly contains the whole world with the maximum
    // zoom level possible.
    fitWorld(options) {
        return this.fitBounds(new _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_6__.LatLngBounds(new _common_latlng__WEBPACK_IMPORTED_MODULE_5__.LatLng(-90, -180), new _common_latlng__WEBPACK_IMPORTED_MODULE_5__.LatLng(90, 180)), options);
    }
    // @method panTo(latlng: LatLng, options?: Pan options): this
    // Pans the map to a given center.
    panTo(center, options) {
        return this.setView(center, this._zoom, { pan: options });
    }
    // @method panBy(offset: Point, options?: Pan options): this
    // Pans the map by a given number of pixels (animated).
    panBy(offset, options) {
        offset = offset.round();
        options = options || {};
        if (!offset.x && !offset.y) {
            return this.fire('moveend');
        }
        // If we pan too far, Chrome gets issues with tiles
        // and makes them disappear or appear in the wrong place (slightly offset) #2602
        if (options.animate !== true && !this.getSize().contains(offset)) {
            this._resetView(this.worldPixelToLatLng(this.latLngToWorldPixel(this.getCenter()).add(offset)), this.getZoom());
            return this;
        }
        if (!this._panAnim) {
            this._panAnim = new _position_animation__WEBPACK_IMPORTED_MODULE_10__.PosAnimation(this._mapPane);
            this._panAnim.on({
                'step': this._onPanTransitionStep,
                'end': this._onPanTransitionEnd
            }, this);
        }
        // don't fire movestart if animating inertia
        if (!options.noMoveStart) {
            this.fire('movestart');
        }
        // animate pan unless animate: false specified
        if (options.animate !== false) {
            _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.addClass(this._mapPane, 'leaflet-pan-anim');
            const newPos = this._getMapPanePos().subtract(offset).round();
            this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
        }
        else {
            this._rawPanBy(offset);
            this.fire('move').fire('moveend');
        }
        return this;
    }
    // @method setMinZoom(zoom: Number): this
    // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
    setMinZoom(zoom) {
        var oldZoom = this.options.minZoom;
        this.options.minZoom = zoom;
        if (this._loaded && oldZoom !== zoom) {
            this.fire('zoomlevelschange');
            if (this.getZoom() < this.options.minZoom) {
                return this.setZoom(zoom);
            }
        }
        return this;
    }
    // @method setMaxZoom(zoom: Number): this
    // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
    setMaxZoom(zoom) {
        var oldZoom = this.options.maxZoom;
        this.options.maxZoom = zoom;
        if (this._loaded && oldZoom !== zoom) {
            this.fire('zoomlevelschange');
            if (this.getZoom() > this.options.maxZoom) {
                return this.setZoom(zoom);
            }
        }
        return this;
    }
    // @method invalidateSize(options: Zoom/pan options): this
    // Checks if the map container size changed and updates the map if so —
    // call it after you've changed the map size dynamically, also animating
    // pan by default. If `options.pan` is `false`, panning will not occur.
    // If `options.debounceMoveend` is `true`, it will delay `moveend` event so
    // that it doesn't happen often even if the method is called many
    // times in a row.
    // @alternative
    // @method invalidateSize(animate: Boolean): this
    // Checks if the map container size changed and updates the map if so —
    // call it after you've changed the map size dynamically, also animating
    // pan by default.
    invalidateSize(options) {
        if (!this._loaded) {
            return this;
        }
        options = Object.assign({
            animate: false,
            pan: true
        }, options === true ? { animate: true } : options);
        const oldSize = this.getSize();
        this._sizeChanged = true;
        this._lastCenter = null;
        const newSize = this.getSize(), oldCenter = oldSize.divideBy(2).round(), newCenter = newSize.divideBy(2).round(), offset = oldCenter.subtract(newCenter);
        if (!offset.x && !offset.y) {
            return this;
        }
        if (options.animate && options.pan) {
            this.panBy(offset);
        }
        else {
            if (options.pan) {
                this._rawPanBy(offset);
            }
            this.fire('move');
            if (options.debounceMoveend) {
                clearTimeout(this._sizeTimer);
                this._sizeTimer = setTimeout(() => {
                    this.fire('moveend');
                }, 200);
            }
            else {
                this.fire('moveend');
            }
        }
        // @section Map state change events
        // @event resize: ResizeEvent
        // Fired when the map is resized.
        return this.fire('resize', {
            oldSize: oldSize,
            newSize: newSize
        });
    }
    // @section Methods for modifying map state
    // @method stop(): this
    // Stops the currently running `panTo` or `flyTo` animation, if any.
    stop() {
        this.setZoom(this._limitZoom(this._zoom));
        if (!this.options.zoomSnap) {
            this.fire('viewreset');
        }
        return this._stop();
    }
    // @method remove(): this
    // Destroys the map and clears all related event listeners.
    remove() {
        this._initEvents(true);
        this._stop();
        // this._canvas.destroy();
        this._viewer.destroy();
        this._animater.destroy();
        _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.remove(this._mapPane);
        if (this._resizeRequest) {
            _util_util__WEBPACK_IMPORTED_MODULE_0__.cancelAnimFrame(this._resizeRequest);
            this._resizeRequest = null;
        }
        this.clearHandlers();
        if (this._loaded) {
            // @section Map state change events
            // @event unload: Event
            // Fired when the map is destroyed with [remove](#map-remove) method.
            this.fire('unload');
        }
        for (let i in this._layers) {
            this._layers[i].remove();
        }
        for (let i in this._panes) {
            _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.remove(this._panes[i]);
        }
        this._layers = {};
        this._panes = {};
        delete this._mapPane;
        // delete this._canvas;
        delete this._viewer;
        delete this._animater;
        return this;
    }
    // @section Other Methods
    // @method createPane(name: String, container?: HTMLElement): HTMLElement
    // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
    // then returns it. The pane is created as a child of `container`, or
    // as a child of the main map pane if not set.
    createPane(name, container) {
        const className = 'leaflet-pane' + (name ? ' leaflet-' + name.replace('Pane', '') + '-pane' : ''), pane = _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.create('div', className, container || this._mapPane);
        if (name) {
            this._panes[name] = pane;
        }
        return pane;
    }
    // @section Methods for Getting Map State
    // @method getCenter(): LatLng
    // Returns the geographical center of the map view
    getCenter() {
        if (this._lastCenter && !this._moved()) {
            return this._lastCenter;
        }
        return this.canvasPixelToLatLng(this._getCenterCanvasPixel());
    }
    // @method getZoom(): Number
    // Returns the current zoom level of the map view
    getZoom() {
        return this._zoom;
    }
    // @method getBounds(): LatLngBounds
    // Returns the geographical bounds visible in the current map view
    getLatLngBounds() {
        const bounds = this.getPixelBounds(), sw = this.worldPixelToLatLng(bounds.getBottomLeft()), ne = this.worldPixelToLatLng(bounds.getTopRight());
        return new _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_6__.LatLngBounds(sw, ne);
    }
    // @method getMinZoom(): Number
    // Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
    getMinZoom() {
        return this.options.minZoom === undefined ? 1 : this.options.minZoom;
    }
    // @method getMaxZoom(): Number
    // Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
    getMaxZoom() {
        return this.options.maxZoom === undefined ? 20 : this.options.maxZoom;
    }
    // @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
    // Returns the maximum zoom level on which the given bounds fit to the map
    // view in its entirety. If `inside` (optional) is set to `true`, the method
    // instead returns the minimum zoom level on which the map view fits into
    // the given bounds in its entirety.
    getLatLngBoundsZoom(bounds, inside = false, padding = new _common_screen_xy__WEBPACK_IMPORTED_MODULE_8__.ScreenXY()) {
        let zoom = this.getZoom() || 0, min = this.getMinZoom(), max = this.getMaxZoom(), nw = bounds.getNorthWest(), se = bounds.getSouthEast(), size = this.getSize().subtract(padding), boundsSize = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_7__.ScreenBounds(this.latLngToWorldPixel(se, zoom), this.latLngToWorldPixel(nw, zoom)).getSize(), snap = _util_browser__WEBPACK_IMPORTED_MODULE_1__.any3d ? this.options.zoomSnap : 1, scalex = size.x / boundsSize.x, scaley = size.y / boundsSize.y, scale = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);
        zoom = this.getScaleZoom(scale, zoom);
        if (snap) {
            zoom = Math.round(zoom / (snap / 100)) * (snap / 100); // don't jump if within 1% of a snap level
            zoom = inside ? Math.ceil(zoom / snap) * snap : Math.floor(zoom / snap) * snap;
        }
        return Math.max(min, Math.min(max, zoom));
    }
    // @method getSize(): Point
    // Returns the current size of the map container (in pixels).
    getSize() {
        if (!this._size || this._sizeChanged) {
            this._size = new _common_screen_xy__WEBPACK_IMPORTED_MODULE_8__.ScreenXY(this._container.clientWidth || 0, this._container.clientHeight || 0);
            this._sizeChanged = false;
        }
        return this._size.clone();
    }
    // @method getPixelBounds(): Bounds
    // Returns the bounds of the current map view in projected pixel
    // coordinates (sometimes useful in layer and overlay implementations).
    getPixelBounds(center, zoom) {
        const topLeftPoint = this._getTopLeftPixel(center, zoom);
        return new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_7__.ScreenBounds(topLeftPoint, topLeftPoint.add(this.getSize()));
    }
    // TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
    // the map pane? "left point of the map layer" can be confusing, specially
    // since there can be negative offsets.
    // @method getPixelOrigin(): Point
    // Returns the projected pixel coordinates of the top left point of
    // the map layer (useful in custom layer and overlay implementations).
    getPixelOrigin() {
        return this._pixelOrigin;
    }
    // @method getPixelWorldBounds(zoom?: Number): Bounds
    // Returns the world's bounds in pixel coordinates for zoom level `zoom`.
    // If `zoom` is omitted, the map's current zoom level is used.
    getPixelWorldBounds(zoom) {
        return this._crs.getScreenBounds(zoom === undefined ? this.getZoom() : zoom);
    }
    // @section Other Methods
    // @method getPane(pane: String|HTMLElement): HTMLElement
    // Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
    getPane(pane) {
        return typeof pane === 'string' ? this._panes[pane] : pane;
    }
    // @method getPanes(): Object
    // Returns a plain object containing the names of all [panes](#map-pane) as keys and
    // the panes as values.
    getPanes() {
        return this._panes;
    }
    // @method getContainer: HTMLElement
    // Returns the HTML element that contains the map.
    getContainer() {
        return this._container;
    }
    // @section Conversion Methods
    // @method getZoomScale(toZoom: Number, fromZoom: Number): Number
    // Returns the scale factor to be applied to a map transition from zoom level
    // `fromZoom` to `toZoom`. Used internally to help with zoom animations.
    getZoomScale(toZoom, fromZoom) {
        // TODO replace with universal implementation after refactoring projections
        fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
        return this._crs.scale(toZoom) / this._crs.scale(fromZoom);
    }
    // @method getScaleZoom(scale: Number, fromZoom: Number): Number
    // Returns the zoom level that the map would end up at, if it is at `fromZoom`
    // level and everything is scaled by a factor of `scale`. Inverse of
    // [`getZoomScale`](#map-getZoomScale).
    getScaleZoom(scale, fromZoom) {
        fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
        const zoom = this._crs.zoom(scale * this._crs.scale(fromZoom));
        return isNaN(zoom) ? Infinity : zoom;
    }
    // @method project(latlng: LatLng, zoom: Number): Point
    // Projects a geographical coordinate `LatLng` according to the projection
    // of the map's CRS, then scales it according to `zoom` and the CRS's
    // `Transformation`. The result is pixel coordinate relative to
    // the CRS origin.
    latLngToWorldPixel(latlng, zoom) {
        zoom = zoom === undefined ? this._zoom : zoom;
        return this._crs.latLngToScreenXY(latlng, zoom);
    }
    // @method unproject(point: Point, zoom: Number): LatLng
    // Inverse of [`project`](#map-project).
    worldPixelToLatLng(screenXY, zoom) {
        zoom = zoom === undefined ? this._zoom : zoom;
        return this._crs.screenXYToLatLng(screenXY, zoom);
    }
    // @method layerPointToLatLng(point: Point): LatLng
    // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
    // returns the corresponding geographical coordinate (for the current zoom level).
    canvasPixelToLatLng(pixel) {
        const absolute = pixel.add(this._pixelOrigin);
        return this.worldPixelToLatLng(absolute);
    }
    // @method latLngToLayerPoint(latlng: LatLng): Point
    // Given a geographical coordinate, returns the corresponding pixel coordinate
    // relative to the [origin pixel](#map-getpixelorigin).
    latLngToCanvasPixel(latlng) {
        const absolute = this.latLngToWorldPixel(latlng).round(false);
        return absolute.subtract(this._pixelOrigin);
    }
    // @method wrapLatLng(latlng: LatLng): LatLng
    // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
    // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
    // CRS's bounds.
    // By default this means longitude is wrapped around the dateline so its
    // value is between -180 and +180 degrees.
    wrapLatLng(latlng) {
        return this._crs.wrapLatLng(latlng);
    }
    // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
    // Returns a `LatLngBounds` with the same size as the given one, ensuring that
    // its center is within the CRS's bounds.
    // By default this means the center longitude is wrapped around the dateline so its
    // value is between -180 and +180 degrees, and the majority of the bounds
    // overlaps the CRS's bounds.
    wrapLatLngBounds(bounds) {
        return this._crs.wrapLatLngBounds(bounds);
    }
    // @method distance(latlng1: LatLng, latlng2: LatLng): Number
    // Returns the distance between two geographical coordinates according to
    // the map's CRS. By default this measures distance in meters.
    distance(latlng1, latlng2) {
        return this._crs.distance(latlng1, latlng2);
    }
    // @method containerPointToLayerPoint(point: Point): Point
    // Given a pixel coordinate relative to the map container, returns the corresponding
    // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
    containerPixelToCanvasPixel(pixel) {
        return pixel.subtract(this._getMapPanePos());
    }
    // @method layerPointToContainerPoint(point: Point): Point
    // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
    // returns the corresponding pixel coordinate relative to the map container.
    canvasPixelToContainerPixel(pixel) {
        return pixel.add(this._getMapPanePos());
    }
    // @method containerPointToLatLng(point: Point): LatLng
    // Given a pixel coordinate relative to the map container, returns
    // the corresponding geographical coordinate (for the current zoom level).
    containerPixelToLatLng(pixel) {
        return this.canvasPixelToLatLng(this.containerPixelToCanvasPixel(pixel));
    }
    // @method latLngToContainerPoint(latlng: LatLng): Point
    // Given a geographical coordinate, returns the corresponding pixel coordinate
    // relative to the map container.
    latLngToContainerPixel(latlng) {
        return this.canvasPixelToContainerPixel(this.latLngToCanvasPixel(latlng));
    }
    // @method mouseEventToContainerPoint(ev: MouseEvent): Point
    // Given a MouseEvent object, returns the pixel coordinate relative to the
    // map container where the event took place.
    mouseEventToContainerPixel(e) {
        return _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.getMousePosition(e, this._container);
    }
    // @method mouseEventToLayerPoint(ev: MouseEvent): Point
    // Given a MouseEvent object, returns the pixel coordinate relative to
    // the [origin pixel](#map-getpixelorigin) where the event took place.
    mouseEventToCanvasPixel(e) {
        return this.containerPixelToCanvasPixel(this.mouseEventToContainerPixel(e));
    }
    // @method mouseEventToLatLng(ev: MouseEvent): LatLng
    // Given a MouseEvent object, returns geographical coordinate where the
    // event took place.
    mouseEventToLatLng(e) {
        return this.canvasPixelToLatLng(this.mouseEventToCanvasPixel(e));
    }
    // map initialization methods
    _initContainer(id) {
        const container = _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.get(id);
        if (!container) {
            throw new Error('Map container not found.');
        }
        else if (container._leaflet_id) {
            throw new Error('Map container is already initialized.');
        }
        this._container = container;
        _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.on(container, 'scroll', this._onScroll, this);
        this._containerId = _util_util__WEBPACK_IMPORTED_MODULE_0__.stamp(container);
    }
    _initLayout() {
        const container = this._container;
        this._fadeAnimated = this.options.fadeAnimation && _util_browser__WEBPACK_IMPORTED_MODULE_1__.any3d;
        _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.addClass(container, 'leaflet-container' +
            (_util_browser__WEBPACK_IMPORTED_MODULE_1__.touch ? ' leaflet-touch' : '') +
            (_util_browser__WEBPACK_IMPORTED_MODULE_1__.retina ? ' leaflet-retina' : '') +
            (_util_browser__WEBPACK_IMPORTED_MODULE_1__.ielt9 ? ' leaflet-oldie' : '') +
            (_util_browser__WEBPACK_IMPORTED_MODULE_1__.safari ? ' leaflet-safari' : '') +
            (this._fadeAnimated ? ' leaflet-fade-anim' : ''));
        const position = _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.getStyle(container, 'position');
        if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
            container.style.position = 'relative';
        }
        this._initPanes();
    }
    _initPanes() {
        const panes = this._panes = {};
        this._paneRenderers = {};
        // @section
        //
        // Panes are DOM elements used to control the ordering of layers on the map. You
        // can access panes with [`map.getPane`](#map-getpane) or
        // [`map.getPanes`](#map-getpanes) methods. New panes can be created with the
        // [`map.createPane`](#map-createpane) method.
        //
        // Every map has the following default panes that differ only in zIndex.
        //
        // @pane mapPane: HTMLElement = 'auto'
        // Pane that contains all other map panes
        this._mapPane = this.createPane('mapPane', this._container);
        _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.setPosition(this._mapPane, new _common_screen_xy__WEBPACK_IMPORTED_MODULE_8__.ScreenXY(0, 0));
        // @pane tilePane: HTMLElement = 200
        // Pane for `GridLayer`s and `TileLayer`s
        this.createPane('tilePane');
        // @pane vtilePane: HTMLElement = 250
        this.createPane('vtilePane');
        // @pane animatePane: HTMLElement = 300
        this.createPane('animatePane');
        // @pane overlayPane: HTMLElement = 400
        // Pane for vectors (`Path`s, like `Polyline`s and `Polygon`s), `ImageOverlay`s and `VideoOverlay`s
        this.createPane('overlayPane');
        // @pane shadowPane: HTMLElement = 500
        // Pane for overlay shadows (e.g. `Marker` shadows)
        // this.createPane('shadowPane');
        // @pane markerPane: HTMLElement = 600
        // Pane for `Icon`s of `Marker`s
        // this.createPane('markerPane');
        // @pane tooltipPane: HTMLElement = 650
        // Pane for `Tooltip`s.
        this.createPane('tooltipPane');
        // @pane popupPane: HTMLElement = 700
        // Pane for `Popup`s.
        this.createPane('popupPane');
    }
    // private methods that modify map state
    // @section Map state change events
    _resetView(center, zoom) {
        _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.setPosition(this._mapPane, new _common_screen_xy__WEBPACK_IMPORTED_MODULE_8__.ScreenXY(0, 0));
        const loading = !this._loaded;
        this._loaded = true;
        zoom = this._limitZoom(zoom);
        this.fire('viewprereset');
        const zoomChanged = this._zoom !== zoom;
        this
            ._moveStart(zoomChanged, false)
            ._move(center, zoom)
            ._moveEnd(zoomChanged);
        // @event viewreset: Event
        // Fired when the map needs to redraw its content (this usually happens
        // on map zoom or load). Very useful for creating custom overlays.
        this.fire('viewreset');
        // @event load: Event
        // Fired when the map is initialized (when its center and zoom are set
        // for the first time).
        if (loading) {
            this.fire('load');
        }
    }
    _moveStart(zoomChanged, noMoveStart) {
        // @event zoomstart: Event
        // Fired when the map zoom is about to change (e.g. before zoom animation).
        // @event movestart: Event
        // Fired when the view of the map starts changing (e.g. user starts dragging the map).
        if (zoomChanged) {
            this.fire('zoomstart');
        }
        if (!noMoveStart) {
            this.fire('movestart');
        }
        return this;
    }
    _move(center, zoom, data) {
        if (zoom === undefined) {
            zoom = this._zoom;
        }
        const zoomChanged = this._zoom !== zoom;
        this._zoom = zoom;
        this._lastCenter = center;
        this._pixelOrigin = this._getNewPixelOrigin(center);
        // @event zoom: Event
        // Fired repeatedly during any change in zoom level, including zoom
        // and fly animations.
        if (zoomChanged || (data && data.pinch)) { // Always fire 'zoom' if pinching because #3530
            this.fire('zoom', data);
        }
        // @event move: Event
        // Fired repeatedly during any movement of the map, including pan and
        // fly animations.
        return this.fire('move', data);
    }
    _moveEnd(zoomChanged) {
        // @event zoomend: Event
        // Fired when the map has changed, after any animations.
        if (zoomChanged) {
            this.fire('zoomend');
        }
        // @event moveend: Event
        // Fired when the center of the map stops changing (e.g. user stopped
        // dragging the map).
        return this.fire('moveend');
    }
    _stop() {
        if (this._panAnim) {
            this._panAnim.stop();
        }
        return this;
    }
    _rawPanBy(offset) {
        _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
    }
    _getZoomSpan() {
        return this.getMaxZoom() - this.getMinZoom();
    }
    // DOM event handling
    // @section Interaction events
    _initEvents(remove) {
        this._targets = {};
        this._targets[this._containerId] = this;
        const onOff = remove ? _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.off : _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.on;
        // @event click: MouseEvent
        // Fired when the user clicks (or taps) the map.
        // @event dblclick: MouseEvent
        // Fired when the user double-clicks (or double-taps) the map.
        // @event mousedown: MouseEvent
        // Fired when the user pushes the mouse button on the map.
        // @event mouseup: MouseEvent
        // Fired when the user releases the mouse button on the map.
        // @event mouseover: MouseEvent
        // Fired when the mouse enters the map.
        // @event mouseout: MouseEvent
        // Fired when the mouse leaves the map.
        // @event mousemove: MouseEvent
        // Fired while the mouse moves over the map.
        // @event contextmenu: MouseEvent
        // Fired when the user pushes the right mouse button on the map, prevents
        // default browser context menu from showing if there are listeners on
        // this event. Also fired on mobile when the user holds a single touch
        // for a second (also called long press).
        // @event keypress: KeyboardEvent
        // Fired when the user presses a key from the keyboard that produces a character value while the map is focused.
        // @event keydown: KeyboardEvent
        // Fired when the user presses a key from the keyboard while the map is focused. Unlike the `keypress` event,
        // the `keydown` event is fired for keys that produce a character value and for keys
        // that do not produce a character value.
        // @event keyup: KeyboardEvent
        // Fired when the user releases a key from the keyboard while the map is focused.
        onOff(this._container, 'click dblclick mousedown mouseup ' +
            'mouseover mouseout mousemove contextmenu keypress keydown keyup', this._handleDOMEvent, this);
        // onOff(this._container, 'click dblclick mousedown mouseup ' +
        // 	'mouseover mouseout contextmenu keypress keydown keyup', this._handleDOMEvent, this);
        if (this.options.trackResize) {
            onOff(window, 'resize', this._onResize, this);
        }
        if (_util_browser__WEBPACK_IMPORTED_MODULE_1__.any3d && this.options.transform3DLimit) {
            (remove ? this.off : this.on).call(this, 'moveend', this._onMoveEnd);
        }
    }
    _onResize() {
        _util_util__WEBPACK_IMPORTED_MODULE_0__.cancelAnimFrame(this._resizeRequest);
        this._resizeRequest = _util_util__WEBPACK_IMPORTED_MODULE_0__.requestAnimFrame(() => {
            this.invalidateSize({ debounceMoveend: true });
        }, this);
    }
    _onScroll() {
        this._container.scrollTop = 0;
        this._container.scrollLeft = 0;
    }
    _onMoveEnd() {
        const pos = this._getMapPanePos();
        if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1203873 but Webkit also have
            // a pixel offset on very high values, see: http://jsfiddle.net/dg6r5hhb/
            this._resetView(this.getCenter(), this.getZoom());
        }
    }
    _findEventTargets(e, type) {
        var targets = [], target, isHover = type === 'mouseout' || type === 'mouseover', src = e.target || e.srcElement, dragging = false;
        while (src) {
            target = this._targets[_util_util__WEBPACK_IMPORTED_MODULE_0__.stamp(src)];
            if (target && (type === 'click' || type === 'preclick') && !e._simulated && this._draggableMoved(target)) {
                // Prevent firing click after you just dragged an object.
                dragging = true;
                break;
            }
            if (target && target.listens(type, true)) {
                if (isHover && !_util_dom_event__WEBPACK_IMPORTED_MODULE_3__.isExternalTarget(src, e)) {
                    break;
                }
                targets.push(target);
                if (isHover) {
                    break;
                }
            }
            if (src === this._container) {
                break;
            }
            src = src.parentNode;
        }
        if (!targets.length && !dragging && !isHover && _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.isExternalTarget(src, e)) {
            targets = [this];
        }
        return targets;
    }
    _handleDOMEvent(e) {
        if (!this._loaded || _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.skipped(e)) {
            return;
        }
        this._fireDOMEvent(e, e.type);
    }
    _fireDOMEvent(e, type, targets) {
        if (e.type === 'click') {
            // Fire a synthetic 'preclick' event which propagates up (mainly for closing popups).
            // @event preclick: MouseEvent
            // Fired before mouse click on the map (sometimes useful when you
            // want something to happen on click before any existing click
            // handlers start running).
            // var synth = Util.extend({}, e);
            const synth = Object.assign({}, e);
            synth.type = 'preclick';
            this._fireDOMEvent(synth, synth.type, targets);
        }
        if (e._stopped) {
            return;
        }
        // Find the layer the event is propagating from and its parents.
        targets = (targets || []).concat(this._findEventTargets(e, type));
        if (!targets.length) {
            return;
        }
        var target = targets[0];
        if (type === 'contextmenu' && target.listens(type, true)) {
            _util_dom_event__WEBPACK_IMPORTED_MODULE_3__.preventDefault(e);
        }
        var data = {
            originalEvent: e
        };
        if (e.type !== 'keypress' && e.type !== 'keydown' && e.type !== 'keyup') {
            var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
            data.containerPixel = isMarker ?
                this.latLngToContainerPixel(target.getLatLng()) : this.mouseEventToContainerPixel(e);
            data.canvasPixel = this.containerPixelToCanvasPixel(data.containerPixel);
            data.latlng = isMarker ? target.getLatLng() : this.canvasPixelToLatLng(data.canvasPixel);
        }
        for (let i = 0; i < targets.length; i++) {
            targets[i].fire(type, data, true);
            if (data.originalEvent._stopped || this._mouseEvents.indexOf(type) !== -1) {
                return;
            }
        }
    }
    _draggableMoved(obj) {
        obj = obj.dragging && obj.dragging.enabled() ? obj : this;
        return obj.dragging && obj.dragging.moved();
    }
    // @section Other Methods
    // @method whenReady(fn: Function, context?: Object): this
    // Runs the given function `fn` when the map gets initialized with
    // a view (center and zoom) and at least one layer, or immediately
    // if it's already initialized, optionally passing a function context.
    whenReady(callback, context) {
        if (this._loaded) {
            callback.call(context || this, { target: this });
        }
        else {
            this.on('load', callback, context);
        }
        return this;
    }
    // private methods for getting map state
    _getMapPanePos() {
        return _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.getPosition(this._mapPane) || new _common_screen_xy__WEBPACK_IMPORTED_MODULE_8__.ScreenXY(0, 0);
    }
    _moved() {
        const pos = this._getMapPanePos();
        return pos && !pos.equals(new _common_screen_xy__WEBPACK_IMPORTED_MODULE_8__.ScreenXY(0, 0));
    }
    _getTopLeftPixel(center, zoom) {
        const pixelOrigin = center && zoom !== undefined ?
            this._getNewPixelOrigin(center, zoom) :
            this.getPixelOrigin();
        return pixelOrigin.subtract(this._getMapPanePos());
    }
    _getNewPixelOrigin(center, zoom) {
        const viewHalf = this.getSize().divideBy(2);
        return this.latLngToWorldPixel(center, zoom).subtract(viewHalf).add(this._getMapPanePos()).round(false);
    }
    // layer point of the current center
    _getCenterCanvasPixel() {
        return this.containerPixelToCanvasPixel(this.getSize().divideBy(2));
    }
    // offset of the specified place to the current center in pixels
    _getCenterOffset(latlng) {
        return this.latLngToCanvasPixel(latlng).subtract(this._getCenterCanvasPixel());
    }
    // adjust center for view to get inside bounds
    _limitCenter(center, zoom, bounds) {
        if (!bounds) {
            return center;
        }
        const centerPoint = this.latLngToWorldPixel(center, zoom), viewHalf = this.getSize().divideBy(2), viewBounds = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_7__.ScreenBounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)), offset = this._getBoundsOffset(viewBounds, bounds, zoom);
        // If offset is less than a pixel, ignore.
        // This prevents unstable projections from getting into
        // an infinite loop of tiny offsets.
        if (offset.round().equals(new _common_screen_xy__WEBPACK_IMPORTED_MODULE_8__.ScreenXY(0, 0))) {
            return center;
        }
        return this.worldPixelToLatLng(centerPoint.add(offset), zoom);
    }
    // adjust offset for view to get inside bounds
    _limitOffset(offset, bounds) {
        if (!bounds) {
            return offset;
        }
        const viewBounds = this.getPixelBounds(), newBounds = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_7__.ScreenBounds(viewBounds.min.add(offset), viewBounds.max.add(offset));
        return offset.add(this._getBoundsOffset(newBounds, bounds));
    }
    // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
    _getBoundsOffset(pxBounds, maxBounds, zoom) {
        const projectedMaxBounds = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_7__.ScreenBounds(this.latLngToWorldPixel(maxBounds.getNorthEast(), zoom), this.latLngToWorldPixel(maxBounds.getSouthWest(), zoom)), minOffset = projectedMaxBounds.min.subtract(pxBounds.min), maxOffset = projectedMaxBounds.max.subtract(pxBounds.max), dx = this._rebound(minOffset.x, -maxOffset.x), dy = this._rebound(minOffset.y, -maxOffset.y);
        return new _common_screen_xy__WEBPACK_IMPORTED_MODULE_8__.ScreenXY(dx, dy);
    }
    _rebound(left, right) {
        return left + right > 0 ?
            Math.round(left - right) / 2 :
            Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
    }
    _limitZoom(zoom) {
        let min = this.getMinZoom(), max = this.getMaxZoom(), snap = _util_browser__WEBPACK_IMPORTED_MODULE_1__.any3d ? this.options.zoomSnap : 1;
        if (snap) {
            zoom = Math.round(zoom / snap) * snap;
        }
        return Math.max(min, Math.min(max, zoom));
    }
    _onPanTransitionStep() {
        this.fire('move');
    }
    _onPanTransitionEnd() {
        _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.removeClass(this._mapPane, 'leaflet-pan-anim');
        this.fire('moveend');
    }
    _tryAnimatedPan(center, options) {
        // difference between the new and current centers in pixels
        var offset = this._getCenterOffset(center).trunc(false);
        // don't animate too far unless animate: true specified in options
        if ((options && options.animate) !== true && !this.getSize().contains(offset)) {
            return false;
        }
        this.panBy(offset, options);
        return true;
    }
    _createAnimProxy() {
        const proxy = this._proxy = _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.create('div', 'leaflet-proxy leaflet-zoom-animated');
        this._panes.mapPane.appendChild(proxy);
        this.on('zoomanim', (e) => {
            if (!_util_dom_util__WEBPACK_IMPORTED_MODULE_2__.TRANSFORM)
                return;
            const prop = _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.TRANSFORM, transform = this._proxy.style[prop];
            _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.setTransform(this._proxy, this.latLngToWorldPixel(e.center, e.zoom), this.getZoomScale(e.zoom, 1));
            // workaround for case when transform is the same and so transitionend event is not fired
            if (transform === this._proxy.style[prop] && this._animatingZoom) {
                this._onZoomTransitionEnd();
            }
        });
        this.on('load moveend', this._animMoveEnd, this);
        this._on('unload', this._destroyAnimProxy, this);
    }
    _destroyAnimProxy() {
        _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.remove(this._proxy);
        this.off('load moveend', this._animMoveEnd, this);
        delete this._proxy;
    }
    _animMoveEnd() {
        const c = this.getCenter(), z = this.getZoom();
        _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.setTransform(this._proxy, this.latLngToWorldPixel(c, z), this.getZoomScale(z, 1));
        // console.log(c.lat, c.lng);
    }
    _catchTransitionEnd(e) {
        if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
            this._onZoomTransitionEnd();
        }
    }
    _nothingToAnimate() {
        return !this._container.getElementsByClassName('leaflet-zoom-animated').length;
    }
    _tryAnimatedZoom(center, zoom, options) {
        if (this._animatingZoom) {
            return true;
        }
        options = options || {};
        // don't animate if disabled, not supported or zoom difference is too large
        if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() ||
            Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) {
            return false;
        }
        // offset is the pixel coords of the zoom origin relative to the current center
        const scale = this.getZoomScale(zoom), offset = this._getCenterOffset(center).divideBy(1 - 1 / scale);
        // don't animate if the zoom origin isn't within one screen from the current center, unless forced
        if (options.animate !== true && !this.getSize().contains(offset)) {
            return false;
        }
        _util_util__WEBPACK_IMPORTED_MODULE_0__.requestAnimFrame(() => {
            this
                ._moveStart(true, false)
                ._animateZoom(center, zoom, true);
        });
        return true;
    }
    _animateZoom(center, zoom, startAnim, noUpdate) {
        if (!this._mapPane) {
            return;
        }
        if (startAnim) {
            this._animatingZoom = true;
            // remember what center/zoom to set after animation
            this._animateToCenter = center;
            this._animateToZoom = zoom;
            _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.addClass(this._mapPane, 'leaflet-zoom-anim');
        }
        // @section Other Events
        // @event zoomanim: ZoomAnimEvent
        // Fired at least once per zoom animation. For continuous zoom, like pinch zooming, fired once per frame during zoom.
        this.fire('zoomanim', {
            center: center,
            zoom: zoom,
            noUpdate: noUpdate
        });
        // Work around webkit not firing 'transitionend', see https://github.com/Leaflet/Leaflet/issues/3689, 2693
        setTimeout(() => {
            this._onZoomTransitionEnd();
        }, 250);
    }
    _onZoomTransitionEnd() {
        if (!this._animatingZoom) {
            return;
        }
        if (this._mapPane) {
            _util_dom_util__WEBPACK_IMPORTED_MODULE_2__.removeClass(this._mapPane, 'leaflet-zoom-anim');
        }
        this._animatingZoom = false;
        this._move(this._animateToCenter, this._animateToZoom);
        // This anim frame should prevent an obscure iOS webkit tile loading race condition.
        _util_util__WEBPACK_IMPORTED_MODULE_0__.requestAnimFrame(() => {
            this._moveEnd(true);
        }, this);
    }
    getCRS() {
        return this._crs;
    }
    addGraphic(graphic) {
        // this._canvas.addGraphic(graphic);
        this._viewer.addGraphic(graphic);
    }
    addGraphicLayer(graphicLayer) {
        graphicLayer.crs = this._crs;
        // this._canvas.addGraphicLayer(graphicLayer);
        this._viewer.addGraphicLayer(graphicLayer);
    }
    addFeatureLayer(featureLayer) {
        featureLayer.crs = this._crs;
        // this._canvas.addFeatureLayer(featureLayer);
        this._viewer.addFeatureLayer(featureLayer);
    }
    addRasterLayer(rasterLayer) {
        rasterLayer.crs = this._crs;
        // this._canvas.addRasterLayer(rasterLayer);
        this._viewer.addRasterLayer(rasterLayer);
    }
    addAnimation(animation) {
        animation.project(this._crs);
        this._animater.addAnimation(animation);
    }
    addHandler(name, handler) {
        this._handlers.push(handler);
        this[name] = handler;
        if (this.options[name]) {
            handler.enable();
        }
        return this;
    }
    clearHandlers() {
        for (let i = 0, len = this._handlers.length; i < len; i++) {
            this._handlers[i].disable();
        }
    }
}


/***/ }),

/***/ "../dist/map/position-animation.js":
/*!*****************************************!*\
  !*** ../dist/map/position-animation.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PosAnimation": () => (/* binding */ PosAnimation)
/* harmony export */ });
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ "../dist/util/util.js");
/* harmony import */ var _util_dom_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/dom-util */ "../dist/util/dom-util.js");
/* harmony import */ var _base_evented_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base/evented-object */ "../dist/base/evented-object.js");



/*
 * @class PosAnimation
 * @aka L.PosAnimation
 * @inherits Evented
 * Used internally for panning animations, utilizing CSS3 Transitions for modern browsers and a timer fallback for IE6-9.
 *
 * @example
 * ```js
 * var fx = new L.PosAnimation();
 * fx.run(el, [300, 500], 0.5);
 * ```
 *
 * @constructor L.PosAnimation()
 * Creates a `PosAnimation` object.
 *
 */
class PosAnimation extends _base_evented_object__WEBPACK_IMPORTED_MODULE_2__.EventedObject {
    constructor(el) {
        super();
        this._duration = 0.25;
        this._el = el;
    }
    // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
    // Run an animation of a given element to a new position, optionally setting
    // duration in seconds (`0.25` by default) and easing linearity factor (3rd
    // argument of the [cubic bezier curve](http://cubic-bezier.com/#0,0,.5,1),
    // `0.5` by default).
    run(el, newPos, duration, easeLinearity) {
        this.stop();
        this._el = el;
        this._inProgress = true;
        this._duration = duration || 0.25;
        this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);
        this._startPos = _util_dom_util__WEBPACK_IMPORTED_MODULE_1__.getPosition(el);
        this._offset = newPos.subtract(this._startPos);
        this._startTime = +new Date();
        // @event start: Event
        // Fired when the animation starts
        this.fire('start');
        this._animate();
    }
    // @method stop()
    // Stops the animation (if currently running).
    stop() {
        if (!this._inProgress) {
            return;
        }
        this._step(true);
        this._complete();
    }
    _animate() {
        // animation loop
        this._animId = _util_util__WEBPACK_IMPORTED_MODULE_0__.requestAnimFrame(this._animate, this);
        this._step();
    }
    _step(round) {
        var elapsed = (+new Date()) - this._startTime, duration = this._duration * 1000;
        if (elapsed < duration) {
            this._runFrame(this._easeOut(elapsed / duration), round);
        }
        else {
            this._runFrame(1);
            this._complete();
        }
    }
    _runFrame(progress, round) {
        var pos = this._startPos.add(this._offset.multiplyBy(progress));
        if (round) {
            pos.round(false);
        }
        _util_dom_util__WEBPACK_IMPORTED_MODULE_1__.setPosition(this._el, pos);
        // @event step: Event
        // Fired continuously during the animation.
        this.fire('step');
    }
    _complete() {
        _util_util__WEBPACK_IMPORTED_MODULE_0__.cancelAnimFrame(this._animId);
        this._inProgress = false;
        // @event end: Event
        // Fired when the animation ends.
        this.fire('end');
    }
    _easeOut(t) {
        return 1 - Math.pow(1 - t, this._easeOutPower);
    }
}


/***/ }),

/***/ "../dist/raster/raster.js":
/*!********************************!*\
  !*** ../dist/raster/raster.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Raster": () => (/* binding */ Raster)
/* harmony export */ });
/* harmony import */ var _common_latlng__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/latlng */ "../dist/common/latlng.js");
/* harmony import */ var _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/latlng-bounds */ "../dist/common/latlng-bounds.js");


/*
 * 栅格
 */
class Raster {
    /**
     * 创建栅格
     * @remarks
     * 遍历图形集合进行绘制
     * @param {number} xmin - 经度左值
     * @param {number} ymin - 纬度下值
     * @param {number} xmax - 经度右值
     * @param {number} ymax - 纬度上值
     * @param {number} width - 栅格宽度
     * @param {number} height - 栅格高度
     * @param {number} cellsize - 栅格大小
     */
    constructor(xmin, ymin, xmax, ymax, width = 1000, height = 1000) {
        this._canvas = document.createElement("canvas");
        this._canvas.width = width;
        this._canvas.height = height;
        this._latlngBounds = new _common_latlng_bounds__WEBPACK_IMPORTED_MODULE_1__.LatLngBounds(new _common_latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(ymin, xmin), new _common_latlng__WEBPACK_IMPORTED_MODULE_0__.LatLng(ymax, xmax));
    }
    /*
     * 动态栅格（实时渲染）
     */
    get dynamic() {
        return false;
    }
    /*
     * 画布存放Image
     */
    get canvas() {
        return this._canvas;
    }
    /*
     * 栅格经纬度边界
     */
    get bounds() {
        return this._latlngBounds;
    }
    /**
     * 包络矩形
     * @remarks
     * 注意bound的坐标类型：一般为地理平面坐标，即投影后坐标
     */
    get latlngBounds() {
        return this._latlngBounds;
    }
    get planeBounds() {
        return this._planeBounds;
    }
    get screenBounds() {
        return this._screenBounds;
    }
    set crs(value) {
        this._crs = value;
        this.project();
    }
}


/***/ }),

/***/ "../dist/renderer/category-renderer.js":
/*!*********************************************!*\
  !*** ../dist/renderer/category-renderer.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CategoryRendererItem": () => (/* binding */ CategoryRendererItem),
/* harmony export */   "CategoryRenderer": () => (/* binding */ CategoryRenderer)
/* harmony export */ });
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../geometry/geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _util_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/color */ "../dist/util/color.js");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderer */ "../dist/renderer/renderer.js");




/**
 * 分类渲染项
 */
class CategoryRendererItem {
    constructor(value, symbol, label) {
        /**
         * 该类总数
         */
        this.count = 1;
        this.value = value;
        this.symbol = symbol;
        this.label = label;
    }
}
/**
 * 分类渲染
 * @remarks
 * 一般可通过设置分类字段，再调用generate自动生成分类渲染项
 * 也可通过手动添加和定义分类渲染项，完成分类渲染设置，通过items.push()
 */
class CategoryRenderer extends _renderer__WEBPACK_IMPORTED_MODULE_3__.Renderer {
    constructor() {
        super(...arguments);
        /**
         * 所有分类集合
         */
        this._items = [];
    }
    /**
     * 分类字段
     * @remarks
     * 一般为字符串字段，也可为枚举域值，或是非布尔值
     */
    get field() {
        return this._field;
    }
    set field(value) {
        this._field = value;
    }
    /**
     * 所有分类集合
     */
    get items() {
        return this._items;
    }
    /**
     * 根据分类字段，自动生成分类渲染项
     * @param {FeatureClass} featureClass - 要素类（要素集合）
     * @param {Field} field - 分类字段
     */
    generate(featureClass, field) {
        this._field = field;
        this._items = [];
        //分类统计
        featureClass.features.map(feature => feature.properties[field.name]).forEach((value) => {
            const item = this._items.find(item => item.value == value);
            if (item) {
                item.count += 1;
            }
            else {
                const item = new CategoryRendererItem();
                switch (featureClass.type) {
                    case _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__.GeometryType.Point:
                        // case GeometryType.MultiplePoint:
                        const symbol1 = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__.SimplePointSymbol();
                        symbol1.fillStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__.Color.random().toString();
                        symbol1.strokeStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__.Color.random().toString();
                        item.symbol = symbol1;
                        item.value = value;
                        this._items.push(item);
                        break;
                    case _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__.GeometryType.Polyline:
                        // case GeometryType.MultiplePolyline:
                        const symbol2 = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__.SimpleLineSymbol();
                        symbol2.strokeStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__.Color.random().toString();
                        item.symbol = symbol2;
                        item.value = value;
                        this._items.push(item);
                        break;
                    case _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__.GeometryType.Polygon:
                        // case GeometryType.MultiplePolygon:
                        const symbol3 = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__.SimpleFillSymbol();
                        symbol3.fillStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__.Color.random().toString();
                        symbol3.strokeStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__.Color.random().toString();
                        item.symbol = symbol3;
                        item.value = value;
                        this._items.push(item);
                        break;
                }
            }
        });
    }
    getSymbol(feature) {
        const item = this.items.find(item => item.value == feature.properties[this.field.name]);
        if (item)
            return item.symbol;
    }
}


/***/ }),

/***/ "../dist/renderer/class-renderer.js":
/*!******************************************!*\
  !*** ../dist/renderer/class-renderer.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClassRendererItem": () => (/* binding */ ClassRendererItem),
/* harmony export */   "ClassRenderer": () => (/* binding */ ClassRenderer)
/* harmony export */ });
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../geometry/geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _util_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/color */ "../dist/util/color.js");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderer */ "../dist/renderer/renderer.js");




/**
 * 分级渲染项
 * @remarks
 * 分级区间一般为( ]: 即下开上闭
 */
class ClassRendererItem {
    constructor(low, high, symbol, label) {
        this.low = low;
        this.high = high;
        this.symbol = symbol;
        this.label = label;
    }
}
/**
 * 分级渲染
 * @remarks
 * 一般可通过设置分级字段，再调用generate自动生成分级渲染项
 * 也可通过手动添加和定义分级渲染项，完成分级渲染设置，通过items.push()
 */
class ClassRenderer extends _renderer__WEBPACK_IMPORTED_MODULE_3__.Renderer {
    constructor() {
        super(...arguments);
        /**
         * 所有分级渲染项集合
         */
        this._items = [];
    }
    /**
     * 分级字段
     * @remarks
     * 必须为数值型
     */
    get field() {
        return this._field;
    }
    set field(value) {
        this._field = value;
    }
    /**
     * 所有分级渲染项集合
     */
    get items() {
        return this._items;
    }
    /**
     * 自动生成分级渲染项
     * @remarks
     * TODO: 分级有多种方式，目前只实现均分
     */
    generate(featureClass, field, breaks) {
        this._field = field;
        this._items = [];
        //获取该字段极值
        const stat = featureClass.features.map(feature => feature.properties[field.name]).reduce((stat, cur) => {
            stat.max = Math.max(cur, stat.max);
            stat.min = Math.min(cur, stat.min);
            return stat;
        }, { min: Number.MAX_VALUE, max: Number.MIN_VALUE });
        for (let i = 0; i < breaks; i++) {
            const item = new ClassRendererItem();
            switch (featureClass.type) {
                case _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__.GeometryType.Point:
                    // case GeometryType.MultiplePoint:
                    const symbol1 = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__.SimplePointSymbol();
                    symbol1.fillStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__.Color.random().toString();
                    symbol1.strokeStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__.Color.random().toString();
                    item.symbol = symbol1;
                    item.low = stat.min + i * (stat.max - stat.min) / breaks;
                    item.high = stat.min + (i + 1) * (stat.max - stat.min) / breaks;
                    item.label = item.low + " - " + item.high;
                    this._items.push(item);
                    break;
                case _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__.GeometryType.Polyline:
                    // case GeometryType.MultiplePolyline:
                    const symbol2 = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__.SimpleLineSymbol();
                    symbol2.strokeStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__.Color.random().toString();
                    item.symbol = symbol2;
                    item.low = stat.min + i * (stat.max - stat.min) / breaks;
                    item.high = stat.min + (i + 1) * (stat.max - stat.min) / breaks;
                    item.label = item.low + " - " + item.high;
                    this._items.push(item);
                    break;
                case _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__.GeometryType.Polygon:
                    // case GeometryType.MultiplePolygon:
                    const symbol3 = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__.SimpleFillSymbol();
                    symbol3.fillStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__.Color.random().toString();
                    symbol3.strokeStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__.Color.random().toString();
                    item.symbol = symbol3;
                    item.low = stat.min + i * (stat.max - stat.min) / breaks;
                    item.high = stat.min + (i + 1) * (stat.max - stat.min) / breaks;
                    item.label = item.low + " - " + item.high;
                    this._items.push(item);
                    break;
            }
        }
    }
    getSymbol(feature) {
        const item = this.items.find(item => item.low <= feature.properties[this.field.name] && item.high >= feature.properties[this.field.name]);
        if (item)
            return item.symbol;
    }
}


/***/ }),

/***/ "../dist/renderer/cluster-renderer.js":
/*!********************************************!*\
  !*** ../dist/renderer/cluster-renderer.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClusterRenderer": () => (/* binding */ ClusterRenderer)
/* harmony export */ });
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderer */ "../dist/renderer/renderer.js");
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../geometry/geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _symbol_cluster_symbol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../symbol/cluster-symbol */ "../dist/symbol/cluster-symbol.js");




/**
 * 聚合渲染
 */
class ClusterRenderer extends _renderer__WEBPACK_IMPORTED_MODULE_1__.Renderer {
    constructor() {
        super(...arguments);
        this._defaultSymbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__.SimplePointSymbol();
        this._tolerance = 50; //distance 50px
        this._features = {}; // Map<id, count>
    }
    set featureClass(value) {
        if (value.type == _geometry_geometry__WEBPACK_IMPORTED_MODULE_2__.GeometryType.Point) {
            this._featureClass = value;
        }
    }
    set defaultSymbol(value) {
        this._defaultSymbol = value;
    }
    set Tolerance(value) {
        this._tolerance = value;
    }
    init(redrawBounds) {
        this._features = {};
        if (!this._featureClass)
            return;
        let feature = this._featureClass.first;
        while (feature) {
            if (!redrawBounds || (feature.geometry && feature.geometry.screenBounds && feature.geometry.screenBounds.intersects(redrawBounds))) {
                let exist = false;
                const keys = Object.keys(this._features);
                for (let i = 0; i < keys.length; i++) {
                    const id = keys[i];
                    const item = this._featureClass.getFeature(id);
                    if (item) {
                        const p1 = feature.geometry;
                        const p2 = item.geometry;
                        if (p1.distance(p2) <= this._tolerance) {
                            exist = true;
                            this._features[id] += 1;
                            break;
                        }
                    }
                }
                if (!exist) {
                    this._features[feature.id] = 1;
                }
            }
            feature = feature.next;
        }
    }
    getSymbol(feature) {
        const count = this._features[feature.id];
        if (!count) {
            return null;
        }
        else if (count == 1) {
            return this._defaultSymbol;
        }
        else {
            return new _symbol_cluster_symbol__WEBPACK_IMPORTED_MODULE_3__.ClusterSymbol(count);
        }
    }
}


/***/ }),

/***/ "../dist/renderer/dot-renderer.js":
/*!****************************************!*\
  !*** ../dist/renderer/dot-renderer.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DotRenderer": () => (/* binding */ DotRenderer)
/* harmony export */ });
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderer */ "../dist/renderer/renderer.js");


/**
 * 点半径渲染
 * @remarks
 * 只适用点图层
 */
class DotRenderer extends _renderer__WEBPACK_IMPORTED_MODULE_1__.Renderer {
    get field() {
        return this._field;
    }
    set field(value) {
        this._field = value;
    }
    getSymbol(feature) {
        this.symbol = this.symbol || new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__.SimplePointSymbol();
        this.symbol.radius = Number(feature.properties[this.field.name] || 0);
        return this.symbol;
    }
}


/***/ }),

/***/ "../dist/renderer/renderer.js":
/*!************************************!*\
  !*** ../dist/renderer/renderer.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Renderer": () => (/* binding */ Renderer)
/* harmony export */ });
/**
 * 渲染方式基类
 */
class Renderer {
    init(redrawBounds) {
        //do something before layer draw; 
        //etc ClusterRenderer
    }
}


/***/ }),

/***/ "../dist/renderer/simple-renderer.js":
/*!*******************************************!*\
  !*** ../dist/renderer/simple-renderer.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimpleRenderer": () => (/* binding */ SimpleRenderer)
/* harmony export */ });
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ "../dist/renderer/renderer.js");

/**
 * 单一渲染
 */
class SimpleRenderer extends _renderer__WEBPACK_IMPORTED_MODULE_0__.Renderer {
    getSymbol(feature) {
        return this.symbol;
    }
}


/***/ }),

/***/ "../dist/symbol/alternate-line-symbol.js":
/*!***********************************************!*\
  !*** ../dist/symbol/alternate-line-symbol.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlternateLineSymbol": () => (/* binding */ AlternateLineSymbol)
/* harmony export */ });
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/screen-bounds */ "../dist/common/screen-bounds.js");
/* harmony import */ var _symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./symbol */ "../dist/symbol/symbol.js");


/**
 * 简单线符号
 * @remarks
 * 最常用的线符号
 */
class AlternateLineSymbol extends _symbol__WEBPACK_IMPORTED_MODULE_1__.LineSymbol {
    constructor() {
        super(...arguments);
        this.color1 = "#000000";
        this.color2 = "#ffffff";
        this.alternate = 10;
    }
    /**
     * 绘制线
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {number[][]} screen - 线对应坐标点的屏幕坐标集合
     */
    draw(ctx, screenXYs) {
        if (screenXYs.length < 2)
            return;
        ctx.save();
        ctx.strokeStyle = this.color1;
        ctx.lineWidth = this.lineWidth;
        ctx.setLineDash([this.alternate, this.alternate]);
        ctx.beginPath();
        screenXYs.forEach((screenXY, index) => {
            if (index === 0) {
                ctx.moveTo(screenXY.x, screenXY.y);
            }
            else {
                ctx.lineTo(screenXY.x, screenXY.y);
            }
        });
        ctx.stroke();
        ctx.strokeStyle = this.color2;
        ctx.lineDashOffset = this.alternate;
        ctx.beginPath();
        screenXYs.forEach((screenXY, index) => {
            if (index === 0) {
                ctx.moveTo(screenXY.x, screenXY.y);
            }
            else {
                ctx.lineTo(screenXY.x, screenXY.y);
            }
        });
        ctx.stroke();
        ctx.restore();
    }
    getScreenBounds(screenXYs) {
        const bounds = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__.ScreenBounds();
        screenXYs.forEach(screenXY => {
            bounds.extend(screenXY);
        });
        // extend weight
        return bounds;
    }
}


/***/ }),

/***/ "../dist/symbol/animate-symbol.js":
/*!****************************************!*\
  !*** ../dist/symbol/animate-symbol.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnimatePointSymbol": () => (/* binding */ AnimatePointSymbol),
/* harmony export */   "SimpleAnimatePointSymbol": () => (/* binding */ SimpleAnimatePointSymbol)
/* harmony export */ });
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/screen-bounds */ "../dist/common/screen-bounds.js");
/* harmony import */ var _common_screen_xy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/screen-xy */ "../dist/common/screen-xy.js");
/* harmony import */ var _symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./symbol */ "../dist/symbol/symbol.js");



class AnimatePointSymbol extends _symbol__WEBPACK_IMPORTED_MODULE_2__.PointSymbol {
}
class SimpleAnimatePointSymbol extends AnimatePointSymbol {
    constructor() {
        super(...arguments);
        /**
         * 边宽
         */
        this.lineWidth = 3;
        /**
         * 颜色
         */
        this.color = "#ff0000";
        /**
         * 扩散速度
         */
        this.velocity = 10; //  px/s
        /**
         * 扩散的最大半径
         */
        this.limit = 30;
        /**
         * 扩散的光圈数
         */
        this.ring = 3;
    }
    draw(ctx, screenXY) {
        this._screenXY = screenXY;
        this._ctx = ctx;
        this._frame && window.cancelAnimationFrame(this._frame);
        this._start = undefined;
        //this上下文绑定
        this.animate = this.animate.bind(this);
        //动画循环
        this._frame = window.requestAnimationFrame(this.animate);
    }
    getScreenBounds(screenXY) {
        let r = this.limit, w = this.stroke ? Math.ceil(this.weight / 2) : 0, p = new _common_screen_xy__WEBPACK_IMPORTED_MODULE_1__.ScreenXY(r + w, r + w);
        return new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__.ScreenBounds(screenXY.subtract(p), screenXY.add(p));
    }
    /**
     * 动画效果
     * @remarks
     * 通过Animator中requestAnimationFrame循环调用，因此注意优化代码，保持帧数
     * @param {number} elapsed - 已逝去的时间，毫秒
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     */
    animate(timestamp) {
        const screenXY = this._screenXY;
        const ctx = this._ctx;
        if (this._start === undefined) {
            this._start = timestamp;
        }
        const elapsed = timestamp - this._start;
        ctx.save();
        const bounds = this.getScreenBounds(screenXY);
        const size = bounds.getSize();
        ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        //keep size
        //地理坐标 转回 屏幕坐标
        // ctx.setTransform(1,0,0,1,0,0);
        /*ctx.arc(this._screenX, this._screenY, this.limit / this.ring, 0, Math.PI * 2, true);
        ctx.fill();*/
        for (let i = 0; i < this.ring; i++) {
            ctx.beginPath(); //Start path
            ctx.arc(screenXY.x, screenXY.y, (elapsed / 1000 * this.velocity + i * this.limit / this.ring) % this.limit, 0, Math.PI * 2, true);
            //ctx.arc(this._screenX, this._screenY, this.limit / this.ring + ((elapsed/1000 + (this.limit - this.limit / this.ring) / this.velocity * (i/(this.ring - 1))) * this.velocity) % this.limit, 0, Math.PI * 2, true);
            ctx.stroke();
        }
        ctx.restore();
        //循环，下一帧
        this._frame = window.requestAnimationFrame(this.animate);
    }
}


/***/ }),

/***/ "../dist/symbol/arrow-symbol.js":
/*!**************************************!*\
  !*** ../dist/symbol/arrow-symbol.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrowSymbol": () => (/* binding */ ArrowSymbol)
/* harmony export */ });
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/screen-bounds */ "../dist/common/screen-bounds.js");
/* harmony import */ var _symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./symbol */ "../dist/symbol/symbol.js");


/**
 * 箭头符号
 */
class ArrowSymbol extends _symbol__WEBPACK_IMPORTED_MODULE_1__.LineSymbol {
    constructor() {
        super(...arguments);
        /**
         * 线宽
         */
        this.lineWidth = 2;
        /**
         * 决定绘制箭头的最小线长
         * @remarks 屏幕坐标，单位pixel
         * 默认 >50pixels will draw arrow
         */
        this.minLength = 50;
        /**
         * 箭翼长度
         */
        this.arrowLength = 10;
        /**
         * 箭翼夹角
         * @remarks 默认 angle 30 = Math.PI / 6
         */
        this.arrowAngle = Math.PI / 6;
    }
    /**
     * 绘制线
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {number[][]} screen - 线对应坐标点的屏幕坐标集合
     */
    draw(ctx, screenXYs) {
        ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        //keep lineWidth
        // ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.beginPath();
        screenXYs.forEach((screenXY, index) => {
            const screenX = screenXY.x, screenY = screenXY.y;
            if (index === 0) {
                ctx.moveTo(screenX, screenY);
            }
            else {
                ctx.lineTo(screenX, screenY);
            }
        });
        ctx.stroke();
        //已知 起点和终点  求沿线距起点定长的点
        const _getPointAlongLine = (p1, p2, d) => {
            //line length
            let l = Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]));
            let t = d / l;
            return [(1 - t) * p1[0] + t * p2[0], (1 - t) * p1[1] + t * p2[1]];
        };
        //已知 起点 y = kx + b   求沿线距起点定长的点 两个点
        const _getPointAlongLine2 = (k, b, p, d) => {
            let x0 = p[0] + Math.sqrt((d * d) / (k * k + 1)), x1 = p[0] - Math.sqrt((d * d) / (k * k + 1));
            return [[x0, k * x0 + b], [x1, k * x1 + b]];
        };
        screenXYs.reduce((prev, cur) => {
            if (prev) {
                const length = Math.sqrt((cur.x - prev.x) * (cur.x - prev.x) + (cur.y - prev.y) * (cur.y - prev.y));
                if (length >= this.minLength) {
                    //中点 即箭头
                    const [middleX, middleY] = [(prev.x + cur.x) / 2, (prev.y + cur.y) / 2];
                    //箭尾垂线的垂足
                    const [footX, footY] = _getPointAlongLine([middleX, middleY], [prev.x, prev.y], Math.cos(this.arrowAngle) * this.arrowLength);
                    const k = (cur.y - prev.y) / (cur.x - prev.x);
                    // 1/k 垂线
                    const points = _getPointAlongLine2(-1 / k, footY - footX * -1 / k, [footX, footY], Math.sin(this.arrowAngle) * this.arrowLength);
                    //两点
                    points.forEach(point => {
                        ctx.beginPath();
                        ctx.moveTo(middleX, middleY);
                        ctx.lineTo(point[0], point[1]);
                        ctx.stroke();
                    });
                }
                return cur;
            }
            else {
                return cur;
            }
        });
        ctx.restore();
    }
    getScreenBounds(screenXYs) {
        const bounds = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__.ScreenBounds();
        screenXYs.forEach(screenXY => {
            bounds.extend(screenXY);
        });
        // extend weight
        return bounds;
    }
}


/***/ }),

/***/ "../dist/symbol/cluster-symbol.js":
/*!****************************************!*\
  !*** ../dist/symbol/cluster-symbol.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClusterSymbol": () => (/* binding */ ClusterSymbol)
/* harmony export */ });
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/screen-bounds */ "../dist/common/screen-bounds.js");
/* harmony import */ var _common_screen_xy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/screen-xy */ "../dist/common/screen-xy.js");
/* harmony import */ var _util_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/color */ "../dist/util/color.js");
/* harmony import */ var _symbol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./symbol */ "../dist/symbol/symbol.js");




/**
 * 聚合符号
 * @remarks
 * 限制用于点图层
 */
class ClusterSymbol extends _symbol__WEBPACK_IMPORTED_MODULE_3__.PointSymbol {
    /**
     * 创建聚合符号
     * @param {number} count - 聚合数量
     */
    constructor(count) {
        super();
        /**
         * 聚合数量
         */
        this._count = 2;
        /**
         * 聚合符号的默认半径
         */
        this.radius = 10;
        /**
         * 重写描边样式
         */
        this.strokeStyle = "#ffffff"; //#ff0000
        /**
         * 聚合外圈填充样式
         */
        this.outerFillStyle = "#ffffff"; //#ff0000
        /**
         * 聚合数量字体颜色
         */
        this.fontColor = "#ffffff";
        /**
         * 聚合数量字体
         */
        this.fontFamily = "YaHei";
        /**
         * 聚合数量字体粗细
         */
        this.fontWeight = "Bold";
        /**
         * 色带起始色
         */
        this.startColor = "#19caad";
        /**
         * 色带终止色
         */
        this.endColor = "#f4606c";
        this._count = count;
    }
    /**
     * 聚合数量文本
     * @remarks
     * 大于99，标记为99+
     */
    get text() {
        return this._count <= 99 ? this._count.toString() : "99+";
    }
    /**
     * 内圈半径
     */
    get inner() {
        return this._count <= 15 ? this.radius + this._count : this.radius + 15;
    }
    /**
     * 外圈半径
     */
    get outer() {
        return this.inner + 4;
    }
    /**
     * 字体随数量递增，同时控制为非无限递增
     */
    get fontSize() {
        if (this._count < 10) {
            return 12;
        }
        else if (this._count >= 10 && this._count < 30) {
            return 14;
        }
        else if (this._count >= 30 && this._count < 50) {
            return 16;
        }
        else if (this._count >= 30 && this._count < 50) {
            return 18;
        }
        else if (this._count > 50) {
            return 20;
        }
    }
    /**
     * 聚合的内圈填充样式
     * @remarks
     * 采用色带，色带可自定义扩展
     */
    get innerFillStyle() {
        //TODO 优化 setter hex, getter color
        const colors = _util_color__WEBPACK_IMPORTED_MODULE_2__.Color.ramp(_util_color__WEBPACK_IMPORTED_MODULE_2__.Color.fromHex(this.startColor), _util_color__WEBPACK_IMPORTED_MODULE_2__.Color.fromHex(this.endColor), 16);
        return colors[this._count <= 15 ? this._count : 15].toString();
    }
    /**
     * 绘制聚合符号
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {number} screenX - 屏幕坐标X
     * @param {number} screenY - 屏幕坐标Y
     */
    draw(ctx, screenXY) {
        ctx.save();
        // ctx.setTransform(1,0,0,1,0,0);
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.outerFillStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath(); //Start path
        //keep size 画外圈
        ctx.arc(screenXY.x, screenXY.y, this.outer, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = this.innerFillStyle;
        ctx.beginPath(); //Start path
        //keep size 画内圈
        ctx.arc(screenXY.x, screenXY.y, this.inner, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = this.fontColor;
        ctx.font = this.fontSize + "px/1 " + this.fontFamily + " " + this.fontWeight;
        ctx.fillText(this.text, screenXY.x, screenXY.y);
        ctx.restore();
    }
    getScreenBounds(screenXY) {
        let r = this.radius, w = this.stroke ? this.weight / 2 : 0, p = new _common_screen_xy__WEBPACK_IMPORTED_MODULE_1__.ScreenXY(r + w, r + w);
        return new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__.ScreenBounds(screenXY.subtract(p), screenXY.add(p));
    }
}


/***/ }),

/***/ "../dist/symbol/letter-symbol.js":
/*!***************************************!*\
  !*** ../dist/symbol/letter-symbol.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LetterSymbol": () => (/* binding */ LetterSymbol)
/* harmony export */ });
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/screen-bounds */ "../dist/common/screen-bounds.js");
/* harmony import */ var _common_screen_xy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/screen-xy */ "../dist/common/screen-xy.js");
/* harmony import */ var _symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./symbol */ "../dist/symbol/symbol.js");



/**
 * 字符符号
 * @remarks
 * 中英文皆可，注意控制长度，推荐单个字符
 */
class LetterSymbol extends _symbol__WEBPACK_IMPORTED_MODULE_2__.PointSymbol {
    constructor() {
        super(...arguments);
        /**
         * 外圈半径
         */
        this.radius = 10;
        /**
         * 字符，中英文皆可，推荐单个字符
         */
        this.letter = "";
        /**
         * 字体颜色
         */
        this.fontColor = "#ff0000";
        /**
         * 字体大小
         */
        this.fontSize = 12;
        /**
         * 字体
         */
        this.fontFamily = "YaHei";
        /**
         * 字体粗细
         */
        this.fontWeight = "Bold";
    }
    /**
     * 绘制字符符号
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {number} screenX - 屏幕坐标X
     * @param {number} screenY - 屏幕坐标Y
     */
    draw(ctx, screenXY) {
        ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath(); //Start path
        //keep size
        // ctx.setTransform(1, 0, 0, 1, 0, 0);
        //绘制外圈
        ctx.arc(screenXY.x, screenXY.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = this.fontColor;
        ctx.font = this.fontSize + "px/1 " + this.fontFamily + " " + this.fontWeight;
        //绘制字符
        ctx.fillText(this.letter, screenXY.x, screenXY.y);
        ctx.restore();
    }
    getScreenBounds(screenXY) {
        let r = this.radius, w = this.stroke ? this.weight / 2 : 0, p = new _common_screen_xy__WEBPACK_IMPORTED_MODULE_1__.ScreenXY(r + w, r + w);
        return new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__.ScreenBounds(screenXY.subtract(p), screenXY.add(p));
    }
}


/***/ }),

/***/ "../dist/symbol/pattern-fill-symbol.js":
/*!*********************************************!*\
  !*** ../dist/symbol/pattern-fill-symbol.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PatternFillSymbol": () => (/* binding */ PatternFillSymbol),
/* harmony export */   "LinePatternFillSymbol": () => (/* binding */ LinePatternFillSymbol)
/* harmony export */ });
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/screen-bounds */ "../dist/common/screen-bounds.js");
/* harmony import */ var _symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./symbol */ "../dist/symbol/symbol.js");


/**
 * 模式填充面符号
 * @remarks
 * 最常用的面填充符号
 */
class PatternFillSymbol extends _symbol__WEBPACK_IMPORTED_MODULE_1__.FillSymbol {
    /**
     * 绘制面
     * @remarks
     * 奇偶填充
     * https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fill
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {number[][][]} screen - 面对应坐标点的屏幕坐标集合
     */
    draw(ctx, screenXYs) {
        // ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.createPattern(ctx);
        // ctx.fillStyle = this.fillStyle;
        ctx.lineWidth = this.lineWidth;
        //TODO:  exceeding the maximum extent(bound), best way is overlap by extent. find out: maximum is [-PI*R, PI*R]??
        ctx.beginPath();
        screenXYs.forEach(ring => {
            if (ring.length < 3)
                return;
            ring.forEach((screenXY, index) => {
                if (index === 0) {
                    ctx.moveTo(screenXY.x, screenXY.y);
                }
                else {
                    ctx.lineTo(screenXY.x, screenXY.y);
                }
            });
        });
        ctx.closePath();
        //奇偶填充
        //https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fill
        ctx.fill("evenodd");
        ctx.stroke();
        // ctx.restore();
    }
    getScreenBounds(screenXYs) {
        const bounds = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__.ScreenBounds();
        screenXYs.forEach(ring => {
            ring.forEach(screenXY => {
                bounds.extend(screenXY);
            });
        });
        // extend weight
        return bounds;
    }
}
class LinePatternFillSymbol extends PatternFillSymbol {
    constructor() {
        super(...arguments);
        this.patternLineWidth = 2;
        this.size = 16;
        this.angle = 45; //(0, 180)
    }
    get radian() {
        return this.angle * Math.PI / 180;
    }
    createPattern(ctx) {
        const canvas = document.createElement("canvas");
        const width = this.size;
        const height = this.angle == 0 || this.angle == 90 || this.angle == 180 ? this.size : Math.round(this.size * Math.abs(Math.tan(this.radian)));
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.strokeStyle = this.strokeStyle;
        context.lineWidth = this.patternLineWidth;
        if (this.angle == 0 || this.angle == 180) {
            context.beginPath();
            context.moveTo(0, height / 2);
            context.lineTo(width, height / 2);
            context.stroke();
        }
        else if (this.angle == 90) {
            context.beginPath();
            context.moveTo(width / 2, 0);
            context.lineTo(width / 2, height);
            context.stroke();
        }
        else if (this.angle < 90 && this.angle > 0) {
            // 中间过中心
            context.setTransform(1, Math.tan(this.radian), 0, 1, width / 2, height / 2);
            context.beginPath();
            context.moveTo(-width / 2, 0);
            context.lineTo(width / 2, 0);
            context.stroke();
            // 上半从中点开始到右上角
            // context.setTransform(1, Math.tan(this.angle), 0, 1, this.size/2, 0);
            context.beginPath();
            context.moveTo(0, -height / 2);
            context.lineTo(width / 2, -height / 2);
            // context.moveTo(0, 0);
            // context.lineTo(this.size/2, 0);
            context.stroke();
            // 下半从左下角开始到中点
            // context.setTransform(1, Math.tan(this.angle), 0, 1, this.size/2, this.size);
            context.beginPath();
            context.moveTo(-width / 2, height / 2);
            context.lineTo(0, height / 2);
            // context.moveTo(-this.size/2, 0);
            // context.lineTo(0, 0);
            context.stroke();
        }
        else if (this.angle < 180 && this.angle > 90) {
            // 中间过中心
            context.setTransform(1, -Math.tan(Math.PI - this.radian), 0, 1, width / 2, height / 2);
            context.beginPath();
            context.moveTo(-width / 2, 0);
            context.lineTo(width / 2, 0);
            context.stroke();
            // 上半从左上角开始到中点
            // context.setTransform(1, Math.tan(this.angle), 0, 1, this.size/2, 0);
            context.beginPath();
            context.moveTo(-width / 2, -height / 2);
            context.lineTo(0, -height / 2);
            // context.moveTo(0, 0);
            // context.lineTo(this.size/2, 0);
            context.stroke();
            // 下半从中点开始到右下角
            // context.setTransform(1, Math.tan(this.angle), 0, 1, this.size/2, this.size);
            context.beginPath();
            context.moveTo(0, height / 2);
            context.lineTo(width / 2, height / 2);
            // context.moveTo(-this.size/2, 0);
            // context.lineTo(0, 0);
            context.stroke();
        }
        return ctx.createPattern(canvas, "repeat");
    }
}


/***/ }),

/***/ "../dist/symbol/shape-symbol.js":
/*!**************************************!*\
  !*** ../dist/symbol/shape-symbol.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShapeSymbol": () => (/* binding */ ShapeSymbol)
/* harmony export */ });
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/screen-bounds */ "../dist/common/screen-bounds.js");
/* harmony import */ var _common_screen_xy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/screen-xy */ "../dist/common/screen-xy.js");
/* harmony import */ var _symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./symbol */ "../dist/symbol/symbol.js");



class ShapeSymbol extends _symbol__WEBPACK_IMPORTED_MODULE_2__.PointSymbol {
    constructor() {
        super(...arguments);
        /**
         * 圆点半径，像素值
        */
        this.radius = 10;
        /**
         * 边数
        */
        this.sides = 4;
        this.angle = 0; //(0, 360)
    }
    get radian() {
        return this.angle * Math.PI / 180;
    }
    draw(ctx, screenXY) {
        ctx.save();
        //keep size
        //地理坐标 转回 屏幕坐标
        // ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath(); //Start path
        const screenX = screenXY.x;
        const screenY = screenXY.y;
        //ctx.arc(screenX, screenY, this.radius, 0, Math.PI * 2, true);
        ctx.moveTo(screenX + this.radius * Math.sin(this.radian), screenY - this.radius * Math.cos(this.radian));
        for (let i = 1; i < this.sides; i++) {
            let rad = 2 * Math.PI / this.sides * i;
            ctx.lineTo(screenX + this.radius * Math.sin(this.radian + rad), screenY - this.radius * Math.cos(this.radian + rad));
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    /**
     * 包络矩形
    */
    getScreenBounds(screenXY) {
        let r = this.radius, w = this.stroke ? this.weight / 2 : 0, p = new _common_screen_xy__WEBPACK_IMPORTED_MODULE_1__.ScreenXY(r + w, r + w);
        return new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__.ScreenBounds(screenXY.subtract(p), screenXY.add(p));
    }
}


/***/ }),

/***/ "../dist/symbol/symbol.js":
/*!********************************!*\
  !*** ../dist/symbol/symbol.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Symbol": () => (/* binding */ Symbol),
/* harmony export */   "PointSymbol": () => (/* binding */ PointSymbol),
/* harmony export */   "LineSymbol": () => (/* binding */ LineSymbol),
/* harmony export */   "FillSymbol": () => (/* binding */ FillSymbol),
/* harmony export */   "SimplePointSymbol": () => (/* binding */ SimplePointSymbol),
/* harmony export */   "SimpleMarkerSymbol": () => (/* binding */ SimpleMarkerSymbol),
/* harmony export */   "SimpleLineSymbol": () => (/* binding */ SimpleLineSymbol),
/* harmony export */   "SimpleFillSymbol": () => (/* binding */ SimpleFillSymbol)
/* harmony export */ });
/* harmony import */ var _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/screen-bounds */ "../dist/common/screen-bounds.js");
/* harmony import */ var _common_screen_xy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/screen-xy */ "../dist/common/screen-xy.js");


/**
 * 符号基类
 * @remarks
 * 如按现实世界来抽取对象基类，下述属性不应放在基类
 * 但考虑到Canvas的上下文设定，才决定抽取到基类
 */
class Symbol {
    constructor() {
        /**
         * 线宽
         */
        this.lineWidth = 2;
        this.stroke = true;
        /**
         * 描边样式
         */
        this.strokeStyle = "#ff0000";
        this.strokeColor = "#ff0000";
        this.strokeOpacity = 1;
        this.fill = true;
        /**
         * 填充样式
         */
        this.fillStyle = "#ff000088";
        this.fillColor = "#ff0000";
        this.fillOpacity = 0.5;
        // abstract contain(screenXY: ScreenXY): boolean;
    }
    get weight() {
        return this.lineWidth;
    }
    set weight(value) {
        this.lineWidth = value;
    }
}
/**
 * 点符号基类
 */
class PointSymbol extends Symbol {
}
/**
 * 线符号基类
 */
class LineSymbol extends Symbol {
    constructor() {
        super(...arguments);
        this.lineWidth = 3;
    }
}
/**
* 面符号基类
* @remarks
* aka 填充符号
*/
class FillSymbol extends Symbol {
}
/**
 * 简单圆点符号
 * @remarks
 * 最常用的点符号
 */
class SimplePointSymbol extends PointSymbol {
    constructor() {
        super(...arguments);
        /**
         * 圆点半径，像素值
         */
        this.radius = 10;
    }
    /**
     * 绘制点
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {number} screenX - 屏幕坐标X
     * @param {number} screenY - 屏幕坐标Y
     */
    draw(ctx, screenXY) {
        //ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath(); //Start path
        ctx.arc(screenXY.x, screenXY.y, this.radius, 0, Math.PI * 2, false);
        // ctx.globalAlpha = this.fillOpacity;
        // ctx.fillStyle = this.fillColor;
        ctx.fill('evenodd');
        // ctx.globalAlpha = this.strokeOpacity;
        // ctx.strokeStyle = this.strokeColor;
        // ctx.lineWidth = this.lineWidth;
        ctx.stroke();
        //ctx.restore();
    }
    getScreenBounds(screenXY) {
        let r = this.radius, w = this.stroke ? this.weight / 2 : 0, p = new _common_screen_xy__WEBPACK_IMPORTED_MODULE_1__.ScreenXY(r + w, r + w);
        return new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__.ScreenBounds(screenXY.subtract(p), screenXY.add(p));
    }
}
/**
 * 图标符号
 * @remarks
 * 常用于POI兴趣点的渲染
 */
class SimpleMarkerSymbol extends PointSymbol {
    constructor() {
        super(...arguments);
        /**
         * 宽
         */
        this.width = 16;
        /**
         * 高
         */
        this.height = 16;
        /**
         * offset，坐标点对应图标的位置
         * 例如，宽16px，高16px，offsetX为-8，offsetY为-8：
         * 该图标的中心点对应渲染点的坐标。
         */
        this.offsetX = -8;
        /**
         * offset，坐标点对应图标的位置
         * 例如，宽16px，高16px，offsetX为-8，offsetY为-8：
         * 该图标的中心点对应渲染点的坐标。
         */
        this.offsetY = -8;
    }
    /**
     * 记录是否已完成异步图标加载
     */
    get loaded() {
        return this._loaded;
    }
    /**
     * 异步加载图标
     * @return {Color} 生成随机色带
     */
    load() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => {
                createImageBitmap(img).then(icon => {
                    this.image = icon;
                    this._loaded = true;
                    resolve(icon);
                }, err => reject(err));
            };
            img.onerror = reject;
            img.src = this.url;
        });
    }
    /**
     * 绘制图标
     * @remarks
     * 注意异步加载
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {number} screenX - 屏幕坐标X
     * @param {number} screenY - 屏幕坐标Y
     */
    draw(ctx, screenXY) {
        // if (!this._loaded) {
        //     this.image = new Image();
        //     this.image.src = this.url;
        //     this.image.onload = () => {
        //       ctx.drawImage(this.image, screenXY.x + this.offsetX, screenXY.y + this.offsetY, this.width, this.height);
        //     }
        //     this._loaded = true;
        // } else {
        //   if (!this._loading) {
        //     ctx.drawImage(this.image, screenXY.x + this.offsetX, screenXY.y + this.offsetY, this.width, this.height);
        //   }
        // }
        // find a better way
        // now we need await image load
        if (!this._loaded) {
            this.image = new Image();
            this.image.src = this.url;
            this._loaded = true;
        }
        else {
            ctx.drawImage(this.image, screenXY.x + this.offsetX, screenXY.y + this.offsetY, this.width, this.height);
        }
    }
    getScreenBounds(screenXY) {
        let p1 = new _common_screen_xy__WEBPACK_IMPORTED_MODULE_1__.ScreenXY(this.offsetX, this.offsetY);
        let p2 = new _common_screen_xy__WEBPACK_IMPORTED_MODULE_1__.ScreenXY(this.offsetX + this.width, this.offsetY + this.height);
        return new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__.ScreenBounds(screenXY.add(p1), screenXY.add(p2));
    }
}
/**
 * 简单线符号
 * @remarks
 * 最常用的线符号
 */
class SimpleLineSymbol extends LineSymbol {
    /**
     * 绘制线
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {number[][]} screen - 线对应坐标点的屏幕坐标集合
     */
    draw(ctx, screenXYs) {
        if (screenXYs.length < 2)
            return;
        // ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        screenXYs.forEach((screenXY, index) => {
            if (index === 0) {
                ctx.moveTo(screenXY.x, screenXY.y);
            }
            else {
                ctx.lineTo(screenXY.x, screenXY.y);
            }
        });
        ctx.stroke();
        // ctx.restore();
    }
    getScreenBounds(screenXYs) {
        const bounds = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__.ScreenBounds();
        screenXYs.forEach(screenXY => {
            bounds.extend(screenXY);
        });
        // extend weight
        return bounds;
    }
}
/**
 * 简单面符号
 * @remarks
 * 最常用的面填充符号
 */
class SimpleFillSymbol extends FillSymbol {
    /**
     * 绘制面
     * @remarks
     * 奇偶填充
     * https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fill
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {number[][][]} screen - 面对应坐标点的屏幕坐标集合
     */
    draw(ctx, screenXYs) {
        // ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.lineWidth = this.lineWidth;
        //TODO:  exceeding the maximum extent(bound), best way is overlap by extent. find out: maximum is [-PI*R, PI*R]??
        ctx.beginPath();
        screenXYs.forEach(ring => {
            if (ring.length < 3)
                return;
            ring.forEach((screenXY, index) => {
                if (index === 0) {
                    ctx.moveTo(screenXY.x, screenXY.y);
                }
                else {
                    ctx.lineTo(screenXY.x, screenXY.y);
                }
            });
        });
        ctx.closePath();
        //奇偶填充
        //https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fill
        ctx.fill("evenodd");
        ctx.stroke();
        // ctx.restore();
    }
    getScreenBounds(screenXYs) {
        const bounds = new _common_screen_bounds__WEBPACK_IMPORTED_MODULE_0__.ScreenBounds();
        screenXYs.forEach(ring => {
            ring.forEach(screenXY => {
                bounds.extend(screenXY);
            });
        });
        // extend weight
        return bounds;
    }
}


/***/ }),

/***/ "../dist/text/text.js":
/*!****************************!*\
  !*** ../dist/text/text.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Text": () => (/* binding */ Text)
/* harmony export */ });
/**
 * 文本符号
 * @remarks
 * 常用于文本标注
 */
class Text {
    constructor() {
        /**
         * 边框宽
         */
        this.lineWidth = 3;
        /**
         * 边框色
         */
        this.strokeStyle = "#ff0000"; //#ffffff
        /**
         * 填充色
         */
        this.fillStyle = "#ffffff"; //#ffffff
        /**
         * X偏移
         */
        this.offsetX = 0;
        /**
         * Y偏移
         */
        this.offsetY = 1;
        /**
         * 周边留白
         */
        this.padding = 5;
        /**
         * 字体颜色
         */
        this.fontColor = "#ff0000";
        /**
         * 字体大小
         */
        this.fontSize = 12;
        /**
         * 字体
         */
        this.fontFamily = "YaHei";
        /**
         * 字体粗细
         */
        this.fontWeight = "Bold";
        /**
         * 放置位置
         */
        this.placement = "BOTTOM"; //BOTTOM TOP LEFT RIGHT
        /**
         * 自动调整位置
         */
        this.auto = false;
        /**
         * 标注点符号的宽度
         */
        this.pointSymbolWidth = 0;
        /**
         * 标注点符号的高度
         */
        this.pointSymbolHeight = 0;
    }
    /**
     * 自动调整位置
     * @remarks 按逆时针方向寻找合适位置
     */
    replacement() {
        if (this.auto) {
            switch (this.placement) {
                case "BOTTOM":
                    this.placement = "RIGHT";
                    break;
                case "RIGHT":
                    this.placement = "TOP";
                    break;
                case "TOP":
                    this.placement = "LEFT";
                    break;
                case "LEFT":
                    this.placement = "BOTTOM";
                    break;
            }
        }
    }
}


/***/ }),

/***/ "../dist/util/browser.js":
/*!*******************************!*\
  !*** ../dist/util/browser.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ie": () => (/* binding */ ie),
/* harmony export */   "ielt9": () => (/* binding */ ielt9),
/* harmony export */   "edge": () => (/* binding */ edge),
/* harmony export */   "webkit": () => (/* binding */ webkit),
/* harmony export */   "android": () => (/* binding */ android),
/* harmony export */   "android23": () => (/* binding */ android23),
/* harmony export */   "androidStock": () => (/* binding */ androidStock),
/* harmony export */   "opera": () => (/* binding */ opera),
/* harmony export */   "chrome": () => (/* binding */ chrome),
/* harmony export */   "gecko": () => (/* binding */ gecko),
/* harmony export */   "safari": () => (/* binding */ safari),
/* harmony export */   "phantom": () => (/* binding */ phantom),
/* harmony export */   "opera12": () => (/* binding */ opera12),
/* harmony export */   "win": () => (/* binding */ win),
/* harmony export */   "ie3d": () => (/* binding */ ie3d),
/* harmony export */   "webkit3d": () => (/* binding */ webkit3d),
/* harmony export */   "gecko3d": () => (/* binding */ gecko3d),
/* harmony export */   "any3d": () => (/* binding */ any3d),
/* harmony export */   "mobile": () => (/* binding */ mobile),
/* harmony export */   "mobileWebkit": () => (/* binding */ mobileWebkit),
/* harmony export */   "mobileWebkit3d": () => (/* binding */ mobileWebkit3d),
/* harmony export */   "msPointer": () => (/* binding */ msPointer),
/* harmony export */   "pointer": () => (/* binding */ pointer),
/* harmony export */   "touch": () => (/* binding */ touch),
/* harmony export */   "mobileOpera": () => (/* binding */ mobileOpera),
/* harmony export */   "mobileGecko": () => (/* binding */ mobileGecko),
/* harmony export */   "retina": () => (/* binding */ retina),
/* harmony export */   "passiveEvents": () => (/* binding */ passiveEvents),
/* harmony export */   "canvas": () => (/* binding */ canvas)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "../dist/util/util.js");

/*
 * NOT SUPPORT IE ANY MORE
 */
/*
 * @namespace Browser
 * @aka L.Browser
 *
 * A namespace with static properties for browser/feature detection used by Leaflet internally.
 *
 * @example
 *
 * ```js
 * if (L.Browser.ielt9) {
 *   alert('Upgrade your browser, dude!');
 * }
 * ```
 */
const style = document.documentElement.style;
// @property ie: Boolean; `true` for all Internet Explorer versions (not Edge).
const ie = 'ActiveXObject' in window;
// @property ielt9: Boolean; `true` for Internet Explorer versions less than 9.
const ielt9 = ie && !document.addEventListener;
// @property edge: Boolean; `true` for the Edge web browser.
const edge = 'msLaunchUri' in navigator && !('documentMode' in document);
// @property webkit: Boolean;
// `true` for webkit-based browsers like Chrome and Safari (including mobile versions).
const webkit = userAgentContains('webkit');
// @property android: Boolean
// `true` for any browser running on an Android platform.
const android = userAgentContains('android');
// @property android23: Boolean; `true` for browsers running on Android 2 or Android 3.
const android23 = userAgentContains('android 2') || userAgentContains('android 3');
/* See https://stackoverflow.com/a/17961266 for details on detecting stock Android */
// @property androidStock: Boolean; `true` for the Android stock browser (i.e. not Chrome)
const androidStock = (function () {
    const agent = /WebKit\/([0-9]+)|$/.exec(navigator.userAgent); // also matches AppleWebKit
    if (agent) {
        const webkitVer = parseInt(agent[1], 10);
        return android && userAgentContains('Google') && webkitVer < 537 && !('AudioNode' in window);
    }
    else {
        return false;
    }
}());
// @property opera: Boolean; `true` for the Opera browser
const opera = !!window.opera;
// @property chrome: Boolean; `true` for the Chrome browser.
const chrome = !edge && userAgentContains('chrome');
// @property gecko: Boolean; `true` for gecko-based browsers like Firefox.
const gecko = userAgentContains('gecko') && !webkit && !opera && !ie;
// @property safari: Boolean; `true` for the Safari browser.
const safari = !chrome && userAgentContains('safari');
const phantom = userAgentContains('phantom');
// @property opera12: Boolean
// `true` for the Opera browser supporting CSS transforms (version 12 or later).
const opera12 = 'OTransition' in style;
// @property win: Boolean; `true` when the browser is running in a Windows platform
const win = navigator.platform.indexOf('Win') === 0;
// @property ie3d: Boolean; `true` for all Internet Explorer versions supporting CSS transforms.
const ie3d = ie && ('transition' in style);
// @property webkit3d: Boolean; `true` for webkit-based browsers supporting CSS transforms.
const webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23;
// @property gecko3d: Boolean; `true` for gecko-based browsers supporting CSS transforms.
const gecko3d = 'MozPerspective' in style;
// @property any3d: Boolean
// `true` for all browsers supporting CSS transforms.
const any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;
// @property mobile: Boolean; `true` for all browsers running in a mobile device.
const mobile = typeof window.screen.orientation !== 'undefined' || userAgentContains('mobile');
// @property mobileWebkit: Boolean; `true` for all webkit-based browsers in a mobile device.
const mobileWebkit = mobile && webkit;
// @property mobileWebkit3d: Boolean
// `true` for all webkit-based browsers in a mobile device supporting CSS transforms.
const mobileWebkit3d = mobile && webkit3d;
// @property msPointer: Boolean
// `true` for browsers implementing the Microsoft touch events model (notably IE10).
const msPointer = !window.PointerEvent && window.MSPointerEvent;
// @property pointer: Boolean
// `true` for all browsers supporting [pointer events](https://msdn.microsoft.com/en-us/library/dn433244%28v=vs.85%29.aspx).
const pointer = !!(window.PointerEvent || msPointer);
// @property touch: Boolean
// `true` for all browsers supporting [touch events](https://developer.mozilla.org/docs/Web/API/Touch_events).
// This does not necessarily mean that the browser is running in a computer with
// a touchscreen, it only means that the browser is capable of understanding
// touch events.
// export const touch = !window.L_NO_TOUCH && (pointer || 'ontouchstart' in window ||
// 		(window.DocumentTouch && document instanceof window.DocumentTouch));
const touch = !window.L_NO_TOUCH;
// @property mobileOpera: Boolean; `true` for the Opera browser in a mobile device.
const mobileOpera = mobile && opera;
// @property mobileGecko: Boolean
// `true` for gecko-based browsers running in a mobile device.
const mobileGecko = mobile && gecko;
// @property retina: Boolean
// `true` for browsers on a high-resolution "retina" screen or on any screen when browser's display zoom is more than 100%.
const retina = window.devicePixelRatio > 1;
// @property passiveEvents: Boolean
// `true` for browsers that support passive events.
const passiveEvents = (function () {
    let supportsPassiveOption = false;
    try {
        const opts = Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassiveOption = true;
            }
        });
        window.addEventListener('testPassiveEventSupport', _util__WEBPACK_IMPORTED_MODULE_0__.falseFn, opts);
        window.removeEventListener('testPassiveEventSupport', _util__WEBPACK_IMPORTED_MODULE_0__.falseFn, opts);
    }
    catch (e) {
        // Errors can safely be ignored since this is only a browser support test.
    }
    return supportsPassiveOption;
}());
// @property canvas: Boolean
// `true` when the browser supports [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
const canvas = (function () {
    return !!document.createElement('canvas').getContext;
}());
function userAgentContains(str) {
    return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
}


/***/ }),

/***/ "../dist/util/color.js":
/*!*****************************!*\
  !*** ../dist/util/color.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Color": () => (/* binding */ Color)
/* harmony export */ });
/**
 * 颜色工具类
 * @remarks
 * 此处有太多可扩展内容，如更优雅的生成色带，给色带更多的配置项等等
 * 但由于相关内容，并非GIS API的关注重点，故未花太多精力扩展此内容
 * 各位可根据项目需求，自行发挥，达到更优雅美观的颜色渲染效果。
 * TODO: a lot of things to be done
 */
class Color {
    /**
     * 创建颜色
     * @param {number} r - red
     * @param {number} g - green
     * @param {number} b - blue
     * @param {number} a - alpha
     */
    constructor(r, g, b, a = 1) {
        /**
         * alpha
         */
        this.a = 1;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    /**
     * 输出rgba值
     * @return {string} rgba
     */
    toString() {
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
    }
    /**
     * 16进制表示法颜色 转十进制 R G B
     * @param {string} hex - 十六进制 #ffffff
     * @return {string} 十进制 R G B
     */
    static fromHex(hex) {
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/;
        hex = hex.toLowerCase();
        if (hex && reg.test(hex)) {
            //处理三位的颜色值
            if (hex.length === 4) {
                var sColorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += hex.slice(i, i + 1).concat(hex.slice(i, i + 1));
                }
                hex = sColorNew;
            }
            //处理六位的颜色值
            if (hex.length === 7) {
                hex += "ff";
            }
            let sColorChange = [];
            for (let i = 1; i < 9; i += 2) {
                sColorChange.push(parseInt("0x" + hex.slice(i, i + 2)));
            }
            return new Color(sColorChange[0], sColorChange[1], sColorChange[2], sColorChange[3] / 255);
        }
    }
    /**
     * 生成随机色带
     * @param {Color} start - 色带起始色
     * @param {Color} end - 色带终止色
     * @param {number} count - 随机颜色数，默认值10个
     * @return {Color} 生成随机色带
     */
    static ramp(start, end, count = 10) {
        const colors = [];
        for (let i = 0; i < count; i += 1) {
            colors.push(new Color((end.r - start.r) * i / count + start.r, (end.g - start.g) * i / count + start.g, (end.b - start.b) * i / count + start.b, (end.a - start.a) * i / count + start.a));
        }
        return colors;
    }
    /**
     * 生成随机色
     * @return {Color} 生成随机色
     */
    static random() {
        return new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
    }
}


/***/ }),

/***/ "../dist/util/dom-event.js":
/*!*********************************!*\
  !*** ../dist/util/dom-event.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "on": () => (/* binding */ on),
/* harmony export */   "off": () => (/* binding */ off),
/* harmony export */   "stopPropagation": () => (/* binding */ stopPropagation),
/* harmony export */   "disableScrollPropagation": () => (/* binding */ disableScrollPropagation),
/* harmony export */   "disableClickPropagation": () => (/* binding */ disableClickPropagation),
/* harmony export */   "preventDefault": () => (/* binding */ preventDefault),
/* harmony export */   "stop": () => (/* binding */ stop),
/* harmony export */   "getMousePosition": () => (/* binding */ getMousePosition),
/* harmony export */   "getWheelDelta": () => (/* binding */ getWheelDelta),
/* harmony export */   "fakeStop": () => (/* binding */ fakeStop),
/* harmony export */   "skipped": () => (/* binding */ skipped),
/* harmony export */   "isExternalTarget": () => (/* binding */ isExternalTarget),
/* harmony export */   "addListener": () => (/* binding */ on),
/* harmony export */   "removeListener": () => (/* binding */ off)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "../dist/util/util.js");
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./browser */ "../dist/util/browser.js");
/* harmony import */ var _dom_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom-util */ "../dist/util/dom-util.js");
/* harmony import */ var _common_screen_xy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/screen-xy */ "../dist/common/screen-xy.js");


// import { addPointerListener, removePointerListener } from './dom-event-pointer';
// import { addDoubleTapListener, removeDoubleTapListener } from './dom-event-double-tap';


/*
 * @namespace DomEvent
 * Utility functions to work with the [DOM events](https://developer.mozilla.org/docs/Web/API/Event), used by Leaflet internally.
 */
// Inspired by John Resig, Dean Edwards and YUI addEvent implementations.
// @function on(el: HTMLElement, types: String, fn: Function, context?: Object): this
// Adds a listener function (`fn`) to a particular DOM event type of the
// element `el`. You can optionally specify the context of the listener
// (object the `this` keyword will point to). You can also pass several
// space-separated types (e.g. `'click dblclick'`).
// @alternative
// @function on(el: HTMLElement, eventMap: Object, context?: Object): this
// Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
function on(obj, types, fn, context) {
    if (typeof types === 'object') {
        for (let type in types) {
            addOne(obj, type, types[type], fn);
        }
    }
    else {
        types = _util__WEBPACK_IMPORTED_MODULE_0__.splitWords(types);
        for (let i = 0, len = types.length; i < len; i++) {
            addOne(obj, types[i], fn, context);
        }
    }
    return context;
}
const eventsKey = '_leaflet_events';
// @function off(el: HTMLElement, types: String, fn: Function, context?: Object): this
// Removes a previously added listener function.
// Note that if you passed a custom context to on, you must pass the same
// context to `off` in order to remove the listener.
// @alternative
// @function off(el: HTMLElement, eventMap: Object, context?: Object): this
// Removes a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
function off(obj, types, fn, context) {
    if (typeof types === 'object') {
        for (let type in types) {
            removeOne(obj, type, types[type], fn);
        }
    }
    else if (types && fn) {
        types = _util__WEBPACK_IMPORTED_MODULE_0__.splitWords(types);
        for (let i = 0, len = types.length; i < len; i++) {
            removeOne(obj, types[i], fn, context);
        }
    }
    else {
        for (let j in obj[eventsKey]) {
            removeOne(obj, j, obj[eventsKey][j]);
        }
        delete obj[eventsKey];
    }
    return context;
}
function browserFiresNativeDblClick() {
    // See https://github.com/w3c/pointerevents/issues/171
    if (_browser__WEBPACK_IMPORTED_MODULE_1__.pointer) {
        return !(_browser__WEBPACK_IMPORTED_MODULE_1__.edge || _browser__WEBPACK_IMPORTED_MODULE_1__.safari);
    }
}
const mouseSubst = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout',
    wheel: !('onwheel' in window) && 'mousewheel'
};
function addOne(obj, type, fn, context) {
    var id = type + _util__WEBPACK_IMPORTED_MODULE_0__.stamp(fn) + (context ? '_' + _util__WEBPACK_IMPORTED_MODULE_0__.stamp(context) : '');
    if (obj[eventsKey] && obj[eventsKey][id]) {
        return context;
    }
    let handler = function (e) {
        return fn.call(context || obj, e || window.event);
    };
    const originalHandler = handler;
    if (_browser__WEBPACK_IMPORTED_MODULE_1__.pointer && type.indexOf('touch') === 0) {
        // Needs DomEvent.Pointer.js
        // addPointerListener(obj, type, handler, id);
    }
    else if (_browser__WEBPACK_IMPORTED_MODULE_1__.touch && (type === 'dblclick') && !browserFiresNativeDblClick()) {
        // addDoubleTapListener(obj, handler, id);
    }
    else if ('addEventListener' in obj) {
        if (type === 'touchstart' || type === 'touchmove' || type === 'wheel' || type === 'mousewheel') {
            obj.addEventListener(mouseSubst[type] || type, handler, _browser__WEBPACK_IMPORTED_MODULE_1__.passiveEvents ? { passive: false } : false);
        }
        else if (type === 'mouseenter' || type === 'mouseleave') {
            handler = function (e) {
                e = e || window.event;
                if (isExternalTarget(obj, e)) {
                    originalHandler(e);
                }
            };
            obj.addEventListener(mouseSubst[type], handler, false);
        }
        else {
            obj.addEventListener(type, originalHandler, false);
        }
    }
    else if ('attachEvent' in obj) {
        obj.attachEvent('on' + type, handler);
    }
    obj[eventsKey] = obj[eventsKey] || {};
    obj[eventsKey][id] = handler;
}
function removeOne(obj, type, fn, context) {
    var id = type + _util__WEBPACK_IMPORTED_MODULE_0__.stamp(fn) + (context ? '_' + _util__WEBPACK_IMPORTED_MODULE_0__.stamp(context) : ''), handler = obj[eventsKey] && obj[eventsKey][id];
    if (!handler) {
        return context;
    }
    if (_browser__WEBPACK_IMPORTED_MODULE_1__.pointer && type.indexOf('touch') === 0) {
        // removePointerListener(obj, type, id);
    }
    else if (_browser__WEBPACK_IMPORTED_MODULE_1__.touch && (type === 'dblclick') && !browserFiresNativeDblClick()) {
        // removeDoubleTapListener(obj, id);
    }
    else if ('removeEventListener' in obj) {
        obj.removeEventListener(mouseSubst[type] || type, handler, false);
    }
    else if ('detachEvent' in obj) {
        obj.detachEvent('on' + type, handler);
    }
    obj[eventsKey][id] = null;
}
// @function stopPropagation(ev: DOMEvent): this
// Stop the given event from propagation to parent elements. Used inside the listener functions:
// ```js
// L.DomEvent.on(div, 'click', function (ev) {
// 	L.DomEvent.stopPropagation(ev);
// });
// ```
function stopPropagation(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    else if (e.originalEvent) { // In case of Leaflet event.
        e.originalEvent._stopped = true;
    }
    else {
        e.cancelBubble = true;
    }
    skipped(e);
    // return this;
}
// @function disableScrollPropagation(el: HTMLElement): this
// Adds `stopPropagation` to the element's `'wheel'` events (plus browser variants).
function disableScrollPropagation(el) {
    addOne(el, 'wheel', stopPropagation);
    // return this;
}
// @function disableClickPropagation(el: HTMLElement): this
// Adds `stopPropagation` to the element's `'click'`, `'dblclick'`,
// `'mousedown'` and `'touchstart'` events (plus browser variants).
function disableClickPropagation(el) {
    on(el, 'mousedown touchstart dblclick', stopPropagation);
    addOne(el, 'click', fakeStop);
    // return this;
}
// @function preventDefault(ev: DOMEvent): this
// Prevents the default action of the DOM Event `ev` from happening (such as
// following a link in the href of the a element, or doing a POST request
// with page reload when a `<form>` is submitted).
// Use it inside listener functions.
function preventDefault(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    else {
        e.returnValue = false;
    }
    // return this;
}
// @function stop(ev: DOMEvent): this
// Does `stopPropagation` and `preventDefault` at the same time.
function stop(e) {
    preventDefault(e);
    stopPropagation(e);
    // return this;
}
// @function getMousePosition(ev: DOMEvent, container?: HTMLElement): Point
// Gets normalized mouse position from a DOM event relative to the
// `container` (border excluded) or to the whole page if not specified.
function getMousePosition(e, container) {
    if (!container) {
        return new _common_screen_xy__WEBPACK_IMPORTED_MODULE_3__.ScreenXY(e.clientX, e.clientY);
    }
    const scale = (0,_dom_util__WEBPACK_IMPORTED_MODULE_2__.getScale)(container), offset = scale.boundingClientRect; // left and top  values are in page scale (like the event clientX/Y)
    return new _common_screen_xy__WEBPACK_IMPORTED_MODULE_3__.ScreenXY(
    // offset.left/top values are in page scale (like clientX/Y),
    // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
    (e.clientX - offset.left) / scale.x - container.clientLeft, (e.clientY - offset.top) / scale.y - container.clientTop);
}
// Chrome on Win scrolls double the pixels as in other platforms (see #4538),
// and Firefox scrolls device pixels, not CSS pixels
const wheelPxFactor = (_browser__WEBPACK_IMPORTED_MODULE_1__.win && _browser__WEBPACK_IMPORTED_MODULE_1__.chrome) ? 2 * window.devicePixelRatio :
    _browser__WEBPACK_IMPORTED_MODULE_1__.gecko ? window.devicePixelRatio : 1;
// @function getWheelDelta(ev: DOMEvent): Number
// Gets normalized wheel delta from a wheel DOM event, in vertical
// pixels scrolled (negative if scrolling down).
// Events from pointing devices without precise scrolling are mapped to
// a best guess of 60 pixels.
function getWheelDelta(e) {
    return (_browser__WEBPACK_IMPORTED_MODULE_1__.edge) ? e.wheelDeltaY / 2 : // Don't trust window-geometry-based delta
        (e.deltaY && e.deltaMode === 0) ? -e.deltaY / wheelPxFactor : // Pixels
            (e.deltaY && e.deltaMode === 1) ? -e.deltaY * 20 : // Lines
                (e.deltaY && e.deltaMode === 2) ? -e.deltaY * 60 : // Pages
                    (e.deltaX || e.deltaZ) ? 0 : // Skip horizontal/depth wheel events
                        e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : // Legacy IE pixels
                            (e.detail && Math.abs(e.detail) < 32765) ? -e.detail * 20 : // Legacy Moz lines
                                e.detail ? e.detail / -32765 * 60 : // Legacy Moz pages
                                    0;
}
const skipEvents = {};
function fakeStop(e) {
    // fakes stopPropagation by setting a special event flag, checked/reset with skipped(e)
    skipEvents[e.type] = true;
}
function skipped(e) {
    const events = skipEvents[e.type];
    // reset when checking, as it's only used in map container and propagates outside of the map
    skipEvents[e.type] = false;
    return events;
}
// check if element really left/entered the event target (for mouseenter/mouseleave)
function isExternalTarget(el, e) {
    var related = e.relatedTarget;
    if (!related) {
        return true;
    }
    try {
        while (related && (related !== el)) {
            related = related.parentNode;
        }
    }
    catch (err) {
        return false;
    }
    return (related !== el);
}
// @function addListener(…): this
// Alias to [`L.DomEvent.on`](#domevent-on)

// @function removeListener(…): this
// Alias to [`L.DomEvent.off`](#domevent-off)



/***/ }),

/***/ "../dist/util/dom-util.js":
/*!********************************!*\
  !*** ../dist/util/dom-util.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TRANSFORM": () => (/* binding */ TRANSFORM),
/* harmony export */   "TRANSITION": () => (/* binding */ TRANSITION),
/* harmony export */   "TRANSITION_END": () => (/* binding */ TRANSITION_END),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "getStyle": () => (/* binding */ getStyle),
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "toFront": () => (/* binding */ toFront),
/* harmony export */   "toBack": () => (/* binding */ toBack),
/* harmony export */   "hasClass": () => (/* binding */ hasClass),
/* harmony export */   "addClass": () => (/* binding */ addClass),
/* harmony export */   "removeClass": () => (/* binding */ removeClass),
/* harmony export */   "setClass": () => (/* binding */ setClass),
/* harmony export */   "getClass": () => (/* binding */ getClass),
/* harmony export */   "setOpacity": () => (/* binding */ setOpacity),
/* harmony export */   "testProp": () => (/* binding */ testProp),
/* harmony export */   "setTransform": () => (/* binding */ setTransform),
/* harmony export */   "setPosition": () => (/* binding */ setPosition),
/* harmony export */   "getPosition": () => (/* binding */ getPosition),
/* harmony export */   "getSizedParentNode": () => (/* binding */ getSizedParentNode),
/* harmony export */   "getScale": () => (/* binding */ getScale)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "../dist/util/util.js");
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./browser */ "../dist/util/browser.js");
/* harmony import */ var _common_screen_xy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/screen-xy */ "../dist/common/screen-xy.js");



/*
 * @namespace DomUtil
 *
 * Utility functions to work with the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model)
 * tree, used by Leaflet internally.
 *
 * Most functions expecting or returning a `HTMLElement` also work for
 * SVG elements. The only difference is that classes refer to CSS classes
 * in HTML and SVG classes in SVG.
 */
// @property TRANSFORM: String
// Vendor-prefixed transform style name (e.g. `'webkitTransform'` for WebKit).
const TRANSFORM = testProp(['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform']);
// webkitTransition comes first because some browser versions that drop vendor prefix don't do
// the same for the transitionend event, in particular the Android 4.1 stock browser
// @property TRANSITION: String
// Vendor-prefixed transition style name.
const TRANSITION = testProp(['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);
// @property TRANSITION_END: String
// Vendor-prefixed transitionend event name.
const TRANSITION_END = TRANSITION === 'webkitTransition' || TRANSITION === 'OTransition' ? TRANSITION + 'End' : 'transitionend';
// @function get(id: String|HTMLElement): HTMLElement
// Returns an element given its DOM id, or returns the element itself
// if it was passed directly.
function get(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}
// @function getStyle(el: HTMLElement, styleAttrib: String): String
// Returns the value for a certain style attribute on an element,
// including computed values or values set through CSS.
function getStyle(el, style) {
    let value = el.style[style] || (el.currentStyle && el.currentStyle[style]);
    if ((!value || value === 'auto') && document.defaultView) {
        const css = document.defaultView.getComputedStyle(el, null);
        value = css ? css[style] : null;
    }
    return value === 'auto' ? null : value;
}
// @function create(tagName: String, className?: String, container?: HTMLElement): HTMLElement
// Creates an HTML element with `tagName`, sets its class to `className`, and optionally appends it to `container` element.
function create(tagName, className, container) {
    const el = document.createElement(tagName);
    el.className = className || '';
    if (container) {
        container.appendChild(el);
    }
    return el;
}
// @function remove(el: HTMLElement)
// Removes `el` from its parent element
function remove(el) {
    const parent = el.parentNode;
    if (parent) {
        parent.removeChild(el);
    }
}
// @function empty(el: HTMLElement)
// Removes all of `el`'s children elements from `el`
function empty(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}
// @function toFront(el: HTMLElement)
// Makes `el` the last child of its parent, so it renders in front of the other children.
function toFront(el) {
    const parent = el.parentNode;
    if (parent && parent.lastChild !== el) {
        parent.appendChild(el);
    }
}
// @function toBack(el: HTMLElement)
// Makes `el` the first child of its parent, so it renders behind the other children.
function toBack(el) {
    const parent = el.parentNode;
    if (parent && parent.firstChild !== el) {
        parent.insertBefore(el, parent.firstChild);
    }
}
// @function hasClass(el: HTMLElement, name: String): Boolean
// Returns `true` if the element's class attribute contains `name`.
function hasClass(el, name) {
    if (el.classList !== undefined) {
        return el.classList.contains(name);
    }
    const className = getClass(el);
    return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
}
// @function addClass(el: HTMLElement, name: String)
// Adds `name` to the element's class attribute.
function addClass(el, name) {
    if (el.classList !== undefined) {
        const classes = _util__WEBPACK_IMPORTED_MODULE_0__.splitWords(name);
        for (let i = 0, len = classes.length; i < len; i++) {
            el.classList.add(classes[i]);
        }
    }
    else if (!hasClass(el, name)) {
        const className = getClass(el);
        setClass(el, (className ? className + ' ' : '') + name);
    }
}
// @function removeClass(el: HTMLElement, name: String)
// Removes `name` from the element's class attribute.
function removeClass(el, name) {
    if (el.classList !== undefined) {
        el.classList.remove(name);
    }
    else {
        setClass(el, _util__WEBPACK_IMPORTED_MODULE_0__.trim((' ' + getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
    }
}
// @function setClass(el: HTMLElement, name: String)
// Sets the element's class.
function setClass(el, name) {
    if (el.className.baseVal === undefined) {
        el.className = name;
    }
    else {
        // in case of SVG element
        el.className.baseVal = name;
    }
}
// @function getClass(el: HTMLElement): String
// Returns the element's class.
function getClass(el) {
    // Check if the element is an SVGElementInstance and use the correspondingElement instead
    // (Required for linked SVG elements in IE11.)
    if (el.correspondingElement) {
        el = el.correspondingElement;
    }
    return el.className.baseVal === undefined ? el.className : el.className.baseVal;
}
// @function setOpacity(el: HTMLElement, opacity: Number)
// Set the opacity of an element (including old IE support).
// `opacity` must be a number from `0` to `1`.
function setOpacity(el, value) {
    el.style.opacity = value.toString();
}
// @function testProp(props: String[]): String|false
// Goes through the array of style names and returns the first name
// that is a valid style name for an element. If no such name is found,
// it returns false. Useful for vendor-prefixed styles like `transform`.
function testProp(props) {
    const style = document.documentElement.style;
    for (let i = 0; i < props.length; i++) {
        if (props[i] in style) {
            return props[i];
        }
    }
    return false;
}
// @function setTransform(el: HTMLElement, offset: ScreenXY, scale?: Number)
// Resets the 3D CSS transform of `el` so it is translated by `offset` pixels
// and optionally scaled by `scale`. Does not have an effect if the
// browser doesn't support 3D CSS transforms.
function setTransform(el, offset, scale) {
    const pos = offset || new _common_screen_xy__WEBPACK_IMPORTED_MODULE_2__.ScreenXY(0, 0);
    if (TRANSFORM) {
        el.style[TRANSFORM] =
            (_browser__WEBPACK_IMPORTED_MODULE_1__.ie3d ?
                'translate(' + pos.x + 'px,' + pos.y + 'px)' :
                'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
                (scale ? ' scale(' + scale + ')' : '');
    }
}
// @function setPosition(el: HTMLElement, position: ScreenXY)
// Sets the position of `el` to coordinates specified by `position`,
// using CSS translate or top/left positioning depending on the browser
// (used by Leaflet internally to position its layers).
function setPosition(el, position) {
    /*eslint-disable */
    el._leaflet_pos = position;
    /* eslint-enable */
    if (_browser__WEBPACK_IMPORTED_MODULE_1__.any3d) {
        setTransform(el, position);
    }
    else {
        el.style.left = position.x + 'px';
        el.style.top = position.y + 'px';
    }
}
// @function getPosition(el: HTMLElement): ScreenXY
// Returns the coordinates of an element previously positioned with setPosition.
function getPosition(el) {
    // this method is only used for elements previously positioned using setPosition,
    // so it's safe to cache the position for performance
    return el._leaflet_pos || new _common_screen_xy__WEBPACK_IMPORTED_MODULE_2__.ScreenXY(0, 0);
}
// @function getSizedParentNode(el: HTMLElement): HTMLElement
// Finds the closest parent node which size (width and height) is not null.
function getSizedParentNode(element) {
    do {
        element = element.parentNode;
    } while ((!element.offsetWidth || !element.offsetHeight) && element !== document.body);
    return element;
}
// @function getScale(el: HTMLElement): Object
// Computes the CSS scale currently applied on the element.
// Returns an object with `x` and `y` members as horizontal and vertical scales respectively,
// and `boundingClientRect` as the result of [`getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).
function getScale(element) {
    const rect = element.getBoundingClientRect(); // Read-only in old browsers.
    return {
        x: rect.width / element.offsetWidth || 1,
        y: rect.height / element.offsetHeight || 1,
        boundingClientRect: rect
    };
}


/***/ }),

/***/ "../dist/util/line-util.js":
/*!*********************************!*\
  !*** ../dist/util/line-util.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "simplify": () => (/* binding */ simplify),
/* harmony export */   "pointToSegmentDistance": () => (/* binding */ pointToSegmentDistance),
/* harmony export */   "closestPointOnSegment": () => (/* binding */ closestPointOnSegment),
/* harmony export */   "clipSegment": () => (/* binding */ clipSegment),
/* harmony export */   "_getEdgeIntersection": () => (/* binding */ _getEdgeIntersection),
/* harmony export */   "_getBitCode": () => (/* binding */ _getBitCode),
/* harmony export */   "_sqClosestPointOnSegment": () => (/* binding */ _sqClosestPointOnSegment)
/* harmony export */ });
/* harmony import */ var _common_screen_xy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/screen-xy */ "../dist/common/screen-xy.js");

/*
 * @namespace LineUtil
 *
 * Various utility functions for polyline points processing, used by Leaflet internally to make polylines lightning-fast.
 */
// Simplify polyline with vertex reduction and Douglas-Peucker simplification.
// Improves rendering performance dramatically by lessening the number of points to draw.
// @function simplify(points: Point[], tolerance: Number): Point[]
// Dramatically reduces the number of points in a polyline while retaining
// its shape and returns a new array of simplified points, using the
// [Douglas-Peucker algorithm](http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm).
// Used for a huge performance boost when processing/displaying Leaflet polylines for
// each zoom level and also reducing visual noise. tolerance affects the amount of
// simplification (lesser value means higher quality but slower and with more points).
// Also released as a separated micro-library [Simplify.js](http://mourner.github.com/simplify-js/).
function simplify(points, tolerance) {
    if (!tolerance || !points.length) {
        return points.slice();
    }
    let sqTolerance = tolerance * tolerance;
    // stage 1: vertex reduction
    points = _reducePoints(points, sqTolerance);
    // stage 2: Douglas-Peucker simplification
    points = _simplifyDP(points, sqTolerance);
    return points;
}
// @function pointToSegmentDistance(p: Point, p1: Point, p2: Point): Number
// Returns the distance between point `p` and segment `p1` to `p2`.
function pointToSegmentDistance(p, p1, p2) {
    return Math.sqrt(_sqClosestPointOnSegment(p, p1, p2, true));
}
// @function closestPointOnSegment(p: Point, p1: Point, p2: Point): Number
// Returns the closest point from a point `p` on a segment `p1` to `p2`.
function closestPointOnSegment(p, p1, p2) {
    return _sqClosestPointOnSegment(p, p1, p2);
}
// Douglas-Peucker simplification, see http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm
function _simplifyDP(points, sqTolerance) {
    let len = points.length, ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array, markers = new ArrayConstructor(len);
    markers[0] = markers[len - 1] = 1;
    _simplifyDPStep(points, markers, sqTolerance, 0, len - 1);
    var i, newPoints = [];
    for (i = 0; i < len; i++) {
        if (markers[i]) {
            newPoints.push(points[i]);
        }
    }
    return newPoints;
}
function _simplifyDPStep(points, markers, sqTolerance, first, last) {
    let maxSqDist = 0, index, i, sqDist;
    for (i = first + 1; i <= last - 1; i++) {
        sqDist = _sqClosestPointOnSegment(points[i], points[first], points[last], true);
        if (typeof sqDist === 'number' && sqDist > maxSqDist) {
            index = i;
            maxSqDist = sqDist;
        }
    }
    if (index !== undefined && maxSqDist > sqTolerance) {
        markers[index] = 1;
        _simplifyDPStep(points, markers, sqTolerance, first, index);
        _simplifyDPStep(points, markers, sqTolerance, index, last);
    }
}
// reduce points that are too close to each other to a single point
function _reducePoints(points, sqTolerance) {
    var reducedPoints = [points[0]];
    for (var i = 1, prev = 0, len = points.length; i < len; i++) {
        if (_sqDist(points[i], points[prev]) > sqTolerance) {
            reducedPoints.push(points[i]);
            prev = i;
        }
    }
    if (prev < len - 1) {
        reducedPoints.push(points[len - 1]);
    }
    return reducedPoints;
}
let _lastCode;
// @function clipSegment(a: Point, b: Point, bounds: Bounds, useLastCode?: Boolean, round?: Boolean): Point[]|Boolean
// Clips the segment a to b by rectangular bounds with the
// [Cohen-Sutherland algorithm](https://en.wikipedia.org/wiki/Cohen%E2%80%93Sutherland_algorithm)
// (modifying the segment points directly!). Used by Leaflet to only show polyline
// points that are on the screen or near, increasing performance.
function clipSegment(a, b, bounds, useLastCode, round) {
    let codeA = useLastCode ? _lastCode : _getBitCode(a, bounds), codeB = _getBitCode(b, bounds), codeOut, p, newCode;
    // save 2nd code to avoid calculating it on the next segment
    _lastCode = codeB;
    while (true) {
        // if a,b is inside the clip window (trivial accept)
        if (!(codeA | codeB)) {
            return [a, b];
        }
        // if a,b is outside the clip window (trivial reject)
        if (codeA & codeB) {
            return false;
        }
        // other cases
        codeOut = codeA || codeB;
        p = _getEdgeIntersection(a, b, codeOut, bounds, round);
        newCode = _getBitCode(p, bounds);
        if (codeOut === codeA) {
            a = p;
            codeA = newCode;
        }
        else {
            b = p;
            codeB = newCode;
        }
    }
}
function _getEdgeIntersection(a, b, code, bounds, round) {
    var dx = b.x - a.x, dy = b.y - a.y, min = bounds.min, max = bounds.max, x = 0, y = 0;
    if (code & 8) { // top
        x = a.x + dx * (max.y - a.y) / dy;
        y = max.y;
    }
    else if (code & 4) { // bottom
        x = a.x + dx * (min.y - a.y) / dy;
        y = min.y;
    }
    else if (code & 2) { // right
        x = max.x;
        y = a.y + dy * (max.x - a.x) / dx;
    }
    else if (code & 1) { // left
        x = min.x;
        y = a.y + dy * (min.x - a.x) / dx;
    }
    return round ? new _common_screen_xy__WEBPACK_IMPORTED_MODULE_0__.ScreenXY(Math.round(x), Math.round(y)) : new _common_screen_xy__WEBPACK_IMPORTED_MODULE_0__.ScreenXY(x, y);
}
function _getBitCode(p, bounds) {
    var code = 0;
    if (p.x < bounds.min.x) { // left
        code |= 1;
    }
    else if (p.x > bounds.max.x) { // right
        code |= 2;
    }
    if (p.y < bounds.min.y) { // bottom
        code |= 4;
    }
    else if (p.y > bounds.max.y) { // top
        code |= 8;
    }
    return code;
}
// square distance (to avoid unnecessary Math.sqrt calls)
function _sqDist(p1, p2) {
    var dx = p2.x - p1.x, dy = p2.y - p1.y;
    return dx * dx + dy * dy;
}
// return closest point on segment or distance to that point
function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
    var x = p1.x, y = p1.y, dx = p2.x - x, dy = p2.y - y, dot = dx * dx + dy * dy, t;
    if (dot > 0) {
        t = ((p.x - x) * dx + (p.y - y) * dy) / dot;
        if (t > 1) {
            x = p2.x;
            y = p2.y;
        }
        else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
    }
    dx = p.x - x;
    dy = p.y - y;
    return sqDist ? dx * dx + dy * dy : new _common_screen_xy__WEBPACK_IMPORTED_MODULE_0__.ScreenXY(x, y);
}


/***/ }),

/***/ "../dist/util/util.js":
/*!****************************!*\
  !*** ../dist/util/util.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lastId": () => (/* binding */ lastId),
/* harmony export */   "stamp": () => (/* binding */ stamp),
/* harmony export */   "wrapNum": () => (/* binding */ wrapNum),
/* harmony export */   "falseFn": () => (/* binding */ falseFn),
/* harmony export */   "formatNum": () => (/* binding */ formatNum),
/* harmony export */   "trim": () => (/* binding */ trim),
/* harmony export */   "splitWords": () => (/* binding */ splitWords),
/* harmony export */   "emptyImageUrl": () => (/* binding */ emptyImageUrl),
/* harmony export */   "requestFn": () => (/* binding */ requestFn),
/* harmony export */   "cancelFn": () => (/* binding */ cancelFn),
/* harmony export */   "requestAnimFrame": () => (/* binding */ requestAnimFrame),
/* harmony export */   "cancelAnimFrame": () => (/* binding */ cancelAnimFrame),
/* harmony export */   "template": () => (/* binding */ template)
/* harmony export */ });
// @property lastId: Number
// Last unique ID used by [`stamp()`](#util-stamp)
var lastId = 0;
// @function stamp(obj: Object): Number
// Returns the unique ID of an object, assigning it one if it doesn't have it.
function stamp(obj) {
    /*eslint-disable */
    obj._leaflet_id = obj._leaflet_id || ++lastId;
    return obj._leaflet_id;
    /* eslint-enable */
}
// @function stamp(obj: Object): Number
// Returns the unique ID of an object, assigning it one if it doesn't have it.
// export function stamp(obj: any): string {
// 	/*eslint-disable */
// 	obj._leaflet_id = obj._leaflet_id || (new Date().getTime() / 1000 | 0).toString(16) + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
// 		return (Math.random() * 16 | 0).toString(16);
// 	}).toLowerCase();
// 	return obj._leaflet_id;
// 	/* eslint-enable */
// }
// @function wrapNum(num: Number, range: Number[], includeMax?: Boolean): Number
// Returns the number `num` modulo `range` in such a way so it lies within
// `range[0]` and `range[1]`. The returned value will be always smaller than
// `range[1]` unless `includeMax` is set to `true`.
function wrapNum(x, range, includeMax = false) {
    var max = range[1], min = range[0], d = max - min;
    return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
}
// @function falseFn(): Function
// Returns a function which always returns `false`.
function falseFn() { return false; }
// @function formatNum(num: Number, digits?: Number): Number
// Returns the number `num` rounded to `digits` decimals, or to 6 decimals by default.
function formatNum(num, digits = 6) {
    const pow = Math.pow(10, digits);
    return Math.round(num * pow) / pow;
}
// @function trim(str: String): String
// Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}
// @function splitWords(str: String): String[]
// Trims and splits the string on whitespace and returns the array of parts.
function splitWords(str) {
    return trim(str).split(/\s+/);
}
// @property emptyImageUrl: String
// Data URI string containing a base64-encoded empty GIF image.
// Used as a hack to free memory from unused images on WebKit-powered
// mobile devices (by setting image `src` to this string).
var emptyImageUrl = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
// inspired by http://paulirish.com/2011/requestanimationframe-for-smart-animating/
function getPrefixed(name) {
    return window['webkit' + name] || window['moz' + name] || window['ms' + name];
}
var requestFn = window.requestAnimationFrame || getPrefixed('RequestAnimationFrame');
var cancelFn = window.cancelAnimationFrame || getPrefixed('CancelAnimationFrame') ||
    getPrefixed('CancelRequestAnimationFrame') || function (id) { window.clearTimeout(id); };
// @function requestAnimFrame(fn: Function, context?: Object, immediate?: Boolean): Number
// Schedules `fn` to be executed when the browser repaints. `fn` is bound to
// `context` if given. When `immediate` is set, `fn` is called immediately if
// the browser doesn't have native support for
// [`window.requestAnimationFrame`](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame),
// otherwise it's delayed. Returns a request ID that can be used to cancel the request.
function requestAnimFrame(fn, context, immediate) {
    return requestFn.call(window, fn.bind(context));
}
// @function cancelAnimFrame(id: Number): undefined
// Cancels a previous `requestAnimFrame`. See also [window.cancelAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/cancelAnimationFrame).
function cancelAnimFrame(id) {
    if (id) {
        cancelFn.call(window, id);
    }
}
// @function template(str: String, data: Object): String
// Simple templating facility, accepts a template string of the form `'Hello {a}, {b}'`
// and a data object like `{a: 'foo', b: 'bar'}`, returns evaluated string
// `('Hello foo, bar')`. You can also specify functions instead of strings for
// data values — they will be evaluated passing `data` as an argument.
function template(str, data) {
    return str.replace(/\{ *([\w_ -]+) *\}/g, function (str, key) {
        var value = data[key];
        if (value === undefined) {
            throw new Error('No value provided for variable ' + str);
        }
        else if (typeof value === 'function') {
            value = value(data);
        }
        return value;
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************!*\
  !*** ./subway.js ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dist */ "../dist/index.js");



window.load = async () => {

  //创建地图
  const map = new _dist__WEBPACK_IMPORTED_MODULE_0__.Map("foo");
  //加载OSM切片
  const tile = new _dist__WEBPACK_IMPORTED_MODULE_0__.Tile('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
  tile.addTo(map);

  map.setView(new _dist__WEBPACK_IMPORTED_MODULE_0__.LatLng(39.909186, 116.397411), 12);

  const geojsonAdapter = new _dist__WEBPACK_IMPORTED_MODULE_0__.GeoJSONAdapter(_dist__WEBPACK_IMPORTED_MODULE_0__.GeometryType.Polyline, "https://raw.githubusercontent.com/shengzheng1981/green-leaf/master/demo/assets/geojson/line1.json");
  // const geojsonAdapter = new GeoJSONAdapter(GeometryType.Polygon, "assets/geojson/beijing.json");
  //新建要素类
  const featureClass = new _dist__WEBPACK_IMPORTED_MODULE_0__.FeatureClass(_dist__WEBPACK_IMPORTED_MODULE_0__.GeometryType.Polyline);
  //新建字段
  const field = new _dist__WEBPACK_IMPORTED_MODULE_0__.Field("name", _dist__WEBPACK_IMPORTED_MODULE_0__.FieldType.String);
  featureClass.addField(field);
  await featureClass.load(geojsonAdapter);
  //新建矢量图层
  const featureLayer = new _dist__WEBPACK_IMPORTED_MODULE_0__.FeatureLayer();
  featureLayer.featureClass = featureClass;
  //设置渲染方式——分类渲染
  const renderer = new _dist__WEBPACK_IMPORTED_MODULE_0__.SimpleRenderer();
  renderer.symbol = new _dist__WEBPACK_IMPORTED_MODULE_0__.SimpleLineSymbol();
  renderer.symbol.strokeStyle = "rgb(192,58,47)";
  renderer.symbol.weight = 3;
  featureLayer.renderer = renderer;
  featureLayer.zoom = [5, 20];

  //添加矢量图层
  map.addFeatureLayer(featureLayer);
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map