# green-leaf

#### Description
This is an ultra-lightweight GIS API that is refactored on the basis of Leaflet. Its main feature is the reorganization of classes and interfaces, which are designed in a way that is more in line with GIS data organization. In addition, it can also be considered as Leaflet after streamlining and abandoning the SVG rendering method, and switching to TypeScript.

#### Installation
1.  npm install green-leaf
2.  `<link rel="stylesheet" type="text/css" href="leaflet.css">`

#### Refactor Content
The similarities and differences with Leaflet are as follows:
1.  The underlying logic is the TypeScript version of Leaflet, including map roaming zoom and canvas rendering, etc.
2.  Delete Leaflet's original SVG rendering method.
3.  Simplify the original grid and tile related code implementation.
4.  Change the layer concept of the original Layer, which was close to the layer concept under PhotoShop, and now corresponds to the layer concept in most GIS software.
5.  According to GIS, there are two data forms: vector and raster, and respectively design FeatureLayer and RasterLayer to correspond to them.
6.  Drawing on the difference between the concepts of Graphic and Feature in ArcGIS to organize graphics and vector elements, Graphic corresponds to spatial graphics, Feature corresponds to elements(objects), Graphic = Geometry + Symbol, Feature = Geometry + Properties.
7.  Add FeatureClass and Adapter to connect to the reading and data organization of vector data. Currently, the reading of GeoJSON format is temporarily implemented, and the Adapter can be inherited to expand the reading of various data formats in the future.
8.  Add a series of classes such as Symbol/PointSymbol/LineSymbol/FillSymbol to realize the rendering of elements with different symbols. Currently, SimplePointSymbol/SimpleLineSymbol/SimpleFillSymbol is temporarily implemented, and extended point, line and surface symbols can be inherited later.
9.  Add SimpleMarkerSymbol so that Marker can also be rendered under Canvas, and design SimpleMarkerSymbol as a kind of point symbol instead of a new rendering element or layer.
10. Add Label for FeatureLayer vector layer markers, and complete marker collision detection by inheriting the Collision class. Currently, SimpleCollision implements simple collision conflicts.
11. Add Renderer to set the rendering method of FeatureLayer vector layer, and customize the rendering method by inheriting the Renderer class. Currently, SimpleRenderer single rendering, CategoryRenderer classification rendering, and ClassRenderer classification rendering are implemented.
12. Add Raster for RasterLayer to set the pixel data source, IDW interpolation and heat map have been completed currently, kriging interpolation needs to be improved.
13. Split the original Point class to distinguish three different types of coordinates, LatLng latitude and longitude coordinates, PlaneXY plane coordinates, ScreenXY pixel coordinates (screen pixel coordinates and world pixel coordinates).

#### UML
![image](https://github.com/shengzheng1981/green-leaf/blob/master/green-leaf-uml.png)

#### Run Demo
1. cd demo
2. check&edit webpack.config.js entry file
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
13. [Animation Demo](https://stackblitz.com/edit/typescript-1c3xdc)
14. [Letter Symbol Demo](https://stackblitz.com/edit/typescript-11wgxh)
15. [Arrow Symbol Demo](https://stackblitz.com/edit/typescript-pbty9g)
16. [Cluster Renderer Demo](https://stackblitz.com/edit/typescript-psgyyt)
