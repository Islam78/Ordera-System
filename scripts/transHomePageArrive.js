var user = JSON.parse(localStorage.getItem('user'))
var GetLocationDetail = JSON.parse(localStorage.getItem('lanLongGOTO'))
var to = JSON.parse(localStorage.getItem('to'))

if (user.user) {
  console.log('GoTo', GetLocationDetail.GoTo);
  console.log('UserLocation', GetLocationDetail.UserLocation.LatLong);
  console.log('to', to.to);
  // console.log(GetLocationDetail);

  setTimeout(() => {
    const addressForUserGo = to.to;
    const MAP_READY_INTERVAL = setInterval(() => {
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
      console.log('addressForUserGo', addressForUserGo);
      // TODO: Add live Here
      displayRoute({ from: GlobalLatlng, to: to.to });
    }

  }, 300);
} else {
  window.location = './../pages/404.html'
}


