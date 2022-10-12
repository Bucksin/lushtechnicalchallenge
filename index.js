/**
 * This file contains a script to visit Lush.ca and automate some browsing activity using the Puppeteer.js library.
 * 
 * Date: October 11 2022
 * Time worked on assignment: 9:40pm - 11:32pm
 * Author: Buck Sin
 */

//initializes necessary modules
const puppeteer = require('puppeteer');

//browser initialization
const chromeOptions = {
  headless: false,
}

async function placeOrder () {

  try {

    //launch chrome browser and load lush.ca
    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    await page.goto('https://www.lush.ca/en/home', {timeout: 120000});

    await page.waitForSelector('button.close-popup');
    await page.click('button.close-popup');
   
    //waits for the hamburger menu button to appear and clicks on it
    const hamburgerButtonXPath = await '//*[@id="header"]/div/div[3]/div/div/button';
    // await page.waitForXPath(hamburgerButtonXPath);
    const [hamburgerButton] = await page.$x(hamburgerButtonXPath);
    await hamburgerButton.click();

    //waits for the "BATH AND SHOWER" menu button to appear and clicks on it
    const bathShowerButtonXPath = await '//*[@id="bath-shower"]';
    await page.waitForXPath(bathShowerButtonXPath);
    const [bathShowerButton] = await page.$x(bathShowerButtonXPath);
    await bathShowerButton.click();


    //waits for the "All Bath and Shower" menu button to appear and clicks on it
    //navigates to https://www.lush.ca/en/bath-shower/
    const allBathShowerButtonXPath = await '//*[@id="custom-link-all-bath-shower"]/span';
    await page.waitForXPath(allBathShowerButtonXPath);
    const [allBathShowerButton] = await page.$x(allBathShowerButtonXPath);
    await allBathShowerButton.click();
    await page.waitForNavigation();

    //waits for the "Add to Cart" button to appear and clicks on it
    const addToCartButtonXPath = await '//*[@id="product-search-results"]/div/div[2]/div[4]/div[3]/div/div/div[3]/div[5]/div[2]/button/div[2]';
    await page.waitForXPath(addToCartButtonXPath);
    const [addToCartButton] = await page.$x(addToCartButtonXPath);
    await addToCartButton.click();

    //waits for the "Continue Shopping" button in the cart modal to appear and clicks on it
    const continueShoppingButtonXPath = await '//*[@id="add-to-cart-modal"]/div/div/div[3]/div[3]/div/div/button';
    await page.waitForXPath(continueShoppingButtonXPath);
    const [continueShoppingButton] = await page.$x(continueShoppingButtonXPath);
    await continueShoppingButton.click();

    //waits for the "Add to Cart" button to appear and clicks on it
    const addToCartButton2XPath = await '//*[@id="product-search-results"]/div/div[2]/div[4]/div[4]/div/div/div[3]/div[5]/div[2]/button';
    await page.waitForXPath(addToCartButton2XPath);
    const [addToCartButton2] = await page.$x(addToCartButton2XPath);
    await addToCartButton2.click();

    // closes the email subscription modal that pops up
    const modalButtonSelector = "button.subscription-modal-close";
    await page.waitForSelector(modalButtonSelector).then(
      async() => {
        setTimeout(async() => {
          await page.click(modalButtonSelector);
        }, 3000)
      }
    )

    //waits for the "View Cart" button to appear and clicks on it
    const cartButtonXPath = await '//*[@id="add-to-cart-modal"]/div/div/div[3]/div[3]/div/div/a[1]';
    await page.waitForXPath(cartButtonXPath);
    const [cartButton] = await page.$x(cartButtonXPath);
    await cartButton.click();
    await page.waitForNavigation();
    
    //takes a screenshot of the Cart page
    await page.screenshot({path: "./TestResults/AutomationResult.png", fullPage: true});
    await page.close();
    await browser.close();

  } catch (error) {
    console.log("There was an error", error);
    await page.close();
  }

  };

  placeOrder();