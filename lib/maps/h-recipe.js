/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-recipe'] = {
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


