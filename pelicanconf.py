#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import os

AUTHOR = 'Tim Martin'
AUTHOR_EMAIL = 'tim@timmart.in'
SITENAME = 'Tim Martin'
SITEURL = ''
SITESUBTITLE = 'Is it day or night right now?'
DISQUS_SHORTNAME = 'timmartin'

PATH = 'content'

TIMEZONE = 'America/New_York'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

THEME = 'timmart.in_theme'

PLUGIN_PATHS = ['plugins']
PLUGINS = [ plugin
    for path in PLUGIN_PATHS
        for plugin in os.listdir(path)
            if os.path.isdir(os.path.join(path,plugin)) ]

STATIC_PATHS = ['extra', 'articles']
EXTRA_PATH_METADATA = {'extra/CNAME': {'path': 'CNAME'},}

DIRECT_TEMPLATES = ('index',)

RELATIVE_URLS = False

DELETE_OUTPUT_DIRECTORY = True

