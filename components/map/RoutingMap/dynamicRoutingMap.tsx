import dynamic from "next/dynamic";
import { useMemo } from "react";

export interface EmergencyProps {
    emergencyPosition: {
        emergencyPosition: number[],
        employeePosition: number[]
    }
};

export default function DynamicRoutingMap({ emergencyPosition }: EmergencyProps) {
    const MapWithRouting = useMemo(() => dynamic(
        () => import('@/components/map/RoutingMap/mapWithRouting'),
        {
            loading: () => <p>loading...</p>,
            ssr: false
        }
    ), [])

    return (
        <div className="bg-white-700 p-3 w-[100%] h-[750px] space-y-2">
            <MapWithRouting emergencyPosition={emergencyPosition} />
        </div>
    )
}