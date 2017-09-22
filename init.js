const superagent = require('superagent');
const fs = require('fs');

const plantsUrl = plant => `openfarm.cc/api/v1/crops/?filter=${plant}`;

function queryPlantDb(plantQuery) {

    return superagent.get(plantsUrl(plantQuery))
        .then(res => {
            return res.body.data.map(crop => {
                const { 
                    name, 
                    binomial_name, 
                    description,
                    sun_requirements,
                    sowing_method,
                    row_spacing,
                    height,
                    main_image_path
                } = crop.attributes;

                return {
                    name,
                    scientific_name: binomial_name,
                    description,
                    sun_requirements,
                    sowing_method,
                    spread: row_spacing,
                    height,
                    image: main_image_path
                };
            });
        })
        .then(plants => {
            return fs.writeFile(`data/${plantQuery}.json`, JSON.stringify(plants));
        });

}

// queryPlantDb('potato');
// queryPlantDb('tomato');
// queryPlantDb('pea');
// queryPlantDb('zucchini');
// queryPlantDb('pumpkin');
// queryPlantDb('carrot');
// queryPlantDb('bean');
// queryPlantDb('squash');
// queryPlantDb('berry');
// queryPlantDb('onion');
// queryPlantDb('basil');
// queryPlantDb('pepper');
// queryPlantDb('kale');
// queryPlantDb('lettuce');
// queryPlantDb('rhubarb');
// queryPlantDb('chamomile');
// queryPlantDb('thyme');
// queryPlantDb('radish');
// queryPlantDb('radicchio');

// const files = fs.readdirSync('data');
// const plantsList = [];

// files.forEach(file => {
//     const plants = JSON.parse(fs.readFileSync(`data/${file}`));
//     plantsList.push(...plants);
// });

// fs.writeFile('data/plants.json', JSON.stringify(plantsList));

// const current = JSON.parse(fs.readFileSync('data/plants.json'));
// const plants = current.filter(plant => !!plant.spread).map(plant => {

//     const newSpread = Math.ceil(plant.spread/2.54);
//     const newHeight = Math.ceil(plant.height/2.54);

//     const newPlant = {
//         name: plant.name,
//         scientific_name: plant.scientific_name,
//         description: plant.description,
//         sun_requirements: plant.sun_requirements,
//         sowing_method: plant.sowing_method,
//         spread: newSpread,
//         height: newHeight,
//         image: plant.image
//     };
//     return newPlant;
// });

// fs.writeFile('data/plants.json', JSON.stringify(plants));


mongodb://heroku_7hq9mvq0:kdmc5grg59e4nma4saie4gbclu@ds141514.mlab.com:41514/heroku_7hq9mvq0