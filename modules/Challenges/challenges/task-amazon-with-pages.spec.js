const { expect } = require('chai');

describe('TEST AMAZON PAGE', () => {
  before('go to amazom.com', () => {
    browser.url('https://www.amazon.com/');
  });

  it('should login', () =>{
    browser.$('//a[@id="nav-link-accountList"]').click();
    browser.pause(500);
    browser.$('//input[@id="ap_email"]').setValue('testtest@hotmail.com');
    browser.$('//input[@id="continue"]').click();
    browser.pause(500);
    browser.$('//input[@id="ap_password"]').setValue('testtest');
    browser.$('//input[@id="signInSubmit"]').click();
    browser.pause(500);
  });

  it('should search for product', () =>{
    browser.$('//input[@id="twotabsearchtextbox"]').setValue('party heels');
    browser.pause(500);
    browser.$('//input[@type="submit"]').click();
    browser.pause(1000);
  });

  it('should sort by department', () =>{
    browser.$('//select[@id="searchDropdownBox"]').selectByVisibleText('Clothing, Shoes & Jewelry');
    browser.pause(1000);
  });

  let max = 0;
  let maxDiscountProduct;
  let productInListTitle;
  let pageNumber;

  it('should add the product with the highest discount % to the  bag', () =>{
    /* the below loop takes all products on the page one by one and checks if there is the discounted price, if yes,
    it takes two prices (original and discounted) and calculates the percentage of discount, then it finds
    the product with the highest discount percentage on a page
    */
    for (let i = 1; i <= 3; i++) {
      const products = $$('//div[@data-index]');
      const count = products.length;
      browser.$('//ul[@class="a-pagination"]').scrollIntoView();
      browser.pause(2000);
      if (i > 1) {
        browser.$('//ul[@class="a-pagination"]//a[text() = "Next"]').click();
        browser.pause(2000);}
      for (let j = 0; j < count; j++) {
        if ($(`(${'//div[@data-index]'})[${j}]//span[@class = "a-price a-text-price"]`).isExisting()) {
          const originalPrice = $(`(${'//div[@data-index]'})[${j}]//span[@class = "a-price a-text-price"]`).getText().slice(1);
          const discountPrice = $(`(${'//div[@data-index]'})[${j}]//span[@class = "a-price"]`).getText().replace(/\s/g, '.').slice(1);
          const discountPercent = (+originalPrice / +discountPrice).toFixed(2);
          if (+discountPercent > max) {
            max = +discountPercent;
            maxDiscountProduct = $(`(${'//div[@data-index]'})[${j}]//span[@class = "a-price a-text-price"]`);
            pageNumber = i;
          }
        }
      }
    }
    browser.pause(1000);
    browser.$('//ul[@class="a-pagination"]').scrollIntoView();
    browser.pause(1000);
    browser.$('//ul[@class="a-pagination"]//a[text() = "1"]').click();
    for (let i = 1; i < pageNumber; i++){
      browser.$('//ul[@class="a-pagination"]//a[text() = "Next"]').click();
      browser.pause(500);
    }
    browser.pause(1000);
    maxDiscountProduct.click();
    browser.pause(500);
    productInListTitle = browser.$('//span[@id="productTitle"]').getText();
    /* There are several options on amazon product page that affect the scenarios the product is added to the cart:
     - sometimes there is `size` selection on a product page, sometimes not - thus the first `if` is added below;
     - sometimes selected size is unavailable, so `Add to cart` button does not show - thus the second `if` is added and
     a loop that keeps selecting other size until one becomes available and `Add to cart`button appears.
     */
    if ((browser.$('//select[@id="native_dropdown_selected_size_name"]')).isExisting()) {
      for (let i = 1; i < 10; i++) {
        browser.$('//select[@id="native_dropdown_selected_size_name"]').selectByIndex(i);
        if ((browser.$('//input[@id="add-to-cart-button"]')).isExisting()) {
          browser.$('//input[@id="add-to-cart-button"]').click();
          browser.pause(600); break;
        }
      }
    } else {
      browser.$('//input[@id="add-to-cart-button"]').click();
      browser.pause(600);
    }
  });

  it('should check that the correct item has been added to the cart', () =>{
    browser.$('//a[@id="nav-cart"]').click();
    browser.refresh();
    const productInCartTitle = browser.$('//span[@class="a-size-medium sc-product-title"]').getText();
    expect((productInCartTitle.toLowerCase()).includes(productInListTitle.toLowerCase())).true;
  });

});
