describe('Testing website about page:', function() {
	
	beforeEach(function(){
		browser.get('http://localhost:9000/#/over');
	});
	
	it('key-elements should exist', function() {
		expect(browser.getTitle()).toEqual('Kandoe');
		expect(element(by.id('sidebar')).isPresent()).toBe(true);
		expect(element(by.id('header')).isPresent()).toBe(true);
		expect(element(by.id('aboutGame')).isPresent()).toBe(true);
		expect(element(by.id('aboutCreators')).isPresent()).toBe(true);
	});
});