
![](https://akns-images.eonline.com/eol_images/Entire_Site/2016424/rs_500x245-160524114454-53-ejmbo.gif)

  

# Mariah Xmas

  

This is a scraping bot running in Node.js using [Playwright](https://playwright.dev/) and [Philips Hue API](https://github.com/peter-murray/node-hue-api) to flash our lights red & green when "All I Want For Christmas Is You" plays on our local Christmas radio station.

  

## Usage

  

### Requirements

  

- Node.js version 12

  

### Directions

  

1.  `npm install`

2.  `node observer`

3. profit!

  
  

## Background

  

Every December my husband has a game that he plays with his friends. They all listen to [the same radio station](https://www.audacy.com/majic/listen#recently-played) and listen for Mariah Carey's perennial hit "All I Want For Christmas Is You". The first to send a message to the group text wins a point. At the end of the month, whoever has the most points wins.

  

Naturally this means my husband spends a lot of time in the house distracted listening to this radio station, but after 10 years in retail I cannot stomach Christmas music. This year I resolved to build a bot to watch for him to make December a little easier on both of us 😂

  

## How do?

  

### 1) Scraping with Playwright

  

Webscraping is a time honored internet tradition, and here we have no need to reinvent the wheel. We are using [Playwright](https://playwright.dev/) to open Magic 95.5's audio widget and click play to get song titles to start appearing.

  

I used a combination of Playwright's [`page.exposeFunction()`](https://playwright.dev/docs/api/class-page#page-expose-function), `page.evaluate()`(https://playwright.dev/docs/evaluating) and injecting a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) into the window to listen to those changes. Whenever the song title text is updated (mutated), the exposed function is called.

  

The first thing we do is check whether it's the right song & arist (doesn't count if it's not Mariah). After that?

  

### 2) Using Philips Hue API to flash our lights

  
  ....
  

### Credit where credit is due
I didn't come up with this idea myself, after some searching I found it on [StackOverflow](https://stackoverflow.com/questions/54109078/puppeteer-wait-for-page-dom-updates-respond-to-new-items-that-are-added-after/69419744#69419744) and [puppeteer's issues list](https://github.com/puppeteer/puppeteer/issues/2945). This is my specific implementation but I didn't have to change much!