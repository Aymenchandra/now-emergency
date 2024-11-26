import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-[#FFBF00]/80",
        destructive:
          "border-transparent bg-[#FFBF00] text-destructive-foreground shadow hover:bg-destructive/80",
        golden:
          "border-transparent bg-[#a56400] text-destructive-foreground shadow hover:bg-[#a56400]/80",
        warning:
          "border-transparent bg-[#FF4500] text-destructive-foreground shadow hover:bg-[#FF4500]/80",
        success:
          "border-transparent bg-[#4CAF50] text-destructive-foreground shadow hover:bg-[#4CAF50]/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
