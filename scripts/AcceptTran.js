
var user = JSON.parse(localStorage.getItem('user'))
if (user.user) {
    setTimeout(() => {
        const addressForUserGo = { lat: 30, lng: 30 };
        const MAP_READY_INTERVAL = setInterval(() => {
            //   console.log(GlobalLatlng);

            // if (GlobalLatlng.lat) {
            //   // map functionallity is ready
            //   clearInterval(MAP_READY_INTERVAL);
            //   // TODO: Add live Here
            //   displayRoute({ from: GlobalLatlng, to: addressForUserGo });
            // }
        }, 100);
        if (GlobalLatlng.lat) {
            // map functionallity is ready
            console.log(GlobalLatlng);
            clearInterval(MAP_READY_INTERVAL);
            displayRoute({ from: GlobalLatlng, to: addressForUserGo });
        }
    }, 300);

    function Arrive() {
        var element = document.getElementById('Action')
        element.innerText = 'Finish'
        if (element.value == 'Finish') {
            console.log('s');
            window.location = './rate.html'
        } else {
            element.value = 'Finish'
            const addressForUserGo = { lat: 31, lng: 31 };
            displayRoute({ from: GlobalLatlng, to: addressForUserGo });
        }
    }
} else {
    window.location = './../pages/404.html'

}
