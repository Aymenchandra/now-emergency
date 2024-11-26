import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Report } from "../layout/features/reports";

interface MapProps {
    emergency?: Report;
};

export default function DynamicMap({ emergency }: MapProps) {
    const Map = useMemo(() => dynamic(
        () => import('@/components/map/map'),
        {
            loading: () => <p>loading...</p>,
            ssr: false
        }
    ), [])

    if (!emergency) {
        return (
            <div className="bg-white-700  p-3 w-[100%] h-[592px] space-y-2">
                <Map />
            </div>
        )
    }
    if (emergency) {
        return (
            <div className="bg-white-700  p-3 w-[100%] h-[592px] space-y-2">
                <Map upDateEmergency={emergency}/>
            </div>
        )
    }
    

}