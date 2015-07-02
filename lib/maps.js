/*
   microformat-shiv - v0.3.4
   Built: 2015-07-02 09:07 - http://microformat-shiv.com
   Copyright (c) 2015 Glenn Jones
   Licensed MIT 
*/



	var Modules = (function (modules) {
	
	modules.maps = (modules.maps)? modules.maps : {};

	modules.maps['h-adr'] = {
		root: 'adr',
		name: 'h-adr',
		properties: {
			'post-office-box': {},
			'street-address': {},
			'extended-address': {},
			'locality': {},
			'region': {},
			'postal-code': {},
			'country-name': {}
		}
	};

	return modules;

} (Modules || {}));


	Modules = (function (modules) {
	
	modules.maps = (modules.maps)? modules.maps : {};

	modules.maps['h-card'] =  {
		root: 'vcard',
		name: 'h-card',
		properties: {
			'fn': {
				'map': 'p-name'
			},
			'adr': {
				'uf': ['h-adr']
			},
			'agent': {
				'uf': ['h-card']
			},
			'bday': {
				'map': 'dt-bday'
			},
			'class': {},
			'category': {
				'map': 'p-category',
				'relAlt': ['tag']
			},
			'email': {
				'map': 'u-email'
			},
			'geo': {
				'map': 'p-geo', 
				'uf': ['h-geo']
			},
			'key': {},
			'label': {},
			'logo': {
				'map': 'u-logo'
			},
			'mailer': {},
			'honorific-prefix': {},
			'given-name': {},
			'additional-name': {},
			'family-name': {},
			'honorific-suffix': {},
			'nickname': {},
			'note': {}, // could be html i.e. e-note
			'org': {},
			'p-organization-name': {},
			'p-organization-unit': {},
			'photo': {
				'map': 'u-photo'
			},
			'rev': {
				'map': 'dt-rev'
			},
			'role': {},
			'sequence': {},
			'sort-string': {},
			'sound': {
				'map': 'u-sound'
			},
			'title': {},
			'tel': {},
			'tz': {},
			'uid': {
				'map': 'u-uid'
			},
			'url': {
				'map': 'u-url'
			}
		}
	};

	return modules;

} (Modules || {}));


	Modules = (function (modules) {
	
	modules.maps = (modules.maps)? modules.maps : {};

	modules.maps['h-entry'] = {
		root: 'hentry',
		name: 'h-entry',
		properties: {
			'entry-title': {
				'map': 'p-name'
			},
			'entry-summary': {
				'map': 'p-summary'
			},
			'entry-content': {
				'map': 'e-content'
			},
			'published': {
				'map': 'dt-published'
			},
			'updated': {
				'map': 'dt-updated'
			},
			'author': { 
				'uf': ['h-card']
			},
			'category': {
				'map': 'p-category',
				'relAlt': ['tag']
			},
			'geo': {
				'map': 'p-geo', 
				'uf': ['h-geo']
			},
			'latitude': {},
			'longitude': {},
			'url': {
				'map': 'u-url',
				'relAlt': ['bookmark']
			}
		}
	};

	return modules;
	
} (Modules || {}));


	Modules = (function (modules) {
	
	modules.maps = (modules.maps)? modules.maps : {};

	modules.maps['h-event'] = {  
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

	return modules;

} (Modules || {}));


	Modules = (function (modules) {
	
	modules.maps = (modules.maps)? modules.maps : {};

	modules.maps['h-geo'] = {
		root: 'geo',
		name: 'h-geo',
		properties: {
			'latitude': {},
			'longitude': {}
		}
	};

	return modules;

} (Modules || {}));


	Modules = (function (modules) {
	
	modules.maps = (modules.maps)? modules.maps : {};

	modules.maps['h-item'] = {
		root: 'item',
		name: 'h-item',
		subTree: false,
		properties: {
			'fn': {
				'map': 'p-name'
			},
			'url': {
				'map': 'u-url'
			},
			'photo': {
				'map': 'u-photo'
			}
		}
	};

	return modules;

} (Modules || {}));


	Modules = (function (modules) {
		
	modules.maps = (modules.maps)? modules.maps : {};

		modules.maps['h-listing'] = {
			root: 'hlisting',
			name: 'h-listing',
			properties: {
				'version': {},
				'lister': {
					'uf': ['h-card']
				},
				'dtlisted': {
					'map': 'dt-listed'
				},
				'dtexpired': {
					'map': 'dt-expired'
				},
				'location': {},
				'price': {},
				'item': {
					'uf': ['h-card','a-adr','h-geo']
				},
				'summary': {
					'map': 'p-name'
				},
				'description': {
					'map': 'e-description'
				},
				'listing': {}
			}
		};

		return modules;

} (Modules || {}));


	Modules = (function (modules) {
		
	modules.maps = (modules.maps)? modules.maps : {};

		modules.maps['h-news'] = {
			root: 'hnews',
			name: 'h-news',
			properties: {
				'entry': {
					'uf': ['h-entry']
				},
				'geo': {
					'uf': ['h-geo']
				},
				'latitude': {},
				'longitude': {},
				'source-org': {
					'uf': ['h-card']
				},
				'dateline': {
					'uf': ['h-card']
				},
				'item-license': {
					'map': 'u-item-license'
				},
				'principles': {
					'map': 'u-principles', 
					'relAlt': ['principles']
				}
			}
		};

		return modules;

} (Modules || {}));


	Modules = (function (modules) {
	
	modules.maps = (modules.maps)? modules.maps : {};

	modules.maps['h-org'] = {
		root: 'h-x-org',  // drop this from v1 as it causes issue with fn org hcard pattern
		name: 'h-org',
		properties: {
			'organization-name': {},
			'organization-unit': {}
		}
	};

	return modules;

} (Modules || {}));


	Modules = (function (modules) {
		
	modules.maps = (modules.maps)? modules.maps : {};

		modules.maps['h-product'] = {
			root: 'hproduct',
			name: 'h-product',
			properties: {
				'brand': {
					'uf': ['h-card']
				},
				'category': {
					'map': 'p-category',
					'relAlt': ['tag']
				},
				'price': {},
				'description': {
					'map': 'e-description'
				},
				'fn': {
					'map': 'p-name'
				},
				'photo': {
					'map': 'u-photo'
				},
				'url': {
					'map': 'u-url'
				},
				'review': {
					'uf': ['h-review', 'h-review-aggregate']
				},
				'listing': {
					'uf': ['h-listing']
				},
				'identifier': {
					'map': 'u-identifier'
				}
			}
		};

		return modules;

} (Modules || {}));


	Modules = (function (modules) {
		
	modules.maps = (modules.maps)? modules.maps : {};

		modules.maps['h-recipe'] = {
			root: 'hrecipe',
			name: 'h-recipe',
			properties: {
				'fn': {
					'map': 'p-name'
				},
				'ingredient': {
					'map': 'e-ingredient'
				},
				'yield': {},
				'instructions': {
					'map': 'e-instructions'
				},
				'duration': {
					'map': 'dt-duration'
				},
				'photo': {
					'map': 'u-photo'
				},
				'summary': {},
				'author': {
					'uf': ['h-card']
				},
				'published': {
					'map': 'dt-published'
				},
				'nutrition': {},
				'tag': {}
			}
		};

		return modules;

} (Modules || {}));


	Modules = (function (modules) {
	
	modules.maps = (modules.maps)? modules.maps : {};

	modules.maps['h-resume'] = {
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

	return modules;

} (Modules || {}));


	Modules = (function (modules) {
	
	modules.maps = (modules.maps)? modules.maps : {};

	modules.maps['h-review-aggregate'] = {
		root: 'hreview-aggregate',
		name: 'h-review-aggregate',
		properties: {
			'summary': {
				'map': 'p-name'
			},
			'item': {
				'map': 'p-item',
				'uf': ['h-item', 'h-geo', 'h-adr', 'h-card', 'h-event', 'h-product']
			},
			'rating': {},
			'average': {},
			'best': {},
			'worst': {},       
			'count': {},
			'votes': {},
			'category': {
				'map': 'p-category',
				'relAlt': ['tag']
			},
			'url': {
				'map': 'u-url',
				'relAlt': ['self', 'bookmark']
			}
		}
	};

	return modules;

} (Modules || {}));


	Modules = (function (modules) {
	
	modules.maps = (modules.maps)? modules.maps : {};

	modules.maps['h-review'] = {
		root: 'hreview',
		name: 'h-review',
		properties: {
			'summary': {
				'map': 'p-name'
			},
			'description': {
				'map': 'e-description'
			},
			'item': {
				'map': 'p-item',
				'uf': ['h-item', 'h-geo', 'h-adr', 'h-card', 'h-event', 'h-product']
			},
			'reviewer': {
				'uf': ['h-card']
			},
			'dtreviewer': {
				'map': 'dt-reviewer'
			},
			'rating': {},
			'best': {},
			'worst': {},
			'category': {
				'map': 'p-category',
				'relAlt': ['tag']
			},
			'url': {
				'map': 'u-url',
				'relAlt': ['self', 'bookmark']
			}
		}
	};

	return modules;

} (Modules || {}));


	Modules = (function (modules) {
	
	modules.rels = {
		// xfn
		'friend': [ 'yes','external'], 
		'acquaintance': [ 'yes','external'],  
		'contact': [ 'yes','external'], 
		'met': [ 'yes','external'], 
		'co-worker': [ 'yes','external'],  
		'colleague': [ 'yes','external'], 
		'co-resident': [ 'yes','external'],  
		'neighbor': [ 'yes','external'], 
		'child': [ 'yes','external'],  
		'parent': [ 'yes','external'],  
		'sibling': [ 'yes','external'],  
		'spouse': [ 'yes','external'],  
		'kin': [ 'yes','external'], 
		'muse': [ 'yes','external'],  
		'crush': [ 'yes','external'],  
		'date': [ 'yes','external'],  
		'sweetheart': [ 'yes','external'], 
		'me': [ 'yes','external'], 
	
		// other rel=* 
		'license': [ 'yes','yes'],
		'nofollow': [ 'no','external'],
		'tag': [ 'no','yes'],
		'self': [ 'no','external'],
		'bookmark': [ 'no','external'],
		'author': [ 'no','external'],
		'home': [ 'no','external'],
		'directory': [ 'no','external'],
		'enclosure': [ 'no','external'],
		'pronunciation': [ 'no','external'],
		'payment': [ 'no','external'],
		'principles': [ 'no','external']
	
	};
	
		return modules;

} (Modules || {}));
