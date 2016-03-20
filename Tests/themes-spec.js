describe('Testing website themes page:', function() {
	
	beforeEach(function(){
		browser.get('http://localhost:9000/#/themes/1');
	});
	
	it('key-elements should exist', function() {
		expect(browser.getTitle()).toEqual('Kandoe');
		expect(element(by.id('sidebar')).isPresent()).toBe(true);
		expect(element(by.id('header')).isPresent()).toBe(true);
		expect(element(by.tagName('panel')).isPresent()).toBe(true);
	});
	
	it('should add a new theme', function(){
				
	});
});