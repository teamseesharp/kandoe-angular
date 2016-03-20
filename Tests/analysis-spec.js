describe('Testing website about page:', function() {
	var analysisOverview = element(by.id('analysisOverview'));
	var btnSessionsAnalysis = (element(by.id('analyseSessions'));
	
	beforeEach(function(){
		browser.get('http://localhost:9000/#/over');
	});
	
	it('key-elements should exist', function() {
		expect(browser.getTitle()).toEqual('Kandoe');
		expect(element(by.id('sidebar')).isPresent()).toBe(true);
		expect(element(by.id('header')).isPresent()).toBe(true);
		expect(element(by.id('subthemesToAnalyse')).isPresent()).toBe(true);
		expect(element(by.id('sessionsToAnalyse')).isPresent()).toBe(true);
		expect(analysisOverview.isPresent()).toBe(true);
	});
	
	it('should show analysis', function() {
		var btnSubthemeAnalysis = (element(by.id('analyseSubtheme'));
		var btnResetAnalysis = (element(by.id('resetAnalysis'));
		var noCards = (element(by.id('noCards'));
		
		expect(analysisOverview.isEnabled()).toBe(false);
		btnAnalysis.click();
		expect(analysisOverview.isEnabled()).toBe(true);
		btnResetAnalysis.click;
		expect(analysisOverview.isEnabled()).toBe(false);
		
		expect(noCards.isEnabled()).toBe(false);
		btnSessionsAnalysis.click();
		expect(analysisOverview.isEnabled()).toBe(false);
		expect(noCards.isEnabled()).toBe(true);
	}
	
	it('should add sessions to analyse', function() {
		var allSessionsLength = element(by.id('addSession')).length();
		var sessionsToAnalyseLength = element(by.id('removeSession')).length();
		var btnAddSession = element(by.id('btnAddSession'));
		var btnRemoveSession = element(by.id('btnRemoveSession'));
		
		btnAddSession.click();
		expect(element(by.id('addSession')).length().toBe(allSessionsLength -1);
		expect(element(by.id('removeSession')).length().toBe(sessionsToAnalyseLength +1);
		
		btnRemoveSession.click();
		expect(element(by.id('addSession')).length().toBe(allSessionsLength +1);
		expect(element(by.id('removeSession')).length().toBe(sessionsToAnalyseLength -1);
		
		btnAddSession.click();
		btnAddSession.click();
		expect(analysisOverview.isEnabled()).toBe(false);
		btnSessionsAnalysis.click();
		
		expect(analysisOverview.isEnabled()).toBe(true);
	});
});