import React, { useEffect, useState } from "react";

import { TileLayer, FeatureGroup, MapContainer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import osm from "./osm-providers";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const DrawableMap = ({ mapLayers, setMapLayers }) => {
  const [center, setCenter] = useState({
    lat: 32.014371281588524,
    lng: 34.773672250580155,
  });

  const ZOOM_LEVEL = 17;
  const mapRef = useRef();

  const _onCreate = (e) => {
    console.log(e);

    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _leaflet_id, options } = layer;
      console.log("amit", layer);

      setMapLayers((layers) => [
        ...layers,
        {
          id: _leaflet_id,
          latlngs: layer.getLatLngs()[0],
        },
      ]);
    }
  };

  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
    });
  };

  const _onDeleted = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  return (
    <MapContainer
      center={center}
      zoom={ZOOM_LEVEL}
      ref={mapRef}
      style={{ width: "100%", height: "100%" }}
    >
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={_onCreate}
          onEdited={_onEdited}
          onDeleted={_onDeleted}
          draw={{
            polygon:
              mapLayers.length >= 1
                ? false
                : {
                    enable: false,
                    shapeOptions: {
                      color: "red",
                    },
                  },
            rectangle: false,
            polyline: false,
            circle: false,
            circlemarker: false,
            marker: false,
          }}
        />
      </FeatureGroup>

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default DrawableMap;
