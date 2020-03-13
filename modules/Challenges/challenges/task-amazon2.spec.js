const { expect } = require('chai');

describe('TEST AMAZON PAGE', () => {
  before('go to amazom.com', () => {
    browser.url('https://www.amazon.com/');
  });

  it('should login', () =>{
    browser.$('//a[@id="nav-link-accountList"]').click();
    browser.pause(500);
    browser.$('//input[@id="ap_email"]').setValue('testtest@test.com');
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

  // it('should sort by price', () =>{
  //   let sortDropdown = browser.$('//select[@id="s-result-sort-select"]');
  //   sortDropdown.selectByVisibleText("Price: Low to High");
  //   browser.pause(3000);
  // });

  let max = 0;
  let maxDiscountProduct;
  let productInListTitle;

  it('should add the product with the highest discount % on the first page to the  bag', () =>{
    const products = $$('//div[@data-index]');
    const count = products.length;
    for (let i = 0; i < count; i++) {
      if ($(`(${'//div[@data-index]'})[${i}]//span[@class = "a-price a-text-price"]`).isExisting()) {
        const originalPrice = $(`(${'//div[@data-index]'})[${i}]//span[@class = "a-price a-text-price"]`).getText().slice(1);
        const discountPrice = $(`(${'//div[@data-index]'})[${i}]//span[@class = "a-price"]`).getText().replace(/\s/g, '.').slice(1);
        const discountPercent = (+originalPrice / +discountPrice).toFixed(2);
        if (+discountPercent > max){
          max = +discountPercent;
          maxDiscountProduct = $(`(${'//div[@data-index]'})[${i}]//span[@class = "a-price a-text-price"]`);
        }
      }
    }
    maxDiscountProduct.click();
    browser.pause(500);
    productInListTitle = browser.$('//span[@id="productTitle"]').getText();
    if ((browser.$('//select[@id="native_dropdown_selected_size_name"]')).isExisting()) {
      browser.$('//select[@id="native_dropdown_selected_size_name"]').selectByIndex(1);
    }
    browser.$('//input[@id="add-to-cart-button"]').click();
    browser.pause(1000);
  });

  it('should check that the correct item has been added to the cart', () =>{
    browser.$('//a[@id="nav-cart"]').click();
    browser.refresh();
    const productInCartTitle = browser.$('//span[@class="a-size-medium sc-product-title"]').getText();
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxx ' + productInListTitle)
    console.log('zzzzzzzzzzzzzzzzzzzzzzzz ' + productInCartTitle)
    expect(productInCartTitle.includes(productInListTitle)).true;
  });

});
