"use client"

import * as React from "react"
import Image from "next/image"
import { Index } from "@/__registry__"
import { CodeIcon, Eye, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TabsTriggerIcon,
  TabsTriggerText,
} from "@/registry/default/annui/focus-tabs"
import { styles } from "@/registry/registry-styles"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
  type?: "block" | "component" | "example"
}

export function ComponentPreview({
  name,
  type,
  children,
  className,
  align = "center",
  hideCode = false,
  ...props
}: ComponentPreviewProps) {
  const index = styles.findIndex((style) => style.name === "default")

  const Codes = React.Children.toArray(children) as React.ReactElement[]
  const Code = Codes[index]

  const Preview = React.useMemo(() => {
    const Component = Index["default"][name]?.component

    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded-lg bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      )
    }

    return <Component />
  }, [name])

  if (type === "block") {
    return (
      <div className="relative aspect-[4/2.5] w-full overflow-hidden rounded-lg border">
        <Image
          src={`/images/blocks/${name}.png`}
          alt={name}
          width={1440}
          height={900}
          className="absolute left-0 top-0 z-20 w-[970px] max-w-none bg-background dark:hidden sm:w-[1280px] md:hidden md:dark:hidden"
        />
        <Image
          src={`/images/blocks/${name}-dark.png`}
          alt={name}
          width={1440}
          height={900}
          className="absolute left-0 top-0 z-20 hidden w-[970px] max-w-none bg-background dark:block sm:w-[1280px] md:hidden md:dark:hidden"
        />
        <div className="absolute inset-0 hidden w-[1600px] bg-background md:block">
          <iframe src={`/blocks/default/${name}`} className="size-full" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2 bg-[#F7F7F7] rounded-[20px]", className)}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-ln-label-sm text-ln-gray-450">
              {name}.tsx
            </span>
          </div>
          {!hideCode && (
            <TabsList className="ml-auto">
              <TabsTrigger value="preview">
                <TabsTriggerIcon>
                  <Eye />
                </TabsTriggerIcon>
                <TabsTriggerText>Preview</TabsTriggerText>
              </TabsTrigger>
              <TabsTrigger value="code">
                <TabsTriggerIcon>
                  <CodeIcon />
                </TabsTriggerIcon>
                <TabsTriggerText>Code</TabsTriggerText>
              </TabsTrigger>
            </TabsList>
          )}
        </div>
        <TabsContent value="preview" className="relative ">
          <div
            className={cn(
              "not-prose preview flex min-h-[350px] w-full justify-center p-10",
              {
                "items-center": align === "center",
                "items-start": align === "start",
                "items-end": align === "end",
              }
            )}
          >
            <React.Suspense
              fallback={
                <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              {Preview}
            </React.Suspense>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_figure]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              {Code}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
