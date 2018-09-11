var express = require('express');

var app = express();

//set up handlerbars view engine
var handlebars = require('express-handlebars')
					.create({ defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static (__dirname + '/public'));


app.set('port', process.env.PORT || 3000);




app.get('/',function(req,res){
	res.render('home');
});


//create array of fortune cookies
var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you do not know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
]
app.get('/about', function(req,res){
	var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
	res.render('about',{fortune: randomFortune});
});

//404 catch-all handler - middleware

app.use(function(req,res){
	res.status(404);
	res.render('404');
});

//custom 500 page
app.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});