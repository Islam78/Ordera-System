function TypeChange() {
    console.log(document.getElementById('type').value);
    var element = document.getElementById('type').value
    if (element == 'user') {
        document.getElementById("Register").innerHTML = `
        <button class="form-control mt-3" type="button" onclick="registerUser()">Create Account</button>
       `
        document.getElementById('loc').setAttribute('placeholder', 'location')
    } else if (element == 'Delvary') {
        document.getElementById("Register").innerHTML = `
        <button class="form-control mt-3" type="button" onclick="registerDelivary()">Create Account</button>
        `
        document.getElementById('loc').setAttribute('placeholder', 'Scooter')
    }
}

function registerUser() {
    console.log('user');
    var first_name = document.getElementById('first_name').value;
    var last_name = document.getElementById('last_name').value;
    var password = document.getElementById('password');
    var ConfirmPassowrd = document.getElementById('ConfirmPassowrd');
    var email = document.getElementById('email');
    var location = document.getElementById('loc')
    var RegisterForm = {
        "type": 'user',
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
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: JSON.parse(this.responseText).error,
                    showConfirmButton: false,
                    timer: 1500
                })
                document.getElementById('DataErr').style.display = 'inline'
                document.getElementById('DataErr').innerHTML = 'Falid To Create, Please Try Again'
            }
        }
    });

    xhr.open("POST", "https://orderasystem.herokuapp.com/register/signupuser");

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(RegisterForm));
}

function registerDelivary() {
    var first_name = document.getElementById('first_name').value;
    var last_name = document.getElementById('last_name').value;
    var password = document.getElementById('password');
    var ConfirmPassowrd = document.getElementById('ConfirmPassowrd');
    var email = document.getElementById('email');
    var location = document.getElementById('loc')
    var RegisterForm = {
        "type": 'user',
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
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                console.log('successful');
                document.getElementById('DataErr').style.display = 'none'
                window.location.href = './login.html'
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: JSON.parse(this.responseText).error,
                    showConfirmButton: false,
                    timer: 1500
                })
                console.log('failed');
                document.getElementById('DataErr').style.display = 'inline'
                document.getElementById('DataErr').innerHTML = 'Falid To Create, Please Try Again'
            }
        }
    });
    xhr.open("POST", "https://orderasystem.herokuapp.com/register/signupdelvary");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(RegisterForm));
}