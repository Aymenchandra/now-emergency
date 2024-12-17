// this form for both add and edit emergency
'use client';

import * as z from 'zod';
import { EmergencySchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { emergencyStatus, emergencyType } from '@prisma/client';
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
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { useCurrentUser } from '@/hooks/use-current-user';
import { LatLngTuple } from 'leaflet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { emergency } from '@/actions/crud/emergency/emergency';

interface EmergencyFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  location: {
    position: LatLngTuple | null;
    country: string | null;
    governorate: string | null;
  };
  emergencyInfo?: {
    id: string | null;
    title: string | null;
    description: string | null;
    type: emergencyType | null
  };
}

export const EmergencyForm = ({ setIsOpen, location, emergencyInfo }: EmergencyFormProps) => {

  const user = useCurrentUser()
  const router = useRouter();
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof EmergencySchema>>({
    resolver: zodResolver(EmergencySchema),
    defaultValues: {
      title: emergencyInfo?.title || "",
      description: emergencyInfo?.description || "",
      country: location.country as string,
      governorate: location.governorate as string,
      position: location.position as LatLngTuple,
      type: emergencyInfo?.type || undefined,
      userId: user?.id,
      status: emergencyStatus.HELP,
    }
  });

  const onSubmit = (payload: z.infer<typeof EmergencySchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      emergency(payload, emergencyInfo?.id as string)
        .then((data) => {
          if (data.success) {
            setSuccess(data.success)
            try {
              setIsOpen(false);
              router.push('/emergencies')
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Title Example..."
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Description Example..."
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="type" render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type"></SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(emergencyType).map((option) => (
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
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Country Example"
                    type="text"
                    disabled={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="governorate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Governorate</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Governorate Example"
                    type="text"
                    disabled={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>

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
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </>
          </Button>
        </div>
      </form>
    </Form>
  );
}
