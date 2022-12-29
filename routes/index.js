var express = require('express');
var router = express.Router();
const Emission = require('../models/Emission');

//retrieve all data from database
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

//for manually adding data to database, add parameters to body of the request
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

module.exports = router;