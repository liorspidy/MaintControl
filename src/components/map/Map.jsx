import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMapEvents } from "react-leaflet";

import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
  iconUrl: require("leaflet/dist/images/marker-icon.png").default,
  shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
});

const Map = ({ sites, editable = true, onClick }) => {
  const [polygonPoints, setPolygonPoints] = useState([]);

  const handleMapClick = (event) => {
    if (editable && onClick) {
      const { lat, lng } = event.latlng;
      setPolygonPoints((prevPoints) => [...prevPoints, [lat, lng]]);
    }
  };

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <MapContainer
      center={[32.020167, 34.77118]}
      zoom={16}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {sites?.map((site) => (
        <Polygon
          positions={site.sitePolygonPoints}
          color="orange"
          key={site.siteName}
        >
          {site.siteMarkers.map((marker) => (
            <Marker position={marker.markerPoints} key={marker.markerName}>
              <Popup>{marker.markerName}</Popup>
            </Marker>
          ))}
        </Polygon>
      ))}
      <MapEvents />
    </MapContainer>
  );
};

export default Map;
