const { expect } = require('chai');
//const screenshot = Math.ceil(Math.random() * 100) + 'screenshot';
const screenshot = 'test3_' + 'screenshot';

describe('DUCKDUCKGO', () => {
    before(() => {browser.url('https://duckduckgo.com/');
    });

    it('should search for `maven` word', () => {
        browser.$('//input[@id="search_form_input_homepage"]').setValue('maven');
        browser.$('//input[@id="search_button_homepage"]').click();
        browser.pause(500);
    });

    it('should verify that there is `maven` in search field', () => {
        //expect(browser.$('//form[@id="search_form"]//input[@value="maven"]').isDisplayed()).true;
        const attrib = browser.$('//form[@id="search_form"]//input').getAttribute('value');
        expect(attrib).eq('maven');
    });

    it('should verify that `maven.apache` link exists on page', () => {
        expect(browser.$('//a[contains(text(),"maven.apache")]').isDisplayed()).true;
        browser.pause(500);
    });
});
