user = JSON.parse(localStorage.getItem('user'))
console.log(user);
if (user.delvary) {
    function getOrder() {
        var data = JSON.stringify({
            "delvary_id": user.delvary
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var result = JSON.parse(this.responseText).result
                console.log(result);
                var childData
                for (child of result) {
                    childData += `
                    <tr>
                        <td>${child.From_location}</td>
                        <td>${child.to_location}</td>
                        <td>${child.duration}</td>
                        <td>${child.distance}</td>
                        <td>
                            <a >
                                <button class="btn btn-info" onclick="Accept()">Accept</button>
                            </a>
                            <button type="button" class="btn btn-danger" data-toggle="modal"
                                data-target="#exampleModal">Refuse</button>
                        </td>
                    </tr>
                    `
                }
                childData ? childData = childData.replace('undefined', '') : childData = ''
                document.getElementById('body').innerHTML = childData
            }
        });

        xhr.open("POST", "https://orderasystem.herokuapp.com/delvary/transportation");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
    getOrder()
} else {
    window.location = './../pages/404.html'
}
function Accept() {
    var data = JSON.stringify({
        "delvary_id": user.delvary
    });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            window.location = './../pages/AcceptTran.html'
        }
    });

    xhr.open("POST", "https://orderasystem.herokuapp.com/delvary/approve");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}