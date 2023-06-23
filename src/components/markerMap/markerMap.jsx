import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
  Polygon,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const SetMarkerLocation = ({ polygonPoints, setSelectedLocation }) => {
  useMapEvents({
    click: (clickEvent) => {
      if (
        getIsPointInsidePolygon(
          [clickEvent.latlng.lat, clickEvent.latlng.lng],
          polygonPoints
        )
      ) {
        console.log([clickEvent.latlng.lat, clickEvent.latlng.lng]); // Log the click event
        setSelectedLocation([clickEvent.latlng.lat, clickEvent.latlng.lng]);
      }
    },
  });

  return null;
};

const getIsPointInsidePolygon = (point, vertices) => {
  const x = point[0];
  const y = point[1];

  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i][0],
      yi = vertices[i][1];
    const xj = vertices[j][0],
      yj = vertices[j][1];

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};

const MarkerMap = ({ selectedPosition, site, equipmentName }) => {
  const [sitePoints, setSitePoints] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const purpleOptions = { color: "purple" };

  useEffect(() => {
    if (site && site.points && site.points.length > 0) {
      const latlngs = site.points[0].latlngs.map((latlng) => [
        latlng.lat,
        latlng.lng,
      ]);
      setSitePoints(latlngs);
    }
  }, [site]);

  return (
    <MapContainer
      center={
        selectedPosition
          ? selectedPosition
          : [32.014371281588524, 34.773672250580155]
      }
      zoom={17}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {selectedLocation && (
        <Marker position={selectedLocation}>
          <Popup>{equipmentName}</Popup>
        </Marker>
      )}

      <Polygon pathOptions={purpleOptions} positions={sitePoints} />

      <SetMarkerLocation
        polygonPoints={sitePoints}
        setSelectedLocation={setSelectedLocation}
      />
    </MapContainer>
  );
};

export default MarkerMap;
