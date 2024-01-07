var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Method = require('../models/Message');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const MessageChains = require('../models/MessageChains');
const Message = require('../models/Message');
const Product = require('../models/Product');
const Review = require('../models/Review');

//get product information
router.get('/product/:id', async function(req, res) {
  try{
    const product = await Product.findOne({_id: req.params.id})
    if (!product){
      return res.send({error: "No product found."});
    } else {
      product.views = product.views + 1;
      const reviews = await Review.find({product: req.params.id});
      await product.save();
      res.json({product: product, reviews: reviews})
    }
  } catch(e) {
    res.send({error: "No product found."});
  }
  
});

//for testing connection
router.get('/', function(req, res) {
  return res.send("ok");
});

//login
router.post('/user/login', function(req, res) {
  User.findOne({email: req.body.email})
    .then((user) =>{
      if(!user) {
        return res.send({error: true});
      } else {
        //check password and create token
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if(err){
            return res.send(err);
          } 
          if(isMatch) {
            const jwtPayload = {
              id: user._id,
              name: user.name,
              email: user.email
            }
            jwt.sign(
              jwtPayload,
              process.env.SECRET,
              { algorithm: "HS256"},
              (err, token) => {
                if(err) return res.send(err);
                console.log(token);
                res.json({success: true, token: token});
              }
            );
          } else {
            res.send({error: true});
          }
        })
      }})
      .catch((err) => {
        throw err;
      })
})

//add review
router.post('/product/:id/review', function(req, res){
  Review.create({
    product: req.params.id,
    writerId: req.body.writerId,
    writer: req.body.writer,
    allowContact: req.body.allowContact,
    content: req.body.content,
    rating: req.body.rating
  })
  .then(async (review) =>{
    const product = await Product.findOne({_id: review.product});
    product.totalRatings += review.rating;
    product.ratings += 1;
    product.avgRating = product.totalRatings / product.ratings;
    product.save();
    res.send({review: review});
  })
  .catch((err) => {
    res.send({error: "Something went wrong"})
  });
})

//create account
router.post('/user/register',  function(req, res){
    if(req.body.email.trim().length <1){
      res.send({emailError: "Email is required"})
      //check password length and contains
    } else if(req.body.password.trim().length < 8 || !req.body.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*., ?])")){
      res.send({passwordError: "Password is not strong enough. Need to have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character."});
    } else {
      User.findOne({email: req.body.email})
        .then((user) => {
          if(user){
            return res.send({uniqueError: "Email already in use."});
          } else {
            //generate salt and save salted password
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(req.body.password, salt, (err, hash) => {
                if(err) throw err;
                const today = new Date(Date.now());
                User.create(
                  {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    photo: "",
                  })
                  .then(() => {
                    res.json('ok');
                  })
                  .catch((err) => {
                    throw err;
                  })
              });
          })
        }
      })
      .catch((err) => {
        throw err;
      })
    } 
});

//edit user information
router.post('/user/:id/edit',  async function(req, res){
  if(req.body.password.trim().length < 8 || !req.body.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*., ?])")){
    res.send({error: "Password is not strong enough. Need to have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character."});
  } else {
    const user = await User.findOne({_id: req.params.id})
        if(!user){
          return res.send({error: "Something went wrong."});
        } else {
          //check old password
          bcrypt.compare(req.body.currentPassword, user.password, (err, isMatch) => {
            if(err){
              return res.send({error: err});
            } 
            if(isMatch) {
              if(req.body.email.trim().length > 0){
                user.email = req.body.email.trim();
              }
              if(req.body.name.trim().length > 0){
                user.name = req.body.name.trim();
              }
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                  if(err) throw err;
                  user.password = hash;
                })
              }) 
              user.save();
              const jwtPayload = {
                id: user._id,
                name: user.name,
                email: user.email
              }
              jwt.sign(
                jwtPayload,
                process.env.SECRET,
                { algorithm: "HS256"},
                (err, token) => {
                  if(err) return res.send(err);
                  res.json({success: true, token: token});
                }
              );
            } else {
              res.send({error: "Incorrect password"});
            }
          })
      }
    }
});

//get user data
router.get('/user/:email', function(req, res) {
  User.findOne({email: req.params.email})
    .then((user) =>{
      if(!user) {
        return res.send({error: "No user found"});
      } else {
        return res.send(user);
      }})
      .catch((err) => {
        throw err;
      })
})

//delete user
router.get('/user/:id/delete', function(req, res) {
  User.findByIdAndDelete(req.params.id)
    .then((user) =>{
      if(!user) {
        return res.send({error: "No user found"});
      } else {
        return res.send({status: "ok"});
      }})
      .catch((err) => {
        throw err;
      })
})

//get messages for user
router.get('/user/messages/:id', function(req, res) {
  MessageChains.find({$or: [{sender: req.params.id}, {receiver: req.params.id}]})
    .then(async (chains) =>{
      if(chains.length === 0) {
        return res.send({error: "No messages"});
      } else {
        const messages = await Message.find({$or: [{receiver: req.params.id}, {sender: req.params.id}]})
        res.send({chains: chains, messages: messages})
      }})
      .catch((err) => {
        throw err;
      })
})


//helper to add a new product
router.post('/products/add', (req, res) => {
  Product.create({
    product: req.body.product,
    brand: req.body.brand,
    info1: req.body.info1,
    info2: req.body.info2,
    info3: req.body.info3,
    link: req.body.link,
    views: 0,
    ratings: 0,
    totalRatings: 0,
    avgRating: 0
  })
  .then((product) =>{
    res.send({product: product});
  })
  .catch((err) => {
    res.send({error: "Something went wrong"})
  });
})

//send a new message from chat
router.post('/message/new', (req, res) => {
  Message.create({
    message: req.body.message,
    sender: req.body.sender,
    receiver: req.body.receiver,
    senderName: req.body.senderName,
    receiverName: req.body.receiverName,
    read: false,
    chainId: req.body.chainId
  })
  .then((message) =>{
    res.send({message: message});
  })
  .catch((err) => {
    res.send({error: "Something went wrong"})
  });
})

//start a new conversation through review
router.post('/messageChain/new', async (req, res) => {
  try{
    const chain = await MessageChains.create({
      sender: req.body.sender,
      receiver: req.body.receiver,
      senderName: req.body.senderName,
      receiverName: req.body.receiverName
    })
    await Message.create({
      message: req.body.message,
      sender: req.body.sender,
      receiver: req.body.receiver,
      senderName: req.body.senderName,
      receiver: req.body.receiverName,
      read: false,
      chainId: chain._id
    })
    res.send({status: "ok"});
  } catch (err){
    res.send({error: "Something went wrong"});
  }
})

//helper to view all products
router.get('/products', (req, res) => {
  Product.find({})
  .then((products) => {
    res.send(products);
  })
  .catch((err) => {
    res.send(err);
  })
})

//helper to view all users
router.get('/users', (req, res) => {
  User.find({})
  .then((users) => {
    res.send(users);
  })
  .catch((err) => {
    res.send(err);
  })
})

//helper to view all reviews
router.get('/reviews', (req, res) => {
  Review.find({})
  .then((reviews) => {
    res.send(reviews);
  })
  .catch((err) => {
    res.send(err);
  })
})


module.exports = router;