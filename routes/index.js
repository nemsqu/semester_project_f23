var express = require('express');
var router = express.Router();
const Electricity = require('../models/Electricity');
const Emission = require('../models/Emission');
const Production = require('../models/Production');

//retrieve all emission data from database
router.get('/emissionData', function(req, res, next) {
  Emission.find({}, (err, emissions) => {
    if(err) {
      return res.status(404).send({'error': err});
    }
    if(emissions){
      return res.send(emissions);
    }else {
      return res.json({error: "No emissions found"});
    }
  })
});

//retrieve all fuel production data from database
router.get('/productionData', function(req, res, next) {
  Production.find({}, (err, production) => {
    if(err) {
      return res.status(404).send({'error': err});
    }
    if(production){
      return res.send(production);
    }else {
      return res.json({error: "No emissions found"});
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
      return res.json({error: "No emissions found"});
    }
  })
});

//for manually adding emission data to database, add parameters to body of the request
router.post('/emissionData', function(req, res, next) {
  new Emission({
    method: req.body.method,
    emissions: req.body.emissions,
    passengers: req.body.passengers,
    fuel: req.body.fuel,
    fuelConsumption: req.body.fuelConsumption
  }).save((err) => {
    if(err) return res.send(err);
    return res.send("ok");
  });
});

router.post('/productionData', function(req, res, next) {
  new Production({
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