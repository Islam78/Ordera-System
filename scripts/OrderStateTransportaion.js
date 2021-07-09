user = JSON.parse(localStorage.getItem('user'))
scoter = JSON.parse(localStorage.getItem('delivaryDetail'))
if (user?.user && scoter) {
    console.log(scoter);
    document.getElementById('scoter').innerHTML = `
        <img src="../images/scoter.jpg" alt="">
       <div class="row">
        <div class="col-md-3"></div>
            <div class="col-md-6 mt-3">
                <ul class="list-group text-left">
                    <li class="list-group-item">
                        <div class="md-v-line"></div>
                        <i class="fas fa-signature mr-5 Color fa-2x"></i>${scoter['frist_name']} ${scoter['last_name']}
                    </li>
                    <li class="list-group-item">
                        <div class="md-v-line"></div>
                        <i class="far fa-smile  mr-5 Color  fa-2x"></i></i> Rate: ${Math.ceil(Number(scoter['rate']))}
                    </li>
                    <li class="list-group-item">
                        <div class="md-v-line"></div>
                        <i class="fas fa-motorcycle mr-5 Color fa-2x "></i>Scoter Number: ${scoter['Scooter'] == 'undefined' ? scoter['Scooter'] : 0}
                    </li>
                    <li class="list-group-item">
                        <div class="md-v-line"></div>
                        <i class="fas fa-people-arrows mr-5 Color fa-2x"></i>Distance: ${Number(Number(scoter['distance']) / 1.60).toFixed(2)}  km
                    </li>
                    <li class="list-group-item">
                        <div class="md-v-line"></div>
                        <i class="fas fa-location-arrow mr-5 Color fa-2x"></i>Duration: ${scoter['duration']}
                    </li>
                    <li class="list-group-item">
                        <div class="md-v-line"></div>
                        <i class="fas fa-map-marked-alt mr-5 Color fa-2x"></i>Location: ${scoter['location']}
                    </li>
                </ul>
            </div>
            <div class="col-md-3"></div>
        </div>
        <a onclick="GoLocation(${scoter['delvary_id']})" >
            <button class="btn btn-info mt-3" id="Accept">Accept</button>
        </a>
        <a onclick="Arrive()">
            <button class="btn btn-info mt-3" id="Arrived">Arrived</button>
        </a>
    `
    console.log('ss');
} else {
    window.location = './../pages/404.html'
}
function Arrive() {
    window.location = './transHomePageArrive.html'
}
function GoLocation(delvary_id) {

    var GoLocation = JSON.parse(localStorage.getItem('GoLocation'))
    var EndLocation = JSON.parse(localStorage.getItem('GetUserLocation'))
    var lanLongGOTO = JSON.parse(localStorage.getItem('lanLongGOTO'))
    // console.log(UserLocation);
    var data = JSON.stringify({
        "delvary_id": delvary_id,
        "user_location": lanLongGOTO.UserLocation.userAddress,
        "end_location": EndLocation,
        "lat_s": lanLongGOTO.UserLocation.LatLong.lat,
        "long_s": lanLongGOTO.UserLocation.LatLong.lng,
        "lat_e": lanLongGOTO.GoTo.lat,
        "long_e": lanLongGOTO.GoTo.lng
    });
    console.log(JSON.parse(data));
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Waiting For Captin',
                showConfirmButton: false,
                timer: 1500
            })
            document.getElementById('Accept').style.display = 'none'
        } else {

        }
    });

    xhr.open("POST", "https://orderasystem.herokuapp.com/user/go_location");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);



}