describe('Testing website organisation detail page:', function() {
	
	beforeEach(function(){
		browser.get('http://localhost:9000/#/organisaties/1');
	});
	
	it('key-elements should exist', function() {
		expect(browser.getTitle()).toEqual('Kandoe');
		expect(element(by.id('sidebar')).isPresent()).toBe(true);
		expect(element(by.id('header')).isPresent()).toBe(true);
		expect(element(by.tagName('organisationlogo')).isPresent()).toBe(true);
	});
	
	it('should save data', function() {
		var saveData = element(by.id('saveorganisationchanges'));
		var organisationName = element(by.id('organisationNameField'));
		var modal = element(by.id('changesModal'));
		
		organisationName.sendKeys('');
		expect(saveData.isEabled()).toBe(false);
		
		organisationName.sendKeys('Jeugd');
		expect(saveData.isEabled()).toBe(true);
		
		saveData.click();
		expect(modal.waitReady()).toBe(true);
		element(by.id('btnOk')).click();
	});
	
});