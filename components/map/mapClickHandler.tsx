import { fetchLocationDetails } from '@/actions/map';
import { LatLngTuple } from 'leaflet';
import { Dispatch, SetStateAction } from 'react';
import { useMapEvents } from 'react-leaflet';
import { toast } from 'sonner';

interface MapClickHandlerProps {
    setPosition: Dispatch<SetStateAction<LatLngTuple | null>>;
    setPopupContent: Dispatch<SetStateAction<string | null>>;
    setError?: Dispatch<SetStateAction<string | undefined>>;
}

const MapClickHandler = ({ setPosition, setPopupContent, setError }: MapClickHandlerProps) => {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;

            // Check if setPosition is defined before calling it
            if (setPosition) {
                setPosition([lat, lng]);
            }

            fetchLocationDetails(lat, lng).then((data) => {
                if (data?.error) {
                    return;
                }
                setPopupContent(data.setPopupContent || 'Unknown location');
                toast.success("Location Name", {
                    description: data?.setDisplayName,
                    actionButtonStyle: {
                        background: "red"
                    },
                    action: {
                        label: "create",
                        onClick: () => console.log("create")
                    }
                });
            }).catch(() => console.error("Something went wrong"));
        }
    });

    return null;
};

export default MapClickHandler;