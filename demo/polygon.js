
import { LatLng, Map, Point, Polyline, Graphic,  SimpleFillSymbol, Polygon, Tile } from "../dist";

window.load = async () => {

  //创建地图
  const map = new Map("foo");
  //加载OSM切片
  const tile = new Tile('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
  tile.addTo(map);

  map.setView(new LatLng(39.909186, 116.397411), 12);
  //设置渲染符号
  const fillSymbol = new SimpleFillSymbol();
  //生成随机数据
  for (let i = 1; i <= 20; i++) {
    const polygon = new Polygon([[new LatLng(39.409186 + Math.random() * 1, 115.897411 + Math.random() * 1), new LatLng(39.409186 + Math.random() * 1, 115.807411 + Math.random() * 1), new LatLng(39.409186 + Math.random() * 1, 115.807411 + Math.random() * 1)]]);
    const graphic = new Graphic(polygon, fillSymbol);
    map.addGraphic(graphic);
  }

}