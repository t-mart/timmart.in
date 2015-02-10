outputdir = _site

ghpimport = bin/ghp-import

build:
	jekyll build
push: build
	./$(ghpimport) -p -m "update $(shell date -u +'%Y-%m-%dT%H:%M:%SZ')" $(outputdir)

.PHONY: build push
