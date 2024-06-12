const sessions = {};

export async function googleProtocol(params, abortController) {
  const url = new URL(params.url.replace('google://', 'https://'));
  const sessionKey = `${url.hostname}?${url.searchParams}`;
  const key = url.searchParams.get('key');

  let value = sessions[sessionKey];
  if (!value) {
    value = new Promise(async (resolve) => {
      const mapType = url.hostname;
      const layerType = url.searchParams.get('layerType');
      const overlay = url.searchParams.get('overlay');

      const sessionRequest = {
        mapType,
        language: "en-US",
        region: "US",
        scale: "scaleFactor2x",
        highDpi: true,
      };
      if (layerType) {
        sessionRequest.layerTypes = [layerType];
      }
      if (overlay) {
        sessionRequest.overlay = overlay === 'true';
      }

      const response = await fetch(`https://tile.googleapis.com/v1/createSession?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionRequest),
      });
      const result = await response.json();
      sessions[sessionKey] = result.session;
      resolve();
    });
    sessions[sessionKey] = value;
    await value;
  } else if (value instanceof Promise) {
    await value;
  }

  const session = sessions[sessionKey];
  const tile = await fetch(`https://tile.googleapis.com/v1/2dtiles${url.pathname}?session=${session}&key=${key}`);
  const data = await tile.arrayBuffer();
  return { data };
}

export function createGoogleStyle(id, mapType, key) {
  const style = {
    "version": 8,
    "sources": {
    },
    "layers": [
      {
        "id": id,
        "type": "raster",
        "source": id,
      },
    ],
  };
  style.sources[id] = {
    "type": "raster",
    "tiles": [`google://${mapType}/{z}/{x}/{y}?key=${key}`],
    "tileSize": 256,
    "attribution": "&copy; Google Maps",
    "maxzoom": 19,
  };
  return style;
};
