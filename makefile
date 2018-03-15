output=output
output-linux=$(output)/linux
output-windows=$(output)/windows

build: build-linux build-windows

build-linux:
	test -d $(output) || mkdir $(output)
	# Test if the output folder exists. If not create it.
	test -d $(output-linux) || mkdir $(output-linux)
	# Remove all files in the output folder
	rm -rfv $(output-linux)/*
	# Install dependencies
	cd client && yarn install
	# Build React fontend
	cd client && yarn build
	# Copy the frontend build to the output folder	
	mv client/build $(output-linux)
	# Build the Go server
	cd server; go build -o worky
	# Copy Go server to output directory
	mv server/worky $(output-linux)
	# Compress the output to a release package
	zip -r $(output-linux).zip $(output-linux)
	
build-windows:
	test -d $(output) || mkdir $(output)
	# Test if the output folder exists. If not create it.
	test -d $(output-windows) || mkdir $(output-windows)
	# Remove all files in the output folder
	rm -rfv $(output-windows)/*
	# Install dependencies
	cd client && yarn install
	# Build React fontend
	cd client && yarn build
	# Copy the frontend build to the output folder	
	mv client/build $(output-windows)
	# Build the Go server
	cd server; GOOS=windows GOARCH=386 go build -o worky.exe
	# Copy Go server to output directory
	mv server/worky.exe $(output-windows)
	# Compress the output to a release package
	zip -r $(output-windows).zip $(output-windows)