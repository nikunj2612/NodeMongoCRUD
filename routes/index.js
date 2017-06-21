var express = require('express');
// var $ = require('jquery');  
var router = express.Router();

var session = require('express-session');
var parseurl = require('parseurl');
var db = require('../connection');
var ObjectID = require('mongodb').ObjectID;

/* GET home page. */
/* GET Userlist page. */
	router.get('/', function(req, res, next) {
	  res.render('index', { title: 'Express' });
	});
/*Get Infos*/

router.get('/userlist', function(req, res) {
    db.getDetail(function(err,docs){
    	if(err)
    	{
    		console.log(err);
    	}
    	else
    	{
    		res.render('userlist',{userlist : docs});
    	}
    });	
});

/*Get new user page*/

router.get('/newuser',function(req,res,next){
	res.render('newuser', {title : "Fill Your Details"});	
});

/*Remove UserDetail*/

router.post('/removeuser',function(req,res,next){

	//GEt our form value
	// var lastName = req.body.lastname;
	db.removeDocs(req.param('_id'),function(err,docs){
		if(err)		
		{
			res.send("Remove Operation not Worked.");
		}
		else
		{
			res.redirect('userlist');
		}
	});
});


/*POST to add user service*/
router.post('/adduser',function(req,res,next){

	//GEt our form value
	var firstName = req.body.firstname;
	var lastName = req.body.lastname;

	db.insertDocs(firstName,lastName,function(err,docs){
		if(err)
		{
			res.send("Something Going Wrong");
		}
		else
		{
			res.redirect('userlist');
		}
	});	
});


router.get('/userlist', function(req, res) {
    db.get(function(err,docs){
    	if(err)
    	{
    		console.log(err);
    	}
    	else
    	{
    		res.render('userlist',{userlist : docs});
    	}
    });	
});

router.get('/updateuser',function(req,res){
	// console.log(req.param('_id'));
	 db.getUpdatedDetail(req.param('_id'),function(err,user){
	 	console.log(user);
		res.render('updateuser',{user:user});
	});
});
/*Update User*/
router.post('/update1',function(req,res,next){
	
		db.updateDocs(req.param('_id'),{
			firstname : req.param('firstname'),
			lastname : req.param('lastname')
		}, function(err,docs){
			res.redirect('userlist')
		});
});

module.exports = router;
