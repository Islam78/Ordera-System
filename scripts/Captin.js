user = JSON.parse(localStorage.getItem('user'))
if (user.delvary) {

    // console.log(JSON.parse(localStorage.getItem('AcceptTransportation')));
    document.addEventListener("DOMContentLoaded", (event) => {
        const MAP_READY_INTERVAL = setInterval(() => {
            if (GlobalLatlng.lat) {
                // map functionallity is ready
                clearInterval(MAP_READY_INTERVAL);
                getUserAddress(GlobalLatlng).then((data) => {
                    //   User location as text
                    const userAddress = removeArabicLettersFromText(
                        data.results[0].formatted_address
                    );
                    localStorage.setItem('DelivaryAddressShared', JSON.stringify(userAddress))
                    console.group("Person opened app:");
                    console.log("Address: ", userAddress);
                    console.log("lat and lng: ", GlobalLatlng);
                    GetUserLocation = { 'userAddress': userAddress, LatLong: GlobalLatlng }
                    console.groupEnd();
                });
            }
        }, 100);
    });

    function Select() {
        let Status = document.getElementById('Status')
        let Category = document.getElementById('Category')
        let alert = document.getElementById('alert')
        if (Status.value == 1) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'You Are Availabel Now',
                showConfirmButton: false,
                timer: 1500
            })
            alert.innerText = 'Please Select Your Category'

            if (Category.value == 1) {
                SendStatus()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Transportation',
                    showConfirmButton: false,
                    timer: 1500
                })
                alert.style.display = 'none'
                getOrderTransportation()
            } else if (Category.value == 2) {
                SendStatus()
                // Swal.fire({
                //     position: 'top-end',
                //     icon: 'success',
                //     title: 'Delivary',
                //     showConfirmButton: false,
                //     timer: 1500
                // })
                alert.style.display = 'none'
                getOrderDelivary()
            }

        } else {
            console.log('notActive');
            alert.innerText = 'You Are Not Available    '
            document.getElementById('bodyTrans').style.display = 'none'
            document.getElementById('HeadTrans').style.display = 'none'
            document.getElementById('bodyDelivary').style.display = 'none'
            alert.style.display = 'block'
        }
    }
    // sennd to back
    function SendStatus() {
        let delivaryLocation = JSON.parse(localStorage.getItem('DelivaryAddressShared'))
        var data = JSON.stringify({ "delvary_id": user.delvary, "status": Status.value, "type": Category.value == 1 ? 1 : 0, "location": delivaryLocation })
        console.log(data);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Transportation',
                    showConfirmButton: false,
                    timer: 1500
                })

            } else {

            }
        });
        xhr.open("put", "https://orderasystem.herokuapp.com/user/status");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }
    // to get trans
    function getOrderTransportation() {
        document.getElementById('bodyTrans').style.display = 'contents'
        document.getElementById('HeadTrans').style.display = 'contents'
        document.getElementById('bodyDelivary').style.display = 'none'
        var data = JSON.stringify({ "delvary_id": user.delvary });
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Transportation',
                    showConfirmButton: false,
                    timer: 1500
                })
                var result = JSON.parse(this.responseText).result
                localStorage.setItem('AcceptTransportation', JSON.stringify(result))
                console.log(result);
                var childData
                for (child of result) {
                    childData += `
                    <tr>
                        <td>${child.From_location}</td>
                        <td>${child.to_location}</td>
                        <td>${child.duration}</td>
                        <td>${Number(child.duration.replace('mins', '')) * 1.75} EGP</td>
                        <td>${Number(child.distance) / 1.60} km</td>
                        <td>
                            <a >
                                <button class="btn btnColor" onclick="AcceptTransportation()">Get Direction</button>
                            </a>
                           
                        </td>
                    </tr>
                    `
                }
                childData ? childData = childData.replace('undefined', '') : childData = ''
                document.getElementById('bodyTrans').innerHTML = childData
            } else {

            }
        });
        xhr.open("POST", "https://orderasystem.herokuapp.com/delvary/transportation");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);

    }

    // to get delivary
    function getOrderDelivary() {
        document.getElementById('bodyTrans').style.display = 'none'
        document.getElementById('HeadTrans').style.display = 'none'
        document.getElementById('bodyDelivary').style.display = 'block'
        var data = JSON.stringify({ "delvary_id": user.delvary });
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Delivery',
                    showConfirmButton: false,
                    timer: 1500
                })
                var result = JSON.parse(this.responseText).delivery
                var TchildData
                for (let index = 0; index < result.length; index++) {
                    const element = result[index];
                    var item = result[index]
                    TchildData +=
                        `
                            <div class="col-12 m-1" >
                                    <div class="card card-2">
                                        <div class="card-body" style="color:black;background:#F7B614;font-weight:bolder;">
                                            <div class="media">
                                                <div class="media-body my-auto text-right">
                                                    <div class="row my-auto flex-column flex-md-row">
                                                        <div class="col-auto my-auto ">
                                                            <h6 class="mb-0" style="text-align: left; font-weight:bolder;">${item.place_name}</h6>
                                                        </div>
                                                        <div class="col my-auto " style="text-align: left;">
                                                        From Location: <small>${item.from_location} </small>
                                                        </div>
                                                        <div class="col my-auto "  style="text-align: left;">
                                                        To Location: <small> ${item.to_location}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="row " id="Sub${item.menuId}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `
                    TchildData = TchildData ? TchildData.replace('undefined', '') : ''
                    document.getElementById('DelivaryItems').innerHTML = TchildData
                }

                for (let index = 0; index < result.length; index++) {
                    var item = result[index]
                    var TGrandChild = ''
                    for (let child = 0; child < item.menu?.length; child++) {
                        childItem = item.menu[child]
                        TGrandChild +=
                            `
                                <div class="col-12" >
                                    <hr class="my-3">
                                    <div class="col mt-auto">
                                        <div class="media row justify-content-between ">
                                            <div class="col my-auto ">
                                                Product Name:  ${childItem.product_name}
                                            </div>
                                            <div class="col my-auto ">
                                                ${childItem.qty} | ${childItem.total / childItem.qty} 
                                            </div>
                                            <div class="col my-auto " style="font-weight: bolder;">
                                                Total: ${childItem.total}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `
                        TGrandChild = TGrandChild ? TGrandChild.replace('undefined', '') : ''
                        document.getElementById(`Sub${item.menuId}`).innerHTML = TGrandChild
                        // TGrandChild =''
                        // return;


                    }

                }
            } else {

            }
        });
        xhr.open("POST", "https://orderasystem.herokuapp.com/delvary/delivery");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }

} else {
    window.location = './../pages/404.html'
}

