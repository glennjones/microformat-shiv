/*
integration test for regressions in code
*/

assert = chai.assert;


describe('integration', function() {

   // parser should not error
   // https://github.com/glennjones/microformat-node/issues/34
   it('include without id', function(){

        var expected = {
                'items': [
                    {
                        'type': [
                            'h-item'
                        ],
                        'properties': {}
                    },
                    {
                        'type': [
                            'h-item'
                        ],
                        'properties': {}
                    }
                ],
                'rels': {},
                'rel-urls': {}
            },
			options = {
				'html': '<div class="include item"></div><div class="include"></div><div class="item"></div>',
				'baseUrl': 'http://example.com',
				'dateFormat': 'html5',
				'parseLatLonGeo': true
			};

        var result = Microformats.get(options);
        assert.deepEqual( result, expected );

   });

});


