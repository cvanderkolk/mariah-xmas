const hue = require('node-hue-api');
const LightState = hue.v3.lightStates.LightState;

const creds = {
    "username": "",
    "clientkey": ""
};

async function getBridge() {
    const results = await hue.discovery.upnpSearch();
    console.log(results);
    return results;
};

const host = '';

async function makeUser() {
    hue.api.createLocal(host).connect().then(api => {
        return api.users.createUser('mariah-app', 'chris-macbook')
    })
    .then(createdUser => {
        console.log(JSON.stringify(createdUser, null, 2));
    });
};

async function getLights() {
    // connect to bridge
    return hue.api.createLocal(host).connect(creds.username)
    // get all lights
    .then(api => { return api.lights.getAll()})
    // reduce them to an array of IDs
    .then(allLights => allLights.map(light => light.id))
    .catch(err => { console.error(err) });
};

const red = new LightState().on().hsl(0,100,50).brightness(100).alert('lselect');
const green = new LightState().on().hsl(100,100,25).brightness(100).alert('lselect');

async function setLight(number, color) {
    return hue.api.createLocal(host).connect(creds.username)
    .then(api => { api.lights.setLightState(number, color)})
    .then(result => `Light state change was successful? ${result}`);
};

async function mariahXmasLights() {
    await getAndSetLights();
};

async function getAndSetLights() {
    const lights = await getLights();
    await Promise.allSettled(
        lights.map(async(light) => {
            const color = (light % 2 == 0) ? red : green;
            return setLight(light, color);
        })
    );
}

module.exports = {
    getLights,
    getAndSetLights,
    mariahXmasLights,
}
