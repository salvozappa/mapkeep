# Mapkeep

Mapkeep is a proof of concept on how to build a simplistic google map clone that supports vector tile-rendering and host it yourself.

![GIF-Demo](https://thumbs.gfycat.com/PastelJaggedAntelopegroundsquirrel-size_restricted.gif) 

⚠ This is a work in progress, proof of concept still in development.

## Demo

You can visit a working instance at the following url:
https://mapkeep.com

## Features

* Self-hosting using docker ✔
* Client-side vector tile rendering using Mapbox GL JS ✔
* Server side tile hosting and serving using OpenMapTiles ✔
* Address lookout using Nominatim ✔
* Point to point navigation ❌

## Components

The project is composed of two different parts:

* `frontend/` this folder contains the front-end application, made using React
* `tileserver/` this is the backend that serves the [OpenMapTiles](https://openmaptiles.org/) tiles

## Related projects

This simple proof of concept is built on the hard work of successful open-source projects. Please check them out and contribute to them if you can:

* [OpenStreetMap](https://www.openstreetmap.org/)
* [OpenMapTiles](https://openmaptiles.org/)
* [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/)
