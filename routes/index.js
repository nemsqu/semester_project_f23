var express = require('express');
var router = express.Router();
const Electricity = require('../models/Electricity');
const Method = require('../models/Method');
const Fuel = require('../models/Fuel');

//retrieve all methods from database
router.get('/methodData', function(req, res, next) {
  Method.find({}, (err, methods) => {
    if(err) {
      return res.status(404).send({'error': err});
    }
    if(methods){
      return res.send(methods);
    }else {
      return res.json({error: "No methods found"});
    }
  })
});

//retrieve all fuel production data from database
router.get('/fuelData', function(req, res) {
  Fuel.find({}, (err, fuels) => {
    if(err) {
      return res.status(404).send({'error': err});
    }
    if(fuels){
      return res.send(fuels);
    }else {
      return res.json({error: "No emissions related to fuels found"});
    }
  })
});

//retrieve all electicity production related data from database
router.get('/electricityData', function(req, res, next) {
  Electricity.find({}, (err, electricity) => {
    if(err) {
      return res.status(404).send({'error': err});
    }
    if(electricity){
      return res.send(electricity);
    }else {
      return res.json({error: "No emissions related to electricity production found"});
    }
  })
});

//for manually adding emission data to database, add parameters to body of the request
router.post('/methodData', function(req, res, next) {
  new Method({
    method: req.body.method,
    emissions: req.body.emissions,
    passengers: req.body.passengers,
    fuel: req.body.fuel,
    fuelConsumption: req.body.fuelConsumption,
    unit: req.body.unit
  }).save((err) => {
    if(err) return res.send(err);
    return res.send("ok");
  });
});

router.post('/fuelData', function(req, res, next) {
  new Fuel({
    fuel: req.body.fuel,
    emissions: req.body.emissions,
    unit: req.body.unit
  }).save((err) => {
    if(err) return res.send(err);
    return res.send("ok");
  });
});

router.post('/electricityData', function(req, res, next) {
  new Electricity({
    fuel: req.body.fuel,
    emissions: req.body.emissions,
    unit: req.body.unit
  }).save((err) => {
    if(err) return res.send(err);
    return res.send("ok");
  });
});

module.exports = router;