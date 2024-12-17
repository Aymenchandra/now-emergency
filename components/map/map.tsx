"use client"
import * as z from "zod"
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { FormError } from "@/components/form-error"
import { Button } from "@/components/ui/button"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, LatLngTuple } from 'leaflet';
import { useState, useEffect, useTransition } from 'react';
import { MapSearchSchema } from "@/schemas"
import { fetchLocationDetails, mapSearch } from "@/actions/map"
import { Search } from "lucide-react"
import MapClickHandler from "./mapClickHandler"
import MapUpdater from "./mapUpdater"
import { ToastMessage } from "@/lib/toast-message"
import { ResponsiveDialog } from "../responsive-dialog";
import { EmergencyForm } from "../layout/crud-forms/emergency/emergency-form";
import { Emergency, Location } from "@prisma/client";
import { WorkstationForm } from "../layout/crud-forms/workstation/workstation-form";
import { upDateUserWorkStation } from "./dynamicMap";

// Default location for initial load (when geolocation is unavailable)
const defaults = {
    posix: [36.797739040981085, 10.185517712488258],
    zoom: 13,
}
interface MapProps {
    upDateEmergency?: Emergency;
    upDateUserWorkStation?: upDateUserWorkStation;
};

export const Map = ({ upDateEmergency, upDateUserWorkStation }: MapProps) => {
    // State object for location-related data
    const [location, setLocation] = useState<{
        position: LatLngTuple | null;
        country: string | null;
        governorate: string | null;
        display_name: string | null;
        popupContent: string | null;
    }>({
        position: defaults.posix as LatLngTuple,
        country: null,
        governorate: null,
        display_name: null,
        popupContent: null,
    });

    // State for modal and error handling
    const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
    const [error, setError] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof MapSearchSchema>>({
        resolver: zodResolver(MapSearchSchema),
        defaultValues: { search: "" },
    });

    const customMarkerIcon = new Icon({
        iconUrl: "/localisation-marker.png",
        iconSize: [38, 38],
    });

    const fetchAndSetLocation = (latitude: number, longitude: number) => {
        fetchLocationDetails(latitude, longitude).then((data) => {
            if (data.error) {
                setError(data.error);
                return;
            }

            if (!data?.setLocation) {
                setError("Invalid location data");
                return;
            }
            console.log(data)

            // Update the location state with the fetched data
            setLocation({
                position: [latitude, longitude],
                country: data.setLocation.country,
                governorate: data.setLocation.governorate,
                popupContent: data.setLocation.popupContent,
                display_name: data.setLocation.display_name,
            });

            // Trigger the Toast message with the display name from the fetched data
            ToastMessage("Location Name", data.setLocation.display_name, setIsLocationDialogOpen);
        }).catch(() => console.error("Something went wrong"));
    };

    // Fetch user's geolocation or fallback to default position
    const getCurrentLocation = () => {
        switch (true) {

            case upDateUserWorkStation !== undefined:
                // in case update user workstation position
                fetchAndSetLocation(upDateUserWorkStation.location?.position[0] as number, upDateUserWorkStation.location?.position[1] as number);
                break;

            case upDateEmergency !== undefined:
                // data already in database in case we update emergency
                fetchAndSetLocation(upDateEmergency.position[0], upDateEmergency.position[1]);
                break;

            case navigator.geolocation !== undefined:
                navigator.geolocation.getCurrentPosition(
                    (position) => fetchAndSetLocation(position.coords.latitude, position.coords.longitude),
                    () => {
                        console.error("Error getting location");
                        fetchAndSetLocation(defaults.posix[0], defaults.posix[1]);
                    }
                );
                break;

            default:
                console.error("Geolocation is not supported by this browser.");
                fetchAndSetLocation(defaults.posix[0], defaults.posix[1]);
                break;
        }
    };

    useEffect(() => {
        return () => getCurrentLocation();
    }, []);

    // Form submission handler
    const onSubmit = (payload: z.infer<typeof MapSearchSchema>) => {
        setError("");
        startTransition(() => {
            mapSearch(payload).then((data) => {
                if (data?.error) {
                    setError(data.error);
                    return;
                }
                setLocation({
                    position: data?.setLocation?.position as LatLngTuple,
                    country: data?.setLocation?.country,
                    governorate: data?.setLocation?.governorate,
                    popupContent: data?.setLocation?.popupContent,
                    display_name: data?.setLocation?.display_name,
                });
                ToastMessage("Location Name", data?.setLocation?.display_name, setIsLocationDialogOpen);
            }).catch(() => console.error("Something went wrong"));
        });
    };

    if (!location.position) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <FormError message={error} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <Search className="w-5 h-5 text-gray-500" />
                        </div>
                        <FormField control={form.control} name="search" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <input
                                        {...field}
                                        id="default-search"
                                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 white"
                                        placeholder="Search Location..."
                                        type="search"
                                        disabled={isPending}
                                    />
                                </FormControl>
                            </FormItem>
                        )} />
                        <Button type="submit" className="absolute end-2.5 bottom-2.5" disabled={isPending}>
                            Search
                        </Button>
                    </div>
                </form>
            </Form>

            <MapContainer
                center={location.position}
                zoom={defaults.zoom}
                scrollWheelZoom={true}
                className="w-full h-[95%] relative z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={location.position} draggable={false} icon={customMarkerIcon}>
                    <Popup>{location.popupContent}</Popup>
                </Marker>
                <MapClickHandler
                    setLocation={setLocation}
                    setIsLocationDialogOpen={setIsLocationDialogOpen}
                />
                <MapUpdater position={location.position} />
            </MapContainer>
            
            {/* open emergency form */}
            {!upDateEmergency && !upDateUserWorkStation && (
                <ResponsiveDialog
                    isOpen={isLocationDialogOpen}
                    setIsOpen={setIsLocationDialogOpen}
                    title="Emergency"
                    description={location.display_name as string}
                >
                    <EmergencyForm
                        setIsOpen={setIsLocationDialogOpen}
                        location={{ ...location }}
                    />
                </ResponsiveDialog>
            )}
            {/* open upDateEmergency form */}

            {upDateEmergency && (
                <ResponsiveDialog
                    isOpen={isLocationDialogOpen}
                    setIsOpen={setIsLocationDialogOpen}
                    title="Emergency"
                    description={location.display_name as string}
                >
                    <EmergencyForm
                        setIsOpen={setIsLocationDialogOpen}
                        location={{ ...location }}
                        emergencyInfo={{
                            id: upDateEmergency?.id || null,
                            title: upDateEmergency?.title || null,
                            description: upDateEmergency?.description || null,
                            type: upDateEmergency?.type || null
                        }}
                    />
                </ResponsiveDialog>
            )}

            {/* open user workstation */}
            {upDateUserWorkStation && (
                <ResponsiveDialog
                    isOpen={isLocationDialogOpen}
                    setIsOpen={setIsLocationDialogOpen}
                    title="WorkStation"
                    description={location.display_name as string}
                >
                    <WorkstationForm
                        setIsOpen={setIsLocationDialogOpen}
                        location={{ ...location }}
                        phone={upDateUserWorkStation.phone as string}
                    />
                </ResponsiveDialog>
            )}
        </>
    );
};

export default Map;
