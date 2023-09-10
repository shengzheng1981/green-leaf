
import {
  LatLng, Map, FeatureLayer, FeatureClass, GeometryType,
  SimpleRenderer, Field, FieldType, Tile, GeoJSONAdapter, SimpleLineSymbol
} from "../dist";

window.load = async () => {

  //创建地图
  const map = new Map("foo");
  //加载OSM切片
  const tile = new Tile('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
  tile.addTo(map);

  map.setView(new LatLng(39.909186, 116.397411), 12);

  const geojsonAdapter = new GeoJSONAdapter(GeometryType.Polyline, "https://raw.githubusercontent.com/shengzheng1981/green-leaf/master/demo/assets/geojson/line1.json");
  // const geojsonAdapter = new GeoJSONAdapter(GeometryType.Polygon, "assets/geojson/beijing.json");
  //新建要素类
  const featureClass = new FeatureClass(GeometryType.Polyline);
  //新建字段
  const field = new Field("name", FieldType.String);
  featureClass.addField(field);
  await featureClass.load(geojsonAdapter);
  //新建矢量图层
  const featureLayer = new FeatureLayer();
  featureLayer.featureClass = featureClass;
  //设置渲染方式——分类渲染
  const renderer = new SimpleRenderer();
  renderer.symbol = new SimpleLineSymbol();
  renderer.symbol.strokeStyle = "#c03a2f";
  renderer.symbol.weight = 3;
  featureLayer.renderer = renderer;
  featureLayer.zoom = [5, 20];

  //添加矢量图层
  map.addFeatureLayer(featureLayer);
}