"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "btn-primary text-primary-foreground hover:shadow-medium",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-medium",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-emerald-300 hover:shadow-soft",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-soft",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-soft",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-medium",
        warning: "bg-yellow-500 text-white hover:bg-yellow-600 hover:shadow-medium",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
            Loading...
          </>
        ) : (
          children
        )}
      </Comp>
    )
  },
)
EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton, buttonVariants }
