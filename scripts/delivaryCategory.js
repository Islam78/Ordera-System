var user = JSON.parse(localStorage.getItem('user'))
if (user) {

    function bindData() {
        var data = JSON.parse(localStorage.getItem('delivary'))
        if (data) {
            var ChildData
            for (c of data) {
                ChildData += `
                <div class="col-md-3 col-lg-3 col-sm-3 mt-2" onclick="SetRestaurants(${c.id})">
                    <a href="../pages/delivaryInfo.html" class="card">
                        <img class="img-fluid" src="${c.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="delivaryName">${c.name}</h5>
                            <p class="card-text">${c.description}</p>
                            <hr>
                            <span class="location" >${c.location}</span>
                        </div>
                    </a>
                </div>
                `
            }
            ChildData = ChildData?.replace('undefined', '')
            document.getElementById("row").innerHTML = ChildData;
        }
    } bindData()

    function SetRestaurants(a, b) {
        Urldelvar = localStorage.getItem('Urldelvar')
        localStorage.setItem('ResId', JSON.stringify({
            "id": a
        }))

    }
    function Search() {
        page = localStorage.getItem('Urldelvar')

        KeyWard = document.getElementById('search').value
        if (page == 'foods') {
            ResSearch(KeyWard, 'restaurants');
        } else if (page == 'supermarket') {
            ResSearch(KeyWard, 'groceries');
        } else {
            ResSearch(KeyWard, 'tools');
        }
    }

    function ResSearch(KeyWard, url) {
        var data = JSON.stringify({
            "name": KeyWard
        });
        console.log(data);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    data = JSON.parse(this.responseText).result
                    localStorage.setItem('delivary', JSON.stringify(data))
                    bindData()
                } else {
                    console.log('failed');
                }
            }
        });

        xhr.open("POST", `https://orderasystem.herokuapp.com/delvary/${url}`);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
}
else{
    window.location = './../pages/404.html'
}