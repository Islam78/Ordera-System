function Login() {
    let FormData = JSON.stringify({
        "type": document.getElementById('type').value,
        "email": document.getElementById('email').value,
        "password": document.getElementById('password').value
    })
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                console.log('successful');
                document.getElementById('DataErr').style.display = 'none'
                res = JSON.parse(this.responseText).result
                localStorage.setItem('user', JSON.stringify(res))
                if (res?.delvary) {
                    console.log('delvary');
                    window.location.href = './Captin.html'
                } else if (res?.user) {
                    window.location.href = './selectType.html'
                    console.log('user');
                } else {
                    window.location.href = './Admin.html'
                    console.log('user');
                }
            } else {
                console.log('failed');
                console.log(JSON.parse(this.responseText).error);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: JSON.parse(this.responseText).error,
                    showConfirmButton: false,
                    timer: 1500
                })
                document.getElementById('DataErr').innerHTML = JSON.parse(this.responseText).error
            }
        }
    });
    xhr.open("POST", "https://orderasystem.herokuapp.com/signin");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(FormData);

}