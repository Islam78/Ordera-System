user = JSON.parse(localStorage.getItem('user'))
if (user.user) {
    scoter = JSON.parse(localStorage.getItem('delivaryDetail'))
    document.getElementById('scoter').innerHTML = `
        <img src="../images/scoter.jpg" alt="">
       <div class="row">
        <div class="col-md-3"></div>
            <div class="col-md-6 mt-3">
                <ul class="list-group text-left">
                    <li class="list-group-item">
                        <div class="md-v-line"></div>
                        <i class="fas fa-signature mr-5 Color fa-2x"></i>${scoter[0].frist_name} ${scoter[0].frist_name}
                    </li>
                    <li class="list-group-item">
                        <div class="md-v-line"></div>
                        <i class="fas fa-id-card mr-5 Color fa-2x"></i>delvary Id: ${scoter[0].delvary_id}
                    </li>
                    <li class="list-group-item">
                        <div class="md-v-line"></div>
                        <i class="fas fa-motorcycle mr-5 Color fa-2x "></i>Scoter Number: ${scoter[0].Scooter}
                    </li>
                    <li class="list-group-item">
                        <div class="md-v-line"></div>
                        <i class="fas fa-people-arrows mr-5 Color fa-2x"></i>Distance: ${scoter[0].distance}
                    </li>
                    <li class="list-group-item">
                        <div class="md-v-line"></div>
                        <i class="fas fa-location-arrow mr-5 Color fa-2x"></i>Duration: ${scoter[0].duration}
                    </li>
                    <li class="list-group-item">
                        <div class="md-v-line"></div>
                        <i class="fas fa-map-marked-alt mr-5 Color fa-2x"></i>Location: 1${scoter[0].location}
                    </li>
                </ul>
            </div>
            <div class="col-md-3"></div>
        </div>
        <a onclick="GoLocation(${scoter[0].delvary_id})">
            <button class="btn btn-info mt-3">Arrived</button>
        </a>
    `
    console.log('ss');
} else {
    window.location = './../pages/404.html'
}

function GoLocation(delvary_id) {
    var GoLocation = JSON.parse(localStorage.getItem('GoLocation'))
    var UserLocation = JSON.parse(localStorage.getItem('UserLocation'))
    var data = JSON.stringify({
        "delvary_id": delvary_id,
        "user_location": UserLocation,
        "end_location": GoLocation
    });
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            window.location = './rate.html'
        }
    });
    xhr.open("POST", "https://orderasystem.herokuapp.com/user/go_location");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);

    // href="./transHomePage.html"

}