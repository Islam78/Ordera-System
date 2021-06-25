var Urldelvar = localStorage.getItem('Urldelvar');
var user = JSON.parse(localStorage.getItem('user'))
if (user) {
    
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
                console.log('failed');
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
                console.log('failed');
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
                console.log('failed');
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
                var ChildData
                for (child of data) {
                    ChildData += `
                    <div class="col-lg-3 col-md-6 col-sm-6 col-ms-12 col-xs-12">
                        <div class="content text-center">
                            <img src="${child.image}" alt="">
                            <h5 class="text-center mt-3">${child.name}</h5>
                            <p>${child.description}</p>
                            <h4 class="price">${child.price} EGP</h4>
                            <button class="btn add" onclick="getItemDetails(${child.id});AddCart()">Add to cart</button>
                        </div>
                    </div>
                    `
                }
                ChildData = ChildData.replace('undefined', '')
                document.getElementById('row').innerHTML = ChildData
                console.log('successful');
            } else {
                console.log('failed');
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
function getItemDetails(item_id) {
    var data = JSON.stringify({
        "id_items": `${item_id}`,
        "categroy": `${Urldelvar}`
    });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            ItemData = JSON.parse(this.responseText).result[0]
        }
    });
    xhr.open("POST", "https://orderasystem.herokuapp.com/home/categroy");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
    setTimeout(() => {
    console.log(ItemData);
        
    }, 500);
}
function AddCart() {
    let headers = JSON.parse(localStorage.getItem('headDetail'))
    setTimeout(() => {
        var qty = JSON.parse(localStorage.getItem('qty'))
        var data = JSON.stringify({
            "user_id": `${user.user}`,
            "product_name": `${ItemData.name}`,
            "image": `${ItemData.name}`,
            "qty": `${qty.qty}`,
            "price": `${ItemData.price}`,
            "user_location": `${ItemData.name}`,
            "prudect_location": headers.description
        });
        console.log(data);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
            }
        });
        xhr.open("POST", "https://orderasystem.herokuapp.com/cart/addcart");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);

    }, 400);
}}
else{
    window.location = './../pages/404.html'
}