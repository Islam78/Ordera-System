// function CloseNavBar() {
//     // alert('done')
//     var nav = document.getElementById('navbarNav')
//     if (document.getElementById('navbarNav').style.display == ) {
//         alert('ss')
//         nav.display = 'inline';
//     } else {
//         nav.display = 'none';

//     }
// }








// var Server = new XMLHttpRequest();

// // function to get request

// function GetReguest() {
//     Server.onreadystatechange = function () {
//         if (this.readyState == 4) {
//             console.log(this.readyState);
//             console.log(this.responseText);
//         }
//     }
// }
// Server.open("GET", "https://my-json-server.typicode.com/typicode/demo/posts", true)
// Server.send()

// Server.open("POST", "https://my-json-server.typicode.com/typicode/demo/posts", true)
// Server.setRequestHeader(
//     "Content-Type",
//     "application/x-www-form-urlencoded");
// Server.send("data send");
// GetReguest();

// function FetchFun() {
//     // get
//     fetch("https://my-json-server.typicode.com/typicode/demo/posts")
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             document.querySelector('#Test').innerHTML = data[0].title
//         });
//     // post
//     fetch("test.txt", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: JSON.stringify({
//             name: 'Kareem test',
//         })
//     }).then();
//     // console.log(z);
// }
// FetchFun()