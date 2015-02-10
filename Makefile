outputdir = _site

ghpimport = _bin/ghp-import

build:
	jekyll build
push: build
	./$(ghpimport) -p -m "update $(shell date -u +'%Y-%m-%dT%H:%M:%SZ')" $(outputdir)
serve:
	# jekyll automatically builds the site before this
	jekyll serve

.PHONY: build push
