"use client"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { useState, useTransition } from "react"
import { register } from "@/actions/auth/register"
import LocationSelector from "../ui/location-input"
import { RegisterSchema } from "@/schemas"

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            location: {}
        }
    });

    const onSubmit = (payload: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            register(payload)
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        })
    }
    return (
        <CardWrapper
            headerLabel="Welcome to register"
            backButtonLabel="I already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Name Example"
                                                type="text"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="example@gmail.com"
                                                type="email"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
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
                        <div className="col-span-6">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="+216 54 545 545"
                                                type="text"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Country</FormLabel>
                                <FormControl>
                                    <LocationSelector
                                        disabled={isPending}
                                        onCountryChange={(country) => {
                                            form.setValue(`${field.name}.country`, country?.name || '');
                                        }}
                                        onStateChange={(state) => {
                                            form.setValue(`${field.name}.governorate`, state?.name || '');
                                        }}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.location?.country?.message &&
                                        form.formState.errors.location?.country?.message !== undefined ?
                                        form.formState.errors.location?.country?.message :
                                        null}
                                </FormMessage>
                                <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500">
                                    If your country has states, it will appear after selecting country.
                                </p>
                            </FormItem>
                        )}
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        Register
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}