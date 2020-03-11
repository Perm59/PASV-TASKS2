const { expect } = require('chai');

describe('TRADEME', () => {
    before(() => {browser.url('https://www.trademe.co.nz/');
    });

    it('should click on Community menu', () => {
        browser.$('//li[@id="CommunityDropDown"]').click();
    });

    it('should click Announcements link', () => {
        browser.$('//a[text()="Announcements"]').click();

    });

    it('should display Announcements header', () => {
        //expect(browser.$('//div[@id="SiteHeader_SidebarColumn"]//div[text()="Announcements"]').isDisplayed()).true;
        browser.$('//div[@id="SiteHeader_SidebarColumn"]//div[text()="Announcements"]').waitForDisplayed();
    });

});
