/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-resume'] = {
	root: 'hresume',
	name: 'h-resume',
	properties: {
		'summary': {},
		'contact': {
			'uf': ['h-card']
		},
		'education': {
			'uf': ['h-card', 'h-event']
		},
		'experience': {
			'uf': ['h-card', 'h-event']
		},
		'skill': {},
		'affiliation': {
			'uf': ['h-card']
		}
	}
};

