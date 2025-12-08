import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--btn-radius)] text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft hover:bg-[hsl(var(--primary-soft))]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-soft hover:bg-destructive/90",
        outline:
          "border border-border bg-transparent text-foreground shadow-soft hover:border-primary/60 hover:bg-[hsl(var(--bg-elevated))]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-soft hover:bg-[hsl(var(--secondary-soft))]",
        ghost: "bg-transparent text-foreground hover:bg-muted/40",
        link: "text-primary underline-offset-4 hover:underline",
        primaryHero:
          "bg-gradient-accent text-[hsl(var(--background))] shadow-glow-primary hover:brightness-110",
        ghostHacker:
          "border border-primary/50 bg-black/30 text-primary shadow-soft hover:bg-primary/10",
      },
      size: {
        default: "h-9 px-5",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-7 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
