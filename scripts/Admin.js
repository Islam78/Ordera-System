function GetAll() {
    var data = "";
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var resultData = JSON.parse(this.responseText).result
                console.log(resultData);
                console.log('successful');
                var childData
                var index = 0;
                for (child of resultData) {
                    index += 1
                    childData += `
                <tr>
                    <td>${child.id}</td>
                    <td>${child.First_name} ${child.last_name}</td>
                    <td>${child.Email}</td>
                    <td>${'01111111111'}</td>
                    <td>${'45'}</td>
                    <td>
                        <button class="btn btn-danger" onclick="Action(${child.id}, 0)" data-toggle="modal"
                            data-target="#exampleModalCenter">Refuse</button>
                        <button class="btn btn-success" onclick="Action(${child.id}, 1)">Accept</button>
                    </td>
                </tr>
                `
                }
                childData ? childData = childData.replace('undefined', '') : childData = ''
                document.getElementById('Body').innerHTML = childData
            } else {
                console.log('failed');
            }
        }
    });

    xhr.open("GET", "https://orderasystem.herokuapp.com/admin/waitlist");

    xhr.send(data);

} GetAll()
function Action(id, type) {
    console.log(id, type);
    var data =
        JSON.stringify({ "approve": `${type}`, "id": `${id}` });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            if (this.status === 200) {
                GetAll()
            }
        }
    });

    xhr.open("POST", "https://orderasystem.herokuapp.com/admin/approve");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);

}