module('CSS Gradient');
test('Parse linear gradient', function() {
	var cssGradient = emmet.require('cssGradient');
	var gradient = cssGradient.parse('linear-gradient(top   left, white , #a6f2c0 30%, rgba(180, 200, 210, .9) .8, black 10em)');
	
	equal(gradient.type, 'linear', 'Gradient is linear');
	equal(gradient.direction, 'top left', 'Direction is "top left"');
	equal(gradient.colorStops.length, 4, '4 color stops');
	
	gradient = cssGradient.parse('-webkit-linear-gradient(red, black)');
	ok(gradient, 'Parsed vendor-prefixed gradient');
});

test('Expand abbreviation handler', function() {
	editorStub.setSyntax('css');
	editorStub.replaceContent('.r{a:lg(red, black)$0}');
	
	emmet.require('actions').run('expand_abbreviation', editorStub);
	equal(editorStub.getContent(), '.r{a:-webkit-gradient(linear, 0 0, 0 100%, from(red), to(black));a:-webkit-linear-gradient(red, black);a:-moz-linear-gradient(red, black);a:-o-linear-gradient(red, black);a:linear-gradient(red, black);}');
	equal(editorStub.getCaretPos(), 200, 'Correctly placed cursor');
	editorStub.setSyntax('html');
});

test('"Reflect CSS Value" action delegate', function() {
	editorStub.setSyntax('css');
	editorStub.replaceContent('.r{a:test;a:linear-gradient(red, green$0);a:-moz-linear-gradient(red, black);p:1}');
	
	emmet.require('actions').run('reflect_css_value', editorStub);
	equal(editorStub.getContent(), '.r{a:test;a:linear-gradient(red, green);a:-moz-linear-gradient(red, green);p:1}');
	editorStub.setSyntax('html');
});