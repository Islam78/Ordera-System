var user = JSON.parse(localStorage.getItem('user'))
if (user.user) { } else {
    window.location = './../pages/404.html'
}