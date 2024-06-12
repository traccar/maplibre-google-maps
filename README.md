# MapLibre Google Maps plugin

Using this plugin you can add Google Maps layers to MapLibre GL JS.


To install dependency use the following NPM command:
```bash
npm install maplibre-google-maps
```

The libary includes two functions:
- `googleProtocol` - protocol handler that needs to be passed to `maplibregl.addProtocol` with `google` as the protocol name
- `createGoogleStyle` - function to create an instance map style; it accepts 3 arguments:
  - `id` - source id; can be any string
  - `mapType` - type of the map; `roadmap` and `satellite` are supported
  - `key` - Google API key with Map Tiles API enabled

Usage example:
```js
import { googleProtocol, createGoogleStyle } from 'maplibre-google-maps';

maplibregl.addProtocol('google', googleProtocol);

const map = new maplibregl.Map({
  container: 'map',
  style: createGoogleStyle('google', 'roadmap', 'YOUR_GOOGLE_KEY'),
});
```

You need to replace `YOUR_GOOGLE_KEY` with your Google API key with Map Tiles API enabled. For more information check the official [Google documentation](https://developers.google.com/maps/documentation/tile/get-api-key).
