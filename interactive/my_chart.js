var colors = [
  'rgba(0, 0, 0, 1)',
  'rgba(230, 159, 0, 1)', 
  'rgba(86, 180, 233, 1)',
  'rgba(0, 158, 115, 1)',
  'rgba(213, 94, 0, 1)', 
  'rgba(0, 114, 178, 1)',
]
const colors_in_use = [];

// COUNTRY CODES SHOULD BE ARRANGED BY AVERAGE OF DATA
const ALL_COUNTRIES_CODES = ['DEU', 'BRA', 'CHN', 'IND'];

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
 * Return index from `ALL_COUNTRIES_CODES` when given an iso3 string
 * returns `undefined` if country not available
 * @param code string (e.g. 'DEU', 'IND') 
 */
function get_country_index(code) {
  const index = ALL_COUNTRIES_CODES.indexOf(code);

  return index !== -1 ? index : undefined;
}

/**
 * Return a Chart.js dataset object for graphing
 * @param {*} country_code 
 * @param {*} country_name 
 * @param {*} isShown 
 */
function create_dataset(country_code, country_name, isShown) {

  let lineColor = '';

  if (isShown) {
    lineColor = nextColor();
  }

  return {
    borderCapStyle: 'round',
    borderColor: lineColor,
    borderWidth: 5,
    countryCode: country_code,
    data: DATA[country_code],
    fill: false,
    label: country_name,
    showLine: isShown,
  }
}

// THIS SHOULD BE MOVED INTO THE COUNTRY CODES DATA !!!
const horizontal = {
  countryCode: 'xxx',
  borderColor: 'rgba(0, 0, 0, 0.4)',
  borderWidth: 1,
  data: [{ 'x': 0, 'y': 83 }, { 'x': 100, 'y': 83 }],
  fill: false,
  label: '$ XXXX - temp',
  showLine: true,
}

// THIS SHOULD BE MOVED INTO THE COUNTRY CODES DATA !!!
const horizontal_2 = {
  countryCode: 'xxx',
  borderColor: 'rgba(0, 0, 0, 0.4)',
  borderWidth: 1,
  data: [{ 'x': 0, 'y': 53 }, { 'x': 100, 'y': 53 }],
  fill: false,
  label: '$ XXX - temp',
  showLine: true,
}

// THIS SHOULD BE MOVED INTO THE COUNTRY CODES DATA !!!
const horizontal_3 = {
  countryCode: 'xxx',
  borderColor: 'rgba(0, 0, 0, 0.4)',
  borderWidth: 1,
  data: [{ 'x': 0, 'y': 23 }, { 'x': 100, 'y': 23 }],
  fill: false,
  label: '$ XX - temp',
  showLine: true,
}

// later -- create a .forEach that iterates over ALL_COUNTRIES_CODES
var all_data = {
  datasets: [
    create_dataset(ALL_COUNTRIES_CODES[0], 'Germany', false), 
    // horizontal, // MOVE IT INTO THE COUNTRY CODES -- SO IT'S TREATED THE SAME WAY !!!
    create_dataset(ALL_COUNTRIES_CODES[1], 'Brazil', false), 
    // horizontal_2, // MOVE IT INTO THE COUNTRY CODES -- SO IT'S TREATED THE SAME WAY !!!
    // horizontal_3, // MOVE IT INTO THE COUNTRY CODES -- SO IT'S TREATED THE SAME WAY !!!
    create_dataset(ALL_COUNTRIES_CODES[2], 'China', false), 
    create_dataset(ALL_COUNTRIES_CODES[3], 'India', false),
  ]
}

// set defaults before creating chart, else they don't hold
Chart.defaults.global.animation.duration = 70;
Chart.defaults.global.animation.easing = 'linear';

// Create the Chart.js chart!
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
  data: all_data,
  options: all_options, // located in the `chart_options.js` file
  type: 'scatter',
});

/**
 * Pass in the CODE of the country to toggle its chart
 * @param code - string, e.g. 'DEU', 'IND'
 */
function toggleCountry(code) {
  const index = get_country_index(code);

  // IF VISIBLE
  if (myChart.data.datasets[index].showLine) {
    myChart.data.datasets[index].showLine = false;
    freeUpColor(myChart.data.datasets[index].borderColor);
    colorizeMap(code, '#EEEEEE');
  } else {
    const newColor = nextColor();
    myChart.data.datasets[index].borderColor = newColor;
    myChart.data.datasets[index].showLine = true;
    console.log(newColor);
    const hex = RGBToHex(newColor);
    console.log(hex);
    colorizeMap(code, hex);
  }
  updateAllLabels();
  myChart.update();
}

/**
 * Free up color so it can be re-used
 * @param {*} code 
 */
function freeUpColor(code) {
  const index = colors_in_use.indexOf(code);
  colors_in_use.splice(index, 1);
}

/**
 * Returns the index of the next color
 * adds the new to `colors_in_use` array
 */
function nextColor() {
  for (i = 0; i < colors.length; i++) {
    if (colors_in_use.indexOf(colors[i]) === -1) {
      colors_in_use.push(colors[i]);
      return colors[i];
    }
  }
}

/**
 * Return a new label based on data
 * @param {*} data 
 */
function generateLabel(data) {
  return {
    countryCode: data.countryCode,
    fillStyle: data.borderColor,
    lineWidth: 1,
    strokeStyle: data.borderColor,
    text: toCountryName(data.countryCode),
  }
}

/**
 * Generate all new labels for legend
 */
function updateAllLabels() {
  const myNewLabels = [];

  myChart.data.datasets.forEach((element) => {
    if (element.showLine) {
      myNewLabels.push(generateLabel(element));
    }
  });

  myChart.data.labels = myNewLabels;
}

// ----------------------------------------------------------------------------------
// Create all buttons with onClick bindings

var allButtons = document.querySelector('#buttons');

var buttonHTML = '';

// Loop through each wizard and create a list item
ALL_COUNTRIES_CODES.forEach((element) => {
  console.log(element);
  buttonHTML += '<button class="button" onclick="toggleCountry(\'' + element + '\')">' + toCountryName(element) + '</button>';
});

allButtons.innerHTML = buttonHTML;

// ----------------------------------------------------------------------------------
// Update labels and chart

updateAllLabels();
myChart.update();


// --------------------
// MAP STUFF

/**
 * Take iso3
 */
function colorizeMap(iso3, color) {
  const iso2 = toIso2(iso3);
  
  const newData = {
    'areas': {}
  };
  
  newData.areas[iso2] = {
    attrs: {
      fill: color,
    }
  };
  
  $(".map-container").trigger('update', [{ mapOptions: newData }]);
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

