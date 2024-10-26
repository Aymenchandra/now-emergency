"use client"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"

export const Social = () =>{
    return (
        <div className="w-full flex gap-x-2 items-center">
            <Button 
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => {}}
                >
                <FcGoogle className="h-5 w-5"/>
            </Button>
            <Button 
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => {}}
                >
                <FaGithub className="h-5 w-5"/>
            </Button>
        </div>
    )
}