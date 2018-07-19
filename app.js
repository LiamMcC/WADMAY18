var express = require("express"); // call express to be used by the application.
var app = express();
const path = require('path');
const VIEWS = path.join(__dirname, 'views');

var mysql = require('mysql'); // bring the middleware in to the application  

app.set("view engine", "jade"); // This line sets the default view wngine 
// Establish a database connection

const db = mysql.createConnection({

  host     : 'hostingmysql304.webapps.net',
  user     : 'liamme',
  password : 'L1Am39??',
 database:'liam'

});

db.connect((err) => {
  if(err){
    console.log("You Broke it...")
   // throw(err)  // Un comment this to throw the error rather than just log "You broke it"
  }
  else{
  
  console.log("Getting there liam it connected...")
  }
});


// End establish connection



app.use(express.static("scripts")); // allow the application to access the scripts folder contents to use in the application
app.use(express.static("images")); // allow the application to access the images folder contents to use in the application

// function to set up a simple hello response 


// function to render the home page
app.get('/products', function(req, res){
 let sql = 'SELECT * FROM products'
  let query = db.query(sql, (err, res1) => {
    if(err) throw err;
    console.log(res1);

    res.render('products.jade', {root: VIEWS,res1});
  });
 
  console.log("Now you are on the products page!");
});




// SQL create table Example
app.get('/createtable', function(req, res) {
  let sql = 'CREATE TABLE products ( Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Price int, Image varchar(255),Activity varchar(255));'
  let query = db.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    
    
  });
  res.send("Well done liam...");
  });

// End SQL create table Example


// SQL Insert Example
app.get('/insert', function(req, res) {
  let sql = 'INSERT INTO products (Name, Price, Image, Activity) VALUES ("Polar M400", 199, "polarm400.png", "Running")'
  let query = db.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    
    
  });
  res.send("Item Created and inserted to table...");
  });

// End SQL Insert Example





// We need to set the requirements for teh application to run

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
  console.log("App is Running ......... Yessssssssssssss!")
});













