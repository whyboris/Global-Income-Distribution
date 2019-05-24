const percentile_to_ppp = {
  6.9907312828598895: '$1/day',
  19.3171677020114: '$1.9/day',
  29.1832129048416: '$1,000',
  41.6892502775125: '$1,500',
  50.162915510172006: '$2,000',
  60.664687762846896: '$3,000',
  71.699741915554: '$5,000',
  84.3856327945172: '$10,000',
  90.6337912439263: '$15,000',
  94.14895073810129: '$20,000',
  97.4310088548694: '$30,000'
}

const tick_percentiles = [
  6.9907312828598895,
  19.3171677020114,
  29.1832129048416,
  41.6892502775125,
  50.162915510172006,
  60.664687762846896,
  71.699741915554,
  84.3856327945172,
  90.6337912439263,
  94.14895073810129,
  97.4310088548694
]

const all_options = {
  scales: {
    yAxes: [{
      id: 'y-axis-0',
      position: 'left',
      ticks: {
        stepSize: 10,
        padding: 10,
        suggestedMax: 100,
        beginAtZero: true,
        callback: function (value) {
          return percentile_to_ppp[value];
        },
      },
      gridLines: {
        lineWidth: 0.7,
        drawBorder: true,
        tickMarkLength: 0,
      },
      scaleLabel: {
        display: false,
        // labelString: 'World Percentile',
        // fontSize: 12,
      },
      afterBuildTicks: function (mychart) {
        mychart.ticks = tick_percentiles;
      }
    }, {
        id: 'y-axis-1',
        position: 'right',
        ticks: {
          stepSize: 10,
          padding: 10,
          suggestedMax: 100,
          beginAtZero: true,
          callback: function (value) {
            return value + '%';
          },
        },
        gridLines: {
          lineWidth: 0,
          drawBorder: true,
          tickMarkLength: 0,
        },
        scaleLabel: {
          display: false,
          // labelString: 'World Percentile',
          // fontSize: 12,
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
  onHover: function (event) {
    event.srcElement.style.cursor = 'default';
  },
  legend: {
    position: 'right',
    labels: {
      boxWidth: 12,
      padding: 15,
      generateLabels: (a) => {
        return a.data.labels
      }
    },
    onClick: (e, item) => {
      toggleCountry(item.countryCode)
      e.stopPropagation()
    },
    onHover: function (event, legendItem) {
      // There is only a legendItem when your mouse is positioned over one
      if (legendItem) {
        event.srcElement.style.cursor = 'pointer';
      }
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