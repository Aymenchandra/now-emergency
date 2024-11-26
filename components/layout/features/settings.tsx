import { extendedUser } from "@/lib/next-auth";
import { Camera } from "lucide-react";

interface profileProps {
    user?: extendedUser;
    label: string;
}

export const Settings = ({
    user,
}: profileProps) => {
    return (
        <div>
            <div className="relative z-30 mx-auto mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                <div className="relative drop-shadow-2">
                    <img className="h-auto w-[50%] mx-auto sm:w-[100%]" src="/default-avatar.png" alt="profile" />
                    <label htmlFor="profile" className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2">
                        <Camera />
                        <input type="file" name="profile" id="profile" className="sr-only" />
                    </label>
                </div>
            </div>
            <div className="text-center">
                <h3 className="mb-1.5 text-2xl font-medium text-black">
                    Danish Heilium
                </h3>
                <div className="space-y-8 mt-8">
                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            ID
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                            {user?.id}
                        </p>
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Name
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                            {user?.name}
                        </p>
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Email
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                            {user?.email}
                        </p>
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Role
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                            {user?.role}
                        </p>
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Two Factor Authentication
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}