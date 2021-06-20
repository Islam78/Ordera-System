var ResId = localStorage.getItem('ResId');
var Urldelvar = localStorage.getItem('Urldelvar');
console.log(ResId);
var xhr = new XMLHttpRequest();

xhr.withCredentials = true;
xhr.addEventListener("readystatechange", function () {
    var result
    if (this.readyState === 4) {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var headDetail = JSON.parse(this.responseText).result[0]
                document.getElementById('head').innerHTML = `
                <img src="${headDetail.image}" class="headImage"  id="InfoImg">
                <h2 class="" id="InfoTitle">${headDetail.name}</h2>
                <h6 class="" id="InfoDescription">${headDetail.description}</h6>
                `
                localStorage.setItem('headDetail', JSON.stringify(headDetail))

                result = JSON.parse(this.responseText).menu
                var subData
                for (res of result) {
                    res.qty = 0
                    // res.description.slice(0,10)
                    subData += `
                    <div class="card col-md-4 mt-1"> 
                    <div class="image">
                        <img src="${res.image}">
                    </div>
                    <div class="card-body pt-0 px-0 ">
                        <div class="d-flex flex-row justify-content-between mb-0 px-3">
                         <p class="text-muted mt-1 Itemname">${res.name}</p>
                            <h6>${res.price} EGP</h6>
                        </div>
                        <hr class="mt-2 mx-3">
                        <div class="d-flex flex-row justify-content-between px-3 pb-4">
                            <div class="d-flex">
                                <span class="description mr-auto">${res.description.slice(0, 40)}..</span>
                                <div class="action">
                                    <button class="btn Qunt" id="plus" onclick="plus(${res.item_id})">+</button>
                                    <button class="btn" id="qunt${res.item_id}" value="${res.qty}">
                                        ${res.qty}
                                    </button>
                                    <button class="btn Qunt" id="minus" onclick="minus(${res.item_id})">-</button>
                                </div>
                            </div>                            
                        </div>                     
                        <div class="mx-3 mt-3 mb-2">
                        <button onclick="AddCart(${res.name})" type="button" class="btn btn-danger btn-block">
                        <small >Add To Cart</small></button></div> 
                    </div>
                </div>
                    `
                    res.qty = res.qty
                }
                if (subData) {
                    subData = subData.replace('undefined', '')
                }
                document.getElementById('row').innerHTML = subData
            } else {
                console.log('failed');
            }
        }

    }
});
xhr.open("POST", `https://orderasystem.herokuapp.com/delvary/${Urldelvar}`);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(ResId);


function plus(id) {
    let Element = document.getElementById(`qunt${id}`).value
    Element = Element * 1
    if (Element >= 0) {
        Element += 1
    } document.getElementById(`qunt${id}`).value = Element
    document.getElementById(`qunt${id}`).innerHTML = Element
}
function minus(id) {
    let Element = document.getElementById(`qunt${id}`).value
    Element = Element * 1
    if (Element > 0) {
        Element -= 1
    }
    document.getElementById(`qunt${id}`).value = Element
    document.getElementById(`qunt${id}`).innerHTML = Element
}
function AddCart(re, s) {
    console.log(re, s);
    // console.log(JSON.parse(localStorage.getItem('user')));
    // console.log(JSON.parse(localStorage.getItem('headDetail')));
    let headers = JSON.parse(localStorage.getItem('headDetail'))
    var data = JSON.stringify({
        "user_id": "1",
        "product_name": "chiken hat",
        "image": "https://i.ibb.co/4fMtYyf/Balad-El-Gharieb.jpg",
        "qty": "2",
        "price": "100",
        "user_location": "AlMotamayez District, 6th of october, Egypt",
        "prudect_location": headers.description
    });
    console.log(headers);
    //   var xhr = new XMLHttpRequest();
    //   xhr.withCredentials = true;

    //   xhr.addEventListener("readystatechange", function() {
    //     if(this.readyState === 4) {
    //       console.log(this.responseText);
    //     }
    //   });

    //   xhr.open("POST", "https://orderasystem.herokuapp.com/cart/addcart");
    //   xhr.setRequestHeader("Content-Type", "application/json");

    //   xhr.send(data);
}
