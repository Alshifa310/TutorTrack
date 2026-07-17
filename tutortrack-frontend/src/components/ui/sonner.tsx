"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "cn-toast group border border-border/70 bg-popover/90 text-popover-foreground shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
          title: "font-semibold tracking-tight",
          description: "text-muted-foreground",
          actionButton:
            "rounded-full bg-primary text-primary-foreground hover:bg-primary/90",
          cancelButton:
            "rounded-full border border-border/70 bg-transparent text-foreground hover:bg-muted",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
