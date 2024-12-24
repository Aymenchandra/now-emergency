"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Dispatch, SetStateAction, useState, useTransition } from "react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Location, User, userRole } from "@prisma/client"
import { Switch } from "@/components/ui/switch"
import { editUser } from "@/actions/crud/user/editUser"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import LocationSelector from "@/components/ui/location-input"
import { editUserSchema } from "@/schemas"

export interface Users extends User {
  location: Location
}
export const EditUserForm = ({ user, setIsOpen }: { user: Users, setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      newPassword: undefined,
      phone: user?.phone || undefined,
      location: user?.location || undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    }
  })

  const onSubmit = (payload: z.infer<typeof editUserSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      editUser(payload, user.id)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }
          if (data.success) {
            setSuccess(data.success)
            router.refresh()
            try {
              setIsOpen(false);
            } catch (error) {
              console.log(error);
            }
          }
        })
        .catch(() => setError('Something went wrong!'))
    })
  }
  return (
    <Form {...form}>
      <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Name" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}>
          </FormField>
          {user?.password !== null && (
            <>
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email@example.com" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}>
              </FormField>
              <FormField control={form.control} name="newPassword" render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="*****" disabled={isPending} autoComplete="on" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}></FormField>
            </>
          )}
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Phone" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Country</FormLabel>
                <FormControl>
                  <LocationSelector
                    location={{
                      country: user?.location?.country || "",
                      governorate: user?.location?.governorate || "",
                    }}
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
          <FormField control={form.control} name="role" render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role"></SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(userRole).map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}>
          </FormField>
          {user?.password !== null && (
            <FormField control={form.control} name="isTwoFactorEnabled" render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0 5">
                  <FormLabel>Two Factor Authentication</FormLabel>
                  <FormDescription>
                    Enable two factor authentication for your account
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}></FormField>
          )}
        </div>
        <FormSuccess message={success} />
        <FormError message={error} />
        <div className="w-full flex justify-center sm:space-x-6">
          <Button
            size="lg"
            variant="outline"
            disabled={isPending}
            className="w-full hidden sm:block"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full "
          >
            <>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Editing...
                </>
              ) : (
                'Edit'
              )}
            </>
          </Button>
        </div>
      </form>
    </Form>
  );
}
