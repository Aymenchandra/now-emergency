import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function DynamicMap() {
    const Map = useMemo(() => dynamic(
        () => import('@/components/map/map'),
        {
            loading: () => <p>loading...</p>,
            ssr: false
        }
    ), [])

    return (
        <div className="bg-white-700  p-3 w-[100%] h-[592px] space-y-2">
            <Map />
        </div>
    )
}