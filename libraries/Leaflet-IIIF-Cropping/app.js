var baseUrl = 'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44';
var map = L.map('map', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 0,
});

var iiifLayer = L.tileLayer.iiif(baseUrl + '/info.json', {
  tileSize: 512
}).addTo(map);

var areaSelect = L.areaSelect({
  width:100, height:100
});

areaSelect.addTo(map);

$('#urlArea').html(baseUrl)

areaSelect.on('change', function() {
  var bounds = this.getBounds();
  var zoom = map.getZoom();
  var min = map.project(bounds.getSouthWest(), zoom);
  var max = map.project(bounds.getNorthEast(), zoom);
  var imageSize = iiifLayer._imageSizes[zoom];
  var xRatio = iiifLayer.x / imageSize.x;
  var yRatio = iiifLayer.y / imageSize.y;
  var region = [
    Math.floor(min.x * xRatio),
    Math.floor(max.y * yRatio),
    Math.floor((max.x - min.x) * xRatio),
    Math.floor((min.y - max.y) * yRatio)
  ];
  var url = baseUrl + '/' + region.join(',') + '/full/0/default.jpg';
  $('#urlArea').html(
    '<a href="' + url + '" target=_blank>' + url + '</a>'
  )
});
