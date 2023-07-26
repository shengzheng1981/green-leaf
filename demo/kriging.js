
import {
  LatLng, Map, Point, SimplePointSymbol,
  Feature, FeatureLayer, FeatureClass, GeometryType,
  CategoryRenderer, CategoryRendererItem, Field, FieldType, Label,
  RasterLayer, Kriging, Tile
} from "../dist";


window.load = async () => {

  //创建地图
  const map = new Map("foo");
  //加载OSM切片
  const tile = new Tile('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
  tile.addTo(map);

  map.setView(new LatLng(39.909186, 116.397411), 12);

  const symbol2 = new SimplePointSymbol();
  symbol2.strokeStyle = "#3388FF";
  symbol2.fillStyle = "#3388FF80";
  const symbol3 = new SimplePointSymbol();
  symbol3.strokeStyle = "#88FF33";
  symbol3.fillStyle = "#88FF3380";
  const symbol4 = new SimplePointSymbol();
  symbol4.strokeStyle = "#FF8833";
  symbol4.fillStyle = "#FF883380";
  //新建要素类
  const featureClass = new FeatureClass(GeometryType.Point);
  //新建字段
  const field = new Field("rank", FieldType.Number);
  featureClass.addField(field);
  //新建矢量图层
  const layer2 = new FeatureLayer();
  layer2.featureClass = featureClass;
  //设置渲染方式——分类渲染
  layer2.renderer = new CategoryRenderer();
  layer2.renderer.field = field;
  layer2.renderer.items.push(new CategoryRendererItem(2, symbol2));
  layer2.renderer.items.push(new CategoryRendererItem(3, symbol3));
  layer2.renderer.items.push(new CategoryRendererItem(4, symbol4));
  //设置图层标记
  const label = new Label();
  label.field = field;
  layer2.label = label;
  layer2.labeled = true;
  //生成随机数据
  for (let i = 1; i <= 100; i++) {
    const point = new Point(new LatLng(39.409186 + Math.random() * 1, 115.897411 + Math.random() * 1));
    const feature = new Feature(point, { rank: parseInt(Math.random() * 10) });
    feature.on("click", () => {
      console.log(feature.properties["rank"]);
    });
    featureClass.addFeature(feature);
  }
  //添加矢量图层
  map.addFeatureLayer(layer2);

  //新建克里金插值
  const raster = new Kriging(115.897411, 39.409186, 116.897411, 40.409186);
  raster.generate(featureClass, field);
  //新建栅格图层
  const rasterLayer = new RasterLayer();
  rasterLayer.raster = raster;
  //添加栅格图层
  map.addRasterLayer(rasterLayer);

}