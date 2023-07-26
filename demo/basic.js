
import {
  LatLng, Map, Point, Graphic, SimplePointSymbol, Tile
} from "../dist";

window.load = async () => {

  //创建地图
  const map = new Map("foo");
  //加载OSM切片
  const tile = new Tile('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
  tile.addTo(map);

  map.setView(new LatLng(39.909186, 116.397411), 12);
  //设置渲染符号
  const symbol = new SimplePointSymbol();
  const point = new Point(new LatLng(39.909186, 116.397411));
  const graphic = new Graphic(point, symbol);
  //添加单个图形
  map.addGraphic(graphic);

}