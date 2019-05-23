
var filledColor = '#5ba4ff'
var unfilledColor = '#EEEEEE'

$(".map-container").mapael({
  map: {
    name: "world_countries",
    defaultArea: {
      attrs: {
        fill: '#EEEEEE',
      },
      eventHandlers: {
        click: function (e, id, mapElem, textElem) {

          console.log(id);
          console.log(toIso3(id))
          
          toggleCountry(toIso3(id))

          var newData = {
            'areas': {}
          };
          if (mapElem.originalAttrs.fill == filledColor) {
            newData.areas[id] = {
              attrs: {
                fill: unfilledColor
              }
            };
          } else {
            newData.areas[id] = {
              attrs: {
                fill: filledColor
              }
            };
          }
          $(".map-container").trigger('update', [{ mapOptions: newData }]);
        }
      }
    }
  }
});


