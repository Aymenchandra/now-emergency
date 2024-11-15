"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Dispatch, SetStateAction, useState, useTransition } from "react"
import { Form } from "@/components/ui/form"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { multideleteUserSchema } from "@/schemas/data-table-user-schema"
import { deleteUser } from "@/actions/user/deleteUser"
import { deleteMultiUser } from "@/actions/user/deleteMultiUser"

export const MultiDeleteUserForm = ({ idList, setIsOpen }: { idList: any, setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof multideleteUserSchema>>({
    resolver: zodResolver(multideleteUserSchema),
    defaultValues: {
      idList: idList
    }
  })

  const onSubmit = (payload: z.infer<typeof multideleteUserSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      deleteMultiUser(payload)
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
                  deleting...
                </>
              ) : (
                'Delete All'
              )}
            </>
          </Button>
        </div>
      </form>
    </Form>
  );
}
