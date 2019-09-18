clean:
	rm -rf dist/ public/assets public/widgets

build:
	make clean
	npm run build:elements

release:
	make build
	firebase deploy

serve:
	make build
	firebase serve