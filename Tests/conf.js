exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['login-spec.js'],
  rootElement : 'body',
   
  useAllAngular2AppRoots: true
};