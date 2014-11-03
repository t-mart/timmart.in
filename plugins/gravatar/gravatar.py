"""
Gravatar plugin for Pelican
===========================

This plugin assigns the ``AUTHOR_GRAVATAR`` variable to the Gravatar URL and
makes the variable available within the page's context.
"""

import hashlib
import six

from pelican import signals

def gravatar_url(email):
    email_bytes = six.b(email).lower()
    url = "http://www.gravatar.com/avatar/" + hashlib.md5(email_bytes).hexdigest()
    return url

def add_gravatar(gen):
    # import ipdb
    # ipdb.set_trace()
    if not gen.context.get('AUTHOR_GRAVATAR'):
        email = gen.context.get('AUTHOR_EMAIL')
        if email:
            gen.context["AUTHOR_GRAVATAR"] = gravatar_url(email)

def register():
    signals.generator_init.connect(add_gravatar)
