const colors = [
  'rgba(0, 0, 0, 1)',
  'rgba(230, 159, 0, 1)', 
  'rgba(86, 180, 233, 1)',
  'rgba(0, 158, 115, 1)',
  'rgba(240, 228, 66, 1)',
  'rgba(0, 114, 178, 1)', 
  'rgba(213, 94, 0, 1)', 
  'rgba(204, 121, 167, 1)',
  'rgba(150, 150, 150, 1)',
]
const colors_in_use = [];

const color_button_default = "#F0F0F0";

// COUNTRY CODES SHOULD BE ARRANGED BY AVERAGE OF DATA
// now imported in the index.html as a file exported from Python
// const ALL_COUNTRIES_CODES = ['DEU', 'BRA', 'CHN', 'IND'];

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
 * @param {string} iso3 - country name, e.g. `DEU`  
 */
function create_dataset(iso3) {
  return {
    borderCapStyle: 'round',
    borderWidth: 5,
    countryCode: iso3,
    data: DATA[iso3],
    fill: false,
    label: toCountryName(iso3),
    showLine: false,
  }
}

const all_data = {
  datasets: []
}

ALL_COUNTRIES_CODES.forEach((iso3) => {
  all_data.datasets.push(create_dataset(iso3));
});

// Disable animation
Chart.defaults.global.animation.duration = 0;

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
    colorizeMap(code, color_map_default, false);
    toggleCountryButton(code, color_button_default);
  } else {
    // DO NOTHING IF MAX COLORS REACHED
    if (colors_in_use.length < 9) { // ONLY ALLOW 10 colors 
      const newColor = nextColor();
      myChart.data.datasets[index].borderColor = newColor;
      myChart.data.datasets[index].showLine = true;
      const hex = RGBToHex(newColor);
      colorizeMap(code, hex, true);
      toggleCountryButton(code, newColor);
    } else {
      alert('At most 9 countries can be compared');
    }
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

// `ALL_COUNTRIES_CODES` are sorted by median income
// when listing buttons we want them to be in alphabetical order
// Loop through each wizard and create a list item
ALL_COUNTRIES_CODES_SORTED.forEach((element) => {
  buttonHTML += '<button id="btn-' + element + '" class="button" ' + 
                        'onclick="toggleCountry(\'' + element + '\')">' +
                  '<span>' + toCountryName(element) + '</span></button>';
});

allButtons.innerHTML = buttonHTML;

function toggleCountryButton(iso3, color) {
  const currButton = document.getElementById('btn-' + iso3);
  currButton.style.backgroundColor = color;
}

// --------------------
// MAP STUFF

/**
 * Colorize the map
 * @param {*} iso3 
 * @param {*} color 
 * @param {*} enable -- boolean -- if true, then enable, if false, then disable 
 */
function colorizeMap(iso3, color, enable) {
  const iso2 = toIso2(iso3);
  
  const newData = {
    'areas': {}
  };
  
  newData.areas[iso2] = {
    attrs: {
      fill: color,
    }, 
    attrsHover: {
      fill: enable ? color : color_map_hover,
    }
  };
  
  $(".map-container").trigger('update', [{ mapOptions: newData }]);
}

// console.log(COUNTRIES_NOT_IN_DATASET);

COUNTRIES_NOT_IN_DATASET.forEach((iso2) => {
  colorizeMap(toIso3(iso2), '#FFFFFF', false);
});

// ----------------------------------------------------------------------------------
// LAST STEPS: 
// graph some countries, 
// update labels
// update chart

toggleCountry('BRA');
toggleCountry('DEU');
toggleCountry('IND');

updateAllLabels();
myChart.update();
