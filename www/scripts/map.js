const GOOGLE_MAPS_KEY = "AIzaSyA7nfzqox7HP_crX14tFzVLVpW3r5PnHoI";

let map;
let directionsService;
let directionsRenderer;
let markers = [];
let addressToGo = "جامعة مصر";
const onSuccess = (position) => {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  const latlng = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    center: latlng,
    zoom: 16,
  });
  directionsRenderer.setMap(map);

  addMyLocationBtn();
  // ================================================== Examples ========================================================
  // dummy data from => captain location. to =>user location
  // getUserAddress(latlng).then((data) => {
  //   console.log(data);
  //   if (data.status === "OK") {
  //     const address = data.results[0];
  //     // TODO: display full address data in input
  //     // document.getElementById(
  //     //   "address"
  //     // ).innerHTML = `${address.formatted_address}`;
  //     return displayRoute({
  //       from: getCaptainLocation(),
  //       to: address.geometry.location,
  //     });
  //   }
  //   console.log(data.status);
  // });

  // dummy place
  searchByPlace("جامعة مصر").then((data) => {
    console.log(data);
    if (data.status === "OK") {
      if (data.candidates.length > 0) {
        console.log(data.candidates[0]);
        const firstElement = data.candidates[0];
        getTimeBetweenTwoPoints(latlng, firstElement.geometry.location).then(
          (data) => {
            console.log(data);
            console.log(data.rows[0].elements[0]);
            return displayRoute({
              from: latlng,
              to: firstElement.geometry.location,
            });
          }
        );
      } else {
        console.log("No places. Try another name.");
      }
    }
  });

  // getUserAddress(latlng, displayRoute);
  // showUserLocationInMap(latlng);
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
// search part
// can search by names
// return a list of places that matches input params
const searchByPlace = async (input) => {
  return await $.ajax({
    url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
    data: {
      key: GOOGLE_MAPS_KEY,
      // language: "ar-eg",
      inputtype: "textquery",
      input: input,
      fields: "photos,formatted_address,name,rating,opening_hours,geometry",
    },
    success: (data) => data,
    error: () => console.log("Error in ajax"),
  });
};

const getUserAddress = async ({ lat, lng }) => {
  return await $.ajax({
    url: `https://maps.googleapis.com/maps/api/geocode/json?language=ar-eg`,
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
// ?units=imperial&origins=H8MW%2BWP%20Kolkata%20India&destinations=GCG2%2B3M%20Kolkata%20India

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
