function logout() {
    localStorage.setItem('user', JSON.stringify(''))
    window.location = './../pages/login.html'
}