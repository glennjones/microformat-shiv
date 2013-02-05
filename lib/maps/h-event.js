/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-event'] = {  
	root: 'vevent',
	name: 'h-event',
	properties: {
		'summary': {
			'map': 'p-name'
		},
		'dtstart': {
			'map': 'dt-start'
		},
		'dtend': {
			'map': 'dt-end'
		},
		'description': {},
		'url': {
			'map': 'u-url'
		},
		'category': {
			'map': 'p-category',
			'relAlt': ['tag']
		},
		'location': {
			'uf': ['h-card']
		},
		'geo': {
			'uf': ['h-geo']
		},
		'latitude': {},
		'longitude': {},
		'duration': {
			'map': 'dt-duration'
		},
		'contact': {
			'uf': ['h-card']
		},
		'organizer': {
			'uf': ['h-card']},
		'attendee': {
			'uf': ['h-card']},
		'uid': {
			'map': 'u-uid'
		},
		'attach': {
			'map': 'u-attach'
		},
		'status': {},
		'rdate': {}, 
		'rrule': {}
	}
};

