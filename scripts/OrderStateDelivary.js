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
                        <i class="far fa-smile  mr-5 Color  fa-2x"></i></i> Rate: ${
                            Math.ceil(Number(scoter['rate']))
                        }
                    </li>
                    <li class="list-group-item">
                        <div class="md-v-line"></div>
                        <i class="fas fa-motorcycle mr-5 Color fa-2x "></i>Scoter Number: ${scoter['Scooter']}
                    </li>
                    <li class="list-group-item">
                        <div class="md-v-line"></div>
                        <i class="fas fa-people-arrows mr-5 Color fa-2x"></i>Distance: ${Number(scoter['distance']).toFixed(2)}  km
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
        <a onclick="GoLocation()" >
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
    window.location = './rate.html'
}

function GoLocation() {
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

    xhr.open("delete", `https://orderasystem.herokuapp.com/cart/approve/${user.user}`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send();



}