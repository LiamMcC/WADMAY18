var express = require("express"); // call express to be used by the application.
var app = express();
const path = require('path');
const VIEWS = path.join(__dirname, 'views');
var fs = require('fs');
app.set('view engine', 'jade');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));


var mysql = require('mysql'); // allow access to sql

app.use(express.static("scripts")); // allow the application to access the scripts folder contents to use in the application
app.use(express.static("images")); // allow the application to access the images folder contents to use in the application
app.use(express.static("models"));
// function to set up a simple hello response 
//var products = require("./model/products.json"); // allow the app to access the revis.json file

var reviews = require("./models/reviews.json")

const db = mysql.createConnection({
 
 host: 'hostingmysql304.webapps.net',
 user: 'liamme',
 password: 'L1Am39??',
 database: 'liam'
 
});


db.connect((err) =>{
 if(err){
  console.log("Connection Refused ... Please check login details");
   // throw(err)
 }
 else{
  console.log("Well done you are connected....");
 }
});



// Create a Database Table

app.get('/createtable', function(req,res){
 let sql = 'CREATE TABLE products (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Price int, Image varchar(255), Activity varchar(255));'
 let query = db.query(sql,(err,res)=>{
  if (err) throw err;
  console.log(res);
  
 });
  res.send("Table Creater .... Thanks Gavin!")
 
});


// End create table 


// SQL Insert Data Example

app.get('/insert', function(req,res){
 let sql = 'INSERT INTO products (Name, Price, Image, Activity) VALUES ("Polar M400", 199, "polarM400.png", "Running");'
 let query = db.query(sql,(err,res)=>{
  if (err) throw err;
  console.log(res);
  
 });
  res.send("Item Created .... Thanks isabelle!")
 
});


// End SQL Insert Data Example



// SQL QUERY Just for show Example

app.get('/queryme', function(req,res){
 let sql = 'SELECT * FROM products'
 let query = db.query(sql,(err,res)=>{
  if (err) throw err;
  console.log(res);
  
 });
  res.send("Look in the console....")
 
});


// End SQL QUERY Just for show Example



// function to render the home page
app.get('/', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
  res.render('index', {root: VIEWS});
  console.log("Now you are home!");
});

// function to render the products page
app.get('/products', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
 let sql = 'SELECT * FROM products;'
 let query = db.query(sql, (err, res1) =>{
  if(err)
  throw(err);
 
  res.render('products', {root: VIEWS, res1}); // use the render command so that the response object renders a HHTML page
  
 });
 
 console.log("Now you are on the products page!");
});



// function to render the individual products page
app.get('/item/:id', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
 let sql = 'SELECT * FROM products WHERE Id = "'+req.params.id+'";' 
 let query = db.query(sql, (err, res1) =>{
  if(err)
  throw(err);
 
  res.render('item', {root: VIEWS, res1}); // use the render command so that the response object renders a HHTML page
  
 });
 
 
  console.log("Now you are on the Individual product page!");
});


 // Show it again 
 // function to render the products page
app.get('/show/:id', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
 let sql = 'SELECT * FROM products WHERE Id = "'+req.params.id+'";'
 let query = db.query(sql, (err, res1) =>{
  if(err)
  throw(err);
 
  res.render('showit', {root: VIEWS, res1}); // use the render command so that the response object renders a HHTML page
  
 });
 
 console.log("Now you are on the products page!");
});
 
 // Show it again



 // function to render the create page
app.get('/create', function(req, res){
 
  res.render('create', {root: VIEWS});
  console.log("Now you are ready to create!");
});

 // function to add data to database based on button press
app.post('/create', function(req, res){
  var name = req.body.name
  let sql = 'INSERT INTO products (Name, Price, Image, Activity) VALUES ("'+name+'", '+req.body.price+', "'+req.body.image+'", "'+req.body.activity+'");'
  let query = db.query(sql,(err,res)=>{
  if (err) throw err;
  console.log(res);
  console.log("the Name of the product is " + name)
 });
  
res.render('index', {root: VIEWS});
});


 // function to edit database adta based on button press and form
app.get('/edit/:id', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
 let sql = 'SELECT * FROM products WHERE Id = "'+req.params.id+'";'
 let query = db.query(sql, (err, res1) =>{
  if(err)
  throw(err);
 
  res.render('edit', {root: VIEWS, res1}); // use the render command so that the response object renders a HHTML page
  
 });
 
 console.log("Now you are on the edit product page!");
});


app.post('/edit/:id', function(req, res){
let sql = 'UPDATE products SET Name = "'+req.body.newname+'", Price = "'+req.body.newprice+'", Activity = "'+req.body.newactivity+'", Image = "'+req.body.newimage+'" WHERE Id = "'+req.params.id+'";'
let query = db.query(sql, (err, res) =>{
 if(err) throw err;
 console.log(res);
 
})

res.redirect("/item/" + req.params.id);

});



 // function to delete database adta based on button press and form
