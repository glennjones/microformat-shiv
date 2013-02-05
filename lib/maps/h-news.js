/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-news'] = {
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


