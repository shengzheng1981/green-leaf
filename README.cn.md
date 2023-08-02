# green-leaf

#### 简述
这是一款在Leaflet基础上重构后完成的超轻量级GIS API。它的主要特点在于类与接口的重组织，以更符合GIS数据组织的方式来设计类与接口。此外，也可认为其是精简并抛弃SVG渲染方式，且换用TypeScript后的Leaflet。

#### 安装
1.  npm install green-leaf
2.  `<link rel="stylesheet" type="text/css" href="leaflet.css">`

#### 相同与不同
与Leaflet的相同与不同点如下：
1.  底层逻辑就是Leaflet的TypeScript版，包括地图的漫游缩放以及Canvas渲染等；
2.  删除Leaflet原有的SVG渲染方式；
3.  精简原有grid以及tile相关代码实现；
4.  改变原有Layer的图层概念，原为接近与PhotoShop下图层概念，现为对应多数GIS软件中的图层概念；
5.  按GIS分矢量与栅格两种数据形式，分别设计FeatureLayer及RasterLayer与其对应；
6.  借鉴ArcGIS中Graphic与Feature两者概念的区别来组织图形与矢量要素，Graphic对应图形，Feature对应矢量要素，Graphic = Geometry + Symbol，Feature = Geometry + Properties；
7.  增加FeatureClass以及Adapter来对接矢量数据的读取及数据组织，当前暂实现GeoJSON格式的读取，后期可继承Adapter来扩展多种数据格式的读取；
8.  增加Symbol/PointSymbol/LineSymbol/FillSymbol等一系列类，来实现要素用不同符号来完成渲染，当前暂实现SimplePointSymbol/SimpleLineSymbol/SimpleFillSymbol，后期可继承扩展点线面符号；
9.  增加SimpleMarkerSymbol，使得Marker也能在Canvas下进行渲染，并将SimpleMarkerSymbol设计为点符号的一种，而非新的渲染要素或图层；
10. 增加Label用于FeatureLayer矢量图层标记，通过继承Collision类来完成标记碰撞冲突检测，当前SimpleCollision暂实现简单碰撞冲突；
11. 增加Renderer用于FeatureLayer矢量图层渲染方式设置，通过继承Renderer类来自定义渲染方式，当前实现SimpleRenderer单一渲染，CategoryRenderer分类渲染，ClassRenderer分级渲染；
12. 增加Raster用于RasterLayer设置像素数据源，当前已完成IDW插值、热力图，克里金插值有待完善；
13. 拆分原Point类，区分三类不同坐标，LatLng经纬度坐标，PlaneXY平面坐标，ScreenXY像素坐标（屏幕像素坐标和世界像素坐标）。

#### UML
![image](https://github.com/shengzheng1981/green-leaf/blob/master/green-leaf-uml.png)


#### 所有类中英对照
1. Adapter            数据适配基类
2. GeoJSONAdapter     GeoJSON数据适配类
3. Raster             栅格数据基类
4. Heat               热力图
5. IDW                IDW插值图
6. Kriging            克里金插值图
7. BaseObject         基类
8. DraggableObject    可拖拽对象基类
9. EventedObject      可监听事件对象基类
10. HandlerObject     可处理Map事件对象基类
11. LatLng            经纬度坐标
12. XY                XY坐标基类
13. PlaneXY           平面坐标基类
14. ScreenXY          像素坐标基类
15. Bounds            坐标范围基类
16. LatLngBounds      经纬度坐标范围
17. PlaneBounds       平面坐标范围
18. ScreenBounds      像素坐标范围
19. Projection        投影基类
20. LonLat            无投影
21. Mercator          墨卡托投影
22. SphericalMercator 球体墨卡托投影
23. Transformation    变换
24. CRS               坐标系基类
25. Earth             地球坐标系
26. EPSG4326          4326坐标系
27. EPSG3857          3857坐标系
28. Feature           矢量要素
29. FeatureClass      矢量数据类
30. Field             矢量数据字段
31. Geometry          图形基类
32. Point             点
33. Polyline          线
34. Polygon           面
35. MultiplePoint     多点
36. MultiplePolyline  多线
37. MultiplePolygon   多面
38. Graphic           图形
39. Grid              网格数据基类
40. Tile              切片数据类
41. Label             图层标注配置
42. Collision         标注冲突检测
43. NullCollision     标注无冲突检测
44. SimpleCollision   标注简单冲突检测
45. Layer             图层基类
46. FeatureLayer      矢量图层
47. RasterLayer       栅格图层
48. GraphicLayer      图形图层
49. Map               地图
50. Canvas            画布
51. Renderer          渲染方式基类
52. SimpleRenderer    单一渲染方式
53. CategoryRenderer  分类渲染方式
54. ClassRenderer     分级渲染方式
55. Symbol            符号基类
56. PointSymbol       点符号基类
57. LineSymbol        线符号基类
58. FillSymbol        面符号基类
59. SimplePointSymbol 简单点符号类
60. SimpleLineSymbol  简单线符号类
61. SimpleFillSymbol  简单面符号类
62. SimpleMarkerSymbol标记点符号类

#### 运行Demo
1. cd demo
2. 修改webpack.config.js入口文件entry
3. webpack
4. run index.html

#### Stackblitz Demo
1. [Basic Demo](https://stackblitz.com/edit/typescript-pqsv7e)
2. [Polyline Demo](https://stackblitz.com/edit/typescript-kxjxcv)
3. [Polygon Demo](https://stackblitz.com/edit/typescript-bt9p2a)
4. [Graphic Layer Demo](https://stackblitz.com/edit/typescript-okbryo)
5. [Marker Symbol Demo](https://stackblitz.com/edit/typescript-3x4nzu)
6. [Feature Layer Demo](https://stackblitz.com/edit/typescript-2ahnqt)
7. [Category Renderer Demo](https://stackblitz.com/edit/typescript-vkw4cu)
8. [Class Renderer Demo](https://stackblitz.com/edit/typescript-k9vss4)
9. [GeoJSON Demo](https://stackblitz.com/edit/typescript-1nhpgr)
10. [Label Demo](https://stackblitz.com/edit/typescript-zawabd)
11. [IDW Demo](https://stackblitz.com/edit/typescript-wwl1pg)
12. [Heat Demo](https://stackblitz.com/edit/typescript-x16ccq)

