const { expect } = require('chai');
//const screenshot = Math.ceil(Math.random() * 100) + 'screenshot';
const screenshot = 'test2_' + 'screenshot';

describe('TRADEME 2', () => {
    before(() => {browser.url('https://www.trademe.co.nz/');
    });

    it('should search for `milk` word', () => {
        browser.$('//input[@id="searchString"]').setValue('milk');
        browser.$('//form[@id="generalSearch"]//button[@type="submit"]').click();
        //browser.$('//button[@class="btn btn-trademe"]').click();
        browser.pause(500);
    });

    it('should verify that `Search results for milk` is present on a page', () => {
        const expected = browser.$('//*[@class="inline-block search-results-text"]').getText();
        //const expected = browser.$('//h1').getText(); // i tak rabotaet
        const actual = 'Search results for \'milk\'';
        console.log(expected);
        console.log(actual);
        expect(expected).eq(actual);
        browser.pause(500);
    });

    it('should take screenshot', () => {
        browser.saveScreenshot(`./screenshots/${screenshot}.png`);
    });

    it('should navigate back', () => {
        browser.back();
        browser.pause(500);
    });

});
