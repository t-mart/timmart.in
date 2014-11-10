---
layout: post
title:  "Is this my site?"
date:   2014-11-09 12:06:08
---

In reading [Alex Gaynor's post prodding for more
HTTPS](https://alexgaynor.net/2014/oct/06/http-considered-unethical/), I was
ecstatic to learn I could start serving my site with a free certificate from
[CloudFlare](https://www.cloudflare.com/ssl). *I've set this up already;
be sure to [check it out](https://timmart.in).*

Not only was I interested in the details of implementing a certificate on my
site (however, CloudFlare abstracts that away pretty magically), but I
also had been wanting to publish my PGP key in case anyone wanted to talk
about super secret stuff. I jest, but I think it's kinda cool.

A while ago, I had my PGP key published on an unsecured site of mine. A
friend quickly told me this was a problem: Without
[TLS](http://en.wikipedia.org/wiki/Transport_Layer_Security) in
place, the content on my site (including a PGP key) is not guaranteed to
have:

* **Confidentiality**: secrecy of the content from other parties, like ISPs, employers, etc.
* **Message Integrity**: assurance the content is intact and has not been modified.
* **Authenticity&#42;**:  confirmation that the content was delivered from me/on my
  behalf.

But I have all that now with a certificate in place. So I can publish my
PGP key and users can rest assured?

Wrong.

I tricked you a little bit here because I didn't tell you about CloudFlare's
identity verification process: There is none for the certificate I use here.
That means there's no provable link between this site and me, the breathing
human being Tim Martin with a reputation to uphold. Hence, this compromises the
aforementioned **authenticity&#42;**.

As of right now, the only way to prove authenticity is for a [Certificate
Authority](http://en.wikipedia.org/wiki/Certificate_authority) to perform an
identity check, the details of which are (simply) guidelined by the CA/Browser Forum in
a document like
[this](https://cabforum.org/wp-content/uploads/EV-V1_5_2Libre.pdf). Further,
this check is only performed on applications for a different class of
certificates known as *Extended Validation Certificates* (which generally cost
considerably more), and this certificate is not one of them.

(There are a lot of theoretical flaws in the CA scheme that accompany
practically any notion of trust on the web. Some of these flaws have been
acted upon. You should do some basic Wikipedia-ing on
[the](http://en.wikipedia.org/wiki/X.509)
[matter](http://en.wikipedia.org/wiki/Extended_Validation_Certificate) if
you're unfamiliar.)

Anyway, you can check for yourself that this certificate has nothing really to
do with me, and that my identity has not been verified. Take a look at this
screenshot of Chrome's Certificate dialog:

<figure><img src="{% asset_path 'is-this-my-site/cert_dialog.png' %}" alt="Chrome's Certificate dialog">
<figcaption>See that <code>sni74477.cloudflaressl.com</code>? That's not
me.</figcaption>
</figure>
