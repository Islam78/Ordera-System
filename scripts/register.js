
function register() {
    type = document.getElementById('type').value;
    first_name = document.getElementById('first_name').value;
    last_name = document.getElementById('last_name').value;
    password = document.getElementById('password')
    ConfirmPassowrd = document.getElementById('ConfirmPassowrd');
    email = document.getElementById('email')
    location = document.getElementById('location')
    var RegisterForm = {
        "type": type,
        "first_name": first_name,
        "last_name": last_name,
        "password": password.value,
        "email": email.value,
        "location": location.value
    }
    IsEmail = false
    IsPassord = false
    if (email.value != "") {
        if (email.value.includes("@")) {
            if (email.value.split("@")[1].includes(".")) {
                email.style.border = '0px solid red';
                IsEmail = true
            } else {
                EmailErr
                email.style.border = '2px solid red';
            }
        }
    } else {
        IsEmail = false
        email.style.border = '2px solid red';
    }
    if (password.value && password.value == ConfirmPassowrd.value) {
        password.style.border = '0px solid red';
        ConfirmPassowrd.style.border = '0px solid red';
        document.getElementById('passErr').style.display = 'none'
        IsPassord = true
    } else {
        password.style.border = '2px solid red';
        ConfirmPassowrd.style.border = '2px solid red';
        document.getElementById('passErr').innerHTML = 'Password not Match'
        IsPassord = false
        return
    }
    if (IsPassord && IsEmail && first_name && last_name && type) {
        document.getElementById('DataErr').style.display = 'none'

        console.log(RegisterForm);
    } else {
        document.getElementById('DataErr').innerHTML = 'Invalid Data'

    }
    // api
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                console.log('successful');
                document.getElementById('DataErr').style.display = 'none'
                window.location.href = './login.html'
            } else {
                console.log('failed');
                document.getElementById('DataErr').style.display = 'inline'
                document.getElementById('DataErr').innerHTML = 'Falid To Create, Please Try Again'
            }
        }
    });
    if (type == 'user') {
        xhr.open("POST", "https://orderasystem.herokuapp.com/admin/signupuser");
    } else {
        xhr.open("POST", "https://orderasystem.herokuapp.com/admin/signupdelvary");
    }
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(RegisterForm));
}