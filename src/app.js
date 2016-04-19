/**
 * Created by davidheimgartner on 05.04.16.
 */
$(document).ready(function () {

  //
  var iconUrl = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|c68dda';
  var selectedMenuType = 'Pizza';

  //
  setEventListener();

  // -------------------------------------------------- Funktionen

  function setEventListener() {

    //
    $('nav').on('click', 'a', function (event) {
      console.log($(event.target).closest('a').attr('id'));
      var idOfClickedNavItem = $(event.target).closest('a').attr('id');
      var idOfView = idOfClickedNavItem.replace('nav_', '');
      setView(idOfView);
    });

    //
    $('#go').on('click', function () {
      selectedMenuType = $('#what').find('input:checked').val();
      setView('where');
    });


  }

  function setView(viewName) {
    console.log('setView', viewName);

    if (viewName === 'where') {
      setMap();
    }

    $('main > section').hide();
    $('#' + viewName).show();
  }

  function setMap() {

    window.navigator.geolocation.getCurrentPosition(loadMap);

    function loadMap(position) {
      console.log('loadMap', position);
      var here = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var map = new google.maps.Map(document.getElementById('where'), {
        center: here,
        zoom: 15
      });

      var placesSearchOptions = {
        location: here,
        radius: 300,
        types: ['restaurant'],
        keyword: selectedMenuType
      };

      var service = new google.maps.places.PlacesService(map);

      service.nearbySearch(placesSearchOptions, function(results, status){
        console.log(results);

        results.forEach(function (place) {
          new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: iconUrl
          });
        });


        // Restaurant Liste erstellen und ausgeben
        var restaurantList = []
        for (var i = 0; i < results.length; i++){
          restaurantList.push(results[i].name)
        }

          for(var i=0; i < results.length; i++){
            $('#who').append(restaurantList[i] + '\n' );
          }
        console.log(restaurantList);
      });



    }

  }

  function setList(results){
    console.log(results.getName(0));
  }

});
