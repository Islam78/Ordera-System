var user = JSON.parse(localStorage.getItem('user'))
if (user.user) {
    // when search input change 
    document.getElementById("search").addEventListener("input", (e) => {
        // console.log(e.target.value);
    });

    function Search() {
        let searchValue = document.getElementById("search").value;
        if (searchValue) {
            const request = {
                location: GlobalLatlng,
                radius: "500",
                query: searchValue,
            };
            // List of places
            listOfMapSearch().then((service) => {
                service.textSearch(request, (results, status) => {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        if (results.length === 1) {
                            const item = results[0];
                            const lat = item.geometry.location.lat();
                            const lng = item.geometry.location.lng();
                            // then road map .
                            console.group("Data for Point B (To go): ");
                            console.log("Name: ", item.name);
                            document.getElementById('recommend').style.display = 'block'
                            document.getElementById('recommend').innerHTML += `
                        <span class="child" type="button">${item.name}</span> 
                        `
                            console.groupEnd();
                            // Draw a road and hide search options
                            displayRoute({ from: GlobalLatlng, to: { lat, lng } });
                        } else {
                            results.map((item) => {
                                // console.log("Name: ", item.name);
                                // console.log(item);
                            });
                            document.getElementById('recommend').style.display = 'block'

                            var child
                            for (res of results) {
                                child += `
                            <span class="child" type="button" onclick="GoLocation()">${res.name}</span> 
                           
                            `
                            }
                            child ? child = child.replace('undefined', '') : ''
                            document.getElementById('recommend').innerHTML = child

                        }
                    }
                });
            });
        } else {
            document.getElementById('recommend').style.display = 'none'

            console.log("search value is empty");
        }
    }
    function GoLocation() {
        console.log('GoLocation function');
        document.getElementById('recommend').style.display = 'none'
    }
    // console.log(removeArabicLettersFromText("جامعة مصر go"));
    document.addEventListener("DOMContentLoaded", (event) => {
        const MAP_READY_INTERVAL = setInterval(() => {
            if (GlobalLatlng.lat) {
                // map functionallity is ready
                clearInterval(MAP_READY_INTERVAL);
                getUserAddress(GlobalLatlng).then((data) => {
                    //   User location as text
                    const userAddress = removeArabicLettersFromText(
                        data.results[0].formatted_address
                    );
                    console.group("Person opened app:");
                    console.log("Address: ", userAddress);
                    console.log("lat and lng: ", GlobalLatlng);
                    console.groupEnd();
                });
            }
        }, 100);
    });

} else {
    window.location = './../pages/404.html'

}