// Conversions between iso2, iso3, and country name strings

function toIso2(iso3) {
  return iso3_to_iso2[iso3];
}

function toIso3(iso2) {
  return iso2_to_iso3[iso2];
}

function toCountryName(iso3) {
  return iso3_to_name[iso3];
}

/**
 * Take `rgba(1, 2, 3, 1)` and return correct hex (ignoring alpha)
 * @param {*} rgb 
 */
function RGBToHex(rgb) {

  rgb = rgb.replace('rgba(', '');
  rgb = rgb.replace(', 1)', ')');

  // Turn "(r,g,b)" into [r,g,b]
  rgb = rgb.split(")")[0].split(',');

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}
