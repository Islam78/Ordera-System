var user = JSON.parse(localStorage.getItem('user'))
if (user) {
    console.log(user);
    childUser = `
        <h5 class="user-name">${user.First_name} ${user.last_name}</h5>
        <h6 class="user-email">${user.Email}</h6>
    `
    var childData = `
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                    <label for="fullName">First Name</label>
                    <input type="text" class="form-control" id="fullName"
                        placeholder="Enter full name" value="${user.First_name}">
                </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div class="form-group">
                <label for="fullName">First Name</label>
                <input type="text" class="form-control" id="fullName"
                    placeholder="Enter full name" value="${user.last_name}">
            </div>
             </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                    <label for="eMail">Email</label>
                    <input type="email" class="form-control" id="eMail"
                        placeholder="Enter email ID" value="${user.Email}">
                </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div class="form-group">
                <label for="Location">Location</label>
                <input type="Location" class="form-control" id="Location"
                    placeholder=" Location " value="${user.Location}">
            </div>
        </div>
    `
    document.getElementById('row').innerHTML = childData
    document.getElementById('user').innerHTML = childUser
} else {
    window.location = './../pages/404.html'
}