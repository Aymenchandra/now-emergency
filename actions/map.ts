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
            const { lat, lon, address } = data[0]; // Assuming the first result is the correct one
            const position: LatLngTuple = [parseFloat(lat), parseFloat(lon)];
            const governorate = address.state || address.province || address.region || "Unknown Governorate";
            const country = address.country || "Unknown Country";
            const popupContent = governorate === "Unknown Governorate" ? country // Only show country if state and city are missing
            : `${governorate}, ${country}`;
            const display_name = data[0].display_name || popupContent || "Unknown Name" 
            return {
                setLocation: {
                    position: position, // Ensure this is a tuple of [number, number]
                    country: country,
                    governorate: governorate,
                    popupContent: popupContent,
                    display_name: display_name,
                },
            };
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
        const { address } = data;
        const governorate = address.state || address.province || address.region || "Unknown Governorate";
        const country = address.country || "Unknown Country";
        const popupContent = `${governorate}, ${country}`;
        const display_name = data.display_name || `${governorate}, ${country}`;
        
        // Return the object with location details, ensuring position is a LatLngTuple
        return {
            setLocation: {
                position: [latitude, longitude], // Ensure this is a tuple of [number, number]
                country: country,
                governorate: governorate,
                popupContent: popupContent,
                display_name: display_name,
            },
        };
    } else {
        return {
            error: "Failed to fetch address",
        };
    }
};

