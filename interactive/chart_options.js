const all_options = {
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
      console.log(item);
      toggleCountry(COUNTRY_CODES[item.datasetIndex])
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