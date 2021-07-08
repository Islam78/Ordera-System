var user = JSON.parse(localStorage.getItem('user'))
var delvary = JSON.parse(localStorage.getItem('delivaryDetail'))
if (user?.user) {
    function Rate(rate) {
        var data = JSON.stringify({
            "delvary_id": delvary.delvary_id,
            "rate": rate
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                // window.location = './selectType.html'
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thank YOu',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });

        xhr.open("POST", "https://orderasystem.herokuapp.com/user/rate");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
} else {
    window.location = './404.html'
}
