describe('Testing playing a session:', function() {
	
	beforeEach(function(){
		browser.get('http://localhost:9000/#/sessies/6');
	});
	
	it('key-elements should exist', function() {
		expect(browser.getTitle()).toEqual('Kandoe');
		expect(element(by.id('sidebar')).isPresent()).toBe(true);
		expect(element(by.id('header')).isPresent()).toBe(true);
		expect(element(by.id('chatbox')).isPresent()).toBe(true);
		expect(element(by.id('timeline')).isPresent()).toBe(true);
		expect(element(by.id('playersline')).isPresent()).toBe(true);
		expect(element(by.id('gameGrid')).isPresent()).toBe(true);
	});
	
	it('should chat', function() {
		var chatMessageInput = element(by.id('chatMessageInput'));
		var numberOfThingsSaid = element.all(by.tagName('speech-right')).length();
		
		chatMessageInput.sendKeys('test message', protractor.Key.ENTER);
		expect(element.all(by.tagName('speech-right')).length()).toBe(chatMessageInput +1);
	});
	
	it('should upvote a card', function() {
		var rows = element.all(by.tagName('rowOfCircle'));
		
		var nunberCardsFirstRow = rows[0].findElements(by.tagName('gameGridItem')).length();
		var cardsOnFirstRow = rows[0].Element(by.tagName('gameGridItem'));
		
		cardsOnFirstRow[0].click();
		expect(rows[0].findElements(by.tagName('gameGridItem')).length()).toBe(nunberCardsFirstRow -1);		
	}
});