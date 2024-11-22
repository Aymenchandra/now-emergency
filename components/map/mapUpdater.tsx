import { LatLngTuple } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface MapUpdateProps {
    position: LatLngTuple;
}

const MapUpdater = ({ position }: MapUpdateProps) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(position,map.getZoom(),{
                "animate" : true,
                "duration" : 1,
            });  // Update the map view when position changes
        }
    }, [position, map]);

    return null;
};

export default MapUpdater;