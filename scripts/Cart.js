var user = JSON.parse(localStorage.getItem('user'))
if (user.user) {
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
                        res.qty = 0
                        // res.description.slice(0,10)
                        subData += `
                  <div class="row border-top border-bottom">
                  <div class="row main align-items-center">
                      <div class="col-2">
                          <img class="img-fluid" src="${res.image}"></div>
                      <div class="col">
                          <div class="row text-muted">${res.product_name}</div>
                          <div class="row">${res.prudect_location.slice(0, 10)}</div>
                      </div>
                     
                      <div class="col">${res.price} EGP 
                        <span class="close" type="button" onclick="Remove(${res.user_id})" >&#10005;</span>
                      </div>
                  </div>
              </div>
              `
                    }
                    subData ? subData = subData.replace('undefined', '') : ''
                    document.getElementById('row').innerHTML = subData

                } else {
                    console.log('failed');
                }
            }
        });

        xhr.open("POST", "https://orderasystem.herokuapp.com/cart/listcarts");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    } getCart()

    function Remove(Name) {
        console.log(Name);
        var data = JSON.stringify({
            "user_id": user.user,
            "product_name": Name
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                getCart()
            }
        });

        // xhr.open("POST", "https://orderasystem.herokuapp.com/cart/delete_carts");
        // xhr.setRequestHeader("Content-Type", "application/json");

        // xhr.send(data);
    }
}
else {
    window.location = './../pages/404.html'
}
