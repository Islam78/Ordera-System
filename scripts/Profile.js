var user = JSON.parse(localStorage.getItem('user'))
if (user.user) {
    console.log(user);
    childUser = `
        <h5 class="user-name">${user.First_name} ${user.last_name}</h5>
        <h6 class="user-email">${user.Email}</h6>
    `
    var childData = `
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                        <label for="fullName">First Name</label>
                        <input type="text" class="form-control" id="First_name"
                            placeholder="Enter full name" value="${user.First_name}">
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                    <label for="fullName">First Name</label>
                    <input type="text" class="form-control" id="last_name"
                        placeholder="Enter full name" value="${user.last_name}">
                </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                        <label for="eMail">Email</label>
                        <input type="email" class="form-control" id="Email"
                            placeholder="Enter email ID" value="${user.Email}">
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                    <label for="Location">Location</label>
                    <input type="Location" class="form-control" id="Location" disabled
                        placeholder=" Location " value="${user.Location}">
                </div>
                <div class="form-group text-right">
                    <button type="button" id="submit" onclick="updateUser()" name="submit" class="btn btnColor">Update</button>
                </div>
            </div>
    `
    document.getElementById('row').innerHTML = childData
    document.getElementById('user').innerHTML = childUser
} else if (user.delvary) {
    console.log(user);
    childUser = `
        <h5 class="user-name">${user.First_name} ${user.last_name}</h5>
        <h6 class="user-email">${user.Email}</h6>
    `
    var childData = `
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                        <label for="fullName">First Name</label>
                        <input type="text" class="form-control" id="First_name"
                            placeholder="Enter full name" value="${user.First_name}">
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                    <label for="fullName">First Name</label>
                    <input type="text" class="form-control" id="last_name"
                        placeholder="Enter full name" value="${user.last_name}">
                </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                        <label for="eMail">Email</label>
                        <input type="email" class="form-control" id="Email"
                            placeholder="Enter email ID" value="${user.Email}">
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                    <label for="Location">Scooter</label>
                    <input type="Location" class="form-control" id="Scooter"
                        placeholder=" Location " value="${user.Scooter}">
                </div>
                <div class="form-group text-right">
                    <button type="button" id="submit" onclick="updateDelivary()" name="submit" class="btn btnColor">Update</button>
                </div>
            </div>
    `
    document.getElementById('row').innerHTML = childData
    document.getElementById('user').innerHTML = childUser
}
else {
    window.location = './../pages/404.html'
}
function updateUser(form) {
    var First_name = document.getElementById('First_name'),
        last_name = document.getElementById('last_name'),
        Email = document.getElementById('Email'),
        Location = document.getElementById('Location')

    var data = JSON.stringify({
        "user_id": user.user,
        "first_name": First_name.value,
        "last_name": last_name.value,
        "email": Email.value,
        "location": Location.value
    });
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log('update');
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Updated Success',
                showConfirmButton: false,
                timer: 1500
            })
            console.log(JSON.parse(this.responseText).result);
            localStorage.setItem('user', JSON.stringify(JSON.parse(this.responseText).result))

        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error',
                showConfirmButton: false,
                timer: 1500
            })
        }
    });

    xhr.open("put", "https://orderasystem.herokuapp.com/update/user");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}
function updateDelivary() {
    var First_name = document.getElementById('First_name'),
        last_name = document.getElementById('last_name'),
        Email = document.getElementById('Email'),
        Scooter = document.getElementById('Scooter')

    var data = JSON.stringify({
        "delivery_id": user.delvary,
        "first_name": First_name.value,
        "last_name": last_name.value,
        "email": Email.value,
        "Scooter": Scooter.value
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Updated Success',
                showConfirmButton: false,
                timer: 1500
            })
            localStorage.setItem('user', JSON.stringify(JSON.parse(this.responseText).result))

        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error',
                showConfirmButton: false,
                timer: 1500
            })
        }
    });

    xhr.open("put", "https://orderasystem.herokuapp.com/update/delivery");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}