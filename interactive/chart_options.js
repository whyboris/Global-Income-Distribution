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
  legend: {
    position: 'right',
    labels: {
      boxWidth: 12,
      padding: 30
    },
    onClick: (e) => e.stopPropagation()
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