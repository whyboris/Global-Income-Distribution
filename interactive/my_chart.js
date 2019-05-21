var colors = [
  'rgba(0, 0, 0, 1)',
  'rgba(230, 159, 0, 1)', 
  'rgba(86, 180, 233, 1)',
  'rgba(0, 158, 115, 1)',
  'rgba(213, 94, 0, 1)', 
  'rgba(0, 114, 178, 1)',
]

// COUNTRY CODES SHOULD BE ARRANGED BY AVERAGE OF DATA
const COUNTRY_CODES = ['DEU', 'BRA', 'CHN', 'IND'];

/**
 * Put in country code (e.g. 'DEU', 'BRA'), and get its index (position in array)
 * @param code string (e.g. 'DEU', 'IND') 
 */
function get_country_index(code) {
  return COUNTRY_CODES.indexOf(code);
}

/**
 * Return a Chart.js dataset object for graphing
 * @param {*} country_code 
 * @param {*} color_index 
 * @param {*} country_name 
 */
function create_dataset(country_code, color_index, country_name) {
  return {
    borderCapStyle: 'round',
    borderColor: colors[color_index],
    borderWidth: 5,
    data: [DATA[country_code][0]], // hack for animation, start only with 1st data point
    fill: false,
    label: country_name,
    showLine: true,
  }
}

// THIS SHOULD BE MOVED INTO THE COUNTRY CODES DATA !!!
const poverty_line = {
  label: 'US poverty line',
  data: [{ 'x': 0, 'y': 83 }, { 'x': 100, 'y': 83 }],
  borderWidth: 3,
  showLine: true,
  fill: false,
}

// later -- create a .forEach that iterates over COUNTRY_CODES
var all_data = {
  datasets: [
    create_dataset(COUNTRY_CODES[0], 0, 'Germany'), 
    // poverty_line, // MOVE IT INTO THE COUNTRY CODES -- SO IT'S TREATED THE SAME WAY !!!
    create_dataset(COUNTRY_CODES[1], 1, 'Brazil'), 
    create_dataset(COUNTRY_CODES[2], 2, 'China'), 
    create_dataset(COUNTRY_CODES[3], 3, 'India'),
  ]
}

// set defaults before creating chart, else they don't hold
Chart.defaults.global.animation.duration = 70;
Chart.defaults.global.animation.easing = 'linear';

// Create the Chart.js chart!
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
  type: 'scatter',
  data: all_data,
  options: all_options // located in the `chart_options.js` file
});

/**
 * Pass in the CODE of the country to toggle its chart
 * @param code - string, e.g. 'DEU', 'IND'
 */
function toggleCountry(code) {
  const index = get_country_index(code);
  myChart.data.datasets[index].showLine = !myChart.data.datasets[index].showLine;
  myChart.update();
}

/**
 * Timing function to draw the lines
 * @param {*} country - country code string
 * @param {*} index - index correlated to the dataset copy inside Chart.js -- order matters!
 */
var next = function (country, index) {
  var data = myChart.data.datasets[index].data;
  var count = data.length;
  data[count] = data[count - 1];
  myChart.update({ duration: 100 });
  data[count] = DATA[country][count];
  myChart.update();
  if (count < 20) {
    // count * 2 speeds up animation towards the end
    setTimeout(function () { next(country, index) }, 75 - (count * 2)); 
  }
}

/**
 * Start the animation for the lines inside the chart!
 */
let startAnimation = () => {
  // INDEX must coincide with the index in the DATA 
  // DATA should include the POVERTY LINE -- so it's easier to refer to it!!!
  COUNTRY_CODES.forEach((country, index) => {
    setTimeout(function () { next(country, index) }, 200 * index);
  });
}

/**
 * Check if an element is 100% in the viewport
 * @param elem - HTML element 
 */
var isInViewport = function (elem) {
  var bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

var chartDiv = document.querySelector('#full_chart');

/**
 * callback for `scroll` event - to check if it's time to start animation
 */
checkIfInside = () => {
  if (isInViewport(chartDiv)) {
    startAnimation();
    window.removeEventListener('scroll', checkIfInside);
  }
}

window.addEventListener('scroll', checkIfInside, false);


// ----------------------------------------------------------------------------------
// Create all buttons with onClick bindings

var allButtons = document.querySelector('#buttons');

var buttonHTML = '';

function lol (smth) {
  console.log('hi');
  console.log(smth);
  toggleCountry(smth);
}

// Loop through each wizard and create a list item
COUNTRY_CODES.forEach((element) => {
  console.log(element);
  buttonHTML += '<button onclick="lol(\'' + element + '\')">' + element + '</button>';
});

allButtons.innerHTML = buttonHTML;
