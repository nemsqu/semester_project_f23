const Electricity = require('./models/Electricity');
const Emission = require('./models/Emission');
const Production = require('./models/Production');

const emissions = [
    {method: "bus", emissions: 41, passengers: 1, fuel: "all", fuelConsumption: 0},
    {method: "car", emissions: 70, passengers: 1, fuel: "all", fuelConsumption: 0},
    {method: "petrolMoped", emissions: 52, passengers: 0, fuel: "all", fuelConsumption: 3},
    {method: "electricMoped", emissions: 0, passengers: 0, fuel: "electricity", fuelConsumption: 3},
    {method: "motorbike", emissions: 104.9, passengers: 0, fuel: "all", fuelConsumption: 4.15},
    {method: "plane", emissions: 92, passengers: 1, fuel: "all", fuelConsumption: 0},
    {method: "train", emissions: 2.2, passengers: 1, fuel: "all", fuelConsumption: 0},
    {method: "ebike", emissions: 0, passengers: 0, fuel: "electricity", fuelConsumption: 0.7},
    {method: "electricCar", emissions: 0, passengers: 0, fuel: "electricity", fuelConsumption: 20},
    {method: "gasCar", emissions: 70, passengers: 1, fuel: "gas", fuelConsumption: 4},
    {method: "electricScooter", emissions: 0, passengers: 0, fuel: "electricity", fuelConsumption: 0.7},
]

const production = [
    {fuel: "petrol", emissions: 613.28, unit: "g CO2e/l"},
    {fuel: "diesel", emissions: 609.86, unit: "g CO2e/l"},
    {fuel: "bioethanol", emissions: 415.84, unit: "g CO2e/l"},
    {fuel: "biodiesel", emissions: 363.33, unit: "g CO2e/l"},
    {fuel: "HVO", emissions: 351.78, unit: "g CO2e/l"},
    {fuel: "CNG", emissions: 537.62, unit: "g CO2e/kg"},
    {fuel: "LNG", emissions: 885.69, unit: "g CO2e/kg"},
    {fuel: "LPG", emissions: 347.01, unit: "g CO2e/kg"},
    {fuel: "biomethane", emissions: 557.01, unit: "g CO2e/kg"},
]

const electricity = [
    {fuel: "average", emissions: 281, unit: "g CO2e/kWh"},
    {fuel: "coal", emissions: 820, unit: "g CO2e/kWh"},
    {fuel: "gas", emissions: 490, unit: "g CO2e/kWh"},
    {fuel: "cultivatedBiomass", emissions: 230, unit: "g CO2e/kWh"},
    {fuel: "forestBiomass", emissions: 150, unit: "g CO2e/kWh"},
    {fuel: "solar", emissions: 44, unit: "g CO2e/kWh"},
    {fuel: "geothermal", emissions: 38, unit: "g CO2e/kWh"},
    {fuel: "hydro", emissions: 24, unit: "g CO2e/kWh"},
    {fuel: "nuclear", emissions: 12, unit: "g CO2e/kWh"},
    {fuel: "wind", emissions: 11, unit: "g CO2e/kWh"},
]

function addEmissionToDb(value){
    console.log(value.method);
    new Emission({
        method: value.method,
        emissions: value.emissions,
        passengers: value.passengers,
        fuel: value.fuel,
        fuelConsumption: value.fuelConsumption
      }).save((err) => {
        if(err){
            console.log(err);
        } 
        return 1;
      });
}

function addProductionToDb(value){
    new Production({
        fuel: value.fuel,
        emissions: value.emissions,
        unit: value.unit
      }).save((err) => {
        if(err){
            console.log(err);
        } 
        return 1;
      });
}

function addElectricityToDb(value){
    new Electricity({
        fuel: value.fuel,
        emissions: value.emissions,
        unit: value.unit
      }).save((err) => {
        if(err){
            console.log(err);
        } 
        return 1;
      });
}

function inputData(){
    console.log("Adding emissions to db");
    emissions.forEach(async value => {
        addEmissionToDb(value);
    });
    production.forEach(value => {
        addProductionToDb(value);
    });
    electricity.forEach(value => {
        addElectricityToDb(value);
    });
    Emission.find({}, (err, emissions) => {
        if(err) {
            console.log(err);
        }
        if(emissions){
            console.log(emissions);
        }else {
            console.log("No emissions found");
        }
    });
    Production.find({}, (err, emissions) => {
        if(err) {
            console.log(err);
        }
        if(emissions){
            console.log(emissions);
        }else {
            console.log("No emissions found");
        }
    });
    Electricity.find({}, (err, emissions) => {
        if(err) {
            console.log(err);
        }
        if(emissions){
            console.log(emissions);
        }else {
            console.log("No emissions found");
        }
    });
}

module.exports = {inputData}