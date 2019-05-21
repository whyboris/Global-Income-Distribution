var colors = [
  'rgba(0, 0, 0, 1)',
  'rgba(230, 159, 0, 1)', 
  'rgba(86, 180, 233, 1)',
  'rgba(0, 158, 115, 1)',
  'rgba(213, 94, 0, 1)', 
  'rgba(0, 114, 178, 1)',
]

const COUNTRY_CODES = ['DEU', 'BRA', 'CHN', 'IND'];

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

const poverty_line = {
  label: 'US poverty line',
  data: [{ 'x': 0, 'y': 83 }, { 'x': 100, 'y': 83 }],
  borderWidth: 3,
  showLine: true,
  fill: false,
}

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

var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
  type: 'scatter',
  data: all_data,
  options: all_options // located in the `chart_options.js` file
});

function addDataset() {
  // console.log(myChart.data.datasets)
  myChart.data.datasets[0].showLine = !myChart.data.datasets[0].showLine;
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