function AcceptTransportation() {
    if (JSON.parse(localStorage.getItem('AcceptTransportation')) != null) {
        console.log(JSON.parse(localStorage.getItem('AcceptTransportation')));
        // window.location = './../pages/AcceptTran.html'
    }
    var data = JSON.stringify({
        "delvary_id": user.delvary,
        "type": "transportation"
    });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            window.location = './../pages/AcceptTran.html'
        }
    });
    // https://orderasystem.herokuapp.com/
    xhr.open("POST", "https://orderasystem.herokuapp.com/delvary/approve");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}
var delivery_dirction
function GetUserLatLng() {

}

function GetDelivery() {
    // get user lat and long
    var data = "";
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            resturant_dirction = JSON.parse(this.responseText).results[0].geometry.location

            delivery_dirction = JSON.parse(this.responseText).results[1].geometry.location
            let AcceptTransportation = [{
                lat_s: resturant_dirction.lat,
                long_s: resturant_dirction.lng,
                lat_e: delivery_dirction.lat,
                long_e: delivery_dirction.lng
            }]
            localStorage.setItem('AcceptTransportation', JSON.stringify(AcceptTransportation))
            window.location = './../pages/AcceptTran.html'
        }
    });
    xhr.open("GET", `https://orderasystem.herokuapp.com/user/delivery_dirction/${user.delvary}`);

    xhr.send(data);
}