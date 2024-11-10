"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import * as DropdownMenuPrimitive from "@/components/ui/dropdown-menu"

const DropdownMenu = DropdownMenuPrimitive.DropdownMenu

const DropdownMenuTrigger = DropdownMenuPrimitive.DropdownMenuTrigger

const DropdownMenuSeparator = DropdownMenuPrimitive.DropdownMenuSeparator

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.DropdownMenuContent>,
  React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.DropdownMenuContent
  >
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.DropdownMenuContent
    ref={ref}
    className={cn("shadow-none p-2 rounded-lg w-64", className)}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.DropdownMenuContent>
))
DropdownMenuContent.displayName =
  DropdownMenuPrimitive.DropdownMenuContent.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.DropdownMenuItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.DropdownMenuItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.DropdownMenuItem
    ref={ref}
    className={cn(
      "hover:bg-primary/10 h-14 group flex-col items-start justify-center gap-0 rounded-lg cursor-pointer",
      className
    )}
    {...props}
  >
    {children}
    <div className="absolute right-2 text-primary [&>svg]:w-4 [&>svg]:h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200">
      <ChevronRight />
    </div>
  </DropdownMenuPrimitive.DropdownMenuItem>
))
DropdownMenuItem.displayName =
  DropdownMenuPrimitive.DropdownMenuItem.displayName

const DropdownMenuItemIcon = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute flex items-center justify-center size-10 rounded-lg transition-colors duration-200 left-2 mr-2 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground [&>svg]:w-5 [&>svg]:h-5",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
DropdownMenuItemIcon.displayName = "DropdownMenuItemIcon"

const DropdownMenuItemTitle = React.forwardRef<
  React.ElementRef<"h3">,
  React.ComponentPropsWithoutRef<"h3">
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "pl-12 text-sm font-medium group-hover:text-primary transition-colors duration-200",
      className
    )}
    {...props}
  >
    {children}
  </h3>
))
DropdownMenuItemTitle.displayName = "DropdownMenuItemTitle"

const DropdownMenuItemDescription = React.forwardRef<
  React.ElementRef<"p">,
  React.ComponentPropsWithoutRef<"p">
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "pl-12 text-xs text-muted-foreground group-hover:text-primary transition-colors duration-200",
      className
    )}
    {...props}
  >
    {children}
  </p>
))
DropdownMenuItemDescription.displayName = "DropdownMenuItemDescription"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuItemTitle,
  DropdownMenuItemDescription,
  DropdownMenuSeparator,
}
