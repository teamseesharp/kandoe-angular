describe('Testing loginpage', function() {
  var homeURL = 'http://kandoe-angular.azurewebsites.net/#/home'

  beforeEach(function() {
    browser.get('http://localhost:9000/#/login');
  });

  it('key-elements should exist', function() {
		expect(browser.getTitle()).toEqual('Kandoe');
		expect(element(by.tagName('kandoelogo')).isPresent()).toBe(true);	
		expect(element(by.id('login-container')).isPresent()).toBe(true);			
	});
});