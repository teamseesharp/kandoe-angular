describe('Testsing websites organisation page', function() {
	var newOrgButton = element(by.id('neworganisation'));
	
	beforeEach(function() {
		browser.get('http://localhost:9000/#/organisaties');
	});
	
	it('key-elements should exist', function() {
		expect(browser.getTitle()).toEqual('Kandoe');
		expect(element(by.id('sidebar')).isPresent()).toBe(true);
		expect(element(by.id('header')).isPresent()).toBe(true);
		expect(newOrgButton.isPresent()).toBe(true);
	});
	
	it('organisation elements should exist', function() {
		var organisations = element.all(by.TagName('thumbnail'));
		
		expect(organisations[0].findElement(by.id('btnthema')).isPresent()).toBe(true);
		expect(organisations[0].findElement(by.id('btnsessies')).isPresent()).toBe(true);
		expect(organisations[0].findElement(by.id('btnedit')).isPresent()).toBe(true);
	});
	
	it('should add new organisation', function(){
		var createButton = element(by.id('createneworganisation'));
		var name = element(by.id('neworganisationname'));
		var numberOfOrganisations = element.all(by.tagName('organisation')).length();
		
		newOrgButton.click();
		expect(element(by.id('organisationModal')).waitReady()).toBe(true);
		expect(createButton.isEnabled()).toBe(false);
		
		name.sendKeys('test');
		expect(createButton.isEnabled()).toBe(true);
		
		name.clear();
		expect(name.getText()).toEqual('');
		expect(createButton.isEnabled()).toBe(false);
		
		name.sendKeys('test');
		expect(createButton.isEnabled()).toBe(true);
		createButton.click();
		
		expect(element.all(by.tagName('organisation')).length()).toBe(numberOfOrganisations +1);
	}
	
});