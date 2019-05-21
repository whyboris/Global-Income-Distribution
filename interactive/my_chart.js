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
    // data: DATA[country_code],
    data: [DATA[country_code][0]], // hack for animation; originally was just `DATA`
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

var all_options = {
  scales: {
    yAxes: [{
      id: 'y-axis-0',
      ticks: {
        suggestedMax: 100,
        beginAtZero: true,
        callback: function (value) {
          return value + '%';
        },
      },
      gridLines: {
        lineWidth: 0.7,
        drawBorder: true,
        tickMarkLength: 15,
      },
      scaleLabel: {
        display: true,
        labelString: 'World Percentile',
        fontSize: 12,
      },
    }],
    xAxes: [{
      ticks: {
        suggestedMax: 100, 
        beginAtZero: true,
        callback: function (value) {
          return value + '%';
        },
      },
      gridLines: {
        lineWidth: 0.7, 
        drawBorder: true,
        tickMarkLength: 15,
      },
      scaleLabel: {
        display: true,
        labelString: 'Data source: Branko Milanovic - World Income Distribution (2005)',
        fontSize: 12,
      }
    }]
  },
  elements: {
    point: {
      radius: 0
    }
  },
  layout: {
    padding: {
      left: 20,
      right: 40,
      top: 20,
      bottom: 20
    }
  },
  legend: {
    position: 'right',
    labels: {
      boxWidth: 12,
      padding: 30
    }
  },
  title: {
    display: true,
    text: [
      'World Income Distribution 2005', 
      'Country percentile vs world income percentile',
      'Compared via 2005 PPP (Purchasing Power Parity) units'
    ],
    fontSize: 12,
    lineHeight: 1.5,
    padding: 20
  },
  tooltips: {
    enabled:  false,
  },
}

// set defaults before creating chart, else they don't hold
Chart.defaults.global.animation.duration = 70;
Chart.defaults.global.animation.easing = 'linear';

var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
  type: 'scatter',
  data: all_data,
  options: all_options
});

function addDataset() {
  // console.log(myChart.data.datasets)
  myChart.data.datasets[0].showLine = !myChart.data.datasets[0].showLine;
  myChart.update();
}


console.log(DATA)

// Possible way to animate additional data
var next_DISABLED = function () {
  var data = myChart.data.datasets[0].data;
  var count = data.length;
  data[count] = data[count - 1];
  myChart.update({ duration: 0 });
  data[count] = DATA['DEU'][count];
  myChart.update();
  if (count < DATA['DEU'].length) {
    setTimeout(next, 105);
  }
}
// setTimeout(next, 105);

// Possible way to animate additional data
var next_DISABLED_TOO = function () {
  COUNTRY_CODES.forEach((country, index) => {
    var data = myChart.data.datasets[index].data;
    var count = data.length;
    data[count] = data[count - 1];
    myChart.update({ duration: 100 });
    data[count] = DATA[country][count];
    myChart.update();
    if (count < 20) {
      setTimeout(next, 105);
    }
  });
}

// setTimeout(next, 105);



// Possible way to animate additional data
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


// INDEX must coincide with the index in the DATA 
// DATA should include the POVERTY LINE -- so it's easier to refer to it!!!
COUNTRY_CODES.forEach((country, index) => {
  setTimeout(function () { next(country, index) }, 200 * index);
});

