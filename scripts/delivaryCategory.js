var data = JSON.parse(localStorage.getItem('delivary'))

/* 
    <div class="col-md-3 col-lg-3 col-sm-3 mt-2">
    <a href="../pages/delivaryInfo.html" class="card">
    <img class="img-fluid" src="../images/resturant.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <p class="card-text">Some quick example text to build on the card title and make up.</p>
    </div>
    </a>
    </div> 
*/
if (data) {
    console.log(JSON.parse(localStorage.getItem('delivary')));
    var ChildData
    for (c of data) {
        // ChildData += `<br>${c.name} <br>`;
        ChildData += `
            <div class="col-md-3 col-lg-3 col-sm-3 mt-2">
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
    ChildData = ChildData.replace('undefined', '')
    ChildData.slice(0, 8)

    document.getElementById("row").innerHTML = ChildData;


    // for (let index = 0; index < data.length; index++) {

    //     document.getElementById('col').innerHTML = 'ss'
    //     // const element = array[index];

    // }
}