const { chromium } = require('playwright');
const { doMCXmas } = require('./utils');

const url = 'https://www.audacy.com/majic/listen#recently-played';

async function checkForSong(page) {
  try {
    // Wait for the specific element to be present
    await page.waitForSelector('#main-content > div:nth-child(2) > div:nth-child(2) > div > section > div.css-0 > ul > li:nth-child(1)', { timeout: 5000 });

    // Get the text of the element
    const nowPlayingText = await page.evaluate(() => {
      const element = document.querySelector('#main-content > div:nth-child(2) > div:nth-child(2) > div > section > div.css-0 > ul > li:nth-child(1)');
      return element ? element.textContent.toLowerCase() : '';
    });

    // Check for the song and artist
    const hasMariahCarey = nowPlayingText.includes('mariah carey');
    const hasSongTitle = nowPlayingText.includes('all i want for christmas is you');
    console.log(`Now Playing: ${nowPlayingText}`)
    
    if (hasMariahCarey && hasSongTitle) {
      await doMCXmas();
    }

  } catch (err) {
    console.error('Error checking for song:', err);
  }
}

async function main() {
  try {
    const browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url);

    setInterval(async () => {
      await page.reload();
      await checkForSong(page);
    }, 15000); // Reload every 15 seconds

  } catch (err) {
    console.error('Error in main function:', err);
  }
};

main();
