function GetAll() {
    var data = "";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                console.log('successful');
                var data = JSON.parse(this.responseText).result
                if (data) {
                    var childData
                    for (c of data) {
                        childData += `
                    <tr>
                    <td>${c.delvary_id}</td>
                    <td>${c.First_name} ${c.last_name}</td>
                    <td>${'011'}</td>
                    <td>${'4521'}</td>
                    <td>
                        <button class="btn btn-danger" onclick="DeleteUser(${c.delvary_id})">Delete</button>
                    </td>
                    </tr>
                        `
                    }
                    childData ? childData = childData.replace('undefined', '') : childData = ''
                    console.log(data);
                    document.getElementById("body").innerHTML = childData;
                }
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    });

    xhr.open("GET", "https://orderasystem.herokuapp.com/admin/delvarylist");

    xhr.send(data);

} GetAll()

function DeleteUser(id) {
    var data = JSON.stringify({
        "id": `${id}`
    });
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            if (this.status === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Success',
                    showConfirmButton: false,
                    timer: 1500
                })
                GetAll()
            } else {
            
            }
        }
    });

    xhr.open("POST", "https://orderasystem.herokuapp.com/admin/delete_delvary");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}