import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, useMapEvents, Polygon } from "react-leaflet";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import L from "leaflet";
import "./DrawableMap.css";

const DrawableMap = ({ onSave, polygon, setPolygon, removePoint }) => {
  const handleMapClick = (event) => {
    const { latlng, originalEvent } = event;
    const { lat, lng } = latlng;
    const target = originalEvent.target;
    const isButtonClicked =
      target.classList.contains("back-polygon") ||
      target.classList.contains("MuiSvgIcon-root");

    if (!isButtonClicked) setPolygon(lat, lng);
    else {
      if (!target.classList.contains("back-polygon")) {
        event.originalEvent.stopPropagation();
        removePoint();
      }
    }

  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  const cornerPointOptions = {
    radius: 4,
    fillColor: "red",
    color: "red",
    weight: 5,
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
      <MapClickHandler />

      {polygon.length > 0 && (
        <div
          onClick={() => removePoint()}
          className="back-polygon"
        >
          <UndoOutlinedIcon />
        </div>
      )}

      {polygon.length > 0 && (
        <PolygonWithCornerPoints
          positions={polygon}
          cornerPointOptions={cornerPointOptions}
        />
      )}
    </MapContainer>
  );
};

const PolygonWithCornerPoints = ({ positions, cornerPointOptions }) => {
  return (
    <>
      <Polygon positions={positions} />
      {positions.map(([lat, lng], index) => (
        <CircleMarker
          key={index}
          center={[lat, lng]}
          pathOptions={cornerPointOptions}
        />
      ))}
    </>
  );
};

export default DrawableMap;
