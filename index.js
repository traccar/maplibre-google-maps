const sessions = {};

export async function googleProtocol(a, b) {
  const url = new URL(params.url.replace('google://', 'https://'));
  const mapType = url.hostname;
  const key = url.searchParams.get('key');
  const location = url.pathname;

  let value = sessions[mapType];
  if (!value) {
    value = new Promise(async (resolve) => {
      const response = await fetch(`https://tile.googleapis.com/v1/createSession?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mapType,
          language: "en-US",
          region: "US",
          scale: "scaleFactor2x",
          highDpi: true,
        }),
      });
      const result = await response.json();
      sessions[mapType] = result.session;
      resolve();
    });
    sessions[mapType] = value;
    await value;
  } else if (value instanceof Promise) {
    await value;
  }

  const session = sessions[mapType];
  const tile = await fetch(`https://tile.googleapis.com/v1/2dtiles${location}?session=${session}&key=${key}`);
  const data = await tile.arrayBuffer();
  return { data };
}

export function createGoogleStyle(id, mapType, key) {
  return {
    "version": 8,
    "sources": {
      "osm": {
        "type": "raster",
        "tiles": [`google://${mapType}/{z}/{x}/{y}?key=${key}`],
        "tileSize": 256,
        "attribution": "&copy; Google Maps",
        "maxzoom": 19,
      },
    },
    "layers": [
      {
        "id": id,
        "type": "raster",
        "source": id,
      },
    ],
  };
};
