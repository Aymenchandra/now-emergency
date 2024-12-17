import { Dispatch, SetStateAction } from "react"
import { toast } from "sonner"

export const ToastMessage = async (title: string, description: string,setIsLocationDialogOpen:Dispatch<SetStateAction<boolean>>) => {
  toast.success(title, {
    description: description,
    actionButtonStyle: {
      background: "red"
    },
    action: {
      label: "Save",
      onClick: () => setIsLocationDialogOpen(true) // setIsOpen(true)
    }
  })
}