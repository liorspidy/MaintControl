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

  const SetMarkerLocation = (polygonPoints, equipmentName) => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click(clickEvent) {
        if (polygonPoints.polygonPoints !== undefined) {
          if (getIsPointInsidePolygon([clickEvent.latlng.lat, clickEvent.latlng.lng], polygonPoints.polygonPoints))
            setPosition([clickEvent.latlng.lat, clickEvent.latlng.lng])
        }
      },
    });
    return position === null ? null : (
      <Marker position={position}>
        <Popup>equipmentName</Popup>
      </Marker>
    );


  };

  const getIsPointInsidePolygon = (point, vertices) => {
    const x = point[0]
    const y = point[1]

    let inside = false
    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
      const xi = vertices[i][0],
        yi = vertices[i][1]
      const xj = vertices[j][0],
        yj = vertices[j][1]

      const intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
      if (intersect) inside = !inside
    }

    return inside
  }


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

      {props.type === "equip" ? <SetMarkerLocation /> : null}

      {props?.sites.map((site) => {
        const points = site.points[0].latlngs.map((latlng) => [
          latlng.lat,
          latlng.lng,
        ]);
        const avg =
          points.flat().reduce((acc, curr) => acc + curr) /
          (points.length * points[0].length);
        console.log("poi", site)
        return (

          <Polygon key={avg} pathOptions={purpleOptions} positions={points} >
            {/* <Popup>{site.siteName}</Popup> */}
            <SetMarkerLocation polygonPoints={points} />
          </Polygon>
        );
      })}
      <ResetsCenterView selectedPosition={props.selectedPosition} />
    </MapContainer>
  );
};

export default Map;
