document.getElementById("openModal").click();
function ShowMenu() {
  document.getElementById("menu").style.display = "inline";
}
var x = document.getElementById("location");
function getLocatio() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
}
