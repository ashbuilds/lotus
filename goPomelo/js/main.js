jQuery(function($){
	var $helper_sideBar = $("._js_sideBar_toggle");

    $helper_sideBar.on('click',function(){
    	var $this = $(this);
        var $sideBar = $("#"+$this.attr('data-for'));
        $sideBar.add($this).toggleClass("active")
	});
	
	

	
});

function getData(info,cb,searchData){  //should be call from 2nd time,server

$.ajax({
		type: "post",
    url: "./datahelper/",
	data:{data:JSON.stringify(info)},
    dataType: "JSON",
    success: function(json){
        //here inside json variable you've the json returned by your PHP
		json = JSON.parse(json);
		if(!info.pagetoken){
		info.pagetoken = json.next_page_token;
		searchData = json;
		setTimeout(function(){getData(info,cb,searchData)},0);
		}
		else{
		json.results = searchData.results.concat(json.results)
		
		cb(json)
		}
		
    },
	error:function(err){ console.log(err) }
});

}

//Google Map
var map;
var infoWindow;
var service;
var filterType="atm";
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
	var data = {
	location:"13.7563,100.5018",
	lang:"en",
	pagetoken:""
	};
	
	getData(data,function(res){
	console.log("res:",res)
	performSearch(res)
	});
		
   
}
window.lastJson;
function performSearch(json) {
lastJson = json;

   /* var request = {
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
    service.radarSearch(request, callback);*/
//	console.log("json",json);
	
	if(filterType){
	json = json["results"].filter(function(o){
	if(filterType=="cdm"){
	return o.name.toLowerCase().indexOf("cdm")>-1; // mean its a cash deposit machine
}
else{
	return o.types[0]==filterType;    //replace with "atm"  or "bank" as per search
}
	});
	}
	else{
	json = json["results"];
	}
	
	callback(json)
}

function callback(results, status) {
   /* if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
    }*/
	console.log("results",results);
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