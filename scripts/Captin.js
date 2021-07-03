user = JSON.parse(localStorage.getItem('user'))
if (user.delvary) {

    function Select() {
        let Status = document.getElementById('Status')
        let Category = document.getElementById('Category')
        let alert = document.getElementById('alert')
        if (Status.value == 1) {
            if (Category.value == 1) {
                console.log('Transportation');
                alert.style.display = 'none'
                getOrderTransportation()
            } else if (Category.value == 2) {
                console.log('Delivary');
                alert.style.display = 'none'
                getOrderDelivary()
            }
        } else {
            console.log('notActive');
            document.getElementById('bodyTrans').style.display = 'none'
            document.getElementById('HeadTrans').style.display = 'none'
            document.getElementById('bodyDelivary').style.display = 'none'
            alert.style.display = 'block'
        }

    }

    var FakeData =
    {
        "delivery": [
            {
                "delevry": 3,
                "place_name": "GAD",
                "from_location": "393 Al Moshir Ahmed Ismail - Al Akid Ibrahim Abdo, First 6th of October, Giza Governorate",
                "to_location": "52-4 El-Salam, Al Khosous, Al Khankah, Al Qalyubia Governorate",
                "menuId": 1,
                "menu": [
                    {
                        "delevry": 3,
                        "place_name": "GAD",
                        "product_name": "Cheese Sticks",
                        "qty": 1,
                        "total": 120
                    }
                ]
            },
            {
                "delevry": 3,
                "place_name": "MAC",
                "from_location": "52-4 El-Salam, Al Khosous, Al Khankah, Al Qalyubia Governorate",
                "to_location": "22-4 Fahmy Abd El-Aziz, Al Khosous, Al Khankah, Al Qalyubia Governorate",
                "menuId": 2,
                "menu": [
                    {
                        "delevry": 3,
                        "place_name": "MAC",
                        "product_name": "Italiano Penne Pasta",
                        "qty": 1,
                        "total": 10
                    },
                ]
            },
            {
                "delevry": 3,
                "place_name": "rayan",
                "from_location": "22-4 Fahmy Abd El-Aziz, Al Khosous, Al Khankah, Al Qalyubia Governorate",
                "to_location": "Mohammed El-Sayed, Al Khosous, Al Khankah, Al Qalyubia Governorate",
                "menuId": 3,
                "menu": [
                    {
                        "delevry": 3,
                        "place_name": "rayan",
                        "product_name": "Mega Vanilla",
                        "qty": 3,
                        "total": 24
                    },
                    {
                        "delevry": 3,
                        "place_name": "rayan",
                        "product_name": "Mega Vanilla",
                        "qty": 3,
                        "total": 24
                    }
                ]
            },
            {
                "delevry": 3,
                "place_name": "user loaction",
                "from_location": "Mohammed El-Sayed, Al Khosous, Al Khankah, Al Qalyubia Governorate",
                "to_location": "Amin Yousry, Al Khosous, El Marg, Cairo Governorate",
                "menuId": 4,
                "menu": []
            },
        ]
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
                        <td>${child.distance}</td>
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
        // start test

        let Tresult = FakeData.delivery
        // console.log(Tresult);
        var TchildData
        for (let index = 0; index < Tresult.length; index++) {
            const element = Tresult[index];
            var item = Tresult[index]
            TchildData +=
                `
                     <div class="col-12 m-1">
                                <div class="card card-2">
                                    <div class="card-body">
                                        <div class="media">
                                            <div class="media-body my-auto text-right">
                                                <div class="row my-auto flex-column flex-md-row">
                                                    <div class="col-auto my-auto ">
                                                        <h6 class="mb-0">${item.place_name}</h6>
                                                    </div>
                                                    <div class="col my-auto ">
                                                    from location: <small style="font-weight: bold;">${item.from_location} </small>
                                                    </div>
                                                    <div class="col my-auto ">
                                                    to location: <small style="font-weight: bold;"> ${item.to_location}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="row " id="${item?.menuId}">

                                        </div>
                                    </div>
                                </div>
                            </div>
            `
            TchildData = TchildData ? TchildData.replace('undefined', '') : ''
            document.getElementById('DelivaryItems').innerHTML = TchildData
        }

        for (let index = 0; index < Tresult.length; index++) {
            var item = Tresult[index]
            var TGrandChild
            for (let child = 0; child < item.menu.length; child++) {
                childItem = item.menu[child]
                TGrandChild +=
                    `
                    
                        <div class="col-12" >
                        <hr class="my-3">
                            <div class="col mt-auto">
                                <div class="media row justify-content-between ">
                                    <div class="col my-auto ">
                                        product_name: <small style="font-weight: bold;"> ${childItem.product_name}</small>
                                    </div>
                                    <div class="col my-auto ">
                                        <small>${childItem.qty} | ${childItem.total / childItem.qty} </small>
                                    </div>
                                    <div class="col my-auto ">
                                        total: <small style="font-weight: bold; color:red"> ${childItem.total}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                TGrandChild = TGrandChild ? TGrandChild.replace('undefined', '') : ''
                document.getElementById(`${item.menuId}`).innerHTML = TGrandChild

            }
        }













        // end test
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var result = JSON.parse(this.responseText)
                console.log(result);
                // console.log(result);
                // var childData
                // for (child of result) {
                //     childData += `
                //     <tr>
                //         <td>${child.From_location}</td>
                //         <td>${child.to_location}</td>
                //         <td>${child.duration}</td>
                //         <td>${child.distance}</td>
                //         <td>
                //             <a >
                //                 <button class="btn btn-info" onclick="Accept()">Accept</button>
                //             </a>
                //             <button type="button" class="btn btn-danger" data-toggle="modal"
                //                 data-target="#exampleModal">Refuse</button>
                //         </td>
                //     </tr>
                //     `
                // }
                // childData ? childData = childData.replace('undefined', '') : childData = ''
                // document.getElementById('bodyDelivary').innerHTML = childData
            }
        });
        // xhr.open("POST", "https://orderasystem.herokuapp.com/delvary/delivery");
        // xhr.setRequestHeader("Content-Type", "application/json");
        // xhr.send(data);
    }

} else {
    window.location = './../pages/404.html'
}

function AcceptTransportation() {
    if (JSON.parse(localStorage.getItem('AcceptTransportation')) != null) {
        console.log(JSON.parse(localStorage.getItem('AcceptTransportation')));
        window.location = './../pages/AcceptTran.html'
    }
}

function Accept() {

    console.log();
    // var data = JSON.stringify({
    //     "delvary_id": user.delvary
    // });
    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    // xhr.addEventListener("readystatechange", function () {
    //     if (this.readyState === 4) {
    //         console.log(this.responseText);
    //         window.location = './../pages/AcceptTran.html'
    //     }
    // });

    // xhr.open("POST", "https://orderasystem.herokuapp.com/delvary/approve");
    // xhr.setRequestHeader("Content-Type", "application/json");

    // xhr.send(data);
}