const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GIPHY_TOKEN = process.env.GIPHY_TOKEN;
const USER_ID = process.env.USER_ID;

const giphy = require('giphy-api')(GIPHY_TOKEN);

const mariahAlerts = [
    "🎄🚀 MARIAH SIREN! 'aLL I WaNT FoR XmaS' is BLASTING!! 🎅🔥 Embrace the HOLIDAY HAVOC, folks! We're on a MERRY-GO-CRAZY ride! 🤡🌟",
    "🔔💥 WhOoPs! 'All I Want For Christmas' just CRASHED the party! 😱 Mariah is TAKING OVER! Yule log? More like YULE BOGIE! 🕺🎉",
    "🎶🎅 MaRiAh MaDnEsS ALERT!! 'ALL I WANT' is causing a FESTIVE FRENZY! 🎄🌀 Everyone, HOLD onto your ELF HATS! 🧝‍♂️💫",
    "🚨🍬 'aLL I WaNt FoR ChRiStMaS' TIME! Mariah is here, and she's TURNING UP the holiday dial to INSANE! 🤖🌈 Let's get LIT! 🎄🔥",
    "🎁👽 Mariah's XMAS BANGER on! It's a WINTER WONDERLAND WARP! 🌀 'All I Want For Christmas Is You' = UNLEASH the MerrY MaYhEm! 🎉🎅",
    "🌟🦌 'ALL I WANT' is HERE! Mariah's hit is spinning us into a CHRISTMAS CYCLONE! 🌪️🎶 Eggnog? More like EGGNO-WAY! 🤪🎄",
    "🎅💃 ALERT: Mariah's Christmas HYMN is on! It's not just jingle bells, it's JINGLE YELLS! 📣 'All I Want For Christmas Is You' in FULL FORCE! 🚨🍭",
    "🌲🎉 MARIAH TIME! 'All I Want' is PLAYING! Brace for IMPACT, it's a HOLLY JOLLY JUGGERNAUT! 🚂💥 Elves, it's SHOWTIME! 🧝‍♀️🔥",
    "🔔🤖 'All I Want For Christmas' INVASION! Mariah's anthem is HERE! Prepare for a FROSTY FRENZY of epic proportions! ❄️🎄🎊",
    "🎁🚀 'ALL I WANT FOR XMAS' LAUNCHED! Mariah is in ORBIT and we're her STAR-HOPPING elves! 🌌🧝‍♂️ LET'S GET WILD! 🤪✨",
    "🎅🌪️ MARIAH TORNADO ALERT! 'All I Want For Christmas' is whipping up a SNOWSTORM of CRAZY! 🌨️🎉 Watch out, Rudolph! 🦌💥",
    "🚨🍪 'All I Want For Christmas Is You' is UNLEASHED! Mariah's bringing a TIDAL WAVE of tinsel! 🌊🎄 SURF'S UP, Santa! 🎅🏄‍♂️",
    "🎶🌈 'All I Want' is playing, and it's a CHRISTMAS MIRACLE GONE MAD! 🤖🎄 Mariah's leading a FESTIVE FLASH MOB! 💃🔥",
    "🔔🎅 WHOA! Mariah's 'All I Want For Christmas' is on! It's a JINGLE BELL JAMBOREE! 🎉 Let's BOUNCE in this winter WONDER-LAND! 🤸‍♂️🌟",
    "🎄🚨 'ALL I WANT' EMERGENCY! Mariah is at FULL VOLUME! 📢 It's a HOLIDAY HOEDOWN, and we're all invited! 🤠🎉",
    "🎄🚀 MARIAH's MAGIC on FULL BLAST! Who needs a sleigh when you've got her HIGH NOTES lifting us UP! 🎅🌌",
    "🔔💥 DING-DONG, it's MARIAH TIME! The QUEEN of Christmas just turned our world into a GLITTER BLIZZARD! ❄️✨",
    "🎁🎶 MARIAH's MELODIES are taking over! Every JINGLE BELL has her voice! Santa's got NOTHING on this DIVA! 🎅🤩",
    "🌟👑 ALL HAIL QUEEN MARIAH! Her festive SPIRIT is INFECTIOUS - we're all turning into HOLIDAY ROYALTY! 👸🎄",
    "🎅🚨 SANTA ALERT: Mariah's CHARISMA has stolen the Christmas Show! Sorry, Santa, it's a DIVA'S world now! 💃🌍",
    "🍪🎉 COOKIE OVERLOAD! Mariah's tunes have the gingerbread men DANCING! 🕺🍪 It's a SWEET, SWEET CHRISTMAS FRENZY! 🎄🤪",
    "🦌🎶 RUDOLPH's red nose? Nah, it's MARIAH's SPARKLE shining BRIGHTER! The holiday season just got UPGRADED! 💫🎅",
    "🎄💥 TINSEL TORNADO! Mariah's voice just WHIPPED UP a festive STORM! Hold onto your hats – it's a CHRISTMAS REVOLUTION! 🎉🌀",
    "🔔🌈 BELLS are RINGING, but all I hear is MARIAH's CHRISTMAS CHARM! The world's a MERRY-GO-ROUND of her tunes! 🎠✨",
    "🎁🎵 PRESENTS are POPPING with Mariah's HITS! Every box WRAPS UP a piece of her CHRISTMAS MAGIC! 🎶🎄",
    "🌟🎤 MARIAH's VOICE on the LOUDSPEAKER! Her melodies are TURNING the snow into GLITTER! ❄️🤩 A true HOLIDAY QUEEN!",
    "🎅🎶 SANTA's in AWE: Mariah's festive FLAIR has outshined his HO-HO-HO! 🎄🌟 Christmas just got a DIVA UPGRADE! 💅",
    "🚨🎉 MARIAH MAYHEM! Her festive vibes are like a CHRISTMAS EARTHQUAKE! Shaking up the holiday norms! 🌍🎅",
    "🎄🔥 WATCH OUT! Mariah's holiday SPIRIT is setting the SNOW on FIRE! Who knew Christmas could be this HOT! 🔥❄️",
    "🎁🚀 MARIAH's PRESENCE is like a CHRISTMAS ROCKET! Blasting us into a world of FESTIVE FANTASY! 🌌🤩"
];

function getRandomMariahAlert() {
    const randomIndex = Math.floor(Math.random() * mariahAlerts.length);
    return mariahAlerts[randomIndex];
};

async function doMCXmas() {
    console.log("!!!!! HOLY SHIT IT'S MARIAH XMAS !!!!!!\n\n\n");
    
    // Create a new instance of Client with the necessary intents for Discord.js v14
    const client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages]
    });

    client.once('ready', () => {
        console.log('Discord bot is ready!');
    });
    
    // Function to send a Discord message
    async function sendDirectMessage(userId, message) {
        try {
            const user = await client.users.fetch(userId);
            user.send(message);
        } catch (error) {
            console.error(`Error sending DM: ${error}`);
        }
    }
    
    client.login(DISCORD_BOT_TOKEN);

    // discord notification
    const mariahGif = await giphy.random('mariah carey christmas');
    sendDirectMessage(USER_ID, getRandomMariahAlert());
    sendDirectMessage(USER_ID, mariahGif.data.url);
    // await mariahXmasLights();
};

module.exports = {
    doMCXmas,
};