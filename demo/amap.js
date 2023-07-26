
import {
  LatLng, Map, Point, Graphic, SimplePointSymbol
} from "../dist";

window.load = async () => {
  const amap = new AMap.Map('amap', {
    navigationMode: 'classic',
    zooms: [1, 20],
    mapStyle: 'amap://styles/1e65d329854a3cf61b568b7a4e2267fd',
    features: ['road', 'point', 'bg'],
    viewMode: '2D'
  });

  //创建地图
  const map = new Map("foo");

  map.on('zoom', evt => {
    const pt = evt.target.getCenter();
    amap.setZoomAndCenter(evt.target.getZoom(), [pt.lng, pt.lat], true);
  });

  map.on('move', evt => {
    const pt = evt.target.getCenter();
    amap.setZoomAndCenter(evt.target.getZoom(), [pt.lng, pt.lat], true);
  });

  map.setView(new LatLng(39.909186, 116.397411), 12);

  const symbol = new SimplePointSymbol();
  const point = new Point(new LatLng(39.909186, 116.397411));
  const graphic = new Graphic(point, symbol);
  map.addGraphic(graphic);

}