describe('Testing website snapshot page:', function() {
	
	beforeEach(function(){
		browser.get('http://localhost:9000/#/snapshot/2');
	});
	
	it('key-elements should exist', function() {
		expect(browser.getTitle()).toEqual('Kandoe');
		expect(element(by.id('sidebar')).isPresent()).toBe(true);
		expect(element(by.id('header')).isPresent()).toBe(true);
		expect(element(by.id('gameGrid')).isPresent()).toBe(true);
		expect(element(by.id('chat')).isPresent()).toBe(true);
	});
});