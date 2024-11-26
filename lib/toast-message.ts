import { Dispatch, SetStateAction } from "react"
import { toast } from "sonner"

export const ToastMessage = async (title: string, description: string,setIsAddEmergencyOpen:Dispatch<SetStateAction<boolean>>) => {

  toast.success(title, {
    description: description,
    actionButtonStyle: {
      background: "red"
    },
    action: {
      label: "Create",
      onClick: () => setIsAddEmergencyOpen(true) // setIsOpen(true)
    }
  })
}