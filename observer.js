const { chromium } = require('playwright');
const { doMCXmas, isMCXmas } = require('./utils');

const url = 'https://www.audacy.com/majic/listen#recently-played'

async function songChangeListener(oldValue, newValue) {
    if (isMCXmas(newValue)) { await doMCXmas() };
    console.log(`${oldValue} -> ${newValue}`);
};

async function main() {
try {
    const browser = await chromium.launch({
        headless: false, 
        args: [
            "--mute-audio",
            "--disable-features=site-per-process",
        ],
      });
    const page = await browser.newPage();
  
  await page.goto(url);

  // attempt to play live
  await page.click('#playButton');
  page.exposeFunction('songChangeListener', songChangeListener);

  await page.evaluate(() => {
    const target = document.querySelector('#titleArtist');
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            window.songChangeListener(
                mutation.removedNodes[0].textContent,
                mutation.addedNodes[0].textContent,
            );
        }
    });
    observer.observe(target, { childList: true });
  });
} catch (err) { console.error(err)}
};

main()