app.get('/delete/:id', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
 let sql = 'DELETE FROM products WHERE Id = "'+req.params.id+'";'
 let query = db.query(sql, (err, res1) =>{
  if(err)
  throw(err);
 
  res.redirect('/products'); // use the render command so that the response object renders a HHTML page
  
 });
 
 console.log("Its Gone!");
});



// From here on is JSON DATA Manipulation 
app.get('/reviews', function(req, res){
 res.render("reviews", {reviews:reviews}
 
 );
 console.log("Reviews on Show");
}

);

// route to render add JSON page
app.get('/add', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
  res.render('add', {root: VIEWS});
  console.log("Now you are leaving feedback!");
});




// post request to add JSO REVIEW


app.post('/add', function(req, res){
	var count = Object.keys(reviews).length; // Tells us how many products we have its not needed but is nice to show how we can do this
	console.log(count);
	
	// This will look for the current largest id in the reviews JSON file this is only needed if you want the reviews to have an auto ID which is a good idea 
	
	function getMax(reviews , id) {
		var max
		for (var i=0; i<reviews.length; i++) {
			if(!max || parseInt(reviews[i][id]) > parseInt(max[id]))
				max = reviews[i];
			
		}
		return max;
	}
	
	var maxPpg = getMax(reviews, "id"); // This calls the function above and passes the result as a variable called maxPpg.
	newId = maxPpg.id + 1;  // this creates a nwe variable called newID which is the max Id + 1
	console.log(newId); // We console log the new id for show reasons only
	
	// create a new product based on what we have in our form on the add page 
	
	var review = {
		name: req.body.name, // name called from the add.jade page textbox
		id: newId, // this is the variable created above
		content: req.body.content, // content called from the add.jade page textbox

	};
		console.log(review) // Console log the new product 
	var json  = JSON.stringify(reviews); // Convert from object to string
	
	// The following function reads the json file then pushes the data from the variable above to the reviews JSON file. 
	fs.readFile('./models/reviews.json', 'utf8', function readFileCallback(err, data){
							if (err){
		throw(err);
	 }else {
		reviews.push(review); // add the information from the above variable
		json = JSON.stringify(reviews, null , 4); // converted back to JSON the 4 spaces the json file out so when we look at it it is easily read. So it indents it. 
		fs.writeFile('./models/reviews.json', json, 'utf8'); // Write the file back
		
	}});
	res.redirect("/reviews")
});





app.get('/editreviews/:id', function(req, res){
	
	console.log("Edit page Shown");
		
	function chooseProd(indOne){
		return indOne.id === parseInt(req.params.id);	
		
		}
	console.log("Here Liam" + req.params.id);
	var indOne = reviews.filter(chooseProd);
	
	res.render("editreview",
						{indOne:indOne}
						);
	
	console.log(indOne);
	});


app.post('/editreviews/:id', function(req, res){
	var json = JSON.stringify(reviews);
	
	var keyToFind = parseInt(req.params.id); // call name from the url
			

			var data = reviews;
			var index = data.map(function(review) {return review.id;}).indexOf(keyToFind) // This is the line which lets the app find the right review based on its id
			var z = parseInt(req.params.id);
			var x = req.body.name;
			var y = req.body.content;

			
			reviews.splice(index, 1 , {name: x, content: y, id: z} );
			
			json = JSON.stringify(reviews, null, 4);
			
			fs.writeFile('./models/reviews.json', json, 'utf8'); // Writing the data back to the file

// 	})
	res.redirect("/reviews");
});


// End JSON



// new delete
app.get('/deletereview/:id', function(req, res) {
  
  var json = JSON.stringify(reviews); // this is to Convert it from an object to string with stringify for use below
  
  
 fs.readFile('./models/reviews.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
      

var keytoFind = req.params.id; // find the review by id

      var str2 = reviews; // this changes the json to a variable str2

var data = str2; //this declares data = str2
var index2 = data.map(function(d) { return d['id']; }).indexOf(keytoFind) // finds the position by id see jsfiddle for example http://jsfiddle.net/hxfdZ/

// console.log("Liam the position is " + index2 + "    " + keytoFind) Optional log the position to the console
     
  
reviews.splice(index2 ,1); // deletes one item from position represented by index 2 (its position) from above
       
       

   json = JSON.stringify(reviews, null, 4); //convert it back to json
    fs.writeFile('./models/reviews.json', json, 'utf8'); // write it back 
  console.log("Review Deleted");
    

  
}});



res.redirect("/reviews");
});



 
// We need to set the requirements for teh application to run

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
  console.log("App is Running ......... Yessssssssssssss!")
});




