'use client';

import * as z from 'zod';
import { AddUserSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { userRole } from '@prisma/client';
import React, { Dispatch, SetStateAction, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { addUser } from '@/actions/crud/user/addUser';
import { useRouter } from 'next/navigation';
import LocationSelector from '@/components/ui/location-input';

export const AddUserForm = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>>; }) => {

  const router = useRouter();
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof AddUserSchema>>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      location: {},
      role: undefined
    }
  });

  const onSubmit = (payload: z.infer<typeof AddUserSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      addUser(payload)
        .then((data) => {
          if (data.success) {
            setSuccess(data.success)
            router.refresh()
            try {
              setIsOpen(false);
            } catch (error) {
              console.log(error);
            }
          }
          setError(data.error)
        })
    })

  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
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
              <FormMessage />
            </FormItem>
          )}
        />
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
        )}></FormField>
        <FormError message={error} />
        <FormSuccess message={success} />
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
            className="w-full"
          >
            <>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add'
              )}
            </>
          </Button>
        </div>
      </form>
    </Form>
  );
}
