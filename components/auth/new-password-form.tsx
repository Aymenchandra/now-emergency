"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { NewPasswordSchema } from "@/schemas"
import { newPasswordReset } from "@/actions/auth/new-password"

export const NewPasswordForm = () => {
    const [error,setError] = useState<string | undefined>()
    const [success,setSuccess] = useState<string | undefined>()
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    });

    const searchParams = useSearchParams()

    const token = searchParams.get("token")

    const onSubmit = (payload : z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            if(!token) {
                setError("Missing Token")
                return
            } 

            newPasswordReset(payload,token)
            .then((data) =>{
                setError(data?.error)
                setSuccess(data?.success)
            })
        })
    }

    return (
        <CardWrapper
        headerLabel="Enter a new password"
        backButtonLabel="Back To Login"
        backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="*****"
                                            type="password"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                        
                    >
                        Reset Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}