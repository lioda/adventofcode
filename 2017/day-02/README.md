Tests:
```
docker run --rm -ti -v $(pwd):/src --workdir /src node:7.7.1 node_modules/mocha/bin/mocha tests --watch --recursive
```
Run:
```
docker run --rm -ti -v $(pwd):/src --workdir /src node:7.7.1 node src/main.js
```
