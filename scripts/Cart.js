var data = JSON.stringify({
    "user_id": "1",
    "product_name": "chiken hat",
    "image": "https://i.ibb.co/4fMtYyf/Balad-El-Gharieb.jpg",
    "qty": "2",
    "price": "100",
    "user_location": "AlMotamayez District, 6th of october, Egypt",
    "prudect_location": "AlMotamayez District, 6th of october, Egypt"
  });
  Empdata = ''
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("POST", "https://orderasystem.herokuapp.com/cart/addcart");
  xhr.setRequestHeader("Content-Type", "application/json");
  
  xhr.send(data);