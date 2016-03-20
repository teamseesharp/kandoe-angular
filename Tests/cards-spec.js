describe('Testing website cards page:', function() {
	var newcard = element(by.id('newcard'));
	
	beforeEach(function(){
		browser.get('http://localhost:9000/#/kaartjes/subthema/5/5');
	});
	
	it('key-elements should exist', function() {
		expect(browser.getTitle()).toEqual('Kandoe');
		expect(element(by.id('sidebar')).isPresent()).toBe(true);
		expect(element(by.id('header')).isPresent()).toBe(true);
		expect(newcard.isPresent()).toBe(true);
		expect(element(by.id('cardlist')).isPresent()).toBe(true);				
	});
	
	it('should add a card', function(){
		var numberOfCards = element.all(by.tagName('thumbnail')).length();
		var modalCreateCard = element(by.id('createCardModal'));
		var btnAanmaken = element(by.id('btnAanmaken'));
		var cardText = element(by.id('newcardtext'));
		
		newcard.click();
		expect(modalCreateCard.waitReady()).toBe(true);
		expect(btnAanmaken.isEnabled()).toBe(false);
		
		cardText.sendKeys('test');
		expect(btnAanmaken.isEnabled()).toBe(true);
		
		cardText.clear();
		expect(cardText.getText()).toEqual('');
		expect(btnAanmaken.isEnabled()).toBe(false);
		
		cardText.sendKeys('test');
		expect(btnAanmaken.isEnabled()).toBe(true);
		btnAanmaken.click();
		
		expect(element.all(by.tagName('thumbnail')).length()).toBe(numberOfCards +1);
	});
});
	