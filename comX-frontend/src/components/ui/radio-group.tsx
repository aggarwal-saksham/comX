import * as React from "react"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

type RadioGroupProps = React.HTMLAttributes<HTMLDivElement>

type RadioGroupItemProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "value"
> & {
  value?: string
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
({ className, ...props }, ref) => {
  return (
    <div
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
({ className, ...props }, ref) => {
  return (
    <button
      type="button"
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </span>
    </button>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
