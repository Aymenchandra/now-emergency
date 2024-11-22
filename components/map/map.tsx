"use client"
import * as z from "zod"
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

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { Icon, LatLngTuple } from 'leaflet';
import { useState, useEffect, useTransition } from 'react';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapSearchSchema } from "@/schemas"
import { fetchLocationDetails, mapSearch } from "@/actions/map"
import { Search } from "lucide-react"
import { toast } from "sonner"
import MapClickHandler from "./mapClickHandler"
import MapUpdater from "./mapUpdater"

const defaults = {
    posix: [36.797739040981085, 10.185517712488258],
    zoom: 13,
}

const Map = () => {
    // map params
    const [position, setPosition] = useState<LatLngTuple | null>(defaults.posix as LatLngTuple);
    const [popupContent, setPopupContent] = useState<string | null>(null);
    const customMarkerIcon = new Icon({
        iconUrl: "localisation-marker.png",
        iconSize: [38, 38]
    })

    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')

    const form = useForm<z.infer<typeof MapSearchSchema>>({
        resolver: zodResolver(MapSearchSchema),
        defaultValues: {
            search: ""
        }
    });

    // Fetch the user's current location when the component mounts
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setPosition([latitude, longitude]);
                    fetchLocationDetails(latitude, longitude).then((data) => {
                        if (data.error) {
                            setError(data.error)
                            return
                        }
                        setPopupContent(data.setPopupContent as string)
                        toast.success("Location Name", {
                            description: data?.setDisplayName,
                            actionButtonStyle: {
                                background: "red"
                            },
                            action: {
                                label: "create",
                                onClick: () => console.log("create")
                            }
                        })
                    })
                        .catch(() => console.error("Something went wrong"))
                },
                (error) => {
                    console.error("Error getting location: ", error);
                    setPosition([defaults.posix[0], defaults.posix[1]]);
                    fetchLocationDetails(defaults.posix[0], defaults.posix[1]).then((data) => {
                        if (data.error) {
                            setError(data.error)
                            return
                        }
                        setPopupContent(data.setPopupContent as string)
                        toast.success("Location Name", {
                            description: data?.setDisplayName,
                            actionButtonStyle: {
                                background: "red"
                            },
                            action: {
                                label: "create",
                                onClick: () => console.log("create")
                            }
                        })
                    })
                        .catch(() => console.error("Something went wrong"))
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setPosition([defaults.posix[0], defaults.posix[1]]);
            fetchLocationDetails(defaults.posix[0], defaults.posix[1]).then((data) => {
                if (data.error) {
                    setError(data.error)
                    return
                }
                setPopupContent(data.setPopupContent as string)
                toast.success("Location Name", {
                    description: data?.setDisplayName,
                    actionButtonStyle: {
                        background: "red"
                    },
                    action: {
                        label: "create",
                        onClick: () => console.log("create")
                    }
                })
            })
                .catch(() => console.error("Something went wrong"))
        }
    };

    useEffect(() => {
        return () => getCurrentLocation();
    }, [])


    const onSubmit = (payload: z.infer<typeof MapSearchSchema>) => {
        setError("");
        startTransition(() => {
            mapSearch(payload)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error)
                        return
                    }
                    toast.success("Location Name", {
                        description: data?.setDisplayName,
                        actionButtonStyle: {
                            background: "red"
                        },
                        action: {
                            label: "create",
                            onClick: () => console.log("create")
                        }
                    })

                    setPosition(data?.setPosition as LatLngTuple);
                    setPopupContent(data?.setPopupContent);
                })
                .catch(() => console.error("Something went wrong"))
        })
    }

    if (!position) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <FormError message={error} />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="max-w-md"
                >
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <Search className="w-5 h-5 text-gray-500" />
                        </div>
                        <FormField
                            control={form.control}
                            name="search"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <input
                                            {...field}
                                            id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Location..."
                                            type="search"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="absolute end-2.5 bottom-2.5"
                            disabled={isPending}
                        >
                            Search
                        </Button>
                    </div>
                </form>

            </Form>

            <MapContainer
                center={position}
                zoom={defaults.zoom}
                scrollWheelZoom={true}
                className="w-full h-[95%]"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} draggable={false} icon={customMarkerIcon}>
                    <Popup>{popupContent}</Popup>
                </Marker>
                <MapClickHandler setPosition={setPosition} setPopupContent={setPopupContent} setError={setError} />
                <MapUpdater position={position} />
            </MapContainer>
        </>
    );
}

export default Map;