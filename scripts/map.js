const GOOGLE_MAPS_KEY = "AIzaSyC_5HAzjVTSMJ3SFuZcxyv3-eddSB_70NE";

let map;
let directionsService;
let directionsRenderer;
let markers = [];
let addressToGo = "جامعة مصر";
let GlobalLatlng = {};
const ARABIC_PATTERN = /[أ-ي]/;

const onSuccess = (position) => {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  const latlng = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  GlobalLatlng = latlng;
  map = new google.maps.Map(document.getElementById("map"), {
    center: latlng,
    zoom: 16,
  });
  directionsRenderer.setMap(map);

  addMyLocationBtn();

  // ================================================== Examples ========================================================

  showUserLocationInMap(latlng);
  // putMarkerOnMap(getCaptainLocation());
  // putCaptainsMarkers(latlng);
  // putCaptainsMarkers({
  //   lat: position.coords.latitude + 0.2536521,
  //   lng: position.coords.longitude+ 0.25365211111,
  // });
  // putCaptainsMarkers({
  //   lat: position.coords.latitude + 0.2536521555,
  //   lng: position.coords.longitude+ 0.25,
  // });
  // putCaptainsMarkers({
  //   lat: position.coords.latitude + 0.25521,
  //   lng: position.coords.longitude+ 0.25361,
  // });
  // putCaptainsMarkers({
  //   lat: position.coords.latitude + 0.25521,
  //   lng: position.coords.longitude+ 0.23,
  // });

  // ================================================== End Examples ========================================================
};

const onError = (error) =>
  alert("code: " + error.code + "\n" + "message: " + error.message + "\n");

function initMap() {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// get captain location
const getCaptainLocation = () =>
// dummy data
// TODO: use end point for captain location here
({
  lat: 29.97488078065076,
  lng: 30.945482580418446,
});

// show user location
const showUserLocationInMap = (position) => putMarkerOnMap(position);

const putMarkerOnMap = (position) => {
  const marker = new google.maps.Marker({
    position,
    map: map,
  });
  markers.push(marker);
};

const getUserAddress = async ({ lat, lng }) => {
  return await $.ajax({
    url: `https://maps.googleapis.com/maps/api/geocode/json`,
    data: {
      key: GOOGLE_MAPS_KEY,
      latlng: lat + "," + lng,
      sensor: true,
    },
    success: (data) => data,
    error: () => console.log("Error in ajax"),
  });
};

const displayRoute = ({ from, to }) => {
  deleteMarkers();
  directionsService.route(
    {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
};

const putCaptainsMarkers = (position) => {
  const image = {
    url: "../images/icons8-scooter-32.png",
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(48, 48),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 48),
  };
  const marker = new google.maps.Marker({
    position,
    map: map,
    icon: image,
  });
  markers.push(marker);
};

// Sets the map on all markers.
const setMapOnAll = (map) => markers.map((mark) => mark.setMap(map));

// Removes the markers from the map, but keeps them in the array.
const clearMarkers = () => setMapOnAll(null);

// Shows any markers currently in the array.
const showMarkers = () => setMapOnAll(map);

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

// return a time and mils between two points
// first arg (object of lat and lng for start point) , second arg (object of lat and lng for end point)
const getTimeBetweenTwoPoints = async ({ lat, lng }, destination) => {
  return await $.ajax({
    url: `https://maps.googleapis.com/maps/api/distancematrix/json`,
    data: {
      key: GOOGLE_MAPS_KEY,
      units: "imperial",
      origins: `${lat},${lng}`,
      destinations: `${destination.lat},${destination.lng}`,
    },
    success: (data) => data,
    error: () => console.log("Error in ajax"),
  });
};

const addMyLocationBtn = () => {
  const locationButton = document.createElement("button");
  locationButton.textContent = "Go to my location.";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  // my location btn
  locationButton.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      showUserLocationInMap(pos);
      map.setCenter(pos);
    }, onError);
  });
};
// search part
// can search by names
// return a list of places based on query text
const listOfMapSearch = async (request) =>
  await new google.maps.places.PlacesService(map);

// remove arabic letters
const removeArabicLettersFromText = (text) => {
  if (ARABIC_PATTERN.test(text)) {
    let newText = "";
    for (let i = 0; i < text.length; i++) {
      !ARABIC_PATTERN.test(text[i]) ? (newText += text[i]) : true;
    }
    return newText;
  }
  return text;
};
