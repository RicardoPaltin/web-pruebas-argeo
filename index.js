// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

// New function to track user's location.
const trackLocation = ({ onSuccess, onError = () => { } }) => {
  if ('geolocation' in navigator === false) {
    return onError(new Error('Geolocation is not supported by your browser.'));
  }

  // Use watchPosition instead.
  return navigator.geolocation.watchPosition(onSuccess, onError);
};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -3.9901, lng: -79.2045 },
    zoom: 22,
  });
  infoWindow = new google.maps.InfoWindow();



  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        //infoWindow.setPosition(pos);
        //infoWindow.setContent("lat: " + pos.lat + " log: " + pos.lng);
        //infoWindow.open(map);
        //map.setCenter(pos);

        //const image2 = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";


        var icon1 = {
          url: "../img/here_one_position.png", // url
          scaledSize: new google.maps.Size(50, 50), // size
        };

        var marker = new google.maps.Marker({
          position: { lat: pos.lat, lng: pos.lng },
          map: map,
          icon: icon1,
          title: "Posición actual lat: " + + pos.lat + " log: " + pos.lng,
          
        });

        marker.setAnimation(google.maps.Animation.BOUNCE);
        
        const contentString = "lat: " + + pos.lat + " log: " + pos.lng

        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });


        trackLocation({
          onSuccess: ({ coords: { latitude: lat, longitude: lng } }) => {
            marker.setPosition({ lat, lng });
            map.panTo({ lat, lng });
          },
          onError: err =>
            alert(`Error: ${getPositionErrorMessage(err.code) || err.message}`)
        });


       

        var icon = {
          url: "../img/here_second_position.png", // url
          scaledSize: new google.maps.Size(100, 100), // size
        };

        var marker2 = new google.maps.Marker({
          position: { lat: pos.lat, lng: pos.lng },
          map: map,
          icon: icon,
          draggable: true,
          title: "Posición seleccionada lat: " + + pos.lat + " long: " + pos.lng
        });

        

        google.maps.event.addListener(marker2, 'drag', function (event) {
          console.log(event.latLng.lat());
          console.log(event.latLng.lng());
          marker2.setTitle("Posición seleccionada -> Lat: " + event.latLng.lat() + " long: " + event.latLng.lng());
        });


      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );



  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}




