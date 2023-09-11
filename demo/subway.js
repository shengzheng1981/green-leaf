
import {
  LatLng, Map, FeatureLayer, FeatureClass, GeometryType, PlaneXY, EPSG3857,
  SimpleRenderer, Field, FieldType, Tile, GeoJSONAdapter, SimpleLineSymbol, Polyline, Point, Graphic, SimplePointSymbol, LetterSymbol
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

  const feature = featureClass.first;
  const polyline = feature.geometry;
  //对向线路
  const latlngs = polyline.getLatLngs();
  const reverse = new Polyline([...latlngs].reverse());
  reverse.crs = polyline.crs;
  //沿线段按距离取点
  const _getPointAlongLine = (p1, p2, d) => {
    //line length
    let l = Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
    let t = d / l;
    return new PlaneXY((1 - t) * p1.x + t * p2.x, (1 - t) * p1.y + t * p2.y);
  }
  //折线(曲线)按距离取点
  const _getPointAlongPolyLine = (polyline, distance) => {
    const xys = polyline.getPlaneXYs();
    for (let i = 0; i < xys.length - 1; i++) {
      const start = xys[i];
      const end = xys[i+1];
      const d = Math.sqrt((start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y));
      if (d < distance) {
        distance = distance - d;
      } else {
        return _getPointAlongLine(start, end, distance);
      }
    }
    return null;
  }

  //模拟列车运行
  const run = (polyline, start, symbol = new SimplePointSymbol) => {
    let velocity = 50 / 3 * 60;  // 60km/h 1min = 1sec
    let graphic;
    const animate = (timestamp) => {
      if (timestamp > start) {
        const elapsed = timestamp - start;
        const distance = velocity * elapsed / 1000;
        const xy = _getPointAlongPolyLine(polyline, distance);
        if (xy) {
          const projection = new EPSG3857().projection;
          const latlng = projection.unproject(xy);
          const point = new Point(latlng);
          if (!graphic) {
            graphic = new Graphic(point, symbol);
            map.addGraphic(graphic);
          } else {
            map.updateGraphic(graphic, point);
          }
          window.requestAnimationFrame(animate);
        } else {
          map.removeGraphic(graphic);
        }
      } else {
        window.requestAnimationFrame(animate);
      }
    };
    window.requestAnimationFrame(animate);
  }

  //列车时刻表
  const metros = [
    {time: 1000, direction: 1},
    {time: 4000, direction: 1},
    {time: 8000, direction: 1},
    {time: 9000, direction: -1},
    {time: 13000, direction: 1},
    {time: 16000, direction: 1},
    {time: 18000, direction: -1},
    {time: 20000, direction: 1},
    {time: 24000, direction: 1},
    {time: 27000, direction: 1},
    {time: 28000, direction: -1},
    {time: 30000, direction: 1},
    {time: 33000, direction: 1},
    {time: 36000, direction: 1},
    {time: 36000, direction: -1},
    {time: 39000, direction: 1},
    {time: 42000, direction: 1},
    {time: 42000, direction: -1},
    {time: 46000, direction: 1},
    {time: 49000, direction: 1},
    {time: 50000, direction: -1},
    {time: 53000, direction: 1},
    {time: 56000, direction: 1},
    {time: 58000, direction: -1},
    {time: 59000, direction: 1},
  ];
  metros.forEach(metro => {
    if (metro.direction == 1) {
      const symbol = new LetterSymbol();
      symbol.letter = "环";
      symbol.fillStyle = "#002FA7";
      symbol.strokeStyle = "#002FA7";
      symbol.fontColor = "#fff";
      symbol.fontWeight = "bold";
      run(polyline, metro.time, symbol);
    } else {
      const symbol = new LetterSymbol();
      symbol.letter = "古";
      symbol.fillStyle = "#FBD26A";
      symbol.strokeStyle = "#FBD26A";
      symbol.fontColor = "#333";
      symbol.fontWeight = "bold";
      run(reverse, metro.time, symbol);
    }
  })
  
}