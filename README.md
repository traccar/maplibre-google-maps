# MapLibre Google Maps plugin

Using this plugin you can add Google Maps layers to MapLibre GL JS.


To install dependency use the following NPM command:
```bash
npm install maplibre-google-maps
```

The libary includes two functions:
- `googleProtocol` - protocol handler
- `createGoogleStyle` - function to create an instance map style

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
