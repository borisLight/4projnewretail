var express = require('express');
var router = express.Router();
var userModel = require('../models/usersModel');
var adminModel = require('../models/adminModel');
var productModel = require('../models/productModel');
var productCategoryModel = require('../models/productCategoryModel');
var locateModel = require('../models/locateModel');
var promotionModel=require('../models/promotionModel');
var jsrender = require('jsrender');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/new', function(req, res, next) {
  res.render('home/add', { title: 'Add' });
});

/* GET home page. */
router.get('/home', function(req, res) {
res.render('home/index');
    
});

router.get('/genproduct', function(req, res) {

  var newProduct = new productModel({
    "productCategory":{
      "_id":"5f085e704af2f4a68cd3ed21"
    },
    "productId": 18623,
    "productLabel": "ADVOCAT JAJECZNY 0_5 L",
    "quantity":1000,
    "state": 0
  });

  newProduct.save();
res.send('Produit générés avec succes');
});

router.get('/genproductCategory', function(req, res) {

  var newProductCat = new productCategoryModel({
    "idCategory": 1001,
    "label": "ART._HYGIENIC",
    "state": 0
  });

  newProductCat.save();
res.send('Produit générés avec succes');
});

router.get('/generate', function(req, res) {

   var newUser = new adminModel({
     userName:'Marius',
     lastName:'NKOUBA',
     email:'303219@supinfo.com',
     birthday:'19/01/1997',
     account:10000,
     phone1:'0678837709',
     Login:'marius',
     password:'12345678',
     address:'Rabat',
     avatar:'marius.jpg',
     gender:'M',
     createdAt:'19/02/2019',
     QR:172828282,
     state:0
   });

   newUser.save();
res.send('Utlisateurs générés avec succes');
    
});

/* GET home page. */
router.get('/stock', function(req, res) {
  productModel.find(function(err, data){
    res.render('home/stock',{data:data});
  }).sort({name:-1});

});

router.get('/locate', function(req, res) {
  // var newLocate = new locateModel({
  //   rayon:"L1",
  //   user:"5f064fda3e10e99068faf8cb",
  //   state:0
  // });
  // newLocate.save();
  userModel.find(function(err, data){
    res.render('home/locate',{data:data});
  }).sort({name:-1});

});


router.get('/get_locate_users', function(req,res){
  locateModel.find({rayon:req.query.rayon }, function(err, data){

    if (data){
      // data.forEach(function(d) {
      //   console.log(d._id);
      // });
      // res.send(data);
      // var tmpl = jsrender.templates('_id - {{:_id}} <br/> rayon - {{:rayon}} <br/> user - {{:user}} <br/> state - {{:state}} <br/> __v - {{:__v}}');
      var tmpl = jsrender.templates(' user_id: {{:user}} ');
      var html = tmpl.render(data);
      res.send(html);
    }else{
      res.send("Donnée inexistante");
    }
  });
});

router.get("/promotion",function(req,res){
  promotionModel.find(function(err, data){
    res.render('home/promotion',{data:data});
  }).sort({name:-1});
});

/* GET home page. */
router.get('/phonebook', function(req, res) {
  //SELECT ALL USERS
  userModel.find(function(err, data){
    //USE DATA PARAMETER TO READ SELECTED DATA
    //res.send(data);
    res.render('home/phone',{data:data});
  }).sort({name:-1});

});

router.get("/selectAll", function(req, res){
  //SELECT ALL USERS
  userModel.find(function(err, data){
      //USE DATA PARAMETER TO READ SELECTED DATA
      res.send(data);
  }).sort({name:-1}).limit(2);
});

router.get('/testcat', function(req, res) { 
  productModel.findOne({_id:"5f085fc5cac777a55ce9c8fb"}, function(err, data){
      if ( data ){
        
          res.send(data.productCategory);
      }
  });
});

router.post('/login', function(req, res) {
  
  adminModel.findOne({Login:req.body.username, password:req.body.pass}, function(err, data){
      if ( data ){
        //  req.session.user = {id:data._id, login:data.login, name:data.userName, avatar: data.avatar, email:data.email};
          res.redirect("/home");
      }
      else{
      res.redirect("/");
      }

      if(err){
        res.redirect("/");
      }
  });

});

// API Application Mobile
router.post('/applogin', function(req, res) { 
  userModel.findOne({email:req.body.email, password:req.body.password}, function(err, data){
      if ( data ){
        res.send(data);
      }
      else{
      res.send("Parametre de connexion invalide");
      }
      if(err){
        res.send("Erreur survenue");
      }
  });
});


router.post("/addphonenumber", function(req, res){
  userModel.updateOne({_id:req.body.id}, {phone:req.body.phonenumber}, function(err, data){
      res.send("User modifié");
  });
});

router.get("/promotions",function(req,res){
  promotionModel.find(function(err, data){
    res.send(data);
  });
});

router.get('/products', function(req, res) {
  //SELECT ALL USERS
  if(req.query.category){
    if(req.query.category="all"){

      productModel.find(function(err, data){
        res.send(data);
      }).limit(20);

    }else{
      productModel.find({productCategory:req.query.category},function(err, data){
        res.send(data);
      });
    }
  }else{
    res.send('Donnée category non exixtante');
  }
  

});

router.post('/create_user', function(req, res) {

  var newUser = new userModel({
    userName:req.body.firstname,
    lastName:req.body.lastname,
    email:req.body.email,
    birthday:'19/01/1997',
    account:10000,
    Login:'xxxxx',
    password:req.body.password,
    address:'Rabat',
    avatar:'default.svg',
    gender:'M',
    createdAt:'19/02/2019',
    QR:172828282,
    state:0
  });

  if(newUser.save()){
    res.send('Utlisateur crée avec succes');
  }else{
    res.send('Echec de l\'opération');
  }

});




module.exports = router;
