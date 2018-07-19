var express = require("express"); // call express to be used by the application.
var app = express();
const path = require('path');
const VIEWS = path.join(__dirname, 'views');


app.use(express.static("scripts")); // allow the application to access the scripts folder contents to use in the application
app.use(express.static("images")); // allow the application to access the images folder contents to use in the application

// function to set up a simple hello response 


// function to render the home page
app.get('/', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
  res.render('index.jade', {root: VIEWS});
  console.log("Now you are home!");
});

// function to render the products page
app.get('/products', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
  res.render('products.jade', {root: VIEWS}); // use the render command so that the response object renders a HHTML page
  console.log("Now you are on the products page!");
});




// We need to set the requirements for teh application to run

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
  console.log("App is Running ......... Yessssssssssssss!")
});

