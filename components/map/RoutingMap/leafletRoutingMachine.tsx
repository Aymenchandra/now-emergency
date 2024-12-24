"use client"

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { EmergencyProps } from "./dynamicRoutingMap";


export const LeafletRoutingMachine = ({emergencyPosition}: EmergencyProps) => {
    console.log(emergencyPosition)
    const map = useMap();
    const getTrackedLocation = () => {
        L.Routing.control({
            
            waypoints: [L.latLng(emergencyPosition.employeePosition[0], emergencyPosition.employeePosition[1]), L.latLng(emergencyPosition.emergencyPosition[0], emergencyPosition.emergencyPosition[1])],
            lineOptions: {
                styles: [{
                    color: "red",
                    weight: 4,
                    opacity: 0.6
                }],
                extendToWaypoints: false,
                missingRouteTolerance: 0
            },
            routeWhileDragging: false,
            addWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: false,
        }).addTo(map);
    }

    useEffect(() => {
        return () => getTrackedLocation();
    }, []);
    return null
}