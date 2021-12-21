const axios = require('axios');
const { mariahXmasLights } = require('./discovery')

const WEBHOOK_URL = process.env.WEBHOOK_URL;

function isMCXmas(htmlString) {
    const sanitized = typeof htmlString === 'string' ? htmlString.toLowerCase() : '';
    if (
        sanitized.includes('mariah carey') &&
        sanitized.includes('all i want for christmas is you')
    ) {
        return true
    }
    return false;
};

async function doMCXmas() {
    console.log("!!!!! HOLY SHIT IT'S MARIAH XMAS !!!!!!\n\n\n");
    if (WEBHOOK_URL) {
        axios.get(`${WEBHOOK_URL}?mariah=true`);
    };
    await mariahXmasLights();
};

module.exports = {
    isMCXmas,
    doMCXmas,
}