const { expect } = require('chai');

let shoppingPrices;
let price;

describe('', () => {
  before('go to amazom.com', () => {
    browser.url('https://www.amazon.com/');
  });

  it('should title be correct', () =>{
    expect(browser.getTitle()).eq('Amazon.com: Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more');
  });

  it('should login', () =>{
    browser.$('//a[@id="nav-link-accountList"]').click();
    browser.pause(500);
    browser.$('//input[@id="ap_email"]').setValue('test@test.com');
    browser.$('//input[@id="continue"]').click();
    browser.pause(500);
    browser.$('//input[@id="ap_password"]').setValue('testtest');
    browser.$('//input[@id="signInSubmit"]').click();
    browser.pause(500);
  });

  it('should click on today`s deals', () =>{
    browser.maximizeWindow();
    browser.$('//div[@id="nav-xshop"]//a[text() = "Today\'s Deals"]').click();
    browser.pause(1000);
  });

  it('should add goods to shopping bag', () =>{
    const price1 = browser.$('//div[@id="101_dealView_3"]//span[@class="a-size-medium inlineBlock unitLineHeight dealPriceText"]').getText();
    browser.$('//div[@id=\'101_dealView_3\']//button').click();
    browser.pause(500);
    const price2 = browser.$('//div[@id="101_dealView_4"]//span[@class="a-size-medium inlineBlock unitLineHeight dealPriceText"]').getText();
    browser.$('//div[@id=\'101_dealView_4\']//button').click();
    browser.pause(500);
    price = [price2, price1];
  });

  it('should go to Shopping bag', () =>{
    browser.$('//a[@id="nav-cart"]').click();
    browser.refresh();
    console.log('cccccccccccccccccccccccccccccccccccccccccccccccccccccccc ' + price);
    shoppingPrices = browser.$$('//div[@data-name="Active Items"]//span[@class="a-size-medium a-color-price sc-price sc-white-space-nowrap sc-product-price sc-price-sign a-text-bold"]');
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ' + shoppingPrices.length);
  });

  it('should verify that the prices in shopping bag are correct', () => {
    for( let i = 0; i < shoppingPrices.length; i++){
      const shopPrice = shoppingPrices[i].getText();
      console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv ' + shopPrice);
      console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb ' + price[i]);
      expect(price[i]).eq(shopPrice);
    }
  });
});
