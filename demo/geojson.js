
import {
  LatLng, Map, FeatureLayer, FeatureClass, GeometryType,
  CategoryRenderer, Field, FieldType, Tile, GeoJSONAdapter
} from "../dist";

window.load = async () => {

  //创建地图
  const map = new Map("foo");
  //加载OSM切片
  const tile = new Tile('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
  tile.addTo(map);

  map.setView(new LatLng(39.909186, 116.397411), 12);

  const geojsonAdapter = new GeoJSONAdapter(GeometryType.Polygon, "assets/geojson/beijing.json");
  //新建要素类
  const featureClass = new FeatureClass(GeometryType.Polygon);
  //新建字段
  const field = new Field("name", FieldType.String);
  featureClass.addField(field);
  await featureClass.load(geojsonAdapter);
  //新建矢量图层
  const featureLayer = new FeatureLayer();
  featureLayer.featureClass = featureClass;
  //设置渲染方式——分类渲染
  const renderer = new CategoryRenderer();
  renderer.generate(featureClass, field);
  featureLayer.renderer = renderer;
  featureLayer.zoom = [5, 20];
  //响应点击事件
  featureLayer.on("click", (event) => {
    console.log(event.target);
  });
  //添加矢量图层
  map.addFeatureLayer(featureLayer);
}