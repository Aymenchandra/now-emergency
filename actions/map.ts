"use server"
import { MapSearchSchema } from "@/schemas"
import { LatLngTuple } from "leaflet";
import * as z from "zod"

// search location by input search
export const mapSearch = async (payload: z.infer<typeof MapSearchSchema>) => {
    const validatedFields = MapSearchSchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    const searchQuery = payload.search
    if (searchQuery) {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json&addressdetails=1&accept-language=en`);
        const data = await response.json();
        if (data && data.length > 0) {
            const { lat, lon, address, display_name } = data[0]; // Assuming the first result is the correct one
            const setPosition: LatLngTuple = [parseFloat(lat), parseFloat(lon)];
            const governorate = address.state || address.province || address.region || "Unknown Governorate";
            const country = address.country || "Unknown Country";
            const setPopupContent = governorate === "Unknown Governorate" ? country // Only show country if state and city are missing
            : `${governorate}, ${country}`;
            const setDisplayName = display_name || setPopupContent || "Unknown Name" // in case display_name null
            return { setPosition, setPopupContent,setDisplayName }
        } else {
            return { error: "No results found." };
        }
    }
    return null
}

// Function to fetch location details from OpenStreetMap's Nominatim API
export const fetchLocationDetails = async (latitude: number, longitude: number) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&accept-language=en`);
    const data = await response.json();
    if (data) {
        const { address, display_name } = data
        const governorate = address.state || address.province || address.region || "Unknown Governorate";
        const country = address.country || "Unknown Country";
        const setPopupContent = `${governorate}, ${country}`
        const setDisplayName = display_name || setPopupContent
        return { setPopupContent,setDisplayName }
    } else {
        return { error: "Failed to fetch address" };
    }
}