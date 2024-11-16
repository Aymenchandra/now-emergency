"use client"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { profile } from "@/actions/profile"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"
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
import { useSession } from "next-auth/react"
import { ProfileSchema } from "@/schemas"
import { useCurrentUser } from "@/hooks/use-current-user"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { userRole } from "@prisma/client"
import { Switch } from "@/components/ui/switch"
import { ImageForm } from "@/components/layout/image-form"


export const Profile = () => {

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const { update } = useSession();
  const [isPending, startTransition] = useTransition()

  const user = useCurrentUser();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    }
  })

  const onSubmit = (payload: z.infer<typeof ProfileSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      profile(payload)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }
          if (data.success) {
            setSuccess(data.success)
            update()
          }
        })
        .catch(() => setError('Something went wrong!'))
    })
  }

  return (
    <>
      <ImageForm />
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
            {user?.isOAuth === false && (
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
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} placeholder="*****" disabled={isPending} autoComplete="on" />
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
                    <SelectItem value={userRole.ADMIN}>
                      Admin
                    </SelectItem>
                    <SelectItem value={userRole.USER}>
                      User
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}>
            </FormField>
            {user?.isOAuth === false && (
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
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </>
  )
}