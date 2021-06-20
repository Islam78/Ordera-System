function GetQuick() {
    var data = "";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            if (this.status === 200) {
                data = JSON.parse(this.responseText).result
                console.log(data);
                var ChildData 
                for(child of data){
                    ChildData+= `
                    <div class="col-lg-3 col-md-6 col-sm-6 col-ms-12 col-xs-12">
                <div class="content text-center">
                    <img src="${child.image}" alt="">
                    <h5 class="text-center">${child.name}</h5>
                    <p>${child.description}</p>
                    <h4 class="price">${child.price}$</h4>
                    <button class="btn add">Add to cart</button>
                </div>
            </div>
                    `
                }
                ChildData = ChildData.replace('undefined','')
                document.getElementById('row').innerHTML = ChildData
                console.log(data);
                console.log('successful');
            } else {
                console.log('failed');
            }
        }
    });

    xhr.open("GET", "https://orderasystem.herokuapp.com/home/quick");

    xhr.send(data);
}GetQuick()


data = ""
function restorant() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                data = JSON.parse(this.responseText).result
                console.log(data);
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
                console.log(data);
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
                console.log(data);
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


