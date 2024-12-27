"use client"
import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { LeafletRoutingMachine } from "./leafletRoutingMachine";
import L from "leaflet";
import { EmergencyProps } from "./dynamicRoutingMap";



export default function MapWithRouting({ trackedEmergency }: EmergencyProps) {

  return (
    <MapContainer
      center={trackedEmergency.emergencyPosition as L.LatLngTuple}
      zoom={10}
      scrollWheelZoom={true}
      className="w-full h-[95%] relative z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LeafletRoutingMachine trackedEmergency={trackedEmergency} />
    </MapContainer>
  );

}
let DefaultIcon = L.icon({
  iconUrl: "/localisation-marker.png",
  iconSize: [38, 38],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;
