
import {
  LatLng, Map, Point, SimplePointSymbol,
  Feature, FeatureLayer, FeatureClass, GeometryType,
  CategoryRenderer, CategoryRendererItem, Field, FieldType, Tile
} from "../dist";

window.load = async () => {

  //创建地图
  const map = new Map("foo");
  //加载OSM切片
  const tile = new Tile('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
  tile.addTo(map);

  map.setView(new LatLng(39.909186, 116.397411), 12);
  //新建要素类
  const featureClass = new FeatureClass(GeometryType.Point);
  //新建字段
  const field = new Field("rank", FieldType.Number);
  featureClass.addField(field);
  //新建矢量图层
  const layer = new FeatureLayer();
  layer.featureClass = featureClass;

  //设置渲染符号
  const symbol2 = new SimplePointSymbol();
  symbol2.strokeStyle = "#3388FF";
  symbol2.fillStyle = "#3388FF80";
  const symbol3 = new SimplePointSymbol();
  symbol3.strokeStyle = "#88FF33";
  symbol3.fillStyle = "#88FF3380";
  const symbol4 = new SimplePointSymbol();
  symbol4.strokeStyle = "#FF8833";
  symbol4.fillStyle = "#FF883380";
  //设置渲染方式——分类渲染
  layer.renderer = new CategoryRenderer();
  layer.renderer.field = field;
  layer.renderer.items.push(new CategoryRendererItem(2, symbol2));
  layer.renderer.items.push(new CategoryRendererItem(3, symbol3));
  layer.renderer.items.push(new CategoryRendererItem(4, symbol4));
  //生成随机数据
  for (let i = 1; i <= 200; i++) {
    const point = new Point(new LatLng(39.409186 + Math.random() * 1, 115.897411 + Math.random() * 1));
    const feature = new Feature(point, { rank: parseInt(Math.random() * 10) });
    featureClass.addFeature(feature);
  }
  //添加矢量图层
  map.addFeatureLayer(layer);

}