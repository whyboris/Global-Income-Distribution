
// ==================================================================================
// ARCHIVE THE ANIMATION CODE !!!
// ----------------------------------------------------------------------------------

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
  ALL_COUNTRIES_CODES.forEach((country, index) => {
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

// @@@@ DISABLED
// window.addEventListener('scroll', checkIfInside, false);
// when animating -- start the data with only one point !!! (in `create_dataset`)
// data: [DATA[country_code][0]], // hack for animation, start only with 1st data point
