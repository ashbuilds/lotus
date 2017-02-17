jQuery(function($){
	var $helper_sideBar = $("._js_sideBar_toggle");

    $helper_sideBar.on('click',function(){
    	var $this = $(this);
        var $sideBar = $("#"+$this.attr('data-for'));
        $sideBar.add($this).toggleClass("active")
	});
	
		var jqxhr = $.getJSON( "/datahelper", function(data) {
  console.log( "success" ,data);
})
  .done(function() {
    console.log( "second success" );
  })
  .fail(function(err) {
    console.log( "error",err );
  })
  .always(function() {
    console.log( "complete" );
  });

	
});

//Google Map
var map;
var infoWindow;
var service;

//https://maps.googleapis.com/maps/api/place/textsearch/json?query=siam+bank+and+atm+in+thailand&location=13.7563,100.5018&radius=10000&key=AIzaSyD2-5jVs26nxz9B0Uu9L6aEjypkrlwGZsY


function initMap() {

    map = new google.maps.Map(document.getElementById('mapview'), {
        center: {lat: 13.7563, lng: 100.5018},
        zoom: 12,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
       /* styles: [{
            stylers: [{ visibility: 'simplified' }]
        }, {
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
        }]*/
    });

    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    // The idle event is a debounced event, so we can query & listen without
    // throwing too many requests at the server.
    map.addListener('idle', performSearch);
}

function performSearch() {
    var request = {
        bounds: map.getBounds(),
	   radius:"10",
	   address:"Bangkok",
	    componentRestrictions: {
        country: 'Thailand'
    },
        keyword: "Tesco Lotus",
		name:"Tesco Lotus",
		type : "store"
        
    };
    service.radarSearch(request, callback);
}

function callback(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
    }
    for (var i = 0, result; result = results[i]; i++) {
        addMarker(result);
    }
}

function addMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: {
            url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(10, 17)
        }
    });

    google.maps.event.addListener(marker, 'click', function() {
        service.getDetails(place, function(result, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
            }
            infoWindow.setContent(result.name);
            infoWindow.open(map, marker);
        });
    });
}