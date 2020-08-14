// Put your zillow.com API key here
var zwsid = "X1-ZWz1hdovi5k8i3_29gz1";

var request1 = new XMLHttpRequest();
var request2 = new XMLHttpRequest();
var geocoder;
var map;
var mapMarker;
var zillow1;
var zillow2;
var postal;
var info_window;
var info_window2;
var rev_addr;
var lat_long;

function clear()
{
  document.getElementById("reset").reset();
}

function initialize () {

  geocoder = new google.maps.Geocoder();

  var coords = new google.maps.LatLng(32.75, -97.13);
  var mapOptions = {
    zoom:17,
    center:coords
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function sendRequest () {

  var address = document.getElementById("address").value;
  geocoder.geocode({'address': address}, function(results, status){
    if(status == google.maps.GeocoderStatus.OK) {

      console.log(results);
      postal = results[0].formatted_address;
      map.setCenter(results[0].geometry.location);

      if (mapMarker) {
        mapMarker.setPosition(results[0].geometry.location);
      }
      else {
        mapMarker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      }

      zillow1 = postal.split(",");
      request1.open("GET","proxy.php?zws-id="+zwsid+"&address="+zillow1[0]+"&citystatezip="+zillow1[1]+"+"+zillow1[2]+"+"+zillow1[3]);
      request1.onreadystatechange = function(){
        var xml = request1.responseXML.documentElement;
        var value = xml.getElementsByTagName("zestimate")[0].getElementsByTagName("amount")[0].innerHTML;
        document.getElementById("zillow_output").innerHTML+=postal+" "+"$"+value+"<br>";
        content = info_window.getContent();
        info_window.setContent(content+value);
      }

      request1.withCredentials = "true";
      request1.send(null);

      info_window = new google.maps.InfoWindow({
        content: postal + " $"
      });
      info_window.open(map, mapMarker);

      google.maps.event.addListener(map, 'click', function(event){
        oneMarker(event.latLng);
        lat_long = event.latLng;
      });

      function oneMarker(location){
        geocoder.geocode({'location': lat_long}, function(results, status){
          if(status === google.maps.GeocoderStatus.OK) {
            rev_addr = lat_long;

            zillow_rev = results[0].formatted_address;
            zillow2 = zillow_rev.split(",");
            request2.open("GET","proxy.php?zws-id="+zwsid+"&address="+zillow2[0]+"&citystatezip="+zillow2[1]+"+"+zillow2[2]+"+"+zillow2[3]);
            request2.onreadystatechange = function(){

              var xml2 = request2.responseXML.documentElement;
              var value2 = xml2.getElementsByTagName("zestimate")[0].getElementsByTagName("amount")[0].innerHTML;
              document.getElementById("zillow_output").innerHTML+=zillow_rev+" "+"$"+value2+"<br>";
              content2 = info_window2.getContent();
              info_window2.setContent(content2+value2);
            }

            request2.withCredentials = "true";
            request2.send(null);

            info_window2 = new google.maps.InfoWindow({
              content: zillow_rev + " $"
            });
            info_window2.open(map, mapMarker);

            if (mapMarker && mapMarker.setPosition) {
              mapMarker.setPosition(rev_addr);
            }
            else
            {
              mapMarker = new google.maps.Marker({
                map: map,
                position: rev_addr
              });
            }
          }
        });
      }
    }

    else
    {
      alert("Geocode unsuccessful" + status);
    }
  });
}
