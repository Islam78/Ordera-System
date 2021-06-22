const GOOGLE_MAPS_KEY = "AIzaSyA7nfzqox7HP_crX14tFzVLVpW3r5PnHoI";
const onSuccess = (position) => {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const myLatlng = new google.maps.LatLng(lat, lng);

  const map = new google.maps.Map(document.getElementById("map"), {
    center: myLatlng,
    zoom: 16,
  });
  const marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
  });

  const infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Go to my location.";
  locationButton.classList.add("custom-map-control-button");
  // locationButton.attributes('type','button')
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  locationButton.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      new google.maps.Marker({
        position: pos,
        map: map,
      });
      map.setCenter(pos);
    }, onError);
  });

  // get street name
  $.ajax({
    url: `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_MAPS_KEY}&language=ar-eg`,
    data: {
      latlng: lat + "," + lng,
      sensor: true,
    },
    success: function (data) {
      console.log(data);
      if (data.status === "OK") {
        const address = data.results[0].formatted_address;
        console.log(data.results[0]);
        document.getElementById("address").innerHTML = address;
      }
    },
    error: () => {
      console.log("Error in ajax");
    },
  });

  // get directions
  $.ajax({
    url: `https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=${GOOGLE_MAPS_KEY}&language=ar-eg`,
    // data: {
    //   latlng: lat + "," + lng,
    //   sensor: true,
    // },
    success: function (data) {
      console.log(data);
      // if (data.status === "OK") {
      //   const address = data.results[0].formatted_address;
      //   document.getElementById("address").innerHTML = address;
      // }
    },
    error: () => {
      console.log("Error in ajax");
    },
  });
};

const onError = (error) =>
  alert("code: " + error.code + "\n" + "message: " + error.message + "\n");

function initMap() {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
