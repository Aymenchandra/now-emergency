import { Emergency } from "@prisma/client";
import dynamic from "next/dynamic";
import { useMemo } from "react";

// will be null in case that emergency not found
interface MapProps {
    emergency?: Emergency;
};

export default function DynamicMap({ emergency }: MapProps) {
    const Map = useMemo(() => dynamic(
        () => import('@/components/map/map'),
        {
            loading: () => <p>loading...</p>,
            ssr: false
        }
    ), [])

    return (
        <div className="bg-white-700  p-3 w-[100%] h-[750px] space-y-2">
            <Map upDateEmergency={emergency}/>
        </div>
    )
}