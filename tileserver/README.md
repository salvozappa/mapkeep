# Mapkeep tileserver

## Prerequisites

* Node 8 (LTS Carbon)

## Install

```
npm install
```

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
