const express = require("express");
const path = require('path')
var cors = require("cors");// for cros err 
const app = express();
port = 8080;//port 
var corsOptions = {
    credentials: true,
    origin: "*",
    optionsSuccessStatus: 200, // For legacy browser support
}
app.use(cors(corsOptions));
app.use('/', require('./auth/login'))// login page
//app.use('/user', require('./routes/users'))// get user reports 
app.use('/admin', require('./routes/register'))
// get api file 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'api.html'));
});
// listening in port 3001
app.listen(process.env.PORT || port, function () {
    console.log(`listening on port ${port}...`)

});
