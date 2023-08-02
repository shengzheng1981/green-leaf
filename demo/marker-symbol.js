
import {
  LatLng, Map, Point, Graphic, SimplePointSymbol, SimpleMarkerSymbol, GraphicLayer, Tile
} from "../dist";

window.load = async () => {

  //创建地图
  const map = new Map("foo");
  //加载OSM切片
  const tile = new Tile('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
  tile.addTo(map);

  map.setView(new LatLng(39.909186, 116.397411), 12);
  //设置渲染符号
  const symbol2 = new SimpleMarkerSymbol();
  symbol2.url = "https://raw.githubusercontent.com/shengzheng1981/green-leaf/master/demo/assets/images/marker.svg";
  // symbol2.url = "assets/images/marker.svg";
  await symbol2.load();
  //新建图形图层
  const layer = new GraphicLayer();
  //生成随机数据
  for (let i = 1; i <= 200; i++) {
    const point = new Point(new LatLng(39.409186 + Math.random() * 1, 115.897411 + Math.random() * 1));
    const graphic = new Graphic(point, symbol2);
    layer.addGraphic(graphic);
  }
  //添加图形图层
  map.addGraphicLayer(layer);

}