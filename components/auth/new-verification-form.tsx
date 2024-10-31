"use client"

import { newVerification } from "@/actions/new-verification"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"

export const NewVerificationForm = () => {
    const [error,setError] = useState<string | undefined>()
    const [success,setSuccess] = useState<string | undefined>()

    const searchParams = useSearchParams()

    const token = searchParams.get("token")

    //used to memorize callback functions
    const onSubmit = useCallback(() =>{
        if(!token){
            setError("Missing Token")
            return
        }
        newVerification(token)
        .then((data) =>{
            setSuccess(data.success);
            setError(data.error);
        })
        .catch(() =>{
            setError("Something went wrong!")
        })
    },[token]) 

    useEffect(() => {
        return () => onSubmit();
    },[onSubmit]) // Only re-run the effect if token changes
    return (
        <CardWrapper
        headerLabel="Confirming your verification"
        backButtonLabel="Back To Login"
        backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader/>
                )}
                <FormSuccess message={success}/>
                <FormError message={error}/>
            </div>
        </CardWrapper>
    )
}