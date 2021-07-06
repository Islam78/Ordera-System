var Urldelvar = localStorage.getItem('Urldelvar');
var user = JSON.parse(localStorage.getItem('user'))
if (user.user) {

    data = ""
    function restorant() {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    data = JSON.parse(this.responseText).result
                    console.log('successful');
                    window.location.href = '../pages/delivaryCategory.html'
                    localStorage.setItem('delivary', JSON.stringify(data))
                    localStorage.setItem('Urldelvar', 'foods')
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
        xhr.open("POST", `https://orderasystem.herokuapp.com/delvary/restaurants`);
        xhr.send(data);
    }
    function stationary() {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    data = JSON.parse(this.responseText).result
                    console.log('successful');
                    window.location.href = '../pages/delivaryCategory.html'
                    localStorage.setItem('delivary', JSON.stringify(data))
                    localStorage.setItem('Urldelvar', 'tools')
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
        xhr.open("POST", `https://orderasystem.herokuapp.com/delvary/library`);
        xhr.send(data);
    }
    function supermarket() {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    data = JSON.parse(this.responseText).result
                    console.log('successful');
                    window.location.href = '../pages/delivaryCategory.html'
                    localStorage.setItem('delivary', JSON.stringify(data))
                    localStorage.setItem('Urldelvar', 'groceries')

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
        xhr.open("POST", `https://orderasystem.herokuapp.com/delvary/supermarket`);
        xhr.send(data);
    }

    function GetQuick() {
        var data = "";

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    data = JSON.parse(this.responseText).result
                    var childData
                    for (child of data) {
                        childData += `
                    <div class="col-lg-3 col-md-6 col-sm-6 col-ms-12 col-xs-12">
                        <div class="content text-center">
                            <img src="${child.image}" alt="">
                            <h5 class="text-center mt-3">${child.name}</h5>
                            <p>${child.description}</p>
                            <h4 class="price">${child.price} EGP</h4>
                            <button class="btn add" onclick="getItemDetails(${child.id}, ${child.item_id});AddCart()">Add to cart</button>
                        </div>
                    </div>
                    `
                    }
                    childData ? childData = childData.replace('undefined', '') : childData = ''
                    document.getElementById('row').innerHTML = childData
                    console.log('successful');
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
        xhr.open("GET", "https://orderasystem.herokuapp.com/home/quick");
        xhr.send(data);
    } GetQuick()

    function plus(id) {
        let Element = document.getElementById(`qunt${id}`).value
        Element = Element * 1
        if (Element >= 0) {
            Element += 1
        } document.getElementById(`qunt${id}`).value = Element
        document.getElementById(`qunt${id}`).innerHTML = Element
        localStorage.setItem('qty', JSON.stringify({ item_id: id, qty: Element }))
    }
    function minus(id) {
        let Element = document.getElementById(`qunt${id}`).value
        Element = Element * 1
        if (Element > 0) {
            Element -= 1
        }
        document.getElementById(`qunt${id}`).value = Element
        document.getElementById(`qunt${id}`).innerHTML = Element
        localStorage.setItem('qty', JSON.stringify({ item_id: id, qty: Element }))
    }
    var ItemData
    function getItemDetails(id, item_id) {
        getHead(id);
        var data = JSON.stringify({
            "id_items": `${item_id}`,
            "id": `${id}`,
            "categroy": `foods`
        });
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                ItemData = JSON.parse(this.responseText).result[0]

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
        xhr.open("POST", "https://orderasystem.herokuapp.com/home/categroy");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }
    function getHead(id) {
        var data = JSON.stringify(
            {
                "id": id
            }
        );
        console.log('send data', data);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var headDetail = JSON.parse(this.responseText)
                localStorage.setItem('headDetail', JSON.stringify(headDetail))
            }
        });
        xhr.open("POST", "https://orderasystem.herokuapp.com/home/quick_detail");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }
    function AddCart() {
        let headers = JSON.parse(localStorage.getItem('headDetail'))
        console.log('headers', headers.place_name);
        setTimeout(() => {
            var data = JSON.stringify({
                "user_id": `${user?.user}`,
                "product_name": `${ItemData?.name}`,
                "image": `${ItemData?.image}`,
                "qty": "1",
                "price": `${ItemData?.price}`,
                "user_location": user?.Location,
                "prudect_location": headers.location,
                "place": headers.place_name
            });
            console.log('send data', data);
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Add To Cart',
                        showConfirmButton: false,
                        timer: 1500
                    })
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
            xhr.open("POST", "https://orderasystem.herokuapp.com/cart/addcart");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);

        }, 600);
    }
}
else {
    window.location = './../pages/404.html'
}
