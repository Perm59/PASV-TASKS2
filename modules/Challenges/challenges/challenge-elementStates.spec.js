const { expect } = require('chai');



describe('LINKS', () => {
  before(() => {browser.url('http://book.theautomatedtester.co.uk/');
  });

  it('should show elements states', () => {
    browser.$('//a[text()="Chapter1"]').click();
    browser.pause(1000);
    let checkbox = browser.$('//input[@name="selected(1234)"]');
    expect(checkbox.isDisplayed()).true;
    checkbox.click();
    browser.pause(2000);
    expect(checkbox.isSelected()).true;
    browser.back();
  });

  it('should read input fields', () => {
    let textbox = browser.$('//input[@id="q"]');
    textbox.setValue("Q5 PASV");
    browser.pause(1000);
    let text = textbox.getAttribute("value");
    expect(text).eq("Q5 PASV")

  });

});
