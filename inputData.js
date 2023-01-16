const Electricity = require('./models/Electricity');
const Emission = require('./models/Emission');
const Production = require('./models/Production');

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

const emissions = [
    {method: "bus", emissions: 41, passengers: 1, fuel: "all", fuelConsumption: 0, unit: 0},
    {method: "car", emissions: 70, passengers: 1, fuel: "all", fuelConsumption: 6, unit: 5},
    {method: "petrolMoped", emissions: 52, passengers: 0, fuel: "all", fuelConsumption: 3, unit: 5},
    {method: "electricMoped", emissions: 0, passengers: 0, fuel: "electricity", fuelConsumption: 3, unit: 7},
    {method: "motorbike", emissions: 104.9, passengers: 0, fuel: "all", fuelConsumption: 4.15, unit: 5},
    {method: "plane", emissions: 92, passengers: 1, fuel: "all", fuelConsumption: 0, unit: 0},
    {method: "train", emissions: 2.2, passengers: 1, fuel: "all", fuelConsumption: 0, unit: 0},
    {method: "ebike", emissions: 0, passengers: 0, fuel: "electricity", fuelConsumption: 0.7, unit: 7},
    {method: "electricCar", emissions: 0, passengers: 0, fuel: "electricity", fuelConsumption: 20, unit: 7},
    {method: "gasCar", emissions: 70, passengers: 1, fuel: "gas", fuelConsumption: 4, unit: 6},
    {method: "electricScooter", emissions: 0, passengers: 0, fuel: "electricity", fuelConsumption: 0.7, unit: 7},
]

const production = [
    {fuel: "petrol", emissions: 613.28, unit: 3},
    {fuel: "diesel", emissions: 609.86, unit: 3},
    {fuel: "bioethanol", emissions: 415.84, unit: 3},
    {fuel: "biodiesel", emissions: 363.33, unit: 3},
    {fuel: "HVO", emissions: 351.78, unit: 3},
    {fuel: "CNG", emissions: 537.62, unit: 4},
    {fuel: "LNG", emissions: 885.69, unit: 4},
    {fuel: "LPG", emissions: 347.01, unit: 4},
    {fuel: "biomethane", emissions: 557.01, unit: 4},
]

const electricity = [
    {fuel: "average", emissions: 281, unit: 2},
    {fuel: "coal", emissions: 820, unit: 2},
    {fuel: "gas", emissions: 490, unit: 2},
    {fuel: "cultivatedBiomass", emissions: 230, unit: 2},
    {fuel: "forestBiomass", emissions: 150, unit: 2},
    {fuel: "solar", emissions: 44, unit: 2},
    {fuel: "geothermal", emissions: 38, unit: 2},
    {fuel: "hydro", emissions: 24, unit: 2},
    {fuel: "nuclear", emissions: 12, unit: 2},
    {fuel: "wind", emissions: 11, unit: 2},
]

function addEmissionToDb(value){
    new Emission({
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
    console.log("Initializing database");
    Emission.find({}, (err, values) => {
        if(err) {
            console.log(err);
        }
        if(values.length !== 0){
            console.log(values);
        }else {
            console.log("Adding emissions to db");
            emissions.forEach(value => {
                addEmissionToDb(value);
            });
        }
    });
    Production.find({}, (err, values) => {
        if(err) {
            console.log(err);
        }
        if(values.length !== 0){
            console.log(values);
        }else {
            console.log("Adding well-to-tank values to db");
            production.forEach(value => {
                addProductionToDb(value);
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