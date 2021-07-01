var user = JSON.parse(localStorage.getItem('user'))
if (user?.user) {
    function Rate(rate) {
        var data = JSON.stringify({
            "delvary_id": user.user,
            "rate": rate
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                window.location = './selectType.html'
            }
        });

        xhr.open("POST", "https://orderasystem.herokuapp.com/user/rate");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
} else {
    window.location = './404.html'
}
