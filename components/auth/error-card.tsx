import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormError } from "@/components/form-error"

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops! Something Went Wrong!"
            backButtonLabel="Back to login?"
            backButtonHref="/auth/register"
            >
        <FormError message={'An error has occurred, please retry again!'} />

        </CardWrapper>
    )
}