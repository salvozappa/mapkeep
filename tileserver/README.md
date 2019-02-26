# Mapkeep tileserver

## Prerequisites

* Node 8 (LTS Carbon)

## Install

Install the node dependencies:

```
npm install
```

To serve the tiles, you need them to be saved in this folder in a file named `tiles.mbtiles`.

To generate the tiles yourself, please check out the [OpenMapTiles](https://openmaptiles.org/) project. They also provide pre-rendered files to download.

## Start daemon

```
npm run start
```

## Stop daemon

```
npm run stop
```

## Deploy

```
ssh root@tileserver.mapkeep.com 'cd /opt/tileserver && npm run stop' && \
    rsync -ar --del --progress ./ root@tileserver.mapkeep.com:/opt/tileserver && \
    ssh root@tileserver.mapkeep.com 'cd /opt/tileserver && npm run start'
```
