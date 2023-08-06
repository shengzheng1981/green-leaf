
import {
  LatLng, Map, Point, Polyline, Graphic, SimplePointSymbol, Tile, Animation, PointAnimation, LineAnimation
} from "../dist";

window.load = async () => {

  //创建地图
  const map = new Map("foo");
  //加载OSM切片
  const tile = new Tile('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
  tile.addTo(map);

  map.setView(new LatLng(39.909186, 116.397411), 12);

  const point = new Point(new LatLng(39.909186, 116.397411));
  const animation = new PointAnimation(point);
  map.addAnimation(animation);

  const polyline1 = new Polyline([new LatLng(39.909186, 116.397411), new LatLng(18.271, 109.519)]);
  const polyline2 = new Polyline([new LatLng(39.909186, 116.397411), new LatLng(18.271, 119.519)]);
  const polyline3 = new Polyline([new LatLng(39.909186, 116.397411), new LatLng(48.271, 119.519)]);
  const polyline4 = new Polyline([new LatLng(39.909186, 116.397411), new LatLng(48.271, 109.519)]);
  const animation1 = new LineAnimation(polyline1);
  const animation2 = new LineAnimation(polyline2);
  const animation3 = new LineAnimation(polyline3);
  const animation4 = new LineAnimation(polyline4);
  map.addAnimation(animation1);
  map.addAnimation(animation2);
  map.addAnimation(animation3);
  map.addAnimation(animation4);

}