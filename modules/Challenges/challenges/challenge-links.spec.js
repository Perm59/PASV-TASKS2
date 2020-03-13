const { expect } = require('chai');

let links;
let length;

describe('LINKS', () => {
  before(() => {browser.url('http://book.theautomatedtester.co.uk/');
  });

  it('should work with links', () => {
    links = browser.$$('//a');
    length = links.length;
    console.log("The number of links: " + length);
    for (let i = 0; i < length; i++)
    console.log(links[i].getText() + " : " + links[i].getAttribute("href"));
    browser.pause(500);
  });

  it('get html of certain element and check if it contains some text', () => {
    let bodyHtml = browser.$('//body').getHTML();
    console.log("xxxxxxxxxxxxxxxxxxxxx  " + bodyHtml);
    browser.pause(500);
    expect(bodyHtml.includes("Selenium")).true;
  });

  // it('check if page contains some text', () => {
  //   let test = browser.$('//body[contains(text(), "Selenium")]');
  //   console.log("vvvvvvvvvvvvvvvvvvvvvvvv " + test);
  //   expect(test).isDisplayed();
  //   browser.pause(500);
  //
  // });

});
