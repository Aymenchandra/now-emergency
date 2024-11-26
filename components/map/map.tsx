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
import { AddEmergencyForm } from "../layout/emergency-crud-forms/add-emergency-form";

// Default location for initial load (when geolocation is unavailable)
const defaults = {
    posix: [36.797739040981085, 10.185517712488258],
    zoom: 13,
}

const Map = () => {
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
    const [isAddEmergencyOpen, setIsAddEmergencyOpen] = useState(false);
    const [error, setError] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof MapSearchSchema>>({
        resolver: zodResolver(MapSearchSchema),
        defaultValues: { search: "" },
    });

    const customMarkerIcon = new Icon({
        iconUrl: "localisation-marker.png",
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

            // Update the location state with the fetched data
            setLocation({
                position: [latitude, longitude], 
                country: data.setLocation.country,
                governorate: data.setLocation.governorate,
                popupContent: data.setLocation.popupContent,
                display_name: data.setLocation.display_name,
            });
    
            // Trigger the Toast message with the display name from the fetched data
            ToastMessage("Location Name", data.setLocation.display_name, setIsAddEmergencyOpen);
        }).catch(() => console.error("Something went wrong"));
    };

    // Fetch user's geolocation or fallback to default position
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => fetchAndSetLocation(position.coords.latitude, position.coords.longitude),
                () => {
                    console.error("Error getting location");
                    fetchAndSetLocation(defaults.posix[0], defaults.posix[1]);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            fetchAndSetLocation(defaults.posix[0], defaults.posix[1]);
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
                    popupContent: data?.setLocation?.popupContent ,
                    display_name: data?.setLocation?.display_name ,
                });
                ToastMessage("Location Name", data?.setLocation?.display_name, setIsAddEmergencyOpen);
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

            {!isAddEmergencyOpen && (
                <MapContainer
                    center={location.position}
                    zoom={defaults.zoom}
                    scrollWheelZoom={true}
                    className="w-full h-[95%] relative z-1"
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
                        setIsAddEmergencyOpen={setIsAddEmergencyOpen}
                    />
                    <MapUpdater position={location.position} />
                </MapContainer>
            )}

            <ResponsiveDialog
                isOpen={isAddEmergencyOpen}
                setIsOpen={setIsAddEmergencyOpen}
                title="Add Emergency"
                description={location.display_name as string}
            >
                <AddEmergencyForm
                    setIsOpen={setIsAddEmergencyOpen}
                    location={{ ...location }}
                />
            </ResponsiveDialog>
        </>
    );
};

export default Map;
