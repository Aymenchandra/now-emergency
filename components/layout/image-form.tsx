import { useState, useTransition } from "react"
import { useSession } from "next-auth/react"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Camera } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { upload } from "@/actions/upload"
import { FormSuccess } from "../form-success"
import { FormError } from "../form-error"


export const ImageForm = () => {

  const user = useCurrentUser()

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [imageUrl, setImageUrl] = useState<string | undefined>('')
  const { update } = useSession();
  const [isPending, startTransition] = useTransition()

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url)
    }
  }

  const handleSubmit = async (formData: FormData) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      upload(formData)
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
    setImageUrl('')
  }



  return (
    <>
      <form action={handleSubmit}>
        <div className="relative z-30 mx-auto mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
          <div className="relative ">
            <Image className="mx-auto rounded-full" src={imageUrl || user?.image || "/default-avatar.png"} width={200} height={200} alt="profile" />
            <label htmlFor="profile" className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2">
              <Camera />
              <input type="file" name="profile" id="profile" className="sr-only" accept="image/png, image/gif, image/jpeg" onChange={handleImageChange} />
            </label>
          </div>
        </div>
        {imageUrl && (
            <Button className="block mx-auto mt-2" disabled={isPending}>Upload</Button>
          )}
      </form>

      <FormSuccess message={success} />
      <FormError message={error} />
    </>


  )
}