const color_map_default = '#EEEEEE';
const color_map_hover = '#CCCCCC';

$(".map-container").mapael({
  map: {
    name: "world_countries",
    defaultArea: {
      attrs: {
        fill: color_map_default,
      },
      attrsHover: {
        animDuration: 150,
        fill: color_map_hover,
      },
      eventHandlers: {
        click: function (e, id, mapElem, textElem) {
          handleMapClick(id, mapElem);
        }
      }
    }
  }
});

function handleMapClick(id, mapElem) {

  // `id` is iso2 string
  // console.log(id);
  // console.log(toIso3(id));

  if (get_country_index(toIso3(id)) !== undefined) {
    console.log('toggling!');
    toggleCountry(toIso3(id));
  }
}
