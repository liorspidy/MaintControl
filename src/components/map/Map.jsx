import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  MapConsumer,
  Marker,
  Popup,
  Polygon,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../../assets/placeholder.png";

const Map = (props) => {
  const [points, setPoints] = useState([]);
  const purpleOptions = { color: "purple" };

  const ResetsCenterView = ({ selectedPosition }) => {
    const map = useMap();

    useEffect(() => {
      if (selectedPosition) {
        map.flyTo(L.latLng(selectedPosition?.lat, selectedPosition?.lon), 17, {
          animate: true,
        });
      }
    }, [selectedPosition]);

    return null;
  };

  const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click(clickEvent) {
        setPoints((prevPoints) => [
          ...prevPoints,
          [clickEvent.latlng.lat, clickEvent.latlng.lng],
        ]);
      },
    });
    console.log("pos", position, points);
    return position === null ? null : (
      <Marker position={points[0]}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  return (
    <MapContainer
      center={
        props?.selectedPosition
          ? props.selectedPosition
          : [32.014371281588524, 34.773672250580155]
      }
      zoom={17}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />

      {props?.sites.map((site) => {
        const points = site.points[0].latlngs.map((latlng) => [
          latlng.lat,
          latlng.lng,
        ]);
        const avg =
          points.flat().reduce((acc, curr) => acc + curr) /
          (points.length * points[0].length);

        return (
          <Polygon key={avg} pathOptions={purpleOptions} positions={points}>
            <Popup>{site.siteName}</Popup>
          </Polygon>
        );
      })}
      <ResetsCenterView selectedPosition={props.selectedPosition} />
    </MapContainer>
  );
};

export default Map;
