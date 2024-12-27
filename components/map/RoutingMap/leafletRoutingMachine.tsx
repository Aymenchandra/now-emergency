"use client"

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import * as L from "leaflet";
import { EmergencyProps } from "./dynamicRoutingMap";



export const LeafletRoutingMachine = ({ trackedEmergency }: EmergencyProps) => {
    const map = useMap(); 
    const emergencyPos = trackedEmergency.emergencyPosition as L.LatLngTuple
    const employeePos = trackedEmergency.employeePosition as L.LatLngTuple
    const getTrackedLocation = () => {
        if (!map) return; 

        // Create and add routing control
        L.Routing.control({
            waypoints: [
                L.latLng(employeePos),
                L.latLng(emergencyPos),
            ],
            lineOptions: {
                styles: [
                    {
                        color: 'red',
                        weight: 4,
                        opacity: 0.6,
                    },
                ],
                extendToWaypoints: false,
                missingRouteTolerance: 0,
            },
            routeWhileDragging: false,
            addWaypoints: true,
            fitSelectedRoutes: true,
            showAlternatives: false,
        }).addTo(map); // Add the routing control to the map

        // Add markers with names and popups
        L.marker(employeePos)
            .addTo(map)
            .bindPopup(`<b>Employee Location: ${trackedEmergency.employeeLocation}</b>`, { autoClose: false })
            .openPopup();
        
        L.marker(emergencyPos)
            .addTo(map)
            .bindPopup(`<b>Emergency Location: ${trackedEmergency.emergencyLocation}</b>`, { autoClose: false })
            .openPopup();
    };

    useEffect(() => {
        getTrackedLocation();
    }, []);

    return null;
};