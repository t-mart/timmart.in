#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import os

AUTHOR = 'Tim Martin'
SITENAME = 'Tim Martin'
SITEURL = ''

PATH = 'content'

TIMEZONE = 'America/New_York'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

THEME = 'timmart.in_theme'

PLUGIN_PATHS = ['plugins']
PLUGINS = [ plugin
    for path in PLUGIN_PATHS
        for plugin in os.listdir(path)
            if os.path.isdir(plugin) ]

STATIC_PATHS = ['images', 'extra/CNAME']
EXTRA_PATH_METADATA = {'extra/CNAME': {'path': 'CNAME'},}

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
