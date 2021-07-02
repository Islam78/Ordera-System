
var user = JSON.parse(localStorage.getItem('user'))
if (user.delvary) {
    let AcceptTransportation = JSON.parse(localStorage.getItem('AcceptTransportation'));
    let userLocation = { lat: Number(AcceptTransportation[0].lat_s), lng: Number(AcceptTransportation[0].long_s) }
    let userGoto = { lat: Number(AcceptTransportation[0].lat_e), lng: Number(AcceptTransportation[0].long_e) }
    console.log('from', userLocation);
    console.log('to', userGoto);

    setTimeout(() => {
        const addressForUserGo = { lat: 30, lng: 30 };
        const MAP_READY_INTERVAL = setInterval(() => {
        }, 100);
        if (GlobalLatlng.lat) {
            console.log(GlobalLatlng);
            clearInterval(MAP_READY_INTERVAL);
            displayRoute({ from: GlobalLatlng, to: userLocation });
        }
    }, 300);
    function Arrive() {
        var element = document.getElementById('Action')
        element.innerText = 'Finish'
        if (element.value == 'Finish') {
            window.location = './Captin.html'
        } else {
            element.value = 'Finish'
            const addressForUserGo = { lat: 31, lng: 31 };
            displayRoute({ from: GlobalLatlng, to: userGoto });
        }
    }
} else {
    window.location = './../pages/404.html'

}
