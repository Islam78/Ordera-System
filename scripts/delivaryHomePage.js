
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
            } else {
                console.log('failed');
            }
        }
    });
    xhr.open("POST", `https://orderasystem.herokuapp.com/delvary/supermarket`);
    xhr.send(data);

}


