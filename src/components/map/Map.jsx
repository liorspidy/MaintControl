// import React, { useEffect, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   useMapEvents,
//   MapConsumer,
//   Marker,
//   Popup,
//   Polygon,
//   useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import icon from "../../assets/placeholder.png";

// const Map = (props) => {
//   const [points, setPoints] = useState([]);
//   const purpleOptions = { color: "purple" };

//   const ResetsCenterView = ({ selectedPosition }) => {
//     const map = useMap();

//     useEffect(() => {
//       if (selectedPosition) {
//         map.flyTo(L.latLng(selectedPosition?.lat, selectedPosition?.lon), 17, {
//           animate: true,
//         });
//       }
//     }, [selectedPosition]);

//     return null;
//   };

//   return (
//     <MapContainer
//       center={
//         props?.selectedPosition
//           ? props.selectedPosition
//           : [32.014371281588524, 34.773672250580155]
//       }
//       zoom={17}
//       style={{ width: "100%", height: "100%" }}
//     >
//       <TileLayer
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       {/* {props.type === "equip" ? <SetMarkerLocation /> : null} */}

//       {props?.sites.map((site) => {
//         const points = site.points[0].latlngs.map((latlng) => [
//           latlng.lat,
//           latlng.lng,
//         ]);
//         const avg =
//           points.flat().reduce((acc, curr) => acc + curr) /
//           (points.length * points[0].length);
//         console.log("poi", site);
//         return (
//           <Polygon key={avg} pathOptions={purpleOptions} positions={points}>
//             <Popup>{site.siteName}</Popup>
//           </Polygon>
//         );
//       })}
//       <ResetsCenterView selectedPosition={props.selectedPosition} />
//     </MapContainer>
//   );
// };

// export default Map;

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = ({ sites}) => {
  useEffect(() => {
    console.log("sites", sites);
  }, [sites]);
  return (
    <MapContainer
      center={[32.020167, 34.77118]}
      // center={[32.014371281588524, 34.773672250580155]}
      zoom={16}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {sites?.map((site) => {
        return (
          <Polygon
            positions={site.sitePolygonPoints}
            color="orange"
            key={site.sitename}
          >
            {site.siteMarkers.map((marker) => (
              <Marker position={marker.markerPoints} key={marker.markerName}>
                <Popup>{marker.markerName}</Popup>
              </Marker>
            ))}
          </Polygon>
        );
      })}
    </MapContainer>
  );
};

export default Map;
