// this form for both add and edit emergency
'use client';

import * as z from 'zod';
import { WorkStationSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { LatLngTuple } from 'leaflet';
import { workstation } from '@/actions/workstation';

interface WorkstationFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  location: {
    position: LatLngTuple | null;
    country: string | null;
    governorate: string | null;
  };
}

export const WorkstationForm = ({ setIsOpen, location }: WorkstationFormProps) => {

  const router = useRouter();
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof WorkStationSchema>>({
    resolver: zodResolver(WorkStationSchema),
    defaultValues: {
      country: location.country as string,
      governorate: location.governorate as string,
      position: location.position as LatLngTuple,
    }
  });

  const onSubmit = (payload: z.infer<typeof WorkStationSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      workstation(payload)
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
    </Form >
  );
}
