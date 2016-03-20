describe('Testing websites profile page', function() {
	var selectPicture = element(by.id('selectPicture'));
	
	beforeEach(function(){
		browser.get('http://localhost:9000/#/profiel');
	});
	
	it('key-elements should exist', function() {
		expect(browser.getTitle()).toEqual('Kandoe');
		expect(element(by.id('sidebar')).isPresent()).toBe(true);
		expect(element(by.id('header')).isPresent()).toBe(true);
		expect(selectPicture.isPresent()).toBe(true);
	});
	
	it('make a change', function() {
		var save = element(by.id('saveProfileChangesButton'));
		var modal = element(by.id('changesModal'));
		
		expect(save.isPresent()).toBe(true);
		expect(save.isEnabled()).toBe(true);
		
		element(by.id('lastname')).sendKeys('Hans');
		element(by.id('firstname')).sendKeys('Hansen');
		save.click();
		browser.driver
		expect(modal.waitReady()).toBe(true);
		element(by.id('btnOk')).click();
	});
	
	
});
