/**
 * Created by chaika on 25.01.16.
 */
var marker1;

var directionsDisplay = null;
var directionService = null;

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');

    require('./API').getPizzaList(function(error, data){
       require("./pizza/PizzaMenu").initialiseMenu(data);
    });

    PizzaCart.initialiseCart();
    require('./ButtonsDisabler').disable();
    google.maps.event.addDomListener(window,'load',initialize);

    require('./ButtonsDisabler').check();

});

function	initialize() {


//Тут починаємо працювати з картою
    if (document.getElementById("googleMap")) {
        var mapProp = {
            center: new google.maps.LatLng(50.464379, 30.519131),
            zoom: 11
        };

        var html_element = document.getElementById("googleMap");
        var map = new google.maps.Map(html_element, mapProp);
    }

    directionService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({ suppressMarkers: true });

    var point	=	new	google.maps.LatLng(50.464379,30.519131);
    var marker	=	new	google.maps.Marker({
        position:point,
        map:map,
        icon:"assets/images/map-icon.png"
    });

    google.maps.event.addListener(map,
        'click',function(me){
            var coordinates	=	me.latLng;

        });

    function	geocodeLatLng(latlng,	 callback){
        var geocoder	=	new	google.maps.Geocoder();
        geocoder.geocode({'location':	latlng},	function(results,	status)	{
            if	(status	===	google.maps.GeocoderStatus.OK&&	results[1])	{
                var adress =	results[1].formatted_address;
                callback(null,	adress);
            }	else	{
                callback(new	Error("Can't	find	adress"));
            }
        });
    }

    google.maps.event.addListener(map,
        'click',function(me){

            var coordinates	=	me.latLng;
            geocodeLatLng(coordinates,	function(err,	adress){
                if(!err)	{
             //Дізналися адресу
                    if(marker1)
                        marker1.setMap(null);

                    var point1	=	new	google.maps.LatLng(coordinates.lat(),coordinates.lng());
                    marker1	=	new	google.maps.Marker({
                        position:point1,
                        map:map,
                        icon:"assets/images/home-icon.png"
                    });

                   calculateRoute(point,coordinates,function(err,time){
                      var $timefield= document.getElementById("time");
                      $timefield.innerHTML=time.duration.text;
                       var $inputAdres=document.getElementById("inputAdres");
                       $inputAdres.value=adress;
                     //  timefield.text(time.duration.text);
                   });
                }	else	{
                    console.log("Немає адреси")
                }
            })
        });



    function	calculateRoute(A_latlng,	 B_latlng,	callback) {
        directionService.route({
            origin: A_latlng,
            destination: B_latlng,
            travelMode: google.maps.TravelMode["DRIVING"]
        }, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                var leg = response.routes[0].legs[0];
                directionsDisplay.setDirections(response);
                callback(null, {
                    duration: leg.duration
                });
            } else {
                callback(new Error("Can'not	find direction"));
            }
        });
    }

}

