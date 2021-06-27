var user = JSON.parse(localStorage.getItem('user'))
if (user.user) {
  setTimeout(() => {
    const addressForUserGo = { lat: 30, lng: 30 };
    const MAP_READY_INTERVAL = setInterval(() => {
      console.log(GlobalLatlng);

      // if (GlobalLatlng.lat) {
      //   // map functionallity is ready
      //   clearInterval(MAP_READY_INTERVAL);
      //   // TODO: Add live Here
      //   displayRoute({ from: GlobalLatlng, to: addressForUserGo });
      // }
    }, 100);
    if (GlobalLatlng.lat) {
      // map functionallity is ready
      clearInterval(MAP_READY_INTERVAL);
      // TODO: Add live Here
      displayRoute({ from: GlobalLatlng, to: addressForUserGo });
    }
  }, 300);
} else {
  window.location = './../pages/404.html'

}