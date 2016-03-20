describe('Testing website sessionspage:', function() {
	var detailsColumn = element(by.id('detailsColumn');
	
	beforeEach(function(){
		browser.get('http://localhost:9000/#/sessies');
	});
	
	it('key-elements should exist', function() {
		expect(browser.getTitle()).toEqual('Kandoe');
		expect(element(by.id('sidebar')).isPresent()).toBe(true);
		expect(element(by.id('header')).isPresent()).toBe(true);
		expect(element(by.id('sessionsColumn')).isPresent()).toBe(true);
	});
	
	it('details visible after click on session', function() {
		expect(detailsColumn.isDisplayed()).toBe(false);
		element(by.id("aSession")).click();		
		expect(detailsColumn.isDisplayed()).toBe(true);
		expect(element(by.id("sessiespelen")).isDisplayed()).toBe(true);
		
	});
	
	it('make a new session', function(){	
		element(by.id("aSession")).click();
		var btnChangeSession = browser.driver.wait(until.elementLocated(by.id("changeSession")), 5000);
		var numberOfSessions = element.all(by.tagName('sessionButton')).length();
		btnChangeSession.click();
		
		var modal = element(by.id("sessionModal"));
		element(by.id('descriptionField')).sendKeys('een omschrijving');
		var subthemes = element(by.id('subthemeField')).findElements(by.tagName('option'));
		subthemes[0].click);
		element(by.id('maxCardField')).sendKeys('5');
		element(by.id('maxParticipantsField')).sendKeys('3');
		element(by.id('createSession')).click();
		
		expect(element.all(by.tagName('sessionButton')).length()).toBe(numberOfSessions +1);		
	});
	
});