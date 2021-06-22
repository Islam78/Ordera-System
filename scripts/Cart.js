var user = JSON.parse(localStorage.getItem('user'))
console.log(user);

var data = JSON.stringify({
    "id": user.user
  });
  console.log(data);
  
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  
  // xhr.open("POST", "https://orderasystem.herokuapp.com/cart/listcarts");
  // xhr.setRequestHeader("Content-Type", "application/json");
  
  // xhr.send(data);