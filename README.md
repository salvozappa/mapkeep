# Mapkeep ─ Frontend

Mapkeep is a map that respect your privacy by not tracking you.

⚠ This is a work in progress, proof of concept still in development.

You can find a demo instance at http://mapkeep.com

# Requirements

Tested on node 10, probably works on node 8 too

# Install

```
npm install
```

# Build

For a development build:

```
npm run build
```

To build on every file change:

```
npm run watch
```

# Run

```
docker run -it \
    -p 8080:80/tcp \
    -v "$PWD/dist:/usr/share/nginx/html:ro" \
    -d \
    --name mapkeep-frontend \
    nginx
```

# Deploy

```
npm run build-production && rsync -ar --del --progress dist/ root@mapkeep.com:/var/www/html
```
