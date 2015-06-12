var ephemeris;
$(document).ready(function () {
  ephemeris = $.getJSON('https://api.myjson.com/bins/2xnss');
  var planet = ephemeris.responseJSON[0].name;
  var orbitCount = ephemeris.responseJSON[0].orbit.length;
  for (var i = 0; i < orbitCount; i++) {
    sum += ephemeris.responseJSON[0].orbit[i][2];
    debugger;
  };
});