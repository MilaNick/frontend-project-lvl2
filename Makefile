install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
gendiff:
	node bin/gendiff.js
link:
	npm link
lint:
	npx eslint .
lint-fix:
	npx eslint . --fix
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
.PHONY: test
