import React, { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    useMapEvents,
    MapConsumer,
    Marker,
    Popup,
    Polygon,
    useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../../assets/placeholder.png";

const Map = (props) => {

    const [points, setPoints] = useState([]);
    const purpleOptions = { color: 'purple' }

    const LocationMarker = () => {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
            click(clickEvent) {
                setPoints(prevPoints => [...prevPoints, [clickEvent.latlng.lat, clickEvent.latlng.lng]])
            },

        })

        return position === null ? null : (
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }

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
    }


    return (
        <MapContainer
            center={[32.014371281588524, 34.773672250580155]}
            zoom={17}

            style={{ width: "100%", height: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            <ResetsCenterView
                selectedPosition={props.selectedPosition}
            />
            <Polygon pathOptions={purpleOptions} positions={points} />


        </MapContainer>
    );
};

export default Map;
