const Electricity = require('./models/Electricity');
const Method = require('./models/Method');
const Fuel = require('./models/Fuel');

/*units:
0 = unknown
1 = gCO2e/km
2 = gCO2e/kWh
3 = gCO2e/l
4 = gCO2e/kg
5 = l/100km
6 = kg/100km
7 = kWh/100km
*/

//passengers = 1 means emissions are per person
//passengers = 0 means emissions are for the whole unit and should be divided by number of passengers
const methods = [
    {method: "Bus", emissions: 41, passengers: 1, fuel: "all", fuelConsumption: 0, unit: 0},
    {method: "Car", emissions: 70, passengers: 1, fuel: "all", fuelConsumption: 6, unit: 5},
    {method: "Small car", emissions: 98, passengers: 0, fuel: "liquid", fuelConsumption: 7.3, unit: 5},
    {method: "Medium car", emissions: 101, passengers: 0, fuel: "liquid", fuelConsumption: 10.2, unit: 5},
    {method: "Large car", emissions: 121, passengers: 0, fuel: "liquid", fuelConsumption: 12.1, unit: 5},
    {method: "SUV", emissions: 170, passengers: 0, fuel: "liquid", fuelConsumption: 13.8, unit: 5},
    {method: "Pickup truck", emissions: 234, passengers: 0, fuel: "liquid", fuelConsumption: 15.4, unit: 5},
    {method: "Moped", emissions: 52, passengers: 0, fuel: "liquid", fuelConsumption: 3, unit: 5},
    {method: "Moped", emissions: 0, passengers: 0, fuel: "electricity", fuelConsumption: 3, unit: 7},
    {method: "Motorbike", emissions: 104.9, passengers: 0, fuel: "all", fuelConsumption: 4.15, unit: 5},
    {method: "Plane", emissions: 92, passengers: 1, fuel: "all", fuelConsumption: 0, unit: 0},
    {method: "Train", emissions: 2.2, passengers: 1, fuel: "all", fuelConsumption: 0, unit: 0},
    {method: "Electric bike", emissions: 0, passengers: 0, fuel: "electricity", fuelConsumption: 0.7, unit: 7},
    {method: "Car", emissions: 0, passengers: 0, fuel: "electricity", fuelConsumption: 20, unit: 7},
    {method: "Car", emissions: 70, passengers: 1, fuel: "Alternative fuel", fuelConsumption: 4, unit: 6},
    {method: "Small car", emissions: 98, passengers: 0, fuel: "Alternative fuel", fuelConsumption: 3, unit: 6},
    {method: "Medium car", emissions: 101, passengers: 0, fuel: "Alternative fuel", fuelConsumption: 4.5, unit: 6},
    {method: "Large car", emissions: 121, passengers: 0, fuel: "Alternative fuel", fuelConsumption: 6.9, unit: 6},
    {method: "SUV", emissions: 170, passengers: 0, fuel: "Alternative fuel", fuelConsumption: 5.5, unit: 6},
    {method: "Pickup truck", emissions: 234, passengers: 0, fuel: "Alternative fuel", fuelConsumption: 6, unit: 6},
    {method: "Electric scooter", emissions: 0, passengers: 0, fuel: "electricity", fuelConsumption: 0.7, unit: 7},
    {method: "Walk", emissions: 0, passengers: 0, fuel: "all", fuelConsumption: 0, unit: 0},
    {method: "Bike", emissions: 0, passengers: 0, fuel: "all", fuelConsumption: 0, unit: 0},
    {method: "Other", emissions: 0, passengers: 0, fuel: "all", fuelConsumption: 0, unit: 0},
]

const production = [
    {fuel: "Petrol", emissions: 613.28, unit: 3},
    {fuel: "Diesel", emissions: 609.86, unit: 3},
    {fuel: "Bioethanol", emissions: 415.84, unit: 3},
    {fuel: "Biodiesel", emissions: 363.33, unit: 3},
    {fuel: "HVO", emissions: 351.78, unit: 3},
    {fuel: "CNG", emissions: 537.62, unit: 4},
    {fuel: "LNG", emissions: 885.69, unit: 4},
    {fuel: "LPG", emissions: 347.01, unit: 4},
    {fuel: "Biomethane", emissions: 557.01, unit: 4},
]

const electricity = [
    {fuel: "Unknown", emissions: 281, unit: 2},
    {fuel: "Coal", emissions: 820, unit: 2},
    {fuel: "Gas", emissions: 490, unit: 2},
    {fuel: "Cultivated biomass", emissions: 230, unit: 2},
    {fuel: "Forest biomass", emissions: 150, unit: 2},
    {fuel: "Solar", emissions: 44, unit: 2},
    {fuel: "Geothermal", emissions: 38, unit: 2},
    {fuel: "Hydro", emissions: 24, unit: 2},
    {fuel: "Nuclear", emissions: 12, unit: 2},
    {fuel: "Wind", emissions: 11, unit: 2},
]

function addMethodToDb(value){
    new Method({
        method: value.method,
        emissions: value.emissions,
        passengers: value.passengers,
        fuel: value.fuel,
        fuelConsumption: value.fuelConsumption,
        unit: value.unit
      }).save((err) => {
        if(err){
            console.log(err);
        } 
        return 1;
      });
}

function addFuelToDb(value){
    new Fuel({
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
    console.log("Initializing database");
    Method.find({}, (err, values) => {
        if(err) {
            console.log(err);
        }
        if(values.length !== 0){
            console.log(values);
        }else {
            console.log("Adding transportation methods to db");
            methods.forEach(value => {
                addMethodToDb(value);
            });
        }
    });
    Fuel.find({}, (err, values) => {
        if(err) {
            console.log(err);
        }
        if(values.length !== 0){
            console.log(values);
        }else {
            console.log("Adding well-to-tank values to db");
            production.forEach(value => {
                addFuelToDb(value);
            });
        }
    });
    Electricity.find({}, (err, values) => {
        if(err) {
            console.log(err);
        }
        if(values.length !== 0){
            console.log(values);
        }else {
            console.log("Adding electricity production emissions to db");
            electricity.forEach(value => {
                addElectricityToDb(value);
            });
        }
    });
}

module.exports = {inputData}