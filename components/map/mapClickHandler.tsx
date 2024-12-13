import { fetchLocationDetails } from '@/actions/map';
import { ToastMessage } from '@/lib/toast-message';
import { LatLngTuple } from 'leaflet';
import { Dispatch, SetStateAction } from 'react';
import { useMapEvents } from 'react-leaflet';

interface MapClickHandlerProps {
    setLocation: Dispatch<SetStateAction<{
        position: LatLngTuple | null;
        country: string | null;
        governorate: string | null;
        popupContent: string | null;
        display_name: string | null;
    }>>;
    setIsLocationDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const MapClickHandler = ({ setLocation, setIsLocationDialogOpen }: MapClickHandlerProps) => {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;

            // Fetch location details and set the location
            fetchLocationDetails(lat, lng).then((data) => {
                if (data?.error) {
                    return;
                }

                if (!data?.setLocation) {
                    return;
                }

                // Update the location state with the fetched data
                setLocation({
                    position: [lat, lng], // This ensures position is always a LatLngTuple
                    country: data.setLocation.country,
                    governorate: data.setLocation.governorate,
                    popupContent: data.setLocation.popupContent,
                    display_name: data.setLocation.display_name,
                });

                // Trigger the Toast message with the location display name
                ToastMessage("Location Name", data.setLocation.display_name, setIsLocationDialogOpen);

            }).catch(() => console.error("Something went wrong"));
        }
    });

    return null;
};

export default MapClickHandler;