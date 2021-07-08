var user = JSON.parse(localStorage.getItem('user'))
if (user?.user) {
    var data = JSON.stringify({
        "user_id": user.user
    });

    function getCart() {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    console.log('successful');
                    var data = JSON.parse(this.responseText).result
                    var subData
                    for (res of data) {
                        // res.description.slice(0,10)
                        // Total += Number(res.price)
                        subData += `
                            <div class="row border-top border-bottom">
                            <div class="row main align-items-center">
                                <div class="col-2">
                                    <img class="img-fluid" src="${res.image}"></div>
                                <div class="col">
                                <div class="row">${res.product_name.slice(0, 30)}</div>
                                <div class="row text-muted">${res.place_name}</div>
                                </div>
                                
                                <div class="col">
                                
                                <span >  ${res.qty} |  </span>
                                <span >  ${res.price} EGP  </span>
                                    <span class="close" type="button" onclick="Remove(${res.item_id})" >&#10005;</span>
                                </div>
                                </div>
                            </div>
                                `
                    }
                    subData ? subData = subData.replace('undefined', '') : ''
                    console.log('responseText', data);
                    var totalPrice = 0
                    for (let index = 0; index < data.length; index++) {
                        totalPrice += data[index].total
                    }
                    data.length < 1 ? data = '' :  document.getElementById('row').innerHTML = subData
                   
                    document.getElementById('TotalAmount').innerHTML = totalPrice

                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Error',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
        });

        xhr.open("POST", "https://orderasystem.herokuapp.com/cart/listcarts");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    } getCart()

    function Remove(id) {
        var data = JSON.stringify({
            "user_id": user.user,
            "item_id": id
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Deleted item',
                    showConfirmButton: false,
                    timer: 1500
                })
                getCart()
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
        xhr.open("POST", "https://orderasystem.herokuapp.com/cart/delete_carts");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }

    function CheckoutDelivary() {
        console.log("ssssss");
        var data = JSON.stringify({
            "user_id": user.user
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {

            if (this.readyState === 4) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
                localStorage.setItem('delivaryDetail', JSON.stringify(JSON.parse(this.responseText)))
                window.location = './OrderStatedelivary.html'
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });

        xhr.open("POST", "https://orderasystem.herokuapp.com/user/delivery");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
}
else {
    window.location = './../pages/404.html'
